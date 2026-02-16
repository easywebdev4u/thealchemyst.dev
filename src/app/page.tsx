"use client";

import { useState, useEffect } from "react";
import {
  GridBackground,
  Navbar,
  Hero,
  About,
  Experience,
  SkillConstellation,
  Awards,
  Testimonials,
  Education,
  Blog,
  Contact,
  Terminal,
  Footer,
  SmoothScroll,
  CustomCursor,
  Preloader,
  ProgressBar,
  ScrollToTop,
  CommandPalette,
  MusicToggle,
} from "@/components";

export default function Home() {
  // Easter egg: Konami code
  const [easterEgg, setEasterEgg] = useState(false);
  useEffect(() => {
    const code = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let index = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode === code[index]) {
        index++;
        if (index === code.length) {
          setEasterEgg(true);
          index = 0;
          setTimeout(() => setEasterEgg(false), 4000);
        }
      } else {
        index = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <ProgressBar />
      <GridBackground />
      <Navbar />
      <CommandPalette />
      <MusicToggle />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <SkillConstellation />
        <Awards />
        <Testimonials />
        <Education />
        <Blog />
        <Contact />
        <Terminal />
      </main>
      <Footer />
      <ScrollToTop />

      {/* Easter egg overlay */}
      {easterEgg && (
        <div className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center">
          <div className="text-6xl animate-bounce">🚀</div>
          <p className="absolute bottom-20 text-accent font-mono text-sm animate-pulse">
            You found the secret! ↑↑↓↓←→←→BA
          </p>
        </div>
      )}
    </SmoothScroll>
  );
}
