# Soumyajit Samal — Research Portfolio

> An elegant, formal, minimalist research portfolio for an incoming PhD candidate
> (LMU Munich · Experimental Quantum Nanoelectronics).
>
> Built as a full-stack web application — React frontend, FastAPI backend,
> MongoDB database — designed to grow with you across your PhD and beyond.

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

## 2. The fastest way to deploy

You built this on **Emergent**, which means deployment is essentially **one click**.

### Step-by-step (≈ 2 minutes)

1. In the Emergent chat interface, look for the **Deploy** button at the top
   right of the screen.
2. Click **Deploy**. You may be asked to choose:
   - An **app name** (e.g. `soumyajit-samal-portfolio`) — this becomes your URL
   - A region (pick the one closest to your audience — for an Indian or
     European audience, "Asia / Europe" works well)
3. Wait ~3–5 minutes. Emergent builds and deploys the frontend, backend, and a
   managed MongoDB database for you automatically.
4. You'll get a URL like:
   ```
   https://soumyajit-samal-portfolio.emergent.host
   ```
   That's your live site.

### What's automatic
- ✅ MongoDB database is provisioned and connected
- ✅ Environment variables (`MONGO_URL`, `REACT_APP_BACKEND_URL`) are wired up
- ✅ HTTPS / SSL certificate is issued
- ✅ Frontend + backend are both served behind the same domain

### What you should set yourself before deploying
Open `/app/backend/.env` and confirm:
```
ADMIN_EMAILS="soumyajits2000@gmail.com,soumyajitsomu@gmail.com"
```
This is the **allowlist** of who can log into `/admin/research`. Add or remove
emails as needed (comma-separated, no spaces).

---

## 3. How to test the deployed site

Once you have your `https://your-app.emergent.host` URL, do this dry-run
checklist:

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
1. Visit `https://your-app.emergent.host/admin/research`.
2. You should be **redirected** to `/admin/login`.
3. Click **Sign in with Google** → Google OAuth opens.
4. Sign in with `soumyajits2000@gmail.com` (or `soumyajitsomu@gmail.com`).
5. You should land on the admin dashboard with your email visible at the top.
6. Try clicking **New entry** → fill the form → click **Create entry**. The new
   item should appear in the list.

If anything in **A** or **B** fails, scroll down to the *Troubleshooting*
section.

---

## 4. How to add or update content later

There are **three places** where the site's content lives:

### (a) Static text & images — `/app/frontend/src/data/mock.js`
This is a single JavaScript file containing your bio, publications, talks,
awards, gallery photos, blog posts, etc. To change any of these:

1. Open `mock.js` in the Emergent code editor (or your preferred editor).
2. Find the section you want to update (e.g. `publications`, `awards`, `talks`).
3. Edit the text between the `"` quotes.
4. Save the file. The site will auto-rebuild within ~10 seconds. Refresh.

> 💡 The data structure is straightforward — even with just HTML/CSS knowledge,
> you can edit `"My title"` → `"My new title"` safely. Just keep the quotes and
> commas intact.

### (b) Research experience — `/admin/research`
Use the admin panel (Google login) to add, edit, or delete research projects
**with multiple labelled links** (paper, code, slides, etc.). No coding needed.

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

> If you'd rather have a real blog editor (instead of editing JS), let your
> developer know — adding a backend `/api/posts` endpoint takes ~30 minutes.

---

## 5. The technology, in one paragraph

The site is built with **React** (the front you see in the browser), **FastAPI**
(a small Python service that handles forms, login, and the research database),
and **MongoDB** (where research entries, news items, and contact messages are
saved). Authentication uses **Emergent's Google OAuth**, restricted to your
whitelisted emails. Everything is hosted on **Emergent's cloud** behind one
secure URL.

---

## 6. Folder map (in case you ever go exploring)

```
/app
├── backend/
│   ├── server.py              # FastAPI app — all API endpoints live here
│   ├── .env                   # Environment vars (MONGO_URL, ADMIN_EMAILS …)
│   └── requirements.txt       # Python packages
│
├── frontend/
│   ├── src/
│   │   ├── App.js             # Routes (/, /blog, /admin/research, …)
│   │   ├── data/mock.js       # ←★ Most static content lives here ★
│   │   ├── components/
│   │   │   └── sections/      # Hero, About, Education, Gallery, …
│   │   ├── pages/             # Blog, BlogPost, AdminLogin, AdminResearch
│   │   └── lib/api.js         # Axios client
│   ├── .env                   # REACT_APP_BACKEND_URL
│   └── package.json           # JS packages
│
└── README.md                  # ← this file
```

---

## 7. Troubleshooting

| Symptom | What to do |
|---|---|
| Site shows "Application Error" after deploy | Wait 1–2 more minutes. Emergent sometimes takes time on the first boot. Refresh. |
| Hero loads but Gallery images don't | The external image hosts (Unsplash/Pexels) might be slow. Hard-refresh (Ctrl/Cmd + Shift + R). |
| Contact form shows a red toast | Open the browser console (F12 → Console tab) and look for an error. Most likely the backend hasn't finished booting — try again in 30 seconds. |
| Google login says "Access denied" | The Google account you used isn't in `ADMIN_EMAILS`. Sign out of Google and try with your whitelisted account. |
| You changed `mock.js` and nothing updated | Hard-refresh the browser. If still nothing, the build may have errored — check the deployment logs from Emergent. |
| Admin login keeps looping | Clear cookies for your `*.emergent.host` domain and sign in again. |

For anything else, paste the issue + a screenshot back into Emergent chat and
the agent will help.

---

## 8. What's still placeholder vs. real

A small disclosure — the following are **placeholder content** that you should
plan to update over the next year:

| Section | Current state | How to update |
|---|---|---|
| Profile photo (none) | Text-only hero | Add a photo and update the About section |
| CV (PDF download link) | Goes to `#` | Upload your real CV, link it in `mock.js` `profile.cvUrl` |
| News items | 4 hand-curated items | Use the planned `/api/news` admin endpoint, or edit `mock.js` `news` array |
| Talks & Awards | Inferred from your CV | Edit `mock.js` `talks` and `awards` arrays |
| Blog posts | 4 sample drafts in your voice | Replace with real essays as you write them |
| Gallery photos | Curated stock images | Replace with your own photos |

Everything **dynamic** (research entries via admin, contact form messages, news
fetched via API) is already real and persisted in MongoDB.

---

## 9. License & credit

This site is built specifically for **Soumyajit Samal**. The codebase is yours.
Typography is **Crimson Pro** (display serif) and **Inter** (text sans), both
open-source via Google Fonts.

If you ever want to share the codebase publicly (GitHub), just be sure to:
1. Empty `backend/.env` (remove `ADMIN_EMAILS`)
2. Replace the contact email in `mock.js` if needed.

---

## 10. Need help?

You can always come back to Emergent chat and ask the agent:

- *"Add a photo to the about section"*
- *"Make the 'Awards' section editable from the admin panel"*
- *"I want to change the burgundy colour to forest green everywhere"*
- *"Set up a custom domain like soumyajit.in"*

Welcome to your PhD. 🎓
