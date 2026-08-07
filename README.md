# Soumyajit Samal — Research Portfolio

> An elegant, formal, minimalist research portfolio for an incoming PhD candidate
> (LMU Munich · Experimental Quantum Nanoelectronics).
>
> Built as a full-stack web application — React frontend, FastAPI backend,
> MongoDB database — designed to grow with you across your PhD and beyond.

---

## 0. New here? Start with this

You originally built this by chatting with **Emergent** (an AI app builder) —
you didn't hand-write this code, and that's completely fine. This copy of the
project has since been **detached**: it no longer depends on Emergent to run,
host, or authenticate you. It's now a plain React + FastAPI + MongoDB app you
own end-to-end and can deploy anywhere.

Here's the mental model:

- **This folder** is the whole app. Nothing about how it runs depends on
  Emergent anymore — you (or any host: Vercel, Render, a VPS, whatever) are
  in full control.
- Two things live outside this repo and you provide them yourself: a
  **MongoDB database** (§2, step 1) and a **Google OAuth Client ID** (§2,
  step 2) — that's what powers the private `/admin/research` login.
- Content edits (§4) don't need any of the above — they're just text-file
  edits or the admin panel once it's deployed.

If you only remember one thing: **most day-to-day edits are a text edit in
`frontend/src/data/mock.js`.** Deploying (§2) is a one-time setup; after
that, pushing a new commit is all it takes to update the live site.

---

## 1. What this site does

This is **your living portfolio**. It has:

| Section | What lives there |
|---|---|
| **Home (`/`)** | Hero, about, research interests, publications, research experience (with paper/code links), open-source projects, education timeline, talks/awards/skills, teaching & service, gallery, contact form |
| **Writing (`/blog`)** | Long-form notes & essays — paper-style reading view |
| **Admin (`/admin/research`)** | Private dashboard to add/edit/delete research entries (Google sign-in, restricted to your email) |

Everything is **already filled with your real content** sourced from
soumyajitsamal.in — you can ship it as is, or polish further.

---

## 2. Deploying it yourself

There are three moving pieces to stand up, in this order: a database, a
Google sign-in, then the two servers (backend, frontend). None of it needs
Emergent. Budget ~30–45 minutes the first time; every redeploy after that is
just a `git push`.

### Step 1 — MongoDB database
1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0** cluster.
3. Under **Database Access**, create a database user with a password.
4. Under **Network Access**, add `0.0.0.0/0` (allow from anywhere) — simplest
   for a small app; your backend host's IP isn't static, so this is the
   pragmatic choice here.
5. Click **Connect → Drivers**, copy the connection string. It looks like
   `mongodb+srv://<user>:<password>@<cluster>.mongodb.net`. This is your
   `MONGO_URL`.

