import React from "react";
import { education } from "../../data/mock";
import { SectionTitle } from "./About";

const EducationSection = () => {
  return (
    <section id="education" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="06 — Education" title="Academic record." />

      <div className="relative">
        <div className="absolute left-0 md:left-[180px] top-2 bottom-2 w-px bg-[#D9D4C7]" />
        <ul className="space-y-12">
          {education.map((e, idx) => (
            <li key={idx} className="relative pl-8 md:pl-0 grid md:grid-cols-12 gap-4 md:gap-8">
              <div className="absolute left-[-4px] md:left-[176px] top-2 w-2.5 h-2.5 rounded-full bg-[#7A2828] ring-4 ring-[#FBF9F4]" />
              <div className="md:col-span-3 md:text-right md:pr-10">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7A2828]">
                  {e.period}
                </p>
                <p className="text-[12px] mt-1 text-[#5a5a5a]">{e.location}</p>
              </div>
              <div className="md:col-span-9 md:pl-8">
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
