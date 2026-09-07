# laust.ca — Project Brief

Personal portfolio for **Leibrandt Austria**, front-end & UX developer.
Live at [laust.ca](https://laust.ca) · Repo: `portfolio/laust`

---

## What it is

A single-page React application presenting a personal portfolio in four routes:
a typographic landing card, an about page, a floating gallery of project
thumbnails, and per-project case-study pages. The aesthetic leans on 1980s
avant-garde print media — bold display type, canvas grain, asymmetric blocks,
and a looping video background.

There is no backend, no CMS, and no database. All content is authored as
JavaScript objects in `src/data/` and compiled into the bundle at build time.

---

## Stack

| Layer | Technology | Version |
|---|---|---|
| UI framework | React | 19.0 |
| Build tool | Vite | 6.4 |
| Routing | React Router DOM | 7.13 |
| Styling | Tailwind CSS (via `@tailwindcss/vite`) | 4.0 |
| Animation | Framer Motion | 12.5 |
| Icons | React Icons | 5.5 |
| HTML sanitization | DOMPurify | 3.3 |
| Linting | ESLint (flat config) | 9.21 |
| Hosting | Hostinger (Apache + hCDN), static `dist/` upload | — |

**Language:** JavaScript (JSX), no TypeScript.
**Module system:** ESM (`"type": "module"`).
**Styling model:** Tailwind v4 CSS-first config — the theme lives in an
`@theme` block in `src/index.css`, not in a `tailwind.config.js`.

---

## Architecture

```
index.html                     Static SEO baseline + JSON-LD, mount point
└── main.jsx                   createRoot + StrictMode
    └── App.jsx                BrowserRouter → ErrorBoundary → VideoProvider
        ├── PersistentBackground   Fixed video/overlay layer, survives routing
        ├── Cursor                 Spring-lerped trailing circle (desktop only)
        ├── Noise                  Canvas grain, rAF loop
        └── Routes
            └── Layout             Header · page · Footer — stays mounted
                └── AnimatePresence mode="wait"
                    └── motion.div  keyed on pathname, owns the transition
                        └── FrozenOutlet  pins the route captured at mount
                            ├── HomePage        NameCard (parallax name lockup)
                            ├── AboutPage       TechStack · AboutInfo · Faq · photo (parallax)
                            ├── WorksPage       WorkCard (floating grid + tooltip, parallax)
                            └── WorkDetailPage  WorkDetailCard (gallery + lightbox)
```

### Directory layout

| Path | Contents |
|---|---|
| `src/pages/` | One component per route; each calls `useSeo()` |
| `src/components/layout/` | `Layout`, `Header`, `Navigation`, `Footer` |
| `src/components/ui/` | `NameCard`, `workCard`, `WorkDetailCard`, `TechStack`, `AboutInfo`, `Faq`, `Cursor`, `Noise` |
| `src/context/` | `VideoContext` — shared ref + play/pause for the background video |
| `src/hooks/` | `useSeo` — per-route head metadata |
| `src/data/` | `projects.js`, `faqData.js` |
| `src/assets/` | Fonts, background video, overlay texture, profile photo (bundled) |
| `public/work/` | Project screenshots and previews (copied verbatim) |
| `public/.htaccess` | Apache SPA rewrite — all non-file paths → `index.html` |

### Key patterns

- **Persistent background.** The video and overlay render *outside* the route
  tree so they never remount during navigation. Playback is controlled through
  `VideoContext` rather than a global variable.
- **Transitions next to the element they animate.** `AnimatePresence` wraps the
  `motion.div` directly inside `Layout`, not `<Routes>` from above. It cannot
  read an exit animation through a non-motion child, and `mode="wait"` will
  stall forever if it never receives the exit-complete signal. Keeping the key
  on the `motion.div` also leaves `Header` and `Footer` mounted across routes.
- **The outlet is frozen per wrapper.** `FrozenOutlet` captures the outlet
  element on mount rather than rendering a live `<Outlet />`. Because
  `mode="wait"` keeps the previous wrapper on screen through its exit, a live
  outlet would render the *incoming* route into the *outgoing* wrapper — the new
  page flashes at full opacity, animates out, then animates in again.
- **Content as data.** `src/data/projects.js` holds each project's `concept`,
  `design`, `development`, and `challenges` as HTML strings, rendered through
  `dangerouslySetInnerHTML` after `DOMPurify.sanitize()`.
- **Titles pinned to outward corners.** On the works stage each project's name
  is centred on the corner of its card that faces away from the middle of the
  composition, so the names push outward and the centre stays open. The corner
  is derived from the card's slot in `positions`, not stored per project — move
  a card to another quadrant and its label follows. Desktop only.
- **Previews typed by extension.** Each project's `images.preview` may be a video
  or a still; `workCard` tests the extension and renders `<video>` or `<img>`
  accordingly. A `<video>` cannot decode a GIF or PNG — it fails silently, which
  is exactly how the previews stayed broken unnoticed.
- **Head metadata.** `index.html` carries the full static tag set for crawlers;
  `useSeo()` mutates those same tags on route change so exactly one of each
  exists at all times.
- **Error containment.** A class `ErrorBoundary` wraps the router and renders a
  reload fallback on any render-time throw.

---

## Featured projects

Listed in this order on the works page — `projects.js` array order drives both
the mobile grid and the desktop card placement:

| # | ID | Project | Stack | Summary |
|---|---|---|---|---|
| 1 | `qorum` | QORUM | Next.js, Supabase, Resend | Multi-tenant association management SaaS, live at qorum.ca |
| 2 | `lode` | LODE | React, Vite, Supabase, Zustand, PWA | Multi-tenant trucking operations platform — dispatch, warehouse, driver, and customer workflows across 8 roles |
| 3 | `moov` | moo.v | React, React Router, TMDb API | Minimal movie discovery platform with progressive hover reveals |
| 4 | `paws` | Paws & Relax | WordPress, WooCommerce | Custom theme for a pet massage business |

---

## Design tokens

Defined in the `@theme` block of `src/index.css`:

| Token | Value | Role |
|---|---|---|
| `--color-primary` | `#e0ff4f` | Neon lime accent |
| `--color-secondary` | `#cacaca` | Card surfaces |
| `--color-tertiary` | `#d9d9d9` | Chips, nested panels |
| `--color-darkbg` | `#333333` | Mobile background, muted text |
| `--font-display` | Bebas Neue | Display headings |
| `--font-subtext` | Modernline | Script subtext |
| `--font-body` | PP Editorial New (Ultralight) | Body copy, `h1`/`h2` |

---

## Commands

```bash
npm install
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Serve dist/ locally
npm run lint     # ESLint
```

Deployment is a static upload of `dist/` (including `.htaccess`) to the
Hostinger web root.

---

## Recent changes — 2026-09-06

A running log of one extended session, roughly in order. Full detail, including
the measured backlog, is in `OPTIMIZATION-AUDIT.md`.

**Route transitions were blocking navigation.** `AnimatePresence mode="wait"`
wrapped `<Routes>`, but the `motion.div` owning the `exit` variant lived two
levels deeper inside `Layout`. `mode="wait"` waits for an exit-complete signal
that a non-motion child can never send, so the URL changed on every nav click
and the page never did. Moving `AnimatePresence` next to the element it animates
fixed it, kept the transition identical, and stopped `Header` / `Footer` /
`Navigation` remounting on every route change.

**Then the incoming page flashed before animating in.** Keying `<Routes>` had
been freezing the outgoing subtree by accident; keying the wrapper instead left
a live `<Outlet />` inside a wrapper that stays mounted through its exit. The
new page rendered into the *outgoing* wrapper at full opacity, slid away, then
animated in again. Confirmed by DOM node identity — the very same node that had
been showing the homepage was showing the About page at `opacity: 1` before any
animation started. `FrozenOutlet` pins each wrapper to the route it mounted
with. Side effect: the tab title now updates when the incoming page mounts,
~0.5s after the URL changes.

**Works page reordered** to QORUM, LODE, moo.v, Paws & Relax. Array order in
`projects.js` drives both the mobile grid and desktop card placement, so this
also changed which position each card occupies on screen.

**Case studies rewritten** for a hiring audience. Section headings moved from
Concept & Vision / Design & Planning / Development & Implementation /
Challenges & Learnings to **Overview / Design & UX / What I Built / Hard
Problems**. Each study now opens with scope and status rather than intent,
states ownership plainly, and treats the challenges section as engineering
rather than personal growth. Detail was pulled from `ref/` that had never made
it onto the site.

**Corner-pinned project titles** added to the works stage, with card positions
retuned to give each name clear space. See Key Patterns above.

**Tooltip contrast fixed.** The tooltip's background sat *behind* the preview
media, which covers the whole box — so bright screenshots had no scrim under
the title at all. A dedicated scrim layer now sits between media and text;
worst case measures 6.2:1 for the neon title and 7.0:1 for body copy.

**Open:** QORUM and LODE have no motion preview. See finding 2a in the audit.

**Mouse-driven parallax added between the thumbnail and its corner-pinned
title.** The two layers drift independently based on cursor position over the
whole works canvas, on both axes, so movement is diagonal wherever the cursor
is. The title drifts about 3× further than the thumbnail — that differential
reads as depth. Driven by a Framer Motion spring, matching the feel of the
existing custom cursor; eases back to centre when the cursor leaves the canvas.
The existing float animation is untouched, since it lives on a different
element than the new transforms. Verifying this took a detour: this session's
browser tooling runs with `document.hidden: true`, which suspends
`requestAnimationFrame` — the same limitation hit during the page-transition
fix — so the spring's *output* looked frozen even though its *input* updated
correctly. Confirmed by exposing the motion values directly and re-testing with
the same rAF shim used earlier; the output matched hand calculation to the
decimal in all four directions.

**The site had no meta description in its served HTML.** `index.html` was
530 bytes; all metadata was rendered by React 19 post-hydration, so Google's
result was a bare title with no snippet. Now split in two: a complete static tag
set in `index.html` for crawlers, and a `useSeo()` hook that rewrites those same
tags per route. The hook mutates existing tags rather than rendering `<meta>`
from components — React 19 hoists metadata into `<head>` but does not dedupe it,
so declarative tags on top of static ones would leave two competing
descriptions. Also added `robots.txt`, `sitemap.xml`, canonical tags, JSON-LD
`Person` structured data, and per-project metadata on `/works/:projectId`.

**Hover previews downloaded megabytes and rendered nothing.** All four project
tooltips fed `.gif`/`.png` files into a `<video>` element, which can only decode
real video — so the file downloaded, the element stayed blank, and no error
surfaced. Hovering the moo.v card pulled 14.76 MB to show an empty box, while
the working MP4s sat unreferenced in `public/work/`. The tooltip now picks
`<video>` or `<img>` from the file extension, video previews carry
`preload="none"`, and the misleading `previewgif` field was renamed `preview`.
A placeholder `link` on moo.v that rendered a dead "View Live" button was
removed at the same time.

**Locations.** Metadata, JSON-LD, and now the visible About page bio all cover
both Vancouver and Toronto — closed in a later pass of the same session (see
below), so the gap this note originally flagged no longer exists.

**About page bio rewritten** with owner-supplied copy pairing prior video-
production (Thinkific) and freight-logistics experience with the current
front-end/UX focus, naming QORUM directly as shipped, in-production work.
Revised once more later in the same session for two small wording changes.

**Mouse-driven parallax extended to the landing name and the About page**,
using the works-canvas technique but scoped differently per page. The landing
name reads as one lockup rather than two independent layers, so it drifts as
a single slight movement (`±10px`) against the fixed background video, rather
than splitting into two rates the way a Works card does — that split would
have risked reading as misalignment rather than depth.

The About page went through a correction. It first got the Works-thumbnail
treatment verbatim — the photo panned *inside* its frame, scaled up to cover
the pan. The site owner flagged this as backwards: the frame should move, not
the image within it, and the grey content card around the whole page should
drift too, not just the photo. Rebuilt as two nested layers on the same cursor
position: the content card drifts `±6px`, and the photo's frame — a child of
that card — drifts a further `±16px` *on top of* the card's own drift, since
the transforms compose through normal DOM nesting. The photo no longer scales
at all; it moves as one rigid frame, so there's no clipped edge to cover and
no hover-capability gate needed (the earlier `matchMedia` check existed only
to guard the old scale-based crop, which no longer exists). Body copy, icons,
and the FAQ stay static.

**Subtle drop shadows added on the nearer parallax layer in both places** —
the Works title (`filter: drop-shadow(0 4px 6px rgba(0,0,0,0.6))`) and the
About photo (`boxShadow: 0 18px 30px -10px rgba(0,0,0,0.35)`, replacing the
pre-existing `shadow-xl`). The Works title sits inside `mix-blend-difference`
(`WorksPage.jsx`'s wrapper), which inverts the shadow's rendered colour along
with everything else there — checked visually rather than assumed, and it
reads as a clean dark lift with no colour artifacts. Neither shadow moves with
the parallax itself; both stay fixed so the effect stays as subtle as asked.

Still open and measured: a 19.19 MB background video that mobile downloads
despite the guard, a 3.74 MB overlay rendered at 10% opacity, 34.12 MB of
unreferenced files in `public/work/`, and a noise canvas running 62,500
`Math.random()` calls ~30×/sec with no cancellation.

---

## Related documents

- `README.md` — public-facing overview and changelog
- `BRIEF.md` — extended internal reference *(gitignored)*
- `OPTIMIZATION-AUDIT.md` — full audit: 24 findings, what was fixed, and the
  measured backlog