### Step 2 — Google sign-in (for `/admin/research`)
1. Go to [console.cloud.google.com](https://console.cloud.google.com/), create
   a project (any name, e.g. "portfolio").
2. **APIs & Services → OAuth consent screen** — choose **External**, fill in
   an app name and your email, save.
3. **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
   - Application type: **Web application**
   - **Authorized JavaScript origins**: add your future site URL (e.g.
     `https://soumyajit.in`) and, for local testing, `http://localhost:3000`
   - No redirect URI is needed — this app uses Google's newer
     "Sign In With Google" button, not the old redirect flow.
4. Copy the **Client ID** (ends in `.apps.googleusercontent.com`). This one
   value goes into *both* `backend/.env` (`GOOGLE_CLIENT_ID`) and
   `frontend/.env` (`REACT_APP_GOOGLE_CLIENT_ID`).

### Step 3 — Backend (FastAPI)
Any Python host works (Render, Railway, Fly.io, a VPS). **Render** is a
reasonable free-tier default:
1. Push this repo to GitHub if you haven't already.
2. On [render.com](https://render.com), **New → Web Service**, connect the repo.
3. Root directory: `backend`. Build command: `pip install -r requirements.txt`.
   Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`.
4. Add environment variables (copy the shape from `backend/.env.example`):
   `MONGO_URL`, `DB_NAME`, `ADMIN_EMAILS`, `GOOGLE_CLIENT_ID`, `ENV=production`.
   Leave `CORS_ORIGINS` for after step 4, once you know the frontend's URL.
5. Deploy. Note the resulting URL, e.g. `https://your-app.onrender.com`.

> Free tiers on Render spin down when idle — the first request after a quiet
> period can take 30–50s to wake up. Fine for a portfolio; upgrade later if
> that bothers you.

### Step 4 — Frontend (React)
Any static host works (Vercel, Netlify, Cloudflare Pages). **Vercel**:
1. On [vercel.com](https://vercel.com), **New Project**, import the repo.
2. Root directory: `frontend`. Framework preset: Create React App. Build
   command: `yarn build`. Output directory: `build`.
3. Add environment variables: `REACT_APP_BACKEND_URL` (the Render URL from
   step 3, no trailing slash), `REACT_APP_GOOGLE_CLIENT_ID` (from step 2).
4. Deploy. You'll get a URL like `https://your-app.vercel.app`.
5. **Go back to Render** and set `CORS_ORIGINS` to this Vercel URL (and any
   custom domain you add later), comma-separated. Redeploy the backend.

### Custom domain (optional)
Point your domain's DNS at Vercel (for the site) per Vercel's domain
settings; Render can front the API on a subdomain like `api.yourdomain.com`
if you want a fully branded setup. Either way, remember to add the new
domain to both the Google OAuth **Authorized JavaScript origins** (Step 2)
and the backend's `CORS_ORIGINS`.

### 2b. Running it on your own computer (optional)
Useful for previewing a change before it's live, or editing with a local
editor. You'll need Node.js, Python 3.11+, and either a local MongoDB or the
same Atlas cluster from Step 1.

```bash
# Backend
cd backend
pip install -r requirements.txt
cp .env.example .env   # then fill in MONGO_URL, DB_NAME, ADMIN_EMAILS, GOOGLE_CLIENT_ID
# set ENV=development in .env — this relaxes the session cookie so admin
# login also works over plain http://localhost instead of only https
uvicorn server:app --reload --port 8000

# Frontend (in a second terminal)
cd frontend
yarn install
cp .env.example .env   # set REACT_APP_BACKEND_URL=http://localhost:8000, REACT_APP_GOOGLE_CLIENT_ID
yarn start
```

Make sure `http://localhost:3000` is in the Google OAuth client's Authorized
JavaScript origins (Step 2) or the sign-in button will fail locally.

---

## 3. How to test the deployed site

Once your frontend and backend URLs are both live, do this dry-run checklist:

### A. Public site (no login needed)
1. Open the URL → the cream/burgundy hero loads with "Probing the quantum life
   of two-dimensional materials."
2. Scroll through every section — Education timeline, Gallery, Publications,
   etc. Everything should load.
3. Click any header link (e.g. **Gallery**) → page smoothly scrolls.
4. Open **Writing** in the header → blog list loads. Click any post → opens the
   reading view.
5. **Try the contact form** — fill it out and click **Send Message**. You should
   see a green "Thank you. Your message has been received." toast.

### B. Admin login (only your whitelisted emails work)
1. Visit `https://your-site/admin/research`.
2. You should be **redirected** to `/admin/login`.
3. Click the **Sign in with Google** button (Google's own widget, rendered
   in-page — no redirect to another site).
4. Sign in with `soumyajits2000@gmail.com` (or `soumyajitsomu@gmail.com`).
5. You should land on the admin dashboard with your email visible at the top.
6. Try clicking **New entry** → fill the form → click **Create entry**. The new
   item should appear in the list.

If anything in **A** or **B** fails, scroll down to the *Troubleshooting*
section.

---

## 4. How to add or update content later

There are **two places** where the site's content lives:

### (a) Static text & images — `frontend/src/data/mock.js`
This is a single JavaScript file containing your bio, publications, talks,
awards, gallery photos, blog posts, etc. To change any of these:

1. Open `mock.js` in a code editor (VS Code, etc.).
2. Find the section you want to update (e.g. `publications`, `awards`, `talks`).
3. Edit the text between the `"` quotes.
4. Commit and push. Vercel (or whichever host you used) rebuilds
   automatically on every push to your main branch — check its dashboard for
   build status, then hard-refresh the live site.

> 💡 The data structure is straightforward — even with just HTML/CSS knowledge,
> you can edit `"My title"` → `"My new title"` safely. Just keep the quotes and
> commas intact.

### (b) Research experience — `/admin/research`
Use the admin panel (Google login) to add, edit, or delete research projects
**with multiple labelled links** (paper, code, slides, etc.). No coding, no
redeploy needed — it writes straight to MongoDB.

### (c) Adding a blog post
Open `mock.js` and find the `blogPosts` array. Copy one of the existing post
objects, paste it as a new entry, and edit:

```js
{
  slug: "url-friendly-name-of-post",      // shows up in the URL
  title: "The title of your post",
  excerpt: "A short one-paragraph summary shown on the blog index.",
  category: "Essay",                       // or "Lab Diary", "Methods", etc.
  date: "Jul 22, 2025",
  readingTime: "8 min read",
  cover: "https://images.unsplash.com/...",  // any public image URL
  body: [
    "First paragraph.",
    "Second paragraph.",
    "And so on…"
  ]
}
```

> If you'd rather have a real blog editor (instead of editing JS), adding a
> backend `/api/posts` endpoint alongside the existing `/api/research` CRUD
> is a small, well-scoped addition — mirror `ResearchItemIn`/`ResearchItemOut`
> in `backend/server.py`.

---

## 5. The technology, in one paragraph

The site is built with **React** (the front you see in the browser, using
Create React App + CRACO), **FastAPI** (a small Python service that handles
forms, login, and the research database), and **MongoDB** (where research
entries, news items, and contact messages are saved). Authentication is
**your own Google OAuth client**, verified server-side, restricted to your
whitelisted emails via a signed session cookie. Frontend and backend are two
independent deployments that talk over HTTPS.

---

## 6. Folder map (in case you ever go exploring)

```
portfolio/
├── backend/
│   ├── server.py              # FastAPI app — all API endpoints live here
│   ├── .env.example           # Template for backend/.env — copy & fill in
│   └── requirements.txt       # Python packages
│
├── frontend/
│   ├── src/
│   │   ├── App.js             # Routes (/, /blog, /admin/research, …)
│   │   ├── data/mock.js       # ←★ Most static content lives here ★
│   │   ├── components/
│   │   │   ├── Portfolio.jsx  # Assembles the homepage sections
│   │   │   └── sections/      # Hero, About, Education, Gallery, Contact, …
│   │   ├── pages/             # Blog, BlogPost, AdminLogin, AdminResearch
│   │   └── lib/                # Axios client, helpers
│   ├── .env.example           # Template for frontend/.env — copy & fill in
│   └── package.json           # JS packages
│
├── contracts.md               # API contract notes between frontend & backend
└── README.md                  # ← this file
```

`backend/.env` and `frontend/.env` are git-ignored — they hold real secrets
and are never pushed to GitHub. Set the same values as environment variables
on whatever host you deploy to (Render, Vercel, etc.).

---

## 7. Troubleshooting

| Symptom | What to do |
|---|---|
| Backend shows "Application Error" / 502 after deploy | Check the host's build/runtime logs. Usually a missing environment variable (`MONGO_URL`, `DB_NAME`) or the free-tier instance still waking up. |
| Hero loads but Gallery images don't | The external image hosts (Unsplash/Pexels) might be slow. Hard-refresh (Ctrl/Cmd + Shift + R). |
| Contact form shows a red toast | Open the browser console (F12 → Console tab). A CORS or network error usually means `REACT_APP_BACKEND_URL` is wrong, or `CORS_ORIGINS` on the backend doesn't include your frontend's URL. |
| Google sign-in button doesn't render / errors in console | The current page's URL isn't in the OAuth client's **Authorized JavaScript origins** (§2, Step 2). Add it and retry — no redeploy needed, it's a Google Cloud Console setting. |
| Google login says "Access denied" | The Google account you used isn't in `ADMIN_EMAILS`. Sign out of Google and try with your whitelisted account. |
| Signed in, but immediately bounced back to `/admin/login` | The session cookie isn't sticking. Confirm the backend is served over HTTPS in production (`ENV=production`), and that `REACT_APP_BACKEND_URL` points at that same HTTPS backend. |
| You changed `mock.js` and nothing updated | Confirm the push triggered a build on your host's dashboard. Hard-refresh the browser once it's done. |
| Works in prod, admin login fails on `localhost` | Set `ENV=development` in `backend/.env` and make sure `http://localhost:3000` is an Authorized JavaScript origin in Google Cloud Console. |

---

## 8. What's still placeholder vs. real

A small disclosure — the following are **placeholder content** that you should
plan to update over the next year:

| Section | Current state | How to update |
|---|---|---|
| Profile photo (none) | Text-only hero | Add a photo and update the About section |
| CV (PDF download link) | Goes to `#` | Upload your real CV, link it in `mock.js` `profile.cvUrl` |
| News items | Hand-curated items | Use the `/api/news` admin endpoint, or edit `mock.js` `news` array |
| Talks & Awards | Inferred from your CV | Edit `mock.js` `talks` and `awards` arrays |
| Blog posts | Sample drafts in your voice | Replace with real essays as you write them |
| Gallery photos | Curated stock images | Replace with your own photos |

Everything **dynamic** (research entries via admin, contact form messages, news
fetched via API) is already real and persisted in MongoDB.

---

## 9. License & credit

This site is built specifically for **Soumyajit Samal**. The codebase is yours,
free of any third-party platform lock-in.
Typography is **Crimson Pro** (display serif) and **Inter** (text sans), both
open-source via Google Fonts.

If you ever want to share the codebase publicly (GitHub), just be sure to:
1. Never commit `backend/.env` or `frontend/.env` (both are already
   git-ignored — double check before pushing; `.env.example` files are fine
   to commit, they hold no secrets).
2. Replace the contact email in `mock.js` if needed.

---

## 10. Quick reference

- **Change any text/photo/link on the homepage or blog** → edit
  `frontend/src/data/mock.js`, commit, push.
- **Add/edit/remove a research entry** → `/admin/research`, no redeploy.
- **Add a new admin** → add their email to `ADMIN_EMAILS` on the backend host,
  redeploy the backend.
- **Site down / login broken** → §7 Troubleshooting.
- **Move to a different host later** → nothing in the code is tied to any one
  provider; repeat §2's four steps against the new host.

Welcome to your PhD. 🎓
