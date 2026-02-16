"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "As Engineering Manager at Paytm, I enjoyed working with Ajay Singh on numerous projects, including Paytm Hotels, Paytm Mall, ONDC, Seller Panel, and others. Ajay, a gifted frontend developer, joined us as a Software Engineer and quickly rose to a Senior role within a year due to his exceptional dedication and ability to perform under pressure. Over the course of his 2.5-year tenure at Paytm, Ajay demonstrated technical proficiency across various JS frameworks and took initiatives that considerably reduced developer time, increasing our overall team efficiency. His strong communication skills complemented his technical expertise, making him a standout contributor to our projects. I wholeheartedly recommend Ajay to any organization seeking a blend of technical prowess and dedication.",
    name: "Anup Jodish",
    title: "Engineering Manager",
    company: "Paytm",
  },
  {
    quote:
      "I have had the pleasure of working with Ajay on multiple projects and can confidently say that he is an exceptional individual both professionally and personally. His technical expertise and dedication to work are unmatched, and he consistently goes above and beyond to deliver quality results. He also possesses excellent communication skills, making him an asset to any team he works with. Beyond his professional qualities, Ajay is a wonderful human being with a positive attitude and a great sense of humor. He is always willing to lend a helping hand and is a joy to work with.",
    name: "Abhishek Aman",
    title: "Engineering",
    company: "UpGrad",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading label="05 / Testimonials" title="What People Say" />

        <div className="relative">
          <div className="overflow-hidden min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-surface/50 border border-surface-border rounded-xl p-6 sm:p-8"
              >
                <Quote className="w-8 h-8 text-accent/20 mb-4" />
                <p className="text-foreground/60 leading-relaxed text-sm sm:text-base mb-6">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                    {testimonials[current].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">
                      {testimonials[current].name}
                    </p>
                    <p className="text-foreground/40 text-xs">
                      {testimonials[current].title}, {testimonials[current].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full border border-surface-border text-foreground/40 hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-accent" : "bg-foreground/20"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full border border-surface-border text-foreground/40 hover:text-accent hover:border-accent/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
