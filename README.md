# Soumyajit Samal — personal website

A plain HTML, CSS and JavaScript site with no build step, backend or dependencies.

```
index.html      all content
style.css       styles (light theme, with dark mode following the system setting)
script.js       mobile menu, active-section highlight, filters, lightbox, copy-email
assets/images/  photos, figures, design work (web-sized JPEGs)
assets/docs/    Jigyansa magazine and Infinitus brochure PDFs
```

## Preview locally

Open `index.html` in a browser. To serve it instead:

```
python -m http.server 8000
```

then visit http://localhost:8000.

## Deploy

Upload the folder to any static host. Examples:

- **GitHub Pages**: repo Settings → Pages → deploy from branch, folder `/ (root)`.
  For the custom domain, add `soumyajitsamal.in` there and point DNS at GitHub Pages.
- **Netlify / Cloudflare Pages / Vercel**: import the repo with no build command
  and the output directory set to the repo root.

## Editing content

All text is in `index.html`, and each section is marked with a comment
(`<!-- PUBLICATIONS -->`, `<!-- GALLERY -->` and so on). To add a
publication, gallery photo or project, copy a neighbouring block and edit it.
Put new images in `assets/images/`, ideally under ~1400 px wide.

## Citation counts

The "Cited by N" pills come from `citations.json`, which
`.github/workflows/citations.yml` refreshes daily from the Google Scholar
profile (`scripts/update_citations.py`). Papers are matched by title, so a
publication's title in `index.html` must match its Scholar title. Run it by
hand with `python scripts/update_citations.py`, or with "Run workflow" in the
repo's Actions tab.

Content was checked against the previous version of soumyajitsamal.in.
