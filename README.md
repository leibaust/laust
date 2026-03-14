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
| Animations | Framer Motion 12 |
| Icons | React Icons 5 |
| HTML Sanitization | DOMPurify |

---

## Features

- **Floating project cards** — pseudo-random positioning with hover video previews and viewport-aware tooltips
- **Custom cursor** — Framer Motion spring-lerped trailing circle with `mix-blend-mode: difference`
- **Procedural noise overlay** — canvas-based grain texture for visual depth
- **Looping background video** — desktop only, with stop/start toggle in the header
- **Project detail pages** — auto-scrolling gallery with lightbox and keyboard navigation, collapsible detail sections
- **Responsive layouts** — grid on mobile, floating asymmetric layout on desktop
- **Page transitions** — Framer Motion `AnimatePresence` slide-up animation on route change
- **Error boundary** — global render error catch with reload fallback

---

## Projects Featured

| Project | Stack | Description |
|---|---|---|
| LODE | React, Vite, Supabase, PWA | Trucking logistics and load management platform |
| moo.v | React, TMDb API | Minimal movie discovery platform |
| QORUM | Next.js, Supabase, Resend | Community Q&A and discussion platform |
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

## Changelog

### V2.1 — March 2026

**New Projects**
- Added **LODE** — trucking logistics PWA (replaces Sunset Showdown JS game)
- Added **QORUM** — community Q&A platform (replaces Portfolio self-reference entry)

**Security**
- Installed `dompurify`; all `dangerouslySetInnerHTML` calls in `WorkDetailCard` now sanitized
- Resolved all npm audit vulnerabilities (0 remaining)

**Performance**
- Background video skipped entirely on mobile (`≤768px`) — replaced with static `#333333` div
- Hover tooltip preview switched from `<img>` / CSS `backgroundImage` to `<video autoPlay muted loop playsInline>` for reliable autoplay

**Architecture**
- Replaced `window.__videoController` + 500ms polling with a proper `VideoContext` (`VideoProvider` + `useVideo` hook)
- Added `ErrorBoundary` component wrapping the router — catches render errors with a reload fallback

**Animations**
- Cursor animation migrated from GSAP to Framer Motion `useMotionValue` + `useSpring`
- Removed `gsap` and standalone `motion` packages entirely

**SEO / Fonts**
- Added `font-display: swap` to all custom `@font-face` declarations
- Added Open Graph and Twitter Card meta tags to all pages

---

## License

Personal portfolio — not for redistribution.
