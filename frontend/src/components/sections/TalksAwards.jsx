import React from "react";
import { talks, awards, skills } from "../../data/mock";
import { SectionTitle } from "./About";

const TalksAwards = () => {
  return (
    <section id="awards" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle
        kicker="07 — Talks, Awards & Skills"
        title="Recognitions, talks & toolkit."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Talks */}
        <div className="lg:col-span-5">
          <h3 className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium mb-6">
            Talks & Posters
          </h3>
          <ul className="space-y-6">
            {talks.map((t, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-mono text-[11px] text-[#7A2828] mt-1 whitespace-nowrap">
                  {t.date}
                </span>
                <div>
                  <p className="font-serif text-[17px] leading-snug">{t.title}</p>
                  <p className="text-[13px] text-[#5a5a5a] mt-1">
                    <span className="italic">{t.type}</span> · {t.venue}, {t.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Awards */}
        <div className="lg:col-span-3">
          <h3 className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium mb-6">
            Awards & Grants
          </h3>
          <ul className="space-y-5">
            {awards.map((a, i) => (
              <li key={i}>
                <p className="font-mono text-[11px] text-[#7A2828]">{a.year}</p>
                <p className="font-serif text-[16px] leading-snug mt-0.5">{a.title}</p>
                <p className="text-[12px] text-[#5a5a5a] mt-0.5">{a.org}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="lg:col-span-4">
          <h3 className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium mb-6">
            Toolkit
          </h3>
          <div className="space-y-6">
            {skills.map((s) => (
              <div key={s.group}>
                <p className="font-serif italic text-[14px] text-[#7A2828] mb-2">
                  {s.group}
                </p>
                <p className="text-[14px] leading-[1.75] text-[#2c2c2c]">
                  {s.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalksAwards;
