# Portfolio Enhancement Task

## Project
- Path: /Users/ajay/Documents/projects/portfolio
- Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, shadcn/ui, lucide-react
- Theme: Dark (#0a0a0a background), cyan accent (#06b6d4)
- Static export (`output: "export"` in next.config.ts)
- Assets served from: https://assets.thealchemyst.dev/

## IMPORTANT CONSTRAINTS
- Do NOT modify next.config.ts
- Do NOT add any server-side features (no API routes, no SSR, no getServerSideProps)
- Everything must work with static export
- Keep TypeScript strict — no `any`
- All new components go in appropriate folders: components/shared/, components/sections/, components/ui/
- Use existing design system: bg-surface, bg-surface-light, border-surface-border, text-foreground, text-accent
- Mobile responsive (test at 375px mentally)
- DO NOT touch existing section content/data — only add new features
- Run `npm run build` after ALL changes to verify zero errors

## Features to Implement

### 1. Command Palette (⌘K / Ctrl+K)
- Full-screen overlay with search input
- Navigate to sections: About, Experience, Skills, Contact, etc.
- Actions: Download Resume, View GitHub, Open LinkedIn, Toggle Theme
- Fuzzy search on items
- Keyboard nav (arrow keys + enter)
- Show keyboard shortcut hints
- Escape to close
- Component: components/shared/CommandPalette.tsx

### 2. Scroll-Triggered Text Reveal
- Words/characters animate in as they enter viewport
- Use on key paragraphs: About section description, section headings
- Subtle — stagger per word, fade + slight y translate
- Component: components/shared/TextReveal.tsx (reusable)
- Apply to About section's main paragraphs

### 3. Theme Toggle (Dark/Light)
- Default: dark mode (current)
- Light mode: white/gray backgrounds, dark text, same cyan accent
- Toggle button in navbar (sun/moon icon)
- Persist choice in localStorage
- Use CSS variables or Tailwind dark: class strategy
- Smooth transition between themes

### 4. Spotlight Cursor Effect on Experience Timeline
- As cursor moves over experience section, a radial gradient light follows
- Cards near cursor get slightly brighter/highlighted
- Subtle — don't overpower the content
- Only on desktop (disable on mobile/touch)

### 5. Interactive Terminal Section
- New section after Contact (before footer)
- Fake terminal with blinking cursor
- Visitors can type commands:
  - `help` — list available commands
  - `whoami` — "Ajay Kumar Singh — Tech Lead | GenAI & Web3 Developer"
  - `skills` — list tech stack
  - `experience` — brief work history
  - `contact` — email + linkedin
  - `hire-me` — fun response + link to email
  - `clear` — clear terminal
  - `ls`, `cat resume.txt` — easter eggs
- Green text on dark bg, monospace font
- Component: components/sections/Terminal.tsx

### 6. Music Toggle
- Small floating button (bottom-left or in navbar)
- Plays subtle lo-fi ambient audio
- Muted by default — click to enable
- Use a royalty-free lo-fi audio file
- For now, just create the component with a placeholder audio src (comment explaining to add audio file)
- Volume icon that animates between muted/playing states
- Component: components/shared/MusicToggle.tsx

### 7. Visitor Counter
- Small text in footer: "You're visitor #X"
- Since this is static, use a simple approach:
  - Create a component that shows a random-seeded number that increments (fake but fun)
  - OR use Cloudflare Analytics API (but that needs server — skip for now)
  - Just make it a fun visual element with a counter animation
- Component: components/shared/VisitorCounter.tsx

### 8. Testimonials Carousel Section
- New section after Awards
- Carousel with auto-play and manual navigation
- Each card: quote text, person name, title, company
- Placeholder testimonials (I'll replace with real ones later):
  - "Ajay is one of the most talented frontend engineers I've worked with. His attention to detail and ability to ship fast is remarkable." — Colleague at Paytm
  - "Working with AJ on the blockchain platform was incredible. He took ownership of the entire frontend architecture and delivered beyond expectations." — Team Lead at Six Sigma Sports  
  - "AJ has a rare combination of technical depth and product thinking. He doesn't just write code — he builds experiences." — Manager at GlobalLogic
  - "His expertise in React and modern web technologies is outstanding. Always pushing the boundaries of what's possible in the browser." — Senior Engineer at Trakinvest
- Dots/arrows for navigation
- Component: components/sections/Testimonials.tsx

### 9. Blog/Writing Section (Placeholder)
- Section with 2-3 placeholder cards
- Each card: title, date, brief excerpt, "Coming Soon" tag
- Placeholder posts:
  - "Building Production AI Agents with LangChain & Next.js"
  - "Web3 in 2026: What Actually Matters"
  - "From Frontend to Full-Stack: My Journey with Go"
- Links disabled (coming soon state)
- Component: components/sections/Blog.tsx

### 10. Skill Constellation (Interactive)
- Replace or enhance the existing skills grid
- Skills as nodes positioned in a network/constellation layout
- Lines connecting related skills (React → Next.js → TypeScript, etc.)
- Hover a node: highlight it + connected nodes, dim others
- Click: show skill details tooltip
- Canvas-based or SVG — whichever is cleaner for static export
- If too complex, make it a hover-interactive version of the grid where hovering a category highlights related skills across categories
- Component: components/sections/SkillConstellation.tsx (or enhance Skills.tsx)

## Section Order (in page.tsx)
1. Hero
2. About
3. Experience
4. Skills (or SkillConstellation)
5. Awards
6. Testimonials (NEW)
7. Education
8. Blog (NEW)
9. Contact
10. Terminal (NEW)
11. Footer

## After All Changes
1. Run `npm run build` — must succeed with zero errors
2. Test that all imports are correct
3. Verify no server-side code was added
