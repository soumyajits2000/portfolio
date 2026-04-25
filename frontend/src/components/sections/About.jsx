import React from "react";
import { profile } from "../../data/mock";

const SectionTitle = ({ kicker, title }) => (
  <div className="mb-10 md:mb-14">
    <p className="text-[11px] tracking-[0.22em] uppercase text-[#7A2828] font-medium mb-3">
      {kicker}
    </p>
    <h2 className="font-serif text-[34px] md:text-[44px] leading-[1.1] tracking-tight">
      {title}
    </h2>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="01 — About" title="A short biography." />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="font-serif text-[19px] md:text-[20px] leading-[1.7] text-[#2c2c2c] space-y-5 whitespace-pre-line text-pretty">
            {profile.longBio}
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <div className="border-l border-[#D9D4C7] pl-6 space-y-5 text-sm">
            <Field label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <Field label="Affiliation" value="LMU Munich · Faculty of Physics" />
            <Field label="Group" value="Efetov Lab — Quantum Materials" />
            <Field label="ORCID" value={profile.orcid} href={`https://orcid.org/${profile.orcid}`} mono />
            <Field label="GitHub" value="@soumyajits2000" href={profile.github} />
          </div>
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, value, href, mono }) => (
  <div>
    <p className="text-[10px] tracking-[0.22em] uppercase text-[#5a5a5a] mb-1">{label}</p>
    {href ? (
      <a href={href} className={`link-underline text-[#1A1A1A] ${mono ? "font-mono text-[13px]" : ""}`}>
        {value}
      </a>
    ) : (
      <p className={`text-[#1A1A1A] ${mono ? "font-mono text-[13px]" : ""}`}>{value}</p>
    )}
  </div>
);

export default About;
export { SectionTitle };
