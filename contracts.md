# API Contracts — Soumyajit Samal Research Portfolio

## Goal
Replace mocked data in `/app/frontend/src/data/mock.js` and `localStorage`-based contact form with a real FastAPI + MongoDB backend.

---

## What is mocked today?
- Entire content of `mock.js` (profile, news, education, publications, researchProjects, codeProjects, skills, talks, awards, teaching, service)
- Contact form submission stored in `localStorage` under key `contact_messages`

## Backend scope (MVP)
We will keep the static portfolio content in `mock.js` (it changes rarely, so no need for a CMS yet) **except** for two dynamic concerns:

1. **Contact-message inbox** — persist any visitor message in MongoDB.
2. **News / announcements** — let the owner add news items via a simple POST that the homepage reads via GET.

This keeps the surface small and meaningful for an MVP while removing the only true `localStorage` mock.

---

## Endpoints (all under `/api`)

### POST `/api/contact`
Submit a contact message.
- **Body**:
  ```json
  { "name": "string", "email": "string (email)", "subject": "string?", "message": "string" }
  ```
- **Response 200**:
  ```json
  { "id": "uuid", "received_at": "ISO-8601", "ok": true }
  ```
- **Errors**: 422 on validation; 500 on DB failure.
- **Mongo collection**: `contact_messages` — `{ id, name, email, subject, message, received_at }`.

### GET `/api/contact` *(admin convenience, unauthenticated for MVP)*
List recent messages — newest first, limit 50.
- **Response**: `[{ id, name, email, subject, message, received_at }, ...]`

### GET `/api/news`
Public list of news items — newest first.
- **Response**: `[{ id, date, text, created_at }, ...]`
- Falls back to seeded items if collection is empty (so the page never looks broken).

### POST `/api/news`
Create a news item.
- **Body**: `{ "date": "Sep 2024", "text": "…" }`
- **Response**: `{ id, date, text, created_at }`

### DELETE `/api/news/{id}`
Remove a news item.

### GET `/api/health`
Simple liveness probe — returns `{ "status": "ok" }`.

---

## Data Models (Pydantic)
- `ContactMessageIn { name, email, subject?, message }`
- `ContactMessageOut { id, name, email, subject?, message, received_at }`
- `NewsItemIn { date, text }`
- `NewsItemOut { id, date, text, created_at }`

UUIDs are used for `id` (string). Timestamps are stored as ISO strings.

---

## Frontend integration changes
- `Contact.jsx` — replace `localStorage.setItem` with `axios.post(`${API}/contact`, …)`. Keep optimistic UX & toast.
- `Hero.jsx` — fetch `/api/news` on mount. If empty / errored, fall back to mock news so layout never breaks.
- Add a tiny `lib/api.js` helper that exports `API` constant and an axios instance.

No changes to other sections — they continue to read from `mock.js`.

---

## Test plan (deep_testing_backend_v2)
1. POST a valid contact message → 200 + id returned + GET shows it.
2. POST invalid email → 422.
3. POST a news item → 200 + GET returns it ordered newest first.
4. DELETE the news item → subsequent GET no longer contains it.
5. GET `/api/news` on empty collection returns seeded fallback (length ≥ 1).
6. GET `/api/health` returns `{status: "ok"}`.
