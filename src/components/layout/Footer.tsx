import { Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-surface-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-foreground/30">
          © {new Date().getFullYear()} Ajay Kumar Singh. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/ajay-singh-69a083108/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/30 hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:aksingh1493@gmail.com"
            className="text-foreground/30 hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <p className="text-xs text-foreground/20 font-mono">
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}
