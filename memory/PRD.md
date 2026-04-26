# Soumyajit Samal — Research Portfolio (PRD)

## Goal
An elegant, formal, minimalist research portfolio for an incoming PhD candidate
(LMU Munich, experimental quantum nanoelectronics). Content sourced from
soumyajitsamal.in and enriched for an academic context.

## Public site (single page + blog + gallery)
- Sections: Hero, About, Research Interests, Publications, Research Experience
  (clickable titles + link chips, fetched from `/api/research`), Projects,
  Education timeline, Talks/Awards/Toolkit, Teaching (image cards), Service
  (alternating image rows), Gallery (12 images, masonry, filters, lightbox),
  Contact form (POST `/api/contact`).
- Blog at `/blog` and `/blog/:slug` with featured post + grid; serif drop-cap
  reading view. Static content in `mock.js`.

## Admin
- Route `/admin/research` (Emergent Google OAuth, allowlist-protected).
- Allowlist: soumyajits2000@gmail.com, soumyajitsomu@gmail.com (env var
  `ADMIN_EMAILS`).
- Manage research items: create/edit/delete with dynamic links editor.

## Backend (FastAPI + MongoDB)
- Public:    GET /api/research, GET /api/research/{id}, GET /api/news,
             POST /api/contact, GET /api/health.
- Admin:     POST/PATCH/DELETE /api/research, POST /api/news,
             DELETE /api/news/{id}, GET /api/contact.
- Auth:      POST /api/auth/session, GET /api/auth/me, POST /api/auth/logout.

## Design
- Paper aesthetic: warm cream `#FBF9F4` + deep ink `#1A1A1A` + burgundy `#7A2828`.
- Typography: Crimson Pro (serif), Inter (sans), JetBrains Mono.

## Status
Production-ready. All 24 backend tests + 7 UI sections passed automated testing.
