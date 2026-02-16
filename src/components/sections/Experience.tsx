"use client";

import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/shared/SectionHeading";
import SpotlightCard from "@/components/shared/SpotlightCard";
import { Role } from "@/types";
import { roles } from "@/config/experience";

function ExperienceCard({ role, index }: { role: Role; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;
  const visibleCount = 3;
  const hasMore = role.highlights.length > visibleCount;
  const shownHighlights = expanded ? role.highlights : role.highlights.slice(0, visibleCount);

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-8 md:pl-20"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
        <div className="w-3 h-3 rounded-full bg-accent border-2 border-background" />
        <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent/30 animate-ping" />
      </div>

      <motion.div
        whileHover={{ y: -4, boxShadow: "0 0 30px rgba(6,182,212,0.08)" }}
        transition={{ duration: 0.2 }}
        className="bg-surface/50 border border-surface-border rounded-xl p-4 sm:p-6 hover:border-accent/20 transition-colors duration-300"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">{role.company}</h3>
            <p className="text-accent text-sm">{role.title}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground/40 font-mono">{role.period}</p>
            <p className="text-xs text-foreground/30">{role.location}</p>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {shownHighlights.map((h, i) => (
            <motion.li
              key={h}
              initial={expanded && i >= visibleCount ? { opacity: 0, height: 0 } : undefined}
              animate={{ opacity: 1, height: "auto" }}
              className="text-sm text-foreground/50 flex items-start gap-2"
            >
              <span className="text-accent mt-[3px] shrink-0 text-xs leading-none">▹</span>
              {h}
            </motion.li>
          ))}
        </ul>

        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-mono text-accent/70 hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            {expanded ? (
              <>Show less <ChevronUp className="w-3 h-3" /></>
            ) : (
              <>+{role.highlights.length - visibleCount} more <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        )}

        {role.tech && (
          <div className="flex flex-wrap gap-2 mt-3">
            {role.tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/5 text-accent/70 border-accent/10 hover:bg-accent/10 hover:text-accent"
              >
                {t}
              </Badge>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="py-16 sm:py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="02 / Experience" title="Where I've Worked" />

        <SpotlightCard className="relative" >
        <div className="relative" ref={containerRef}>
          {/* Animated timeline line */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent"
          />

          <div className="space-y-12">
            {roles.map((role, i) => (
              <ExperienceCard key={role.company} role={role} index={i} />
            ))}
          </div>
        </div>
        </SpotlightCard>
      </div>
    </section>
  );
}
