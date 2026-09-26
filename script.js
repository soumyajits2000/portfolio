// Mobile navigation
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

// Highlight the nav link of the section in view
const links = [...nav.querySelectorAll("a")];
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

// Filters (design portfolio and gallery), scoped to their own section
document.querySelectorAll(".filters").forEach((bar) => {
  const section = bar.closest("section");
  const sub = section.querySelector(".gallery-sub");
  bar.querySelectorAll(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      bar.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
      const cat = btn.dataset.filter;
      section.querySelectorAll(".grid .tile").forEach((tile) => {
        tile.classList.toggle("hidden", cat !== "all" && tile.dataset.cat !== cat);
      });
      if (sub && btn.dataset.sub) sub.textContent = btn.dataset.sub;
    });
  });
});

// Lightbox for gallery and posters
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
const lbCap = lightbox.querySelector("figcaption");

function openLightbox(src, caption) {
  lbImg.src = src;
  lbImg.alt = caption || "";
  lbCap.textContent = caption || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.hidden = true;
  lbImg.src = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-lightbox]").forEach((el) => {
  el.addEventListener("click", () => {
    const caption = el.dataset.caption || el.querySelector("strong")?.textContent;
    openLightbox(el.dataset.lightbox, caption);
  });
});
lightbox.addEventListener("click", (e) => {
  if (e.target !== lbImg) closeLightbox();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
});

// Google Scholar citation counts, from citations.json (refreshed daily by a GitHub Action).
// Papers are matched by title. Not on Scholar / 0 citations -> greyed-out, unclickable pill.
// If citations.json can't be loaded -> no pills at all.
const normTitle = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

fetch("citations.json", { cache: "no-cache" })
  .then((res) => (res.ok ? res.json() : Promise.reject()))
  .then(({ papers, updated }) => {
    const byTitle = new Map(papers.map((p) => [normTitle(p.title), p]));
    document.querySelectorAll(".pub").forEach((pub) => {
      const line = pub.querySelector(".doi");
      const match = byTitle.get(normTitle(pub.querySelector("h3").textContent));
      const count = match ? match.cited_by : 0;

      const pill = document.createElement(count > 0 && match.link ? "a" : "span");
      pill.className = "cites";
      pill.textContent = `Cited by ${count}`;
      if (pill.tagName === "A") {
        pill.href = match.link;
        pill.target = "_blank";
        pill.rel = "noopener";
        pill.title = `Google Scholar, updated ${updated}`;
      } else {
        pill.classList.add("disabled");
        pill.setAttribute("aria-disabled", "true");
        pill.title = match ? "No citations yet" : "Not yet listed on Google Scholar";
      }
      line.append(pill);
    });
  })
  .catch(() => {});

// Copy email
const copyBtn = document.getElementById("copy-email");
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyBtn.dataset.email);
    copyBtn.textContent = "Copied";
  } catch {
    copyBtn.textContent = "Copy failed";
  }
  setTimeout(() => (copyBtn.textContent = "Copy"), 1800);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
