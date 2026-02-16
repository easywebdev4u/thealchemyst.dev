"use client";

import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionHeading from "@/components/shared/SectionHeading";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    title: "Building Production AI Agents with LangChain & Next.js",
    excerpt:
      "A deep dive into architecting reliable AI agent systems that actually work in production — from prompt engineering to error handling and observability.",
    date: "Coming Soon",
    readTime: "12 min read",
    tags: ["GenAI", "Next.js", "LangChain"],
  },
  {
    title: "Web3 in 2026: What Actually Matters",
    excerpt:
      "Cutting through the noise — what's real, what's hype, and where smart developers should focus their energy in the Web3 space.",
    date: "Coming Soon",
    readTime: "8 min read",
    tags: ["Web3", "Blockchain", "Opinion"],
  },
  {
    title: "From Frontend to Full-Stack: My Journey with Go",
    excerpt:
      "How learning Go transformed my understanding of backend systems and why every frontend engineer should try a compiled language.",
    date: "Coming Soon",
    readTime: "10 min read",
    tags: ["Go", "Backend", "Career"],
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="07 / Blog" title="Writing & Thoughts" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-surface/50 border border-surface-border rounded-xl p-6 hover:border-accent/20 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <Badge className="bg-accent/10 text-accent border-accent/20 text-[10px] font-mono">
                  Coming Soon
                </Badge>
              </div>

              <div className="flex items-center gap-3 text-xs text-foreground/30 font-mono mb-4">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-3 pr-20 group-hover:text-accent transition-colors">
                {post.title}
              </h3>

              <p className="text-sm text-foreground/40 leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-light text-foreground/40 border-surface-border"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-4 h-4 text-accent/40" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
