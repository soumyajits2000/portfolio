import React from "react";
import { education } from "../../data/mock";
import { SectionTitle } from "./About";

/**
 * Timeline accent colour — change ONE constant to recolour the whole timeline.
 *
 *   Burgundy (current site accent) → "#7A2828"
 *   Deep ink (monochrome)          → "#1A1A1A"
 *   Forest green (academic)        → "#2F5D4F"
 *   Aged brass (manuscript)        → "#8B6F2D"
 *   Slate navy (neutral)           → "#2D3F5C"
 */
const ACCENT = "#7A2828";

const EducationSection = () => {
  return (
    <section id="education" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="06 — Education" title="Academic record." />

      <div className="relative pl-10 md:pl-16">
        {/* Vertical timeline rail with a soft fade at the top & bottom */}
        <div
          className="absolute top-0 bottom-0 left-3 md:left-6 w-px"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, ${ACCENT} 7%, ${ACCENT} 93%, transparent 100%)`,
            opacity: 0.5,
          }}
          aria-hidden="true"
        />

        <ul className="space-y-16 md:space-y-20">
          {education.map((e, idx) => {
            const isCurrent = idx === 0;
            return (
              <li key={idx} className="relative">
                {/* Single marker centred on the rail */}
                <span
                  className="absolute top-[14px] w-3.5 h-3.5 rounded-full ring-[5px] ring-[#FBF9F4] -translate-x-1/2 left-[-28px] md:left-[-40px]"
                  style={{
                    background: isCurrent ? ACCENT : "#FBF9F4",
                    border: `1.5px solid ${ACCENT}`,
                  }}
                  aria-hidden="true"
                />
                {/* Horizontal hairline tick from rail toward content */}
                <span
                  className="absolute top-[20px] hidden md:block h-px"
                  style={{
                    left: "-32px",
                    width: "24px",
                    background: ACCENT,
                    opacity: 0.35,
                  }}
                  aria-hidden="true"
                />

                {/* Period — display number style */}
                <p
                  className="font-serif text-[28px] md:text-[34px] leading-none tracking-tight"
                  style={{ color: ACCENT }}
                >
                  {e.period}
                </p>

                {/* Institution */}
                <h3 className="font-serif text-[22px] md:text-[26px] leading-snug tracking-tight mt-3 text-[#1A1A1A] text-balance">
                  {e.institution}
                </h3>

                {/* Degree */}
                <p className="font-serif italic text-[16px] md:text-[17px] text-[#3a3a3a] mt-1.5">
                  {e.degree}
                </p>

                {/* Location */}
                <p className="text-[12px] tracking-wide text-[#5a5a5a] mt-1">
                  {e.location}
                </p>

                {/* Advisor */}
                {e.advisor && (
                  <p className="text-[13px] text-[#5a5a5a] mt-4">
                    Advisor:{" "}
                    <span className="text-[#1A1A1A]">{e.advisor}</span>
                  </p>
                )}

                {/* Note */}
                {e.note && (
                  <p className="mt-3 text-[14px] leading-relaxed text-[#2c2c2c] max-w-2xl text-pretty">
                    {e.note}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default EducationSection;
