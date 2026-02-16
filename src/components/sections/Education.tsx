"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";

export default function Education() {
  return (
    <section className="py-16 sm:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="05 / Education" title="Academic Background" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-surface/50 border border-surface-border rounded-xl p-6 max-w-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
              <span className="text-xl">🎓</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">
                B.Tech in Computer Science & Engineering
              </h3>
              <p className="text-foreground/50 mt-1">
                Dr. A.P.J. Abdul Kalam Technical University
              </p>
              <p className="text-sm text-foreground/30 font-mono mt-1">
                2012 — 2016
              </p>
            </div>
          </div>
        </motion.div>

        {/* Volunteer / Teaching */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm font-mono text-accent tracking-widest uppercase mb-6"
          >
            Volunteer & Teaching
          </motion.h3>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            {[
              {
                role: "Content Auditor",
                org: "Unacademy",
                desc: "Audited React & JavaScript courses",
                period: "Apr 2022 — Jul 2022",
              },
              {
                role: "Teaching Assistant",
                org: "UpGrad",
                desc: "Mentored students in frontend development",
                period: "Apr 2021 — Aug 2021",
              },
            ].map((item, i) => (
              <motion.div
                key={item.org}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-surface/30 border border-surface-border rounded-lg p-5"
              >
                <h4 className="font-medium text-foreground">{item.role}</h4>
                <p className="text-accent text-sm">{item.org}</p>
                <p className="text-xs text-foreground/40 mt-1">{item.desc}</p>
                <p className="text-xs text-foreground/25 font-mono mt-2">
                  {item.period}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
