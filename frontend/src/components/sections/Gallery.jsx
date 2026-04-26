import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { galleryImages, galleryCategories } from "../../data/mock";
import { SectionTitle } from "./About";

const aspectClass = (a) => {
  if (a === "tall") return "aspect-[3/4]";
  if (a === "wide") return "aspect-[4/3]";
  return "aspect-square";
};

const Gallery = () => {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(
    () =>
      active === "all"
        ? galleryImages
        : galleryImages.filter((g) => g.category === active),
    [active]
  );

  return (
    <section id="gallery" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle
        kicker="10 — Gallery"
        title="Moments from the field."
      />

      <p className="max-w-2xl text-[15px] leading-[1.75] text-[#3a3a3a] mb-10 -mt-6">
        A small archive of telescope nights, lab afternoons, conference weekends and outreach
        moments from the last few years.
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-10">
        {galleryCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`text-[11px] tracking-[0.18em] uppercase px-3.5 py-2 border transition-colors ${
              active === c.id
                ? "bg-[#1A1A1A] text-[#FBF9F4] border-[#1A1A1A]"
                : "border-[#D9D4C7] text-[#3a3a3a] hover:border-[#1A1A1A]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Masonry via CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {filtered.map((g) => (
          <button
            key={g.id}
            onClick={() => setLightbox(g)}
            className="group relative block w-full mb-4 break-inside-avoid overflow-hidden bg-[#1A1A1A] text-left"
          >
            <div className={`relative ${aspectClass(g.aspect)}`}>
              <img
                src={g.src}
                alt={g.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-[filter,transform] duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <p className="absolute bottom-0 left-0 right-0 p-4 text-[#FBF9F4] text-[13px] leading-snug font-serif italic translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                {g.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-[#0E0D0B]/92 backdrop-blur-sm flex items-center justify-center p-4 md:p-10 reveal"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 text-[#FBF9F4]/80 hover:text-[#FBF9F4] p-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(null);
            }}
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <figure
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-black">
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full max-h-[78vh] object-contain"
              />
            </div>
            <figcaption className="mt-4 text-center text-[#FBF9F4]/85 font-serif italic text-[15px]">
              {lightbox.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default Gallery;
