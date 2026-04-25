import React from "react";
import { researchProjects } from "../../data/mock";
import { SectionTitle } from "./About";

const Experience = () => {
  return (
    <section id="experience" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="04 — Experience" title="Research experience." />

      <div className="space-y-10">
        {researchProjects.map((r, idx) => (
          <article
            key={r.id}
            className="grid grid-cols-12 gap-4 md:gap-8 group"
          >
            <div className="col-span-12 md:col-span-3">
              <span className="font-mono text-[11px] text-[#7A2828]">
                {String(idx + 1).padStart(2, "0")} · {r.period}
              </span>
              <p className="font-serif italic text-[15px] mt-1 text-[#3a3a3a]">
                {r.role}
              </p>
              <p className="text-[12px] mt-1 text-[#5a5a5a]">
                {r.institution}
              </p>
              {r.advisor && (
                <p className="text-[12px] mt-0.5 text-[#5a5a5a]">
                  with {r.advisor}
                </p>
              )}
            </div>

            <div className="col-span-12 md:col-span-9 md:border-l border-[#E5DFCE] md:pl-8">
              <h3 className="font-serif text-[22px] md:text-[24px] leading-snug tracking-tight text-balance">
                {r.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-[#2c2c2c] text-pretty">
                {r.summary}
              </p>
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
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
