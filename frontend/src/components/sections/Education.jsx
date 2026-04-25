import React from "react";
import { education } from "../../data/mock";
import { SectionTitle } from "./About";

const EducationSection = () => {
  return (
    <section id="education" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="06 — Education" title="Academic record." />

      <div className="relative">
        {/* vertical timeline line — placed at exact column boundary */}
        <div className="hidden md:block absolute top-2 bottom-2 w-px bg-[#D9D4C7] left-[260px]" />
        <ul className="space-y-12">
          {education.map((e, idx) => (
            <li
              key={idx}
              className="relative grid grid-cols-1 md:grid-cols-[240px_20px_1fr] gap-y-2 md:gap-x-0 items-start"
            >
              {/* Mobile bullet */}
              <span className="md:hidden absolute left-0 top-2 w-2 h-2 rounded-full bg-[#7A2828]" />

              {/* Left column: dates + location, right-aligned, padded so it never touches the line */}
              <div className="md:text-right md:pr-8 pl-4 md:pl-0">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7A2828] whitespace-nowrap">
                  {e.period}
                </p>
                <p className="text-[12px] mt-1 text-[#5a5a5a] whitespace-nowrap">
                  {e.location}
                </p>
              </div>

              {/* Middle column: dot perfectly centered on the line */}
              <div className="hidden md:flex justify-center pt-1.5">
                <span className="block w-2.5 h-2.5 rounded-full bg-[#7A2828] ring-4 ring-[#FBF9F4]" />
              </div>

              {/* Right column: institution + details */}
              <div className="md:pl-8 pl-4">
                <h3 className="font-serif text-[22px] md:text-[24px] leading-snug tracking-tight">
                  {e.institution}
                </h3>
                <p className="mt-1 font-serif italic text-[16px] text-[#3a3a3a]">
                  {e.degree}
                </p>
                {e.advisor && (
                  <p className="mt-1 text-[13px] text-[#5a5a5a]">
                    Advisor: <span className="text-[#1A1A1A]">{e.advisor}</span>
                  </p>
                )}
                {e.note && (
                  <p className="mt-3 text-[14px] leading-relaxed text-[#2c2c2c] max-w-2xl">
                    {e.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EducationSection;
