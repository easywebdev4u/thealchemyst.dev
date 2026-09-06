# thealchemyst.dev

My personal site and portfolio — [thealchemyst.dev](https://thealchemyst.dev)

Single-page portfolio with a command palette, animated skill constellation, an interactive terminal section, and light/dark theming. Statically exported, so it ships as plain HTML/CSS/JS with no server.

## Stack

- **Next.js 15** (App Router, `output: "export"` — fully static)
- **TypeScript**, strict mode
- **Tailwind CSS** + **shadcn/ui**
- **Framer Motion** for scroll and reveal animations
- Assets served from a separate CDN origin

## Notable pieces

| Component | What it does |
|---|---|
| `CommandPalette` | ⌘K / Ctrl+K navigation across sections |
| `SkillConstellation` | Skills rendered as an interactive node graph |
| `Terminal` | Typed, interactive terminal section |
| `SmoothScroll` + `useActiveSection` | Scroll-linked nav highlighting |
| `CustomCursor`, `SpotlightCard`, `TextReveal` | Motion and pointer effects |

Content is data-driven — everything renders from `src/config/` (`personal.ts`, `experience.ts`, `skills.ts`, `navigation.ts`), so updating the site is editing config, not JSX.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out
```

Requires Node 18+.

## Structure

```
src/
  app/           # App Router entry, layout, global styles
  components/
    sections/    # Hero, About, Experience, Skills, Blog, Contact, …
    shared/      # Cross-section UI — command palette, cursor, effects
    layout/      # Navbar, Footer, Preloader, SmoothScroll
    ui/          # shadcn/ui primitives
  config/        # All site content lives here
  hooks/         # useActiveSection, useMagnetic, useScrollDirection
```
