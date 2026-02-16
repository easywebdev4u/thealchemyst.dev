"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

interface SkillNode {
  id: string;
  label: string;
  category: string;
  level: "Expert" | "Advanced" | "Intermediate";
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
}

const categoryColors: Record<string, string> = {
  "Core Languages": "#06b6d4",
  "Frameworks": "#22d3ee",
  "State & Styling": "#a78bfa",
  "Web3": "#f59e0b",
  "Backend & Cloud": "#10b981",
  "DevOps & Tools": "#f97316",
  "AI & GenAI": "#ec4899",
  "Practices": "#94a3b8",
};

// Spread out layout with more breathing room
const nodes: SkillNode[] = [
  // Core Languages (top-left)
  { id: "javascript", label: "JavaScript", category: "Core Languages", level: "Expert", x: 105, y: 85 },
  { id: "typescript", label: "TypeScript", category: "Core Languages", level: "Expert", x: 225, y: 55 },
  { id: "html", label: "HTML/CSS", category: "Core Languages", level: "Expert", x: 65, y: 170 },
  { id: "python", label: "Python", category: "Core Languages", level: "Intermediate", x: 170, y: 160 },

  // Frameworks (center-left)
  { id: "react", label: "React", category: "Frameworks", level: "Expert", x: 300, y: 160 },
  { id: "nextjs", label: "Next.js", category: "Frameworks", level: "Expert", x: 370, y: 80 },
  { id: "remix", label: "Remix", category: "Frameworks", level: "Advanced", x: 420, y: 170 },
  { id: "ember", label: "Ember.js", category: "Frameworks", level: "Advanced", x: 225, y: 240 },

  // State & Styling (bottom-left)
  { id: "redux", label: "Redux", category: "State & Styling", level: "Expert", x: 100, y: 290 },
  { id: "rquery", label: "React Query", category: "State & Styling", level: "Advanced", x: 215, y: 320 },
  { id: "tailwind", label: "Tailwind", category: "State & Styling", level: "Expert", x: 55, y: 370 },
  { id: "mui", label: "Material UI", category: "State & Styling", level: "Advanced", x: 170, y: 400 },

  // Backend & Cloud (center-right)
  { id: "nodejs", label: "Node.js", category: "Backend & Cloud", level: "Advanced", x: 530, y: 85 },
  { id: "express", label: "Express", category: "Backend & Cloud", level: "Advanced", x: 630, y: 50 },
  { id: "goLang", label: "Go", category: "Backend & Cloud", level: "Advanced", x: 600, y: 150 },
  { id: "aws", label: "AWS", category: "Backend & Cloud", level: "Advanced", x: 720, y: 105 },
  { id: "mysql", label: "MySQL", category: "Backend & Cloud", level: "Intermediate", x: 710, y: 195 },

  // Web3 (bottom-center)
  { id: "web3", label: "Web3", category: "Web3", level: "Advanced", x: 380, y: 290 },
  { id: "cosmjs", label: "CosmJS", category: "Web3", level: "Advanced", x: 430, y: 375 },
  { id: "web3auth", label: "Web3Auth", category: "Web3", level: "Advanced", x: 310, y: 400 },

  // DevOps & Tools (bottom-right)
  { id: "git", label: "Git", category: "DevOps & Tools", level: "Expert", x: 545, y: 280 },
  { id: "webpack", label: "Webpack", category: "DevOps & Tools", level: "Advanced", x: 640, y: 260 },
  { id: "cicd", label: "CI/CD", category: "DevOps & Tools", level: "Advanced", x: 600, y: 340 },
  { id: "ghactions", label: "GH Actions", category: "DevOps & Tools", level: "Advanced", x: 715, y: 310 },

  // AI & GenAI (right-center)
  { id: "llm", label: "LLM", category: "AI & GenAI", level: "Advanced", x: 530, y: 195 },
  { id: "openai", label: "OpenAI API", category: "AI & GenAI", level: "Advanced", x: 470, y: 240 },
  { id: "agents", label: "AI Agents", category: "AI & GenAI", level: "Intermediate", x: 640, y: 185 },

  // Practices (far bottom)
  { id: "agile", label: "Agile/Scrum", category: "Practices", level: "Expert", x: 490, y: 410 },
  { id: "codereview", label: "Code Review", category: "Practices", level: "Expert", x: 610, y: 410 },
  { id: "leadership", label: "Leadership", category: "Practices", level: "Advanced", x: 550, y: 455 },
];

// Only meaningful connections
const connections: Connection[] = [
  // Core → Frameworks
  { from: "javascript", to: "react" },
  { from: "javascript", to: "typescript" },
  { from: "typescript", to: "react" },
  { from: "typescript", to: "nextjs" },
  { from: "react", to: "nextjs" },
  { from: "react", to: "remix" },
  { from: "react", to: "ember" },
  { from: "javascript", to: "nodejs" },
  { from: "html", to: "tailwind" },
  { from: "html", to: "react" },
  // Frameworks → State
  { from: "react", to: "redux" },
  { from: "react", to: "rquery" },
  { from: "react", to: "mui" },
  { from: "tailwind", to: "nextjs" },
  // Backend cluster
  { from: "nodejs", to: "express" },
  { from: "nodejs", to: "goLang" },
  { from: "typescript", to: "goLang" },
  { from: "goLang", to: "aws" },
  { from: "nodejs", to: "aws" },
  { from: "goLang", to: "mysql" },
  // Web3 cluster
  { from: "web3", to: "cosmjs" },
  { from: "web3", to: "web3auth" },
  { from: "typescript", to: "web3" },
  { from: "cosmjs", to: "web3auth" },
  // DevOps
  { from: "git", to: "ghactions" },
  { from: "git", to: "cicd" },
  { from: "webpack", to: "react" },
  { from: "cicd", to: "ghactions" },
  // AI
  { from: "llm", to: "openai" },
  { from: "llm", to: "agents" },
  { from: "openai", to: "agents" },
  { from: "nodejs", to: "llm" },
  { from: "python", to: "llm" },
  // Practices
  { from: "agile", to: "codereview" },
  { from: "agile", to: "leadership" },
  { from: "codereview", to: "git" },
];

