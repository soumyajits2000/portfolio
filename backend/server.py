from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI(title="Soumyajit Samal — Research Portfolio API")
api_router = APIRouter(prefix="/api")


def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


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


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Soumyajit Samal — Portfolio API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


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
async def list_contact_messages(limit: int = 50):
    limit = max(1, min(limit, 200))
    cursor = db.contact_messages.find({}, {"_id": 0}).sort("received_at", -1).limit(limit)
    return [ContactMessageOut(**doc) async for doc in cursor]


# ----- News -----
@api_router.get("/news", response_model=List[NewsItemOut])
async def list_news():
    cursor = db.news.find({}, {"_id": 0}).sort("created_at", -1)
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
async def create_news(payload: NewsItemIn):
    doc = {
        "id": str(uuid.uuid4()),
        "date": payload.date.strip(),
        "text": payload.text.strip(),
        "created_at": _now_iso(),
    }
    await db.news.insert_one(doc)
    return NewsItemOut(**doc)


@api_router.delete("/news/{news_id}")
async def delete_news(news_id: str):
    res = await db.news.delete_one({"id": news_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News item not found")
    return {"ok": True, "deleted": news_id}


# Mount router & middleware
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
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
