import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import { blogPosts } from "../data/mock";

const Blog = () => {
  const [active, setActive] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(
    () =>
      active === "All"
        ? blogPosts
        : blogPosts.filter((p) => p.category === active),
    [active]
  );

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen text-[#1A1A1A]">
      <Header variant="blog" />
      <main className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Page header */}
        <section className="pt-16 md:pt-24 pb-14 md:pb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#1A1A1A]" />
            <span className="text-[11px] tracking-[0.22em] uppercase text-[#5a5a5a] font-medium">
              Notes & Writing
            </span>
          </div>
          <h1 className="font-serif text-[44px] sm:text-[58px] md:text-[72px] leading-[1.02] tracking-tight text-balance max-w-4xl">
            Thinking out loud, in
            <span className="italic text-[#7A2828]"> ink </span>
            and equations.
          </h1>
          <p className="mt-6 max-w-2xl text-[16px] md:text-[17px] leading-[1.7] text-[#3a3a3a] text-pretty">
            Reading notes, lab diaries, and the occasional essay. Most of these are
            written for my one‑year‑younger self — the questions I wish someone had
            answered for me back then.
          </p>

          {/* Category pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`text-[11px] tracking-[0.18em] uppercase px-3.5 py-2 border transition-colors ${
                  active === c
                    ? "bg-[#1A1A1A] text-[#FBF9F4] border-[#1A1A1A]"
                    : "border-[#D9D4C7] text-[#3a3a3a] hover:border-[#1A1A1A]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Featured post */}
        {featured && (
          <section className="border-t border-[#E5DFCE] py-14 md:py-20">
            <Link
              to={`/blog/${featured.slug}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 group"
            >
              <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-[#1A1A1A]">
                <img
                  src={featured.cover}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-[1.02] transition-[filter,transform] duration-700 ease-out"
                />
                <span className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.22em] uppercase text-[#FBF9F4] bg-[#1A1A1A]/70 px-2.5 py-1 backdrop-blur-sm">
                  Featured
                </span>
              </div>
              <div className="lg:col-span-5 lg:pt-6 flex flex-col justify-center">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-[#7A2828] mb-4">
                  {featured.category} · {featured.date}
                </p>
                <h2 className="font-serif text-[34px] md:text-[44px] leading-[1.08] tracking-tight text-pretty group-hover:text-[#7A2828] transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-5 text-[16px] leading-[1.75] text-[#3a3a3a] text-pretty">
                  {featured.excerpt}
                </p>
                <div className="mt-7 flex items-center gap-3 text-[12px] tracking-[0.14em] uppercase font-medium">
                  <span className="text-[#7A2828]">Read essay</span>
                  <ArrowUpRight
                    size={16}
                    className="text-[#7A2828] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                  />
                  <span className="ml-2 text-[#5a5a5a] tracking-normal text-[12px] normal-case">
                    {featured.readingTime}
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Other posts grid */}
        {rest.length > 0 && (
          <section className="border-t border-[#E5DFCE] py-14 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {rest.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A] mb-5">
                    <img
                      src={p.cover}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-[filter,transform] duration-700 ease-out"
                    />
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#7A2828] mb-2.5">
                    {p.category} · {p.date}
                  </p>
                  <h3 className="font-serif text-[22px] md:text-[24px] leading-snug tracking-tight mb-3 text-pretty group-hover:text-[#7A2828] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-[#3a3a3a] text-pretty mb-4">
                    {p.excerpt}
                  </p>
                  <span className="mt-auto text-[11px] tracking-[0.18em] uppercase text-[#5a5a5a]">
                    {p.readingTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {filtered.length === 0 && (
          <p className="py-20 text-center text-[#5a5a5a] font-serif italic">
            Nothing in this category just yet.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
