import React from "react";
import { teaching, service } from "../../data/mock";
import { SectionTitle } from "./About";

const Teaching = () => {
  return (
    <section className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle
        kicker="08 — Teaching & Service"
        title="Mentoring, teaching & community."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium mb-6">
            Teaching
          </h3>
          <ul className="space-y-6">
            {teaching.map((t, i) => (
              <li key={i} className="border-l border-[#D9D4C7] pl-5">
                <p className="font-serif text-[18px] leading-snug">{t.course}</p>
                <p className="font-serif italic text-[13px] text-[#7A2828] mt-1">
                  {t.role}
                </p>
                <p className="text-[13px] text-[#5a5a5a] mt-0.5">
                  {t.institution} · {t.term}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium mb-6">
            Service & Leadership
          </h3>
          <ul className="space-y-6">
            {service.map((s, i) => (
              <li key={i} className="border-l border-[#D9D4C7] pl-5">
                <p className="font-serif text-[18px] leading-snug">{s.org}</p>
                <p className="font-serif italic text-[13px] text-[#7A2828] mt-1">
                  {s.role}
                </p>
                <p className="text-[13px] text-[#5a5a5a] mt-0.5">{s.period}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Teaching;
