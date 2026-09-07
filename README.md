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
| QORUM | Next.js, Supabase, Resend | Multi-tenant association management SaaS |
| LODE | React, Vite, Supabase, PWA | Trucking logistics and load management platform |
| moo.v | React, TMDb API | Minimal movie discovery platform |
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

### V2.2 — September 2026

**Fixes**
- **Route transitions were blocking navigation.** `AnimatePresence mode="wait"`
  wrapped `<Routes>`, while the `motion.div` owning the `exit` variant sat two
  levels deeper inside `Layout`. `mode="wait"` holds the outgoing view until it
  receives an exit-complete signal, which a non-motion child never sends — so
  clicking About or Works changed the URL but never rendered the page. Moved
  `AnimatePresence` into `Layout`, directly around the `motion.div`.
- `Header`, `Footer`, and `Navigation` no longer remount on every route change,
  since the transition key moved off `<Routes>`.
- **The incoming page flashed before animating in.** Keying `<Routes>` had been
  freezing the outgoing subtree as a side effect; keying the wrapper instead
  left a live `<Outlet />` inside a wrapper that stays mounted for the length of
  its exit animation, so the new page rendered into the *outgoing* wrapper at
  full opacity, slid away, then animated in again. A `FrozenOutlet` now captures
  the outlet element on mount, pinning each wrapper to the route it started
  with. Note: the tab title now updates when the incoming page mounts, roughly
  0.5s after the URL changes.
- **Hover previews rendered nothing.** All four project tooltips fed `.gif` /
  `.png` files into a `<video>` element, which can only decode real video — the
  file downloaded, the element stayed blank, and nothing errored. Hovering the
  moo.v card pulled 14.76 MB to display an empty box. `workCard` now selects
  `<video>` or `<img>` from the file extension, and the two projects with real
  footage point at the MP4s that were already sitting unreferenced in
  `public/work/`.
- Video previews use `preload="none"` — nothing downloads until hover.
- Renamed the `previewgif` field to `preview`, since it is no longer a GIF.
- Removed a placeholder `link` on moo.v (`example.com/sunset-showdown`, left
  over from a deleted project) that rendered a dead "View Live" button.

**Content**
- Works page reordered to QORUM, LODE, moo.v, Paws & Relax.
- All four case studies rewritten for a hiring audience — leading with scope,
  status, and ownership rather than process narrative. Section headings changed
  to Overview / Design & UX / What I Built / Hard Problems.
- About page bio rewritten with owner-supplied copy pairing prior video-
  production (Thinkific) and freight-logistics experience with the current
  front-end/UX focus, and naming QORUM directly as shipped, in-production
  work. Revised once more later in the same session for two small wording
  changes.
- Metadata, JSON-LD, and now the visible About page bio all cover both
  Vancouver, BC and Toronto, ON.

**Works page**
- **Corner-pinned project titles.** Each name is set in Editorial Ultralight and
  centred on the corner of its card facing away from the middle of the
  composition, so roughly three quarters of the word overhangs the square. The
  corner is derived from the card's slot rather than hard-coded per project.
  Card positions retuned to give each name clear space. Desktop only.
- **Tooltip contrast fixed.** The tooltip's background colour sat behind the
  preview media, which covers the whole box — so bright screenshots left the
  title and description with no scrim. Added a scrim layer between media and
  text; worst case now measures 6.2:1 for the title and 7.0:1 for body copy.
- Case study body copy now has scoped spacing; Tailwind's reset had zeroed every
  margin, so structured write-ups ran together as one block.
- **Mouse-driven parallax** between each card's thumbnail and its corner-pinned
  title. Both drift independently based on cursor position over the whole works
  canvas, on both axes, with the title moving roughly 3× further than the
  thumbnail — that differential is what reads as depth. Driven by a Framer
  Motion spring; eases back to centre when the cursor leaves the canvas. The
  existing float animation is untouched, since it runs on a different element.

**Landing page & About page**
- **Landing name parallax.** The name and subtitle read as one lockup rather
  than two independent layers, so — unlike the Works cards — they drift
  together as a single slight movement (`±10px`) against the fixed background
  video, tracked across the full viewport.
- **About page parallax**, corrected after feedback. The first pass panned the
  photo *inside* its frame (the Works-thumbnail treatment verbatim); moving
  the image but not the frame around it read as a windowed crop rather than
  depth, and nothing else on the page responded to the cursor. Rebuilt as two
  nested layers on the same cursor position: the grey content card drifts
  `±6px`, and the photo's frame — a child of that card — drifts a further
  `±16px` *on top of* the card's own drift, composing through normal DOM
  nesting. The photo no longer scales; it moves as one rigid frame, image
  included, so there's no clipped edge to cover and no hover-capability gate
  needed. Body copy, tech-stack icons, and the FAQ stay static.
- **Subtle drop shadows** on the nearer layer in both places, to reinforce the
  depth and help legibility: the Works title gets a soft `drop-shadow`, and
  the About photo gets a tuned `box-shadow` (replacing the earlier `shadow-xl`
  Tailwind default). The Works title sits inside `mix-blend-difference`, which
  inverts the shadow's colour along with everything else there — checked
  visually rather than assumed, and it holds up. Neither shadow moves with the
  parallax; both stay fixed.

**SEO**
- Added a full static meta baseline to `index.html` — description, canonical,
  Open Graph, Twitter Card, robots — so crawlers see it without executing the
  bundle. The served HTML was previously a 530-byte shell with no description,
  which is why search results showed no snippet.
- New `useSeo()` hook replaces the per-page `<meta>` JSX. It rewrites the
  existing head tags on route change rather than rendering new ones: React 19
  hoists metadata into `<head>` but does not deduplicate it, so declarative tags
  layered over static ones produce duplicates.
- Per-project titles, descriptions, and `og:image` on `/works/:projectId`.
- Added JSON-LD `Person` structured data.
- Added real `robots.txt` and `sitemap.xml`. Both previously returned the HTML
  page with a `200`, because the SPA rewrite catches any path that isn't a file.
- Canonical tags point at the apex domain.

**Removed**
- Unused `useRef` import and the redundant `useLocation` / `location` prop in
  `App.jsx`.

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
