import React from "react";
import { profile } from "../../data/mock";

const Footer = () => {
  return (
    <footer className="border-t border-[#E5DFCE] mt-10">
      <div className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          <div>
            <p className="font-serif text-[24px] tracking-tight">
              Soumyajit <span className="text-[#7A2828]">Samal</span>
            </p>
            <p className="text-[13px] text-[#5a5a5a] mt-2 max-w-sm">
              Doctoral researcher in experimental quantum nanoelectronics.
            </p>
          </div>
          <div className="text-[12px] text-[#5a5a5a] md:text-center">
            <p>© {new Date().getFullYear()} Soumyajit Samal</p>
            <p className="mt-1">
              Built with care · set in Crimson Pro & Inter
            </p>
          </div>
          <div className="md:text-right text-[13px]">
            <a href={`mailto:${profile.email}`} className="link-underline">
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