export default function SkillConstellation() {
  const [hovered, setHovered] = useState<string | null>(null);
  const width = 780;
  const height = 490;

  const nodeMap = useMemo(() => {
    const map = new Map<string, SkillNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  const connectedSet = useMemo(() => {
    if (!hovered) return new Set<string>();
    const set = new Set<string>([hovered]);
    connections.forEach((c) => {
      if (c.from === hovered) set.add(c.to);
      if (c.to === hovered) set.add(c.from);
    });
    return set;
  }, [hovered]);

  return (
    <section id="skills" className="py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="03 / Skills" title="Tech Constellation" />

        {/* Legend */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mb-8 justify-center">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-foreground/40">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
              {cat}
            </div>
          ))}
        </div>

        {/* SVG constellation — desktop */}
        <div className="hidden md:block">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full max-w-4xl mx-auto"
            style={{ maxHeight: 560 }}
          >
            {/* Connection lines */}
            {connections.map((conn) => {
              const a = nodeMap.get(conn.from);
              const b = nodeMap.get(conn.to);
              if (!a || !b) return null;

              const isActive =
                hovered && connectedSet.has(conn.from) && connectedSet.has(conn.to);
              const dimmed = hovered && !isActive;

              return (
                <line
                  key={`${conn.from}-${conn.to}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={
                    dimmed
                      ? "rgba(255,255,255,0.015)"
                      : isActive
                      ? "rgba(6,182,212,0.4)"
                      : "rgba(6,182,212,0.06)"
                  }
                  strokeWidth={isActive ? 1.5 : 0.5}
                  style={{ transition: "all 0.4s ease" }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const color = categoryColors[node.category] || "#06b6d4";
              const dimmed = hovered && !connectedSet.has(node.id);
              const isHovered = hovered === node.id;
              // Larger radii for better text visibility
              const r =
                node.level === "Expert" ? 36 : node.level === "Advanced" ? 32 : 27;

              return (
                <g
                  key={node.id}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Outer glow */}
                  {isHovered && (
                    <circle cx={node.x} cy={node.y} r={r + 12} fill={color} opacity={0.1} />
                  )}
                  {/* Main circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={r}
                    fill={isHovered ? `${color}18` : "var(--color-surface, #0d0d0d)"}
                    stroke={color}
                    strokeWidth={isHovered ? 2 : dimmed ? 0.3 : 0.8}
                    opacity={dimmed ? 0.12 : 1}
                    style={{ transition: "all 0.4s ease" }}
                  />
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={
                      dimmed
                        ? "var(--color-foreground, #ededed)"
                        : isHovered
                        ? "var(--color-foreground, #ffffff)"
                        : "var(--color-foreground, #ededed)"
                    }
                    opacity={dimmed ? 0.15 : isHovered ? 1 : 0.7}
                    fontSize={node.level === "Expert" ? 11 : 10}
                    fontWeight={isHovered ? 600 : 400}
                    fontFamily="Inter, system-ui, sans-serif"
                    style={{ transition: "all 0.4s ease", pointerEvents: "none" }}
                  >
                    {node.label}
                  </text>
                  {/* Level badge on hover */}
                  {isHovered && (
                    <text
                      x={node.x}
                      y={node.y + r + 14}
                      textAnchor="middle"
                      fill={color}
                      fontSize={8}
                      opacity={0.6}
                      fontFamily="JetBrains Mono, monospace"
                      style={{ pointerEvents: "none" }}
                    >
                      {node.level}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <p className="text-center text-foreground/20 text-xs mt-4 font-mono">
            hover to explore connections
          </p>
        </div>

        {/* Mobile: polished category cards */}
        <div className="md:hidden space-y-4">
          {Object.entries(
            nodes.reduce<Record<string, SkillNode[]>>((acc, n) => {
              if (!acc[n.category]) acc[n.category] = [];
              acc[n.category].push(n);
              return acc;
            }, {})
          ).map(([cat, skills], catIdx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.05 }}
              className="bg-surface/50 border border-surface-border rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: categoryColors[cat] }}
                />
                <h3
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: categoryColors[cat] }}
                >
                  {cat}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => {
                  const levelBorder =
                    s.level === "Expert"
                      ? "border-foreground/20"
                      : s.level === "Advanced"
                      ? "border-foreground/10"
                      : "border-foreground/5";
                  return (
                    <span
                      key={s.id}
                      className={`text-xs text-foreground/60 bg-surface-light/80 border ${levelBorder} px-2.5 py-1 rounded-lg`}
                    >
                      {s.label}
                      {s.level === "Expert" && (
                        <span className="ml-1 text-[8px] text-accent/60">★</span>
                      )}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
