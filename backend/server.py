from fastapi import FastAPI, APIRouter, HTTPException, status, Depends, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
import secrets
from datetime import datetime, timezone, timedelta
from google.oauth2 import id_token as google_id_token
from google.auth.transport import requests as google_auth_requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Admin allowlist
ADMIN_EMAILS = {
    e.strip().lower()
    for e in os.environ.get("ADMIN_EMAILS", "").split(",")
    if e.strip()
}

# Google OAuth client ID — the site's own, from Google Cloud Console (see README).
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")
SESSION_TTL_DAYS = 7

# Session cookies need `secure` + `samesite=None` in production (HTTPS).
# In local dev (no HTTPS) that combination silently gets dropped by browsers,
# so relax it when ENV=development.
IS_PRODUCTION = os.environ.get("ENV", "production").lower() != "development"

app = FastAPI(title="Soumyajit Samal — Research Portfolio API")
api_router = APIRouter(prefix="/api")


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def _is_admin_email(email: Optional[str]) -> bool:
    return bool(email) and email.lower() in ADMIN_EMAILS


def _set_session_cookie(response: Response, session_token: str) -> None:
    response.set_cookie(
        key="session_token",
        value=session_token,
        max_age=SESSION_TTL_DAYS * 24 * 60 * 60,
        httponly=True,
        secure=IS_PRODUCTION,
        samesite="none" if IS_PRODUCTION else "lax",
        path="/",
    )


# ---------- Auth helpers ----------
async def _verify_google_credential(credential: str) -> dict:
    """Verify a Google Identity Services ID token and return its claims."""
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=500,
            detail="GOOGLE_CLIENT_ID is not configured on the server",
        )

    def _do_verify():
        return google_id_token.verify_oauth2_token(
            credential, google_auth_requests.Request(), GOOGLE_CLIENT_ID
        )

    try:
        claims = await asyncio.to_thread(_do_verify)
    except ValueError as exc:
        logging.info("Google credential verification failed: %s", exc)
        raise HTTPException(status_code=401, detail="Invalid Google credential") from exc

    if not claims.get("email_verified", False):
        raise HTTPException(status_code=401, detail="Google email is not verified")
    return claims


