import React, { useEffect, useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Header from "../components/sections/Header";
import Footer from "../components/sections/Footer";
import { blogPosts } from "../data/mock";

const BlogPost = () => {
  const { slug } = useParams();
  const idx = blogPosts.findIndex((p) => p.slug === slug);
  const post = blogPosts[idx];
  const prev = idx > 0 ? blogPosts[idx - 1] : null;
  const next = idx >= 0 && idx < blogPosts.length - 1 ? blogPosts[idx + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const wordCount = useMemo(
    () => (post ? post.body.join(" ").split(/\s+/).filter(Boolean).length : 0),
    [post]
  );

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen text-[#1A1A1A]">
      <Header variant="blog" />

      {/* Article hero */}
      <article className="relative">
        <div className="max-w-[820px] mx-auto px-6 md:px-10 pt-14 md:pt-20 pb-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-[#5a5a5a] hover:text-[#7A2828] transition-colors mb-10"
          >
            <ArrowLeft size={14} /> All writing
          </Link>

          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-[#7A2828] mb-5">
            {post.category}
          </p>
          <h1 className="font-serif text-[36px] sm:text-[48px] md:text-[60px] leading-[1.05] tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-6 font-serif text-[19px] md:text-[20px] italic leading-[1.6] text-[#3a3a3a] max-w-[640px] text-pretty">
            {post.excerpt}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] tracking-[0.14em] uppercase text-[#5a5a5a]">
            <span>{post.date}</span>
            <span className="h-3 w-px bg-[#D9D4C7]" />
            <span>{post.readingTime}</span>
            <span className="h-3 w-px bg-[#D9D4C7]" />
            <span>{wordCount.toLocaleString()} words</span>
          </div>
        </div>

        {/* Cover */}
        <div className="max-w-[1180px] mx-auto px-0 md:px-10">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-[#1A1A1A]">
            <img
              src={post.cover}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="max-w-[760px] mx-auto px-6 md:px-10 py-16 md:py-24">
          {post.body.map((para, i) => (
            <p
              key={i}
              className={`font-serif text-[19px] md:text-[20px] leading-[1.8] text-[#1f1f1f] text-pretty ${
                i === 0 ? "first-letter:font-serif first-letter:text-[58px] first-letter:leading-[0.85] first-letter:float-left first-letter:pr-3 first-letter:pt-1 first-letter:text-[#7A2828]" : "mt-7"
              }`}
            >
              {para}
            </p>
          ))}

          <hr className="my-16 border-0 h-px bg-[#E5DFCE]" />

          <p className="font-serif italic text-[16px] text-[#5a5a5a]">
            — Soumyajit, written from {post.category === "Lab Diary" ? "the cold room" : "a quiet desk"}.
          </p>
        </div>

        {/* Prev / Next */}
        <nav className="max-w-[820px] mx-auto px-6 md:px-10 pb-20 grid grid-cols-2 gap-6 border-t border-[#E5DFCE] pt-10">
          <div>
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="group block">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#5a5a5a] mb-2 inline-flex items-center gap-1.5">
                  <ArrowLeft size={12} /> Previous
                </p>
                <p className="font-serif text-[17px] leading-snug group-hover:text-[#7A2828] transition-colors">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="text-right">
            {next ? (
              <Link to={`/blog/${next.slug}`} className="group block">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#5a5a5a] mb-2 inline-flex items-center gap-1.5 justify-end w-full">
                  Next <ArrowRight size={12} />
                </p>
                <p className="font-serif text-[17px] leading-snug group-hover:text-[#7A2828] transition-colors">
                  {next.title}
                </p>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
