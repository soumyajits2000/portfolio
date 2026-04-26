import React from "react";
import { teaching, service } from "../../data/mock";
import { SectionTitle } from "./About";

const Teaching = () => {
  return (
    <section className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle
        kicker="08 — Teaching"
        title="Teaching & mentoring."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5DFCE] border border-[#E5DFCE] mb-24">
        {teaching.map((t, i) => (
          <article
            key={i}
            className="bg-[#FBF9F4] flex flex-col group"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]">
              <img
                src={t.image}
                alt={t.course}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-[filter,transform] duration-700 ease-out"
              />
              <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.2em] uppercase text-[#FBF9F4] bg-[#1A1A1A]/70 px-2.5 py-1 backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")} / {String(teaching.length).padStart(2, "0")}
              </span>
            </div>
            <div className="p-7 md:p-8 flex-1 flex flex-col">
              <p className="font-serif italic text-[13px] text-[#7A2828] mb-2">
                {t.role}
              </p>
              <h3 className="font-serif text-[22px] leading-snug tracking-tight mb-3">
                {t.course}
              </h3>
              <p className="text-[14px] leading-relaxed text-[#3a3a3a] flex-1 text-pretty">
                {t.blurb}
              </p>
              <div className="mt-5 pt-4 border-t border-[#E5DFCE] flex items-center justify-between text-[12px] text-[#5a5a5a]">
                <span>{t.institution}</span>
                <span className="font-mono">{t.term}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mb-12">
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#7A2828] font-medium mb-3">
          Service & Leadership
        </p>
        <h2 className="font-serif text-[30px] md:text-[38px] leading-[1.1] tracking-tight">
          Communities I have helped build.
        </h2>
      </div>

      <div className="space-y-6">
        {service.map((s, i) => (
          <article
            key={i}
            className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="md:col-span-5 relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
              <img
                src={s.image}
                alt={s.org}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale-[30%] hover:grayscale-0 hover:scale-[1.02] transition-[filter,transform] duration-700 ease-out"
              />
            </div>
            <div className="md:col-span-7 md:px-2">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7A2828] mb-3">
                {s.period}
              </p>
              <h3 className="font-serif text-[26px] md:text-[30px] leading-tight tracking-tight mb-2 text-pretty">
                {s.org}
              </h3>
              <p className="font-serif italic text-[15px] text-[#3a3a3a] mb-4">
                {s.role}
              </p>
              <p className="text-[15px] leading-[1.75] text-[#2c2c2c] max-w-xl text-pretty">
                {s.blurb}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Teaching;
