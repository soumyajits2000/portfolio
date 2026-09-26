"""Fetch per-paper citation counts from a Google Scholar profile into citations.json.

Run daily by .github/workflows/citations.yml. Uses only the standard library.
If Scholar can't be reached or returns nothing parseable (e.g. a CAPTCHA page),
the script exits without touching citations.json, so the site keeps the last good counts.
"""

import html
import json
import re
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

SCHOLAR_USER = "2VZYvJ0AAAAJ"
PROFILE_URL = f"https://scholar.google.com/citations?user={SCHOLAR_USER}&hl=en&cstart=0&pagesize=100"
OUT = Path(__file__).resolve().parent.parent / "citations.json"

ROW = re.compile(r'<tr class="gsc_a_tr">(.*?)</tr>', re.S)
TITLE = re.compile(r'class="gsc_a_at"[^>]*>(.*?)</a>', re.S)
CITES = re.compile(r'<td class="gsc_a_c">\s*<a href="([^"]*)"[^>]*>(\d*)</a>', re.S)


def fetch(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
            "(KHTML, like Gecko) Chrome/128.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        },
    )
    with urllib.request.urlopen(req, timeout=30) as res:
        return res.read().decode("utf-8", "replace")


def parse(page: str) -> list[dict]:
    papers = []
    for row in ROW.findall(page):
        title = TITLE.search(row)
        if not title:
            continue
        cites = CITES.search(row)
        count = int(cites.group(2)) if cites and cites.group(2) else 0
        link = html.unescape(cites.group(1)) if cites and cites.group(2) else None
        papers.append({
            "title": html.unescape(re.sub(r"<[^>]+>", "", title.group(1))).strip(),
            "cited_by": count,
            "link": link,
        })
    return papers


def main() -> int:
    try:
        papers = parse(fetch(PROFILE_URL))
    except Exception as exc:  # network error, HTTP 429, etc.
        print(f"Could not fetch Scholar profile: {exc}. Keeping existing citations.json.")
        return 0
    if not papers:
        print("No papers parsed (blocked or layout changed). Keeping existing citations.json.")
        return 0

    old = json.loads(OUT.read_text("utf-8")) if OUT.exists() else {}
    if old.get("papers") == papers:
        print("Counts unchanged.")
        return 0

    OUT.write_text(json.dumps({
        "source": f"https://scholar.google.com/citations?user={SCHOLAR_USER}",
        "updated": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "papers": papers,
    }, indent=2, ensure_ascii=False) + "\n", "utf-8")
    for p in papers:
        print(f"{p['cited_by']:>4}  {p['title']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
