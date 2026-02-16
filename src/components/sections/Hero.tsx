"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { personal } from "@/config/personal";

const roles = personal.heroRoles;

function MagneticButton({ children, href, className, download }: {
  children: React.ReactNode;
  href: string;
  className: string;
  download?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.2);
      y.set((e.clientY - cy) * 0.2);
    },
    [x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download || undefined}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function AnimatedText({ text, className, delay = 0 }: { text: string; className: string; delay?: number }) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Morphing blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-accent/[0.03] rounded-full blur-3xl animate-blob [animation-delay:4s]" />
      </div>

      <div className="relative z-10 text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-accent text-sm tracking-widest uppercase mb-6"
        >
          Hello, I&apos;m
        </motion.p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          <span className="block">
            <AnimatedText text="AJAY KUMAR" className="" delay={0.2} />
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan-400 to-accent bg-[length:200%_auto] animate-gradient-shift">
            <AnimatedText text="SINGH" className="" delay={0.55} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-lg sm:text-xl text-foreground/50 font-light mb-2 h-8"
        >
          <span className="font-mono text-accent">{displayed}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-[2px] h-5 bg-accent ml-0.5 align-middle"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-base text-foreground/35 max-w-2xl mx-auto mb-4"
        >
          Building products at the intersection of Web3, fintech, and great UX
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="text-sm text-foreground/25 font-mono flex items-center justify-center gap-2 mb-10"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
          Bengaluru, India
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none sm:w-auto mx-auto"
        >
          <MagneticButton
            href="#contact"
            className="group relative px-6 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wide uppercase overflow-hidden bg-gradient-to-r from-cyan-500 via-accent to-teal-400 text-background shadow-[0_0_30px_rgba(6,182,212,0.25)] hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-500 hover:scale-105 text-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-400 via-accent to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-accent to-teal-400 opacity-30 blur-lg group-hover:opacity-60 transition-opacity duration-500 -z-10" />
          </MagneticButton>
          <MagneticButton
            href="https://assets.thealchemyst.dev/resume.pdf"
            download
            className="group relative px-6 sm:px-10 py-3 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-wide uppercase overflow-hidden border-2 border-accent/30 text-foreground/80 hover:text-accent backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-accent/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] text-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download className="w-4 h-4 group-hover:animate-bounce" strokeWidth={2.5} />
              Download Resume
            </span>
            <span className="absolute inset-0 bg-accent/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 border border-foreground/20 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-accent/50 rounded-full mt-1.5"
          />
        </div>
      </motion.div>
    </section>
  );
}
