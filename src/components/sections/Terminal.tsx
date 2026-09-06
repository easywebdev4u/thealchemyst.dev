"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { roles } from "@/config/experience";
import { personal } from "@/config/personal";

interface Line {
  type: "input" | "output";
  content: string;
}

/**
 * Rendered from the same config the Experience section uses. A hardcoded copy
 * lived here previously and had drifted on every date, so the terminal and the
 * page disagreed about the same career.
 */
const EXPERIENCE = roles
  .map((r) => `> ${r.company} — ${r.title} (${r.period})\n  ${r.highlights[0]}`)
  .join("\n");

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help        — Show this help message
  whoami      — About me
  skills      — Tech stack
  experience  — Work history
  contact     — Get in touch
  hire-me     — Let's work together!
  ls          — List files
  cat resume.txt — View resume
  clear       — Clear terminal`,
  whoami: "Ajay Kumar Singh — Tech Lead | GenAI & Web3 Developer\nBuilding products at the intersection of AI, Web3, fintech, and great UX.",
  skills: `Frontend:    React, Next.js, TypeScript, Remix
State:       Redux, React Query, Context API
Web3:        CosmJS, Web3Auth, DeFi Wallets
Backend:     Go, Node.js, REST, GraphQL
Cloud:       AWS S3, CloudFront, Amplify
AI/ML:       LLM Integration, RAG Systems, AI Agents`,
  experience: EXPERIENCE,
  contact: `Email:    ${personal.email}
LinkedIn: ${personal.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
Location: ${personal.location}`,
  "hire-me": `🚀 Let's build something amazing together!

I'm always open to interesting projects and opportunities.
Drop me a line: ${personal.email}

P.S. You get bonus points for finding this command! 😄`,
  ls: "about.txt  resume.txt  skills.json  projects/  .secret",
  "cat resume.txt": `Downloading resume... Just kidding! 📄\nGrab it at: ${personal.resumePath}`,
  "cat .secret": "🤫 Nice try! But the real secrets are in the code.",
  cd: "Nice try, but this is a single-directory universe.",
  sudo: "Permission denied: You're not root here! 😄",
  pwd: "/home/ajay/portfolio",
  echo: "echo echo echo... 🔊",
  date: new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", content: "Welcome to AJ's terminal! Type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const execute = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [{ type: "input", content: cmd }];

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      newLines.push({ type: "output", content: response });
    } else if (trimmed === "") {
      // empty
    } else if (trimmed.startsWith("cat ")) {
      const file = trimmed;
      newLines.push({ type: "output", content: COMMANDS[file] || `cat: ${cmd.slice(4)}: No such file or directory` });
    } else if (trimmed.startsWith("sudo")) {
      newLines.push({ type: "output", content: COMMANDS["sudo"] });
    } else {
      newLines.push({ type: "output", content: `command not found: ${trimmed}. Type 'help' for available commands.` });
    }

    setLines((prev) => [...prev, ...newLines]);
    setHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      execute(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx >= 0) {
        const idx = historyIdx + 1;
        if (idx >= history.length) {
          setHistoryIdx(-1);
          setInput("");
        } else {
          setHistoryIdx(idx);
          setInput(history[idx]);
        }
      }
    }
  };

  return (
    <section id="terminal" className="py-16 sm:py-24 px-6" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="09 / Terminal" title="Interactive Terminal" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-surface border border-surface-border rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-surface-light border-b border-surface-border">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs font-mono text-foreground/30">ajay@portfolio ~ %</span>
          </div>

          {/* Terminal body */}
          <div
            className="h-80 overflow-y-auto p-4 font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-1">
                {line.type === "input" ? (
                  <div className="flex gap-2">
                    <span className="text-green-400 shrink-0">❯</span>
                    <span className="text-foreground/70">{line.content}</span>
                  </div>
                ) : (
                  <pre className="text-foreground/50 whitespace-pre-wrap ml-4">{line.content}</pre>
                )}
              </div>
            ))}

            {/* Input line */}
            <div className="flex gap-2 items-center">
              <span className="text-green-400 shrink-0">❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-foreground/70 outline-none caret-green-400"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
