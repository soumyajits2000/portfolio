import React, { useEffect, useState } from "react";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import About from "./sections/About";
import ResearchInterests from "./sections/ResearchInterests";
import Publications from "./sections/Publications";
import Experience from "./sections/Experience";
import EducationSection from "./sections/Education";
import CodeProjects from "./sections/CodeProjects";
import TalksAwards from "./sections/TalksAwards";
import Teaching from "./sections/Teaching";
import Gallery from "./sections/Gallery";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-[#1A1A1A]">
      <Header activeSection={activeSection} />
      <main className="max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16">
        <Hero />
        <About />
        <ResearchInterests />
        <Publications />
        <Experience />
        <CodeProjects />
        <EducationSection />
        <TalksAwards />
        <Teaching />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
