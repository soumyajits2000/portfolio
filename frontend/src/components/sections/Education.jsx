import React from "react";
import { education } from "../../data/mock";
import { SectionTitle } from "./About";

/**
 * Timeline accent colour — change ONE constant to recolour the whole timeline.
 *
 *   Burgundy           → "#7A2828"
 *   Deep ink (mono)    → "#1A1A1A"
 *   Forest green       → "#2F5D4F"
 *   Aged brass         → "#8B6F2D"
 *   Slate navy         → "#2D3F5C"   ← current
 */
const ACCENT = "#2D3F5C";

const EducationSection = () => {
  return (
    <section id="education" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="06 — Education" title="Academic record." />

      {/* Grid: [meta-left] [rail+marker] [content-right] */}
      <div className="relative">
        {/* Vertical rail (desktop only) — softly faded at both ends */}
        <div
          className="hidden md:block absolute top-3 bottom-3 w-px"
          style={{
            left: "calc(220px + 24px)", /* 220 left col + 24 to center within 48px middle col */
            background: `linear-gradient(to bottom, transparent 0%, ${ACCENT} 7%, ${ACCENT} 93%, transparent 100%)`,
            opacity: 0.55,
          }}
          aria-hidden="true"
        />

        <ul className="space-y-16 md:space-y-20">
          {education.map((e, idx) => {
            const isCurrent = idx === 0;
            return (
              <li
                key={idx}
                className="grid grid-cols-1 md:grid-cols-[220px_48px_1fr] gap-y-2 items-start"
              >
                {/* LEFT — period + location, right-aligned */}
                <div className="md:text-right md:pr-6 pl-6 md:pl-0 relative">
                  {/* Mobile bullet */}
                  <span
                    className="md:hidden absolute left-0 top-2 w-2.5 h-2.5 rounded-full"
                    style={{ background: isCurrent ? ACCENT : "transparent", border: `1.5px solid ${ACCENT}` }}
                    aria-hidden="true"
                  />
                  <p
                    className="font-serif text-[22px] md:text-[26px] leading-[1.05] tracking-tight whitespace-nowrap"
                    style={{ color: ACCENT }}
                  >
                    {e.period}
                  </p>
                  <p className="text-[12px] mt-2 text-[#5a5a5a] whitespace-nowrap">
                    {e.location}
                  </p>
                  {isCurrent && (
                    <span
                      className="inline-block mt-3 font-mono text-[10px] tracking-[0.22em] uppercase px-2 py-0.5"
                      style={{ color: ACCENT, border: `1px solid ${ACCENT}` }}
                    >
                      Current
                    </span>
                  )}
                </div>

                {/* MIDDLE — marker on the rail */}
                <div className="hidden md:flex justify-center pt-[10px] relative">
                  <span
                    className="block w-3.5 h-3.5 rounded-full ring-[5px] ring-[#FBF9F4]"
                    style={{
                      background: isCurrent ? ACCENT : "#FBF9F4",
                      border: `1.5px solid ${ACCENT}`,
                    }}
                    aria-hidden="true"
                  />
                  {/* Horizontal hairline tick from rail toward right column */}
                  <span
                    className="absolute top-[16px] h-px"
                    style={{
                      left: "calc(50% + 0.5rem)",
                      width: "1.25rem",
                      background: ACCENT,
                      opacity: 0.4,
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* RIGHT — institution + details */}
                <div className="md:pl-4 pl-6">
                  <h3 className="font-serif text-[22px] md:text-[24px] leading-snug tracking-tight text-[#1A1A1A] text-balance">
                    {e.institution}
                  </h3>
                  <p className="mt-1.5 font-serif italic text-[16px] text-[#3a3a3a]">
                    {e.degree}
                  </p>
                  {e.advisor && (
                    <p className="mt-3 text-[13px] text-[#5a5a5a]">
                      Advisor:{" "}
                      <span className="text-[#1A1A1A]">{e.advisor}</span>
                    </p>
                  )}
                  {e.note && (
                    <p className="mt-3 text-[14px] leading-relaxed text-[#2c2c2c] max-w-2xl text-pretty">
                      {e.note}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default EducationSection;
