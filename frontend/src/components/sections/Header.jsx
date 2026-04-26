import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { profile } from "../../data/mock";

const NAV = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "publications", label: "Publications" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

const Header = ({ activeSection, variant = "home" }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = variant === "home";
  const onBlogPath = location.pathname.startsWith("/blog");

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || !isHome
          ? "bg-[#FBF9F4]/85 backdrop-blur-md border-b border-[#E5DFCE]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-tight">
          <span className="font-medium">Soumyajit</span>{" "}
          <span className="text-[#7A2828]">Samal</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {isHome &&
            NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`text-[12px] tracking-[0.12em] uppercase font-medium transition-colors ${
                  activeSection === n.id
                    ? "text-[#7A2828]"
                    : "text-[#3a3a3a] hover:text-[#1A1A1A]"
                }`}
              >
                {n.label}
              </a>
            ))}
          <Link
            to="/blog"
            className={`text-[12px] tracking-[0.12em] uppercase font-medium transition-colors ${
              onBlogPath ? "text-[#7A2828]" : "text-[#3a3a3a] hover:text-[#1A1A1A]"
            }`}
          >
            Writing
          </Link>
          <a
            href={profile.cvUrl}
            className="text-[12px] tracking-[0.12em] uppercase font-medium border border-[#1A1A1A] px-4 py-2 hover:bg-[#1A1A1A] hover:text-[#FBF9F4] transition-colors"
          >
            CV
          </a>
        </nav>

        <button
          className="lg:hidden p-2"
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#E5DFCE] bg-[#FBF9F4]">
          <div className="max-w-[1180px] mx-auto px-6 py-4 flex flex-col gap-3">
            {isHome &&
              NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="text-sm tracking-wide uppercase py-1"
                >
                  {n.label}
                </a>
              ))}
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className="text-sm tracking-wide uppercase py-1"
            >
              Writing
            </Link>
            <a
              href={profile.cvUrl}
              className="text-sm tracking-wide uppercase border border-[#1A1A1A] px-4 py-2 mt-2 inline-block w-fit"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
