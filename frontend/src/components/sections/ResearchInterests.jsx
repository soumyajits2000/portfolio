import React from "react";
import { researchInterests } from "../../data/mock";
import { SectionTitle } from "./About";

const ResearchInterests = () => {
  return (
    <section id="research" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="02 — Research" title="Themes I am drawn to." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5DFCE]">
        {researchInterests.map((r, idx) => (
          <div
            key={idx}
            className="bg-[#FBF9F4] p-7 md:p-9 group hover:bg-[#F5F1E6] transition-colors"
          >
            <div className="flex items-baseline gap-4 mb-4">
              <span className="font-mono text-[11px] text-[#7A2828]">
                / {String(idx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-[22px] md:text-[24px] leading-snug tracking-tight">
                {r.title}
              </h3>
            </div>
            <p className="text-[15px] leading-[1.7] text-[#3a3a3a] pl-9">
              {r.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResearchInterests;
