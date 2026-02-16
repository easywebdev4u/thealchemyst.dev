"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Phone, Linkedin, MapPin } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";

function MagneticLink({
  children,
  href,
  className,
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
  target?: string;
  rel?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 20, stiffness: 300 });
  const springY = useSpring(y, { damping: 20, stiffness: 300 });

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set((e.clientX - cx) * 0.15);
      y.set((e.clientY - cy) * 0.15);
    },
    [x, y]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.a>
  );
}

const links = [
  {
    label: "Email",
    value: "aksingh1493@gmail.com",
    href: "mailto:aksingh1493@gmail.com",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: "Phone",
    value: "+91-7532051001",
    href: "tel:+917532051001",
    icon: <Phone className="w-5 h-5" />,
  },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "https://www.linkedin.com/in/ajay-singh-69a083108/",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: "Location",
    value: "Bengaluru, Karnataka",
    href: "https://maps.google.com/?q=Bengaluru,Karnataka",
    icon: <MapPin className="w-5 h-5" />,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="06 / Contact" title="Let's Connect" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-foreground/50 max-w-xl mb-12 text-lg"
        >
          I&apos;m always open to discussing new projects, creative ideas, or
          opportunities to be part of something great.
        </motion.p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
          {links.map((link, i) => (
            <MagneticLink
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-4 bg-surface/50 border border-surface-border rounded-xl p-5 hover:border-accent/30 hover:bg-surface-light/50 transition-all duration-300 group"
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-4 w-full"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs text-foreground/30 uppercase tracking-wide">
                    {link.label}
                  </p>
                  <p className="text-foreground/70 group-hover:text-accent transition-colors text-sm">
                    {link.value}
                  </p>
                </div>
              </motion.div>
            </MagneticLink>
          ))}
        </div>
      </div>
    </section>
  );
}