async def get_current_user(request: Request) -> dict:
    """Resolve the user from cookie session_token (preferred) or Bearer token."""
    token = request.cookies.get("session_token")
    if not token:
        auth_header = request.headers.get("authorization", "")
        if auth_header.lower().startswith("bearer "):
            token = auth_header.split(" ", 1)[1].strip()
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    session = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session:
        raise HTTPException(status_code=401, detail="Invalid session")

    expires_at = session.get("expires_at")
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if isinstance(expires_at, datetime):
        if expires_at.tzinfo is None:
            expires_at = expires_at.replace(tzinfo=timezone.utc)
        if expires_at < datetime.now(timezone.utc):
            await db.user_sessions.delete_one({"session_token": token})
            raise HTTPException(status_code=401, detail="Session expired")

    user = await db.users.find_one({"user_id": session["user_id"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user


async def require_admin(user: dict = Depends(get_current_user)) -> dict:
    if not _is_admin_email(user.get("email")):
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


# ---------- Models ----------
class ContactMessageIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(None, max_length=200)
    message: str = Field(..., min_length=1, max_length=4000)


class ContactMessageOut(BaseModel):
    id: str
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    received_at: str


class ContactSubmitResponse(BaseModel):
    id: str
    received_at: str
    ok: bool = True


class NewsItemIn(BaseModel):
    date: str = Field(..., min_length=1, max_length=40)
    text: str = Field(..., min_length=1, max_length=400)


class NewsItemOut(BaseModel):
    id: str
    date: str
    text: str
    created_at: str


class ResearchLink(BaseModel):
    label: str = Field(..., min_length=1, max_length=40)
    url: str = Field(..., min_length=1, max_length=600)


class ResearchItemIn(BaseModel):
    title: str = Field(..., min_length=1, max_length=300)
    role: Optional[str] = Field(None, max_length=120)
    advisor: Optional[str] = Field(None, max_length=200)
    institution: Optional[str] = Field(None, max_length=200)
    period: Optional[str] = Field(None, max_length=80)
    summary: str = Field(..., min_length=1, max_length=4000)
    tags: List[str] = Field(default_factory=list)
    links: List[ResearchLink] = Field(default_factory=list)


class ResearchItemPatch(BaseModel):
    title: Optional[str] = None
    role: Optional[str] = None
    advisor: Optional[str] = None
    institution: Optional[str] = None
    period: Optional[str] = None
    summary: Optional[str] = None
    tags: Optional[List[str]] = None
    links: Optional[List[ResearchLink]] = None


class ResearchItemOut(BaseModel):
    id: str
    title: str
    role: Optional[str] = None
    advisor: Optional[str] = None
    institution: Optional[str] = None
    period: Optional[str] = None
    summary: str
    tags: List[str] = []
    links: List[ResearchLink] = []
    order: int = 0
    created_at: str
    updated_at: Optional[str] = None


class GoogleAuthIn(BaseModel):
    credential: str = Field(..., min_length=4)


class UserOut(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    is_admin: bool


# Fallback news (mirrors the mock.js seed; used if collection is empty)
SEED_NEWS = [
    {"date": "Sep 2024", "text": "Beginning my PhD with Prof. Dmitri Efetov at LMU Munich."},
    {
        "date": "Feb 2024",
        "text": "Co-authored paper accepted in ACS Nano Letters — superconducting cavity sensing of 2D bandgaps.",
    },
    {"date": "Apr 2023", "text": "Review article published in RSC Nanoscale on MXene electrodes & ML."},
    {
        "date": "2023",
        "text": "Joined the Nanoelectronics Group at TIFR Mumbai for MS thesis with Prof. Mandar M. Deshmukh.",
    },
]


SEED_RESEARCH = [
    {
        "id": "seed-r1",
        "title": "Superconducting Coplanar Waveguide Resonator-assisted Microwave Probing of 2D Materials",
        "role": "Master\u2019s Thesis",
        "advisor": "Prof. Mandar M. Deshmukh",
        "institution": "TIFR, Mumbai",
        "period": "2023 \u2014 2024",
        "summary": (
            "Capacitively coupled van der Waals heterostructures (bilayer graphene, twisted "
            "double bilayer & trilayer graphene) to a 1\u201310 GHz transmission-line resonator "
            "(Q \u2248 500) to extract capacitance and density of states without optical contact. "
            "A portion of this work appeared in ACS Nano Letters."
        ),
        "tags": ["Superconducting resonators", "Twisted graphene", "RF transport"],
        "links": [
            {"label": "Paper", "url": "https://pubs.acs.org/doi/full/10.1021/acs.nanolett.3c04990"},
            {"label": "Group", "url": "https://www.tifr.res.in/~nano/"},
        ],
    },
    {
        "id": "seed-r2",
        "title": "Numerical Simulation of DNA Detection using Graphene FETs",
        "role": "Independent Project",
        "advisor": "Dr. Achanta Venugopal",
        "institution": "TIFR, Mumbai",
        "period": "2022",
        "summary": (
            "Monte-Carlo + numerical models for the electrostatic potential and I-V "
            "characteristics of a graphene FET in the presence of charged biomolecules \u2014 "
            "mapping the sensitivity of GFETs as DNA biosensors."
        ),
        "tags": ["GFET", "Biosensing", "Numerical methods"],
        "links": [{"label": "Code", "url": "https://github.com/soumyajits2000/GFET-DNA_Detection"}],
    },
    {
        "id": "seed-r3",
        "title": "Dielectric environment in graphene via Deep Learning of Raman Spectra",
        "role": "Research Project",
        "advisor": "Prof. Radha Krishna & Dr. Gopi Krishna Guntupalli",
        "institution": "IISER Berhampur",
        "period": "2022",
        "summary": (
            "Designed a CNN classifier on augmented Raman spectra (additive noise, peak shifting) "
            "to infer charge density and dielectric environment of graphene with 99% test accuracy."
        ),
        "tags": ["Raman", "CNN", "Graphene"],
        "links": [{"label": "Code", "url": "https://github.com/soumyajits2000/graphene_env_properties"}],
    },
    {
        "id": "seed-r4",
        "title": "Predicting Critical Temperature of Superconductors with ML",
        "role": "Course Project",
        "advisor": "Prof. Radha Krishna & Dr. Gopi Krishna Guntupalli",
        "institution": "IISER Berhampur",
        "period": "2021",
        "summary": (
            "Feature engineering on the SuperCon database and a regression pipeline that predicts "
            "critical temperature from room-temperature properties (98.8% accuracy)."
        ),
        "tags": ["Machine Learning", "Superconductivity"],
        "links": [{"label": "Code", "url": "https://github.com/soumyajits2000/superconductors_prediction_ML"}],
    },
    {
        "id": "seed-r5",
        "title": "Wi-Fi Indoor Localisation via Quantum Machine Learning",
        "role": "Visiting Researcher",
        "advisor": "Dr. Ahmed Farouk",
        "institution": "Wilfrid Laurier University, Canada",
        "period": "2021",
        "summary": (
            "A Qiskit-based quantum simulation of a CML algorithm for localising users inside "
            "large structures using ambient Wi-Fi access points \u2014 with applications to "
            "post-disaster reconnaissance."
        ),
        "tags": ["Qiskit", "QML", "Localisation"],
        "links": [],
    },
    {
        "id": "seed-r6",
        "title": "Quantum Simulation of Graphene (VQE)",
        "role": "Summer Research",
        "advisor": "Prof. Prashanta Kumar Panigrahi",
        "institution": "IISER Kolkata",
        "period": "2021",
        "summary": (
            "Variational Quantum Eigensolver with Qiskit Nature to estimate ground-state and "
            "low-lying excited-state energies of small graphene fragments."
        ),
        "tags": ["VQE", "Quantum Chemistry"],
        "links": [],
    },
    {
        "id": "seed-r7",
        "title": "Fabrication of Microscale Metallic Contacts on Exfoliated Graphene",
        "role": "Internship",
        "advisor": "Dr. Satyaprakash Sahoo",
        "institution": "Institute of Physics, Bhubaneswar",
        "period": "2020",
        "summary": (
            "Mechanically exfoliated graphene flakes contacted with Au, Ag, Al via photolithography. "
            "Optimised photoresist (ma-P 1205) thickness and lift-off chemistry."
        ),
        "tags": ["Photolithography", "Exfoliation"],
        "links": [],
    },
]


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Soumyajit Samal — Portfolio API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


# ----- Auth -----
@api_router.post("/auth/google", response_model=UserOut)
async def auth_google(payload: GoogleAuthIn, response: Response):
    """Verify a Google Identity Services ID token and start a 7-day session cookie."""
    claims = await _verify_google_credential(payload.credential)
    email = (claims.get("email") or "").lower()
    name = claims.get("name") or email
    picture = claims.get("picture")
    if not email:
        raise HTTPException(status_code=401, detail="Google account has no email")

    existing = await db.users.find_one({"email": email}, {"_id": 0})
    now = datetime.now(timezone.utc)
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"email": email},
            {"$set": {"name": name, "picture": picture, "last_login": now.isoformat()}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one(
            {
                "user_id": user_id,
                "email": email,
                "name": name,
                "picture": picture,
                "created_at": now.isoformat(),
                "last_login": now.isoformat(),
            }
        )

    # Our own opaque session token — independent of Google's ID token, which
    # is single-use and expires in ~1 hour.
    session_token = secrets.token_urlsafe(32)
    expires_at = now + timedelta(days=SESSION_TTL_DAYS)
    await db.user_sessions.insert_one(
        {
            "session_token": session_token,
            "user_id": user_id,
            "created_at": now,
            "expires_at": expires_at,
        }
    )

    _set_session_cookie(response, session_token)

    return UserOut(
        user_id=user_id,
        email=email,
        name=name,
        picture=picture,
        is_admin=_is_admin_email(email),
    )


@api_router.get("/auth/me", response_model=UserOut)
async def auth_me(user: dict = Depends(get_current_user)):
    return UserOut(
        user_id=user["user_id"],
        email=user["email"],
        name=user.get("name") or user["email"],
        picture=user.get("picture"),
        is_admin=_is_admin_email(user["email"]),
    )


@api_router.post("/auth/logout")
async def auth_logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if not token:
        auth_header = request.headers.get("authorization", "")
        if auth_header.lower().startswith("bearer "):
            token = auth_header.split(" ", 1)[1].strip()
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie(
        "session_token",
        path="/",
        samesite="none" if IS_PRODUCTION else "lax",
        secure=IS_PRODUCTION,
    )
    return {"ok": True}


# ----- Contact -----
@api_router.post("/contact", response_model=ContactSubmitResponse)
async def submit_contact(payload: ContactMessageIn):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": payload.email.lower(),
        "subject": (payload.subject or "").strip() or None,
        "message": payload.message.strip(),
        "received_at": _now_iso(),
    }
    try:
        await db.contact_messages.insert_one(doc)
    except Exception as exc:  # pragma: no cover
        logging.exception("Failed to store contact message")
        raise HTTPException(status_code=500, detail="Could not store message") from exc
    return ContactSubmitResponse(id=doc["id"], received_at=doc["received_at"])


@api_router.get("/contact", response_model=List[ContactMessageOut])
async def list_contact_messages(limit: int = 50, _: dict = Depends(require_admin)):
    limit = max(1, min(limit, 200))
    cursor = db.contact_messages.find({}, {"_id": 0}).sort("received_at", -1).limit(limit)
    return [ContactMessageOut(**doc) async for doc in cursor]


# ----- News -----
@api_router.get("/news", response_model=List[NewsItemOut])
async def list_news():
    cursor = db.news.find({}, {"_id": 0}).sort("created_at", -1).limit(100)
    items = [doc async for doc in cursor]
    if not items:
        # return seeded fallback (do not write — keeps DB clean)
        now = _now_iso()
        return [
            NewsItemOut(id=f"seed-{i}", date=n["date"], text=n["text"], created_at=now)
            for i, n in enumerate(SEED_NEWS)
        ]
    return [NewsItemOut(**doc) for doc in items]


@api_router.post("/news", response_model=NewsItemOut, status_code=status.HTTP_201_CREATED)
async def create_news(payload: NewsItemIn, _: dict = Depends(require_admin)):
    doc = {
        "id": str(uuid.uuid4()),
        "date": payload.date.strip(),
        "text": payload.text.strip(),
        "created_at": _now_iso(),
    }
    await db.news.insert_one(doc)
    return NewsItemOut(**doc)


@api_router.delete("/news/{news_id}")
async def delete_news(news_id: str, _: dict = Depends(require_admin)):
    res = await db.news.delete_one({"id": news_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News item not found")
    return {"ok": True, "deleted": news_id}


# ----- Research Experience -----
def _research_doc_to_out(doc: dict) -> ResearchItemOut:
    # Pydantic will coerce links into ResearchLink list
    return ResearchItemOut(**{k: v for k, v in doc.items() if k != "_id"})


@api_router.get("/research", response_model=List[ResearchItemOut])
async def list_research():
    cursor = (
        db.research.find({}, {"_id": 0})
        .sort([("order", 1), ("created_at", 1)])
        .limit(200)
    )
    items = [doc async for doc in cursor]
    if not items:
        now = _now_iso()
        return [
            ResearchItemOut(**{**seed, "order": i, "created_at": now})
            for i, seed in enumerate(SEED_RESEARCH)
        ]
    return [_research_doc_to_out(d) for d in items]


@api_router.get("/research/{item_id}", response_model=ResearchItemOut)
async def get_research(item_id: str):
    doc = await db.research.find_one({"id": item_id}, {"_id": 0})
    if not doc:
        # allow fetching seeded fallback by id too
        for i, s in enumerate(SEED_RESEARCH):
            if s["id"] == item_id:
                return ResearchItemOut(**{**s, "order": i, "created_at": _now_iso()})
        raise HTTPException(status_code=404, detail="Research item not found")
    return _research_doc_to_out(doc)


@api_router.post("/research", response_model=ResearchItemOut, status_code=status.HTTP_201_CREATED)
async def create_research(payload: ResearchItemIn, _: dict = Depends(require_admin)):
    now = _now_iso()
    # next order = current max + 1 (or 0 if empty)
    last = await db.research.find_one({}, sort=[("order", -1)])
    next_order = (last["order"] + 1) if last and "order" in last else 0
    doc = {
        "id": str(uuid.uuid4()),
        "title": payload.title.strip(),
        "role": (payload.role or "").strip() or None,
        "advisor": (payload.advisor or "").strip() or None,
        "institution": (payload.institution or "").strip() or None,
        "period": (payload.period or "").strip() or None,
        "summary": payload.summary.strip(),
        "tags": [t.strip() for t in payload.tags if t and t.strip()],
        "links": [link.model_dump() for link in payload.links],
        "order": next_order,
        "created_at": now,
        "updated_at": None,
    }
    await db.research.insert_one(doc)
    return _research_doc_to_out(doc)


@api_router.patch("/research/{item_id}", response_model=ResearchItemOut)
async def update_research(item_id: str, patch: ResearchItemPatch, _: dict = Depends(require_admin)):
    update = {k: v for k, v in patch.model_dump(exclude_unset=True).items() if v is not None}
    if "links" in update:
        update["links"] = [
            link if isinstance(link, dict) else link.model_dump() for link in update["links"]
        ]
    if not update:
        raise HTTPException(status_code=400, detail="No fields provided to update")
    update["updated_at"] = _now_iso()

    res = await db.research.find_one_and_update(
        {"id": item_id},
        {"$set": update},
        return_document=True,
        projection={"_id": 0},
    )
    if not res:
        raise HTTPException(status_code=404, detail="Research item not found")
    return _research_doc_to_out(res)


@api_router.delete("/research/{item_id}")
async def delete_research(item_id: str, _: dict = Depends(require_admin)):
    res = await db.research.delete_one({"id": item_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Research item not found")
    return {"ok": True, "deleted": item_id}


# Mount router & middleware
app.include_router(api_router)

# Comma-separated list of allowed frontend origins, e.g.
# "https://yourdomain.com,https://www.yourdomain.com". Left unset, CORS falls
# back to allowing any origin — fine for local dev, not recommended once
# this is deployed with real admin sessions in play.
CORS_ORIGINS = [o.strip() for o in os.environ.get("CORS_ORIGINS", "").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=CORS_ORIGINS or [],
    allow_origin_regex=None if CORS_ORIGINS else ".*",
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
