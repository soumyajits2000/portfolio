import React from "react";
import { education } from "../../data/mock";
import { SectionTitle } from "./About";

const ROMAN = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
  "xi",
  "xii",
];

const EducationSection = () => {
  return (
    <section id="education" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="06 — Education" title="Academic record." />

      <div className="relative">
        {/* Dashed vertical hairline — manuscript-style margin rule */}
        <div
          className="hidden md:block absolute top-3 bottom-3 left-[260px] border-l border-dashed border-[#C9C2AE]"
          aria-hidden="true"
        />
        <ul className="space-y-14">
          {education.map((e, idx) => (
            <li
              key={idx}
              className="relative grid grid-cols-1 md:grid-cols-[240px_20px_1fr] gap-y-2 md:gap-x-0 items-start"
            >
              {/* Mobile bullet */}
              <span className="md:hidden absolute left-0 top-2 font-serif italic text-[14px] text-[#7A2828]">
                {ROMAN[idx] || idx + 1}.
              </span>

              {/* Left column: dates + location, right-aligned */}
              <div className="md:text-right md:pr-10 pl-6 md:pl-0">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7A2828] whitespace-nowrap">
                  {e.period}
                </p>
                <p className="text-[12px] mt-1 text-[#5a5a5a] whitespace-nowrap">
                  {e.location}
                </p>
              </div>

              {/* Middle column: Roman numeral sitting ON the dashed line */}
              <div className="hidden md:flex justify-center pt-0">
                <span className="relative font-serif italic text-[18px] leading-none text-[#7A2828] bg-[#FBF9F4] px-1.5 py-1 select-none">
                  {ROMAN[idx] || idx + 1}.
                </span>
              </div>

              {/* Right column: institution + details */}
              <div className="md:pl-10 pl-6 relative">
                {/* Small horizontal tick connecting from the line to the title */}
                <span
                  className="hidden md:block absolute left-0 top-[14px] w-5 h-px bg-[#C9C2AE]"
                  aria-hidden="true"
                />
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
