"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Briefcase,
  Code2,
  Mail,
  FileDown,
  Github,
  Linkedin,
  Sun,
  Moon,
  Award,
  GraduationCap,
  MessageSquare,
  Terminal,
  BookOpen,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
  category: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollTo = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const items: CommandItem[] = [
    { id: "about", label: "Go to About", icon: <User className="w-4 h-4" />, action: () => scrollTo("about"), category: "Navigation" },
    { id: "experience", label: "Go to Experience", icon: <Briefcase className="w-4 h-4" />, action: () => scrollTo("experience"), category: "Navigation" },
    { id: "skills", label: "Go to Skills", icon: <Code2 className="w-4 h-4" />, action: () => scrollTo("skills"), category: "Navigation" },
    { id: "awards", label: "Go to Awards", icon: <Award className="w-4 h-4" />, action: () => scrollTo("awards"), category: "Navigation" },
    { id: "testimonials", label: "Go to Testimonials", icon: <MessageSquare className="w-4 h-4" />, action: () => scrollTo("testimonials"), category: "Navigation" },
    { id: "education", label: "Go to Education", icon: <GraduationCap className="w-4 h-4" />, action: () => scrollTo("education"), category: "Navigation" },
    { id: "blog", label: "Go to Blog", icon: <BookOpen className="w-4 h-4" />, action: () => scrollTo("blog"), category: "Navigation" },
    { id: "contact", label: "Go to Contact", icon: <Mail className="w-4 h-4" />, action: () => scrollTo("contact"), category: "Navigation" },
    { id: "terminal", label: "Go to Terminal", icon: <Terminal className="w-4 h-4" />, action: () => scrollTo("terminal"), category: "Navigation" },
    {
      id: "resume",
      label: "Download Resume",
      icon: <FileDown className="w-4 h-4" />,
      action: () => { setOpen(false); window.open("https://assets.thealchemyst.dev/resume.pdf", "_blank"); },
      shortcut: "⌘R",
      category: "Actions",
    },
    {
      id: "github",
      label: "View GitHub",
      icon: <Github className="w-4 h-4" />,
      action: () => { setOpen(false); window.open("https://github.com/thealchemyst", "_blank"); },
      category: "Actions",
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      icon: <Linkedin className="w-4 h-4" />,
      action: () => { setOpen(false); window.open("https://www.linkedin.com/in/ajay-singh-69a083108/", "_blank"); },
      category: "Actions",
    },
  ];

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    }
  };

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg mx-4 bg-surface border border-surface-border rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-border">
              <Search className="w-4 h-4 text-foreground/40" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-foreground text-sm outline-none placeholder:text-foreground/30"
              />
              <kbd className="text-[10px] font-mono text-foreground/30 bg-surface-light px-1.5 py-0.5 rounded border border-surface-border">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="text-sm text-foreground/30 text-center py-8">No results found</p>
              )}
              {Object.entries(grouped).map(([category, categoryItems]) => (
                <div key={category}>
                  <p className="text-[10px] font-mono text-foreground/30 uppercase tracking-wider px-4 py-1.5">
                    {category}
                  </p>
                  {categoryItems.map((item) => {
                    flatIndex++;
                    const idx = flatIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          selectedIndex === idx
                            ? "bg-accent/10 text-accent"
                            : "text-foreground/60 hover:bg-surface-light"
                        }`}
                      >
                        {item.icon}
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.shortcut && (
                          <kbd className="text-[10px] font-mono text-foreground/20 bg-surface-light px-1.5 py-0.5 rounded border border-surface-border">
                            {item.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-surface-border flex items-center gap-4">
              <span className="text-[10px] text-foreground/20 font-mono">↑↓ navigate</span>
              <span className="text-[10px] text-foreground/20 font-mono">↵ select</span>
              <span className="text-[10px] text-foreground/20 font-mono">esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
