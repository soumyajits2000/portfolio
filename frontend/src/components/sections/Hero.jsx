import React from "react";
import { ArrowDownRight, MapPin } from "lucide-react";
import { profile, news } from "../../data/mock";

const Hero = () => {
  return (
    <section id="home" className="pt-16 md:pt-24 pb-20 md:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-8 reveal">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-10 bg-[#1A1A1A]" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium">
              Doctoral Researcher · Experimental Physics
            </span>
          </div>

          <h1 className="font-serif text-[44px] sm:text-[58px] md:text-[72px] lg:text-[84px] leading-[1.02] tracking-tight text-balance">
            Probing the quantum life of
            <span className="italic text-[#7A2828]"> two‑dimensional </span>
            materials.
          </h1>

          <p className="mt-8 text-[17px] md:text-[18px] leading-[1.7] text-[#2c2c2c] max-w-[640px] text-pretty">
            {profile.bio}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm">
            <a
              href="#research"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-[#FBF9F4] px-5 py-3 hover:bg-[#7A2828] transition-colors"
            >
              View research <ArrowDownRight size={16} />
            </a>
            <a
              href="#contact"
              className="link-underline text-[#1A1A1A] tracking-wide uppercase text-[12px] font-medium"
            >
              Get in touch
            </a>
            <span className="inline-flex items-center gap-1.5 text-[#5a5a5a] text-[13px]">
              <MapPin size={14} /> {profile.location}
            </span>
          </div>
        </div>

        <aside className="lg:col-span-4 lg:pt-4 reveal">
          <div className="border-l border-[#D9D4C7] pl-6">
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium mb-5">
              Currently
            </p>
            <p className="font-serif text-[20px] leading-snug">
              {profile.currentRole}
            </p>
            <p className="mt-2 text-sm text-[#5a5a5a]">
              with <span className="text-[#1A1A1A]">{profile.advisor}</span>
            </p>
            <p className="mt-1 text-xs tracking-wide uppercase text-[#7A2828]">
              {profile.startDate}
            </p>

            <div className="section-divider my-7" />

            <p className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium mb-4">
              News
            </p>
            <ul className="space-y-3">
              {news.slice(0, 3).map((n, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="font-mono text-[11px] text-[#7A2828] mt-0.5 whitespace-nowrap">
                    {n.date}
                  </span>
                  <span className="text-[#2c2c2c] leading-snug">{n.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Hero;
