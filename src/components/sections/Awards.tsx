"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

const awards = [
  {
    icon: "🏅",
    title: "Performer of the Quarter",
    org: "GlobalLogic",
    year: "2017",
  },
  {
    icon: "🏅",
    title: "Performer of the Year",
    org: "Paytm",
    year: "2020–21",
  },
];

export default function Awards() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="04 / Recognition" title="Awards" />

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-surface/50 border border-surface-border rounded-xl p-6 hover:border-accent/20 transition-colors duration-300 group"
            >
              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                {award.icon}
              </span>
              <h3 className="font-semibold text-foreground mb-1">
                {award.title}
              </h3>
              <p className="text-sm text-foreground/40">
                {award.org} · {award.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
