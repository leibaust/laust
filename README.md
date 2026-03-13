# Leibrandt Austria — Portfolio V2 (2026 Update)

Personal portfolio site showcasing front-end development and UI/UX design work. Built with a focus on visual storytelling, smooth animation, and a strong typographic identity.

Live: [laust.ca](https://www.laust.ca)

---

## About

Portfolio V2 is a full redesign and rebuild of my personal portfolio, launched in 2026. It replaces the original static site with a modern React SPA featuring page transitions, a floating project card layout, a custom cursor, and a looping video background — all while staying performant and fully responsive.

The aesthetic is inspired by 1980s avant-garde print media: bold display typography, noise grain overlays, and asymmetric block layouts.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build | Vite 6 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion 12 + GSAP 3 |
| Icons | React Icons 5 |

---

## Features

- **Floating project cards** — pseudo-random positioning with hover GIF previews and viewport-aware tooltips
- **Custom cursor** — GSAP-lerped trailing circle with `mix-blend-mode: difference`
- **Procedural noise overlay** — canvas-based grain texture for visual depth
- **Looping background video** — with stop/start toggle in the header
- **Project detail pages** — lightbox gallery with keyboard navigation, collapsible detail sections
- **Responsive layouts** — entirely different layouts between mobile and desktop (grid vs. floating)
- **Page transitions** — Framer Motion `AnimatePresence` slide-up animation on route change

---

## Projects Featured

| Project | Stack | Description |
|---|---|---|
| Sunset Showdown | Vanilla JS, Canvas | Retro top-down shooter game |
| moo.v | React, TMDb API | Minimal movie discovery platform |
| Portfolio | React, Tailwind, Framer Motion | This site |
| Paws & Relax | WordPress, WooCommerce | Custom theme for a pet massage business |

---

## Getting Started

```bash
npm install
npm run dev
```

```bash
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```

---

## Design

Custom font stack:
- **Bebas Neue** — display headings
- **Modernline** — subtext / labels
- **PP Editorial New** — body copy

Brand color: `#e0ff4f` (neon lime yellow)

---

## License

Personal portfolio — not for redistribution.
