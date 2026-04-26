import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { researchProjects as fallbackProjects } from "../../data/mock";
import { api } from "../../lib/api";
import { SectionTitle } from "./About";

const Experience = () => {
  const [items, setItems] = useState(fallbackProjects);

  useEffect(() => {
    let cancelled = false;
    api
      .get("/research")
      .then((r) => {
        if (cancelled) return;
        if (Array.isArray(r.data) && r.data.length) setItems(r.data);
      })
      .catch(() => {
        // silent fall-back to mock
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="04 — Experience" title="Research experience." />

      <div className="space-y-10">
        {items.map((r, idx) => {
          const primaryUrl =
            Array.isArray(r.links) && r.links.length > 0 ? r.links[0].url : null;
          const TitleTag = primaryUrl ? "a" : "h3";
          const titleProps = primaryUrl
            ? {
                href: primaryUrl,
                target: "_blank",
                rel: "noreferrer",
                className:
                  "font-serif text-[22px] md:text-[24px] leading-snug tracking-tight text-balance group/title inline-flex items-start gap-2 hover:text-[#7A2828] transition-colors",
              }
            : {
                className:
                  "font-serif text-[22px] md:text-[24px] leading-snug tracking-tight text-balance",
              };

          return (
            <article
              key={r.id || idx}
              className="grid grid-cols-12 gap-4 md:gap-8 group"
            >
              <div className="col-span-12 md:col-span-3">
                <span className="font-mono text-[11px] text-[#7A2828]">
                  {String(idx + 1).padStart(2, "0")} · {r.period}
                </span>
                {r.role && (
                  <p className="font-serif italic text-[15px] mt-1 text-[#3a3a3a]">
                    {r.role}
                  </p>
                )}
                {r.institution && (
                  <p className="text-[12px] mt-1 text-[#5a5a5a]">{r.institution}</p>
                )}
                {r.advisor && (
                  <p className="text-[12px] mt-0.5 text-[#5a5a5a]">
                    with {r.advisor}
                  </p>
                )}
              </div>

              <div className="col-span-12 md:col-span-9 md:border-l border-[#E5DFCE] md:pl-8">
                <TitleTag {...titleProps}>
                  <span>{r.title}</span>
                  {primaryUrl && (
                    <ExternalLink
                      size={16}
                      className="mt-1 shrink-0 text-[#9a9a9a] group-hover/title:text-[#7A2828] transition-colors"
                    />
                  )}
                </TitleTag>

                <p className="mt-3 text-[15px] leading-[1.75] text-[#2c2c2c] text-pretty">
                  {r.summary}
                </p>

                {Array.isArray(r.tags) && r.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] tracking-wider uppercase font-mono text-[#5a5a5a] border border-[#D9D4C7] px-2.5 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {Array.isArray(r.links) && r.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {r.links.map((l, i) => (
                      <a
                        key={`${l.url}-${i}`}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[12px] font-medium tracking-wide text-[#1A1A1A] hover:text-[#7A2828] link-underline"
                      >
                        {l.label}
                        <ExternalLink size={12} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
