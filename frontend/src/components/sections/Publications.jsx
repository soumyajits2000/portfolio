import React from "react";
import { ExternalLink } from "lucide-react";
import { publications, profile } from "../../data/mock";
import { SectionTitle } from "./About";

const boldName = (authors, name = "Soumyajit Samal") =>
  authors.map((a, i) => (
    <span key={i}>
      <span className={a === name ? "text-[#1A1A1A] font-medium" : "text-[#5a5a5a]"}>
        {a}
      </span>
      {i < authors.length - 1 ? <span className="text-[#9a9a9a]">, </span> : null}
    </span>
  ));

const Publications = () => {
  return (
    <section id="publications" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="03 — Publications" title="Selected publications." />

      <div className="flex items-center justify-between mb-8">
        <p className="text-sm text-[#5a5a5a] max-w-xl">
          A complete list is maintained on Google Scholar. Author marked in <span className="text-[#1A1A1A] font-medium">bold</span>.
        </p>
        <a
          href={profile.scholarUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 text-[12px] tracking-wide uppercase font-medium link-underline"
        >
          Google Scholar <ExternalLink size={13} />
        </a>
      </div>

      <ol className="space-y-10">
        {publications.map((p, idx) => (
          <li key={p.id} className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-2 md:col-span-1 pt-1">
              <span className="font-mono text-[12px] text-[#7A2828]">
                [{publications.length - idx}]
              </span>
            </div>
            <div className="col-span-10 md:col-span-11">
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a]">
                  {p.type} · {p.year}
                </span>
                <span className="font-serif italic text-[13px] text-[#7A2828]">
                  {p.venue}
                </span>
              </div>
              <h3 className="font-serif text-[20px] md:text-[22px] leading-snug tracking-tight mb-2 text-pretty">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noreferrer" className="link-underline">
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="text-[14px] leading-relaxed mb-2">
                {boldName(p.authors)}
              </p>
              <div className="flex items-center gap-5 text-[12px] text-[#5a5a5a]">
                {p.doi && <span className="font-mono">DOI: {p.doi}</span>}
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline inline-flex items-center gap-1"
                  >
                    Read paper <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Publications;
