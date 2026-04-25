import React from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { codeProjects } from "../../data/mock";
import { SectionTitle } from "./About";

const CodeProjects = () => {
  return (
    <section id="projects" className="py-20 md:py-28 border-t border-[#E5DFCE]">
      <SectionTitle kicker="05 — Projects" title="Open‑source & coursework." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5DFCE] border border-[#E5DFCE]">
        {codeProjects.map((p) => (
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            key={p.id}
            className="bg-[#FBF9F4] p-7 md:p-9 hover:bg-[#F5F1E6] transition-colors group flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#7A2828]">
                {p.course}
              </span>
              <ArrowUpRight
                size={18}
                className="text-[#5a5a5a] group-hover:text-[#7A2828] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </div>
            <h3 className="font-serif text-[20px] md:text-[22px] leading-snug tracking-tight mb-3">
              {p.title}
            </h3>
            <p className="text-[14px] leading-relaxed text-[#3a3a3a] flex-1">
              {p.description}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] text-[#5a5a5a]"
                  >
                    {s}
                  </span>
                )).reduce((prev, curr, i) =>
                  prev.length === 0 ? [curr] : [...prev, <span key={`dot${i}`} className="text-[#9a9a9a] font-mono text-[10px]">·</span>, curr], [])}
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#5a5a5a]">
                <Github size={13} /> Repository
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CodeProjects;
