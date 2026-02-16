"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="01 / About" title="Who I Am" />

        <div className="flex flex-col-reverse md:grid md:grid-cols-[1fr_280px] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="text-lg text-foreground/70 leading-relaxed">
              I&apos;m a{" "}
              <span className="text-foreground">
                Tech Lead & Senior Frontend Engineer
              </span>{" "}
              with over 9 years of experience crafting high-performance web
              applications. Currently{" "}
              <span className="text-accent">solo-architecting and building the entire product at PandaMoney</span> — frontend, backend (Go), and cloud infrastructure (AWS) — from the ground up.
            </p>
            <p className="text-foreground/50 leading-relaxed">
              My journey has taken me through some of India&apos;s most
              impactful tech companies — from architecting blockchain-based
              platforms at Six Sigma Sports to scaling consumer products at
              Paytm serving millions of users. I specialize in building
              complex, real-time applications with a deep focus on performance,
              developer experience, and polished UX.
            </p>
            <p className="text-foreground/50 leading-relaxed">
              I&apos;m particularly drawn to the intersection of{" "}
              <span className="text-foreground">Generative AI</span>,
              Web3, and frontend engineering — where cutting-edge technology
              meets real user impact. I leverage AI-assisted development and LLM integrations
              to rapidly prototype and ship production-grade products. Whether it&apos;s
              building AI-powered features, integrating DeFi wallets, or designing
              component architectures that scale, I bring a product-minded
              approach to every line of code.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              {[
                { value: 9, suffix: "+", label: "Years Experience" },
                { value: 6, suffix: "", label: "Companies" },
                { value: 0, suffix: "", label: "Focus", text: "GenAI" },
                { value: 2, suffix: "", label: "Awards" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-accent">
                    {stat.text ? stat.text : <Counter value={stat.value} suffix={stat.suffix} />}
                  </p>
                  <p className="text-xs text-foreground/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative group"
          >
            <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-surface-light to-surface border border-surface-border overflow-hidden relative w-full max-w-[250px] mx-auto md:max-w-none md:mx-0 max-h-[380px]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img
                src="https://assets.thealchemyst.dev/photo.jpg"
                alt="Ajay Kumar Singh"
                className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative border offset */}
            <div className="absolute -inset-2 rounded-2xl border border-accent/10 -z-10 group-hover:border-accent/20 transition-colors duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
