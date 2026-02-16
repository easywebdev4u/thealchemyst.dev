"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface SectionHeadingProps {
  label: string;
  title: string;
}

export default function SectionHeading({ label, title }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="mb-8 sm:mb-12"
    >
      <p className="font-mono text-accent text-sm tracking-widest uppercase mb-3">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
        {title}
      </h2>
      <Separator className="mt-4 w-16 bg-gradient-to-r from-accent to-transparent" />
    </motion.div>
  );
}
