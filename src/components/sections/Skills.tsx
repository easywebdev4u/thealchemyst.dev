"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/shared/SectionHeading";
import { categories } from "@/config/skills";

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { damping: 20, stiffness: 300 });
  const springRotateY = useSpring(rotateY, { damping: 20, stiffness: 300 });
  const glow = useMotionValue("transparent");

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rotateX.set(y * -10);
      rotateY.set(x * 10);
      glow.set(`radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(6,182,212,0.08), transparent 60%)`);
    },
    [rotateX, rotateY, glow]
  );

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glow.set("transparent");
  }, [rotateX, rotateY, glow]);

  const bg = useTransform(glow, (v) => v);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX: springRotateX, rotateY: springRotateY, perspective: 800, background: bg }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="bg-surface/50 border border-surface-border rounded-xl p-6 hover:border-accent/20 transition-colors duration-300"
    >
      {children}
    </motion.div>
  );
}

function SkillBadge({ skill }: { skill: { name: string; level: string } }) {
  const levelColors: Record<string, string> = {
    Expert: "bg-accent/20 text-accent border-accent/30",
    Advanced: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",
    Intermediate: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Badge
            variant="outline"
            className="text-sm px-3 py-1.5 rounded-lg bg-surface-light text-foreground/60 border-surface-border hover:border-accent/30 hover:text-accent transition-all duration-200 cursor-default"
          >
            {skill.name}
          </Badge>
        </span>
      </TooltipTrigger>
      <TooltipContent
        className={`text-[10px] px-2 py-0.5 rounded border ${levelColors[skill.level] || ""}`}
      >
        {skill.level}
      </TooltipContent>
    </Tooltip>
  );
}

export default function Skills() {
  return (
    <TooltipProvider delayDuration={200}>
      <section id="skills" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading label="03 / Skills" title="Tech Stack" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <TiltCard key={cat.label} index={i}>
                <h3 className="text-sm font-mono text-accent mb-4 tracking-wide">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <SkillBadge key={skill.name} skill={skill} />
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
