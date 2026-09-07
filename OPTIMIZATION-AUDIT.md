# laust.ca — Technical Audit

Audit of the portfolio codebase at commit `9d93926`, verified against the live
site at [laust.ca](https://laust.ca), starting 2026-09-06. The original pass was
scoped to behaviour, payload, and tooling with no redesign in view; the
numbered findings below reflect that scope. The session continued past the
initial audit into visible changes requested directly by the site owner —
corner-pinned project titles, mouse-driven parallax, and a full rewrite of the
case study copy — which are not numbered findings but are recorded in the
**Changelog** at the end, in the order they happened.

Findings are ordered by impact. Each one states how it was verified.

---

## P0 — Broken in production

### 1. ✅ Client-side navigation does not work — **fixed**

Clicking **About** or **Works** changed the URL but never rendered the new page.
The homepage stayed on screen while the address bar read `/about`. Deep links
and hard refreshes worked, so the site was not fully dead — but every in-page
navigation was a dead end.

**Verified:** real mouse click on `https://laust.ca` → `location.pathname`
became `/about`, `document.body.innerText.length` stayed at `217` (the
homepage), and the About headings never appeared.

**Cause** — `src/App.jsx:66`:

```jsx
<AnimatePresence mode="wait" initial={false}>
  <Routes location={location} key={location.pathname}>
```

`mode="wait"` holds the outgoing child until it signals that its exit animation
has finished. The direct child here is `<Routes>`, a plain component — the
`motion.div` that actually owns the `exit` variant lives two levels down, inside
`Layout`. Under Framer Motion 12 + React 19 that signal never arrives, so
`AnimatePresence` waits forever and the incoming route is never mounted.

**Fix applied** — `AnimatePresence` moved inside `Layout` so it wraps the
`motion.div` directly, and the key dropped from `<Routes>`. This also stops
`Header`, `Footer`, and `Navigation` remounting on every navigation (finding 13).

```jsx
// Layout.jsx
<AnimatePresence mode="wait" initial={false}>
  <motion.div key={location.pathname} variants={pageVariants} ...>
    <Outlet />
  </motion.div>
</AnimatePresence>
```

**Verified fixed:** real mouse clicks through `/` → `/works` → `/works/lode`
all render correctly, project cards and the float animation are intact, and the
slide-up page transition is preserved unchanged. Per-route metadata updates
alongside it (`LODE | Leibrandt Austria`, canonical `/works/lode`).

Two dead identifiers went with it: `useRef` in `App.jsx` (genuinely unused) and
the now-redundant `useLocation` + `location` prop on `<Routes>`, since `Layout`
reads the location itself.

#### 1a. ✅ Follow-on: the incoming page flashed before animating in — **fixed**

Moving the key onto the `motion.div` surfaced a second defect. Keying
`<Routes location={location}>` had been freezing the outgoing subtree as a side
effect; keying the wrapper instead removed that, leaving a live `<Outlet />`
inside a wrapper that stays mounted for the length of its exit animation.

The result: on every navigation the new page appeared instantly at full opacity,
slid away with the outgoing wrapper, then animated in again on the new one.

**Verified:** probing the DOM immediately after a nav click, before any
animation could run —

```
beforeClick:             "HOME"
outgoingWrapperNowShows: "ABOUT"   ← the incoming page
sameNodeReused:          true      ← the very same DOM node
opacity:                 "1"       ← fully visible
```

`sameNodeReused: true` is decisive: the node that had been showing the homepage
was showing the About page, at full opacity, before the transition began.

**Fix applied** — a `FrozenOutlet` in `Layout.jsx` captures the outlet element
on mount, so the outgoing wrapper keeps rendering the route it started with.
Each keyed wrapper mounts its own instance, so the incoming route captures
itself:

```jsx
function FrozenOutlet() {
  const outlet = useOutlet();
  const frozen = useRef(outlet);
  return frozen.current;
}
```

**Verified:** the same probe after the fix reports the outgoing wrapper still
showing `HOME`. The completed animation could not be observed in-tooling —
every available browser surface reported `document.hidden`, which suspends
`requestAnimationFrame` and compositor animations, and neither fronting the tab
nor shimming rAF ahead of the bundle worked around it. Confirmed visually by
the site owner instead: flash gone, pages loading normally.

**Known side effect:** the tab title now updates when the incoming page mounts,
roughly 0.5s after the URL changes, rather than instantly. Indexing is
unaffected — crawlers read the static `index.html`.

### 2. ✅ Every hover preview fails to decode — **fixed**

`workCard.jsx` rendered `<video src={project.images.previewgif}>`, but all four
`previewgif` values were `.gif` or `.png` files. No browser can decode either
format in a `<video>` element, so every tooltip showed an empty box.

Worse, the browser still downloaded the file before failing:

| Source | Size | `<video>` result |
|---|---|---|
| `moov.gif` | 14.76 MB | decode error |
| `paws.gif` | 8.83 MB | decode error |
| `lode-login.png` | 0.01 MB | decode error |
| `qorum-home.png` | 0.20 MB | decode error |
| `moov.mp4` *(present, unused)* | 11.48 MB | **plays fine** |

**Verified:** constructed a `<video>` for each URL against the live origin —
the first four fired `onerror` with `readyState: 0`; `moov.mp4` reached
`readyState: 4`.

So hovering the moo.v card downloaded ~15 MB to display nothing, while a working
MP4 of the same content already sat in `public/work/` unreferenced.

**Fix applied** — the data field was renamed `previewgif` → `preview` (it is no
longer a GIF), the two projects with real footage now point at the existing
MP4s, and `workCard` picks its element from the file type:

```jsx
const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);
```

Video previews also gained `preload="none"`, so nothing downloads until hover.

**Verified:** hovering each of the four cards on the built bundle —

| Card | Element | Source | Result |
|---|---|---|---|
| LODE | `<img>` | `lode-login.png` | loaded, 1236px natural width |
| moo.v | `<video>` | `moov.mp4` | playing, `readyState 4`, 1258×906 |
| QORUM | `<img>` | `qorum-home.png` | loaded, 1743px natural width |
| Paws & Relax | `<video>` | `paws.mp4` | playing, `readyState 4` |

Side effect: `moov.gif` (14.76 MB) and `paws.gif` (8.83 MB) are now
unreferenced, so finding 6's dead-file total becomes **34.12 MB** while
`moov.mp4` and `paws.mp4` move out of it.

### 3. ✅ `moo.v` "View Live" links to a placeholder — **fixed**

`src/data/projects.js` carried `link: "https://example.com/sunset-showdown"`,
left over from the removed Sunset Showdown entry. The button rendered and went
nowhere.

**Fix applied** — the `link` key was removed, so the "View Live" button no
longer renders for moo.v. "View GitHub" and "View Figma" are unaffected.
**Verified:** the detail page now shows exactly those two buttons and the string
`example.com` no longer appears anywhere in the rendered DOM.

If moo.v does have a live deployment, add the `link` key back with the real URL
and the button returns on its own.

#### 2a. ⏳ QORUM and LODE still have no motion preview — **open (owner to record)**

The two strongest projects are the two without footage. `moov.mp4` and
`paws.mp4` exist because those were screen-recorded at some point; nothing
equivalent was ever made for QORUM or LODE, so both fall back to a still — and
both currently point at the same file as their thumbnail, so hovering shows
exactly what was already on screen.

**To do:** record two short clips (10–15s, no audio, no narration) of QORUM and
LODE in use, drop them in `public/work/`, and point each project's `preview`
at the new file. One line per project.

Until then, two cheaper improvements are available:

- **Better stills.** LODE previews `lode-login.png`, a login form, and QORUM
  previews `qorum-home.png`, the public marketing page. `lode-dispatch.png` and
  `qorum-admin.png` show the actual products. LODE's *thumbnail* is the login
  screen too, which undersells it on the works grid.
- **Crossfade the gallery.** Both projects already have three to four interior
  screenshots. Cycling them in the tooltip gives motion without a recording.

---

## P1 — Payload

The site ships roughly **75 MB** of assets. Most of it is never seen.

### 4. 19 MB background video, downloaded on mobile too

`src/assets/bg.mp4` is 19.19 MB, bundled through Vite and autoplayed on every
route. `PersistentBackground` tries to skip it on mobile:

```jsx
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  setIsMobile(window.matchMedia("(max-width: 768px)").matches);
}, []);
```

`useState(false)` means the first render *always* mounts the `<video>`, and
`useEffect` only runs after commit. The request is already in flight by then.

**Verified:** at a 375×812 viewport on the live site, three `206 Partial
Content` requests for `bg-DXsoTdQ0.mp4` fire before being aborted.

Fixes, in order of value:

- Read the media query in a lazy initializer so the element never mounts on
  mobile: `useState(() => window.matchMedia("(max-width: 768px)").matches)`.
- Re-encode. 19 MB is far beyond what a background loop needs — H.264 at a
  lower bitrate plus a WebM/AV1 alternate should land under 2 MB.
- Add `preload="metadata"` and a `poster` so the first frame paints before the
  video is buffered.
- Add a `change` listener on the media query — right now rotating a tablet
  never re-evaluates.
- Respect `prefers-reduced-motion`.

### 5. 3.7 MB overlay texture rendered at 10% opacity

`src/assets/overlay.jpg` is 3.74 MB and used purely as decoration:

```jsx
style={{ backgroundImage: `url(${overlayImage})`, opacity: 0.1 }}
```

A full-bleed photographic JPEG for a barely-visible grain layer. A small
tileable WebP at `background-repeat` would do the same job in single-digit
kilobytes — a ~99% reduction with no visible difference at 10% opacity.

### 6. 34.1 MB of unreferenced files in `public/work/`

Nothing imports these, but they are copied into `dist/` and uploaded on every
deploy. Updated after the finding 2 fix — the two MP4s are now in use, and the
two GIFs they replaced are not:

| File | Size |
|---|---|
| `moov.gif` | 14.76 MB |
| `paws.gif` | 8.83 MB |
| `port.gif` | 6.77 MB |
| `sunsetpreview.gif` | 1.94 MB |
| `qorum-thumbnail.png` | 1.20 MB |
| `sunset.png`, `figma.png`, `ss2.png`, `lode-thumbnail.png`, `ss1.png` | 0.62 MB |
| **Total** | **34.12 MB** |

All leftovers from removed projects or superseded by the MP4s. Deleting them is
safe but destructive, so it has been left for you rather than done here.

### 7. Fonts ship as TTF/OTF

`src/index.css` loads three faces as `.ttf` / `.otf`, totalling 214 KB. WOFF2
typically cuts that by 60–70% for the same glyphs. `font-display: swap` is
already set correctly.

Two further wins:

- Preload the body face (PP Editorial New Ultralight) — it renders `h1`, `h2`,
  `p`, `a`, and `li`, so it is on the critical path for every page.
- Subset to Latin. These are display faces on an English-only site.

`src/assets/fonts/editorial/` also holds five weights that are never imported
(~300 KB in git, not in the bundle).

### 8. No code splitting

The build emits one 440 KB chunk (150 KB gzipped). Every visitor downloads all
four pages, the lightbox, DOMPurify, and the whole icon set before the landing
page paints.

`React.lazy` + `Suspense` per route would move `WorkDetailPage` (the lightbox,
the gallery, DOMPurify) and `AboutPage` (the `react-icons` set) out of the
initial chunk. Vite will also emit a separate `react-vendor` chunk with a small
`manualChunks` entry.

---

## P2 — Runtime cost

### 9. The noise canvas never stops and never cleans up

`src/components/ui/Noise.jsx` runs a permanent `requestAnimationFrame` loop.
Every second frame it regenerates a 250×250 noise pattern — 62,500
`Math.random()` calls and 250,000 typed-array writes, ~30 times a second — then
repaints the full viewport (on a 2× display, ~3.7M pixels).

Three separate problems:

- **No cancellation.** The cleanup only removes the resize listener:

  ```jsx
  return () => { window.removeEventListener("resize", resize); };
  ```

  The rAF id is never stored and never cancelled, so the loop outlives unmount
  and keeps drawing into a detached canvas.
- **Runs on mobile.** Unlike the video, the grain has no viewport gate. It is a
  constant battery drain on the devices least able to afford it.
- **Pattern rebuilt per frame.** `ctx.createPattern(patternCanvas, "repeat")` is
  called inside `drawGrain` on every draw; it only needs creating once.

Also, `ctx.scale(patternScaleX, patternScaleY)` inside `resize` compounds across
resizes because the context transform is never reset. Both scales are currently
`1`, so nothing shows — but it will bite the moment they are not.

Cheap mitigations that change nothing visually: store and cancel the rAF id,
skip the loop below 768px, honour `prefers-reduced-motion`, and hoist the
pattern out of the draw call.

### 10. Tooltip effect writes the state it depends on

`workCard.jsx:29-49` — a `useEffect` keyed on `tooltipPosition` calls
`setTooltipPosition` inside its own body. Each mouse move schedules a render,
which re-runs the effect, which can schedule another. It settles because the
clamps become no-ops, but it is doing 2–3× the renders it needs and is one
edge-case away from looping.

Clamping the position inside `handleMouseMove`, using the ref's measured size,
removes the effect entirely.

### 11. `<style jsx>` is Next.js syntax that does nothing here

`workCard.jsx:113` uses styled-jsx syntax. There is no styled-jsx in this
project, so the scoping never happens: React renders a plain global `<style>`
tag (confirmed — one `<style>` in the document, zero with a `jsx` attribute) and
logs a non-boolean-attribute warning in development. The keyframes are also
re-injected on every `WorksPage` mount.

Move the four `float-animation-*` classes into `src/index.css`.

### 12. DOMPurify sanitizes static, self-authored content on every render

`WorkDetailCard` runs `DOMPurify.sanitize()` on four HTML strings from
`projects.js` on every render. That content is authored by you, compiled into
the bundle, and can never contain user input — so this is ~20 KB of library plus
repeated DOM parsing guarding against a threat that does not exist.

Keeping DOMPurify is defensible as belt-and-braces. If you keep it, at least
`useMemo` the four calls on `project.id` so they run once per project rather
than once per render.

### 13. ✅ Layout remounts on every navigation — **fixed**

A consequence of finding 1's structure: `key={location.pathname}` on `<Routes>`
tore down and rebuilt `Layout`, `Header`, `Navigation`, and `Footer` on each
route change. Resolved by the finding 1 fix — the key now sits on the
`motion.div` around `<Outlet />`, so only the page content cycles.

---

## P3 — SEO and delivery

Items 14–16 are **already fixed** in this working tree; the rest are open.

### 14. ✅ No meta description in the served HTML

The deployed `index.html` was 530 bytes with no description, so Google's result
for laust.ca showed a bare title and no snippet. Metadata was rendered only by
React 19 after hydration, which crawlers index inconsistently at best.

Fixed by moving the full tag set into static `index.html` and adding a
`useSeo()` hook that rewrites those same tags per route. See "Changes applied"
below.

### 15. ✅ `robots.txt` and `sitemap.xml` returned HTML

Both returned `200` with the contents of `index.html`, because the `.htaccess`
SPA rewrite catches any path that is not a real file. Google was fetching a
robots.txt that was an HTML document, and there was no sitemap at all. Real
files now exist in `public/`, and the rewrite's `!-f` condition serves them
correctly.

### 16. ✅ No canonical tags

Added, pointing at the apex domain.

### 17. `laust.ca` and `www.laust.ca` both serve 200

Neither redirects to the other, so the site is reachable at two hostnames with
identical content. Google has indexed the apex, which is why the canonical tags
now point there — but the proper fix is a 301 at the server:

```apache
RewriteCond %{HTTP_HOST} ^www\.laust\.ca [NC]
RewriteRule ^(.*)$ https://laust.ca/$1 [L,R=301]
```

This has **not** been applied — it touches live routing, so it is your call.

### 18. Unknown URLs return 200 with a blank page

There is no catch-all route. `/nonsense` matches nothing, so `<Routes>` renders
nothing and the visitor gets the background with no content — served with a
`200`. Search engines treat this as a soft 404. A `<Route path="*">` with a
"not found" page and a `noindex` meta tag fixes it.

### 19. No `Cache-Control` on media

The JS bundle gets `public, max-age=604800`. `bg-DXsoTdQ0.mp4` gets **no**
`Cache-Control` header at all, so a 19 MB file is revalidated far more often
than it should be.

Since Vite content-hashes filenames, hashed assets can safely be immutable for a
year, while `index.html` must never be cached:

```apache
<FilesMatch "\.(js|css|mp4|webm|woff2|jpg|png|gif|svg)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>
<FilesMatch "index\.html$">
  Header set Cache-Control "no-cache"
</FilesMatch>
```

Note that files in `public/work/` are **not** hashed, so they need a shorter
max-age or a manual cache-bust on change.

### 20. Missing accessibility affordances

- `Header.jsx:52` — `aria-label="Stop background video"` is hard-coded, so
  screen readers announce "Stop" even when the button reads "Start Train".
  Derive it from `isPlaying`.
- The lightbox in `WorkDetailCard` has no focus trap, no `role="dialog"`, and no
  `aria-label` on its close and arrow buttons. Focus is not restored to the
  triggering thumbnail on close.
- Gallery thumbnails open the lightbox from an `onClick` on a `<div>` — not
  focusable and not keyboard-reachable. A `<button>` would fix both.

---

## P4 — Tooling and hygiene

### 21. `npm run lint` fails

Five errors, three of them false positives:

```
src/App.jsx:8                        'useRef' is defined but never used   ← real
src/components/layout/Layout.jsx:2   'motion' is defined but never used   ← false
src/components/ui/Cursor.jsx:2       'motion' is defined but never used   ← false
vite.config.js:15,16                 '__dirname' is not defined           ← real
```

The `motion` errors are a config gap: `eslint-plugin-react` is not installed, so
ESLint has no `react/jsx-uses-vars` rule and cannot see identifiers used inside
JSX. Adding the plugin removes them.

`useRef` in `App.jsx:8` is genuinely unused — drop it.

### 22. `__dirname` in an ESM config file

`vite.config.js` uses `__dirname` while `package.json` sets `"type": "module"`.
It works today only because Vite transpiles the config to CJS before running it.
The portable form:

```js
import { fileURLToPath } from "node:url";
const __dirname = fileURLToPath(new URL(".", import.meta.url));
```

Related: the alias `"/@assets/"` in `resolve.alias` is not referenced anywhere.

### 23. Unused dependencies

| Package | Status |
|---|---|
| `react-helmet` | Never imported — one commented-out line in `AboutPage`. Also unmaintained and unsupported on React 19. Now fully superseded by `useSeo`. |
| `autoprefixer` | No PostCSS config exists; Tailwind v4's Vite plugin handles prefixing. |
| `postcss` | Same. |

### 24. Documentation drift

`BRIEF.md` still lists React Helmet as the SEO layer and describes tooltip
previews as working `<video>` elements. Both are now inaccurate. `BRIEF.md` and
`ref/` are gitignored, so they only drift further.

---

## Changes applied in this pass

Findings **1, 2, 3, 13, 14, 15, 16** are fixed. Beyond the numbered findings, this session also added corner-pinned project titles with mouse-driven parallax, fixed the tooltip's contrast, and rewrote all four case studies for a hiring audience — none of these were in the original numbered list, since they came from later requests in the same session rather than the initial audit. See the changelog below for detail. Everything else in the numbered findings is reported, not changed.

| File | Change |
|---|---|
| `src/App.jsx` | `AnimatePresence` removed; `<Routes>` no longer keyed by pathname. Dropped unused `useRef` and the now-redundant `useLocation` |
| `src/components/ui/workCard.jsx` | Hover preview picks `<video>` or `<img>` from the file extension; video gained `preload="none"` |
| `src/data/projects.js` | `previewgif` → `preview`; moo.v and Paws point at the working MP4s; removed moo.v's placeholder `link`. Reordered to QORUM, LODE, moo.v, Paws & Relax |
| `src/components/layout/Layout.jsx` | `AnimatePresence mode="wait"` moved here, wrapping the `motion.div` and keyed on `location.pathname`. Variants hoisted out of the component body. Added `FrozenOutlet` so the outgoing wrapper holds its own route (finding 1a) |
| `index.html` | Full static meta set: description, keywords, author, robots, canonical, Open Graph, Twitter Card, plus JSON-LD `Person` structured data |
| `src/hooks/useSeo.js` | **New.** Rewrites the existing head tags per route rather than rendering new ones |
| `src/pages/HomePage.jsx` | Replaced inline `<meta>` JSX with `useSeo()` |
| `src/pages/AboutPage.jsx` | Same |
| `src/pages/WorksPage.jsx` | Same |
| `src/pages/WorkDetailPage.jsx` | Same, plus per-project title, description, and `og:image` |
| `public/robots.txt` | **New.** Allows all, points to the sitemap |
| `public/sitemap.xml` | **New.** All 7 URLs |
| `src/components/ui/workCard.jsx` (2nd pass); soft drop-shadow on the title | Corner-pinned titles + mouse-driven parallax added; card positions retuned; `overflow-hidden` moved to a thumbnail-only wrapper |
| `src/index.css` | Scoped `.case-study` spacing for the rewritten copy |
| `src/components/ui/WorkDetailCard.jsx` | Section headings renamed (Overview / Design & UX / What I Built / Hard Problems) |
| `src/components/ui/AboutInfo.jsx` | Bio copy rewritten with owner-supplied text |
| `src/components/ui/NameCard.jsx` | Slight mouse-driven parallax on the name lockup |
| `src/pages/AboutPage.jsx`; soft box-shadow on the photo | Nested mouse-driven parallax: content card drifts, photo frame drifts further on top of it (corrected from an initial image-panning approach) |

### Why a hook rather than JSX tags

React 19 hoists `<meta>` rendered from a component into `<head>`, but it does
**not** deduplicate. Keeping the page-level `<meta name="description">` on top
of the new static tag in `index.html` would have left two competing descriptions
in the document. Mutating the existing tags keeps exactly one of each while the
static markup stays intact for crawlers that never run the bundle.

**Verified:** across a full navigation cycle the document holds a constant 19
`<meta>` tags with exactly one `description`, and title, description, canonical,
and `og:image` all update per route — including per project on
`/works/:projectId`.

---

## Suggested order

1. ~~Findings 1, 2, 3 — navigation, previews, dead link~~ ✅ done.
2. ~~Corner-pinned titles, parallax, tooltip contrast, case study rewrite~~ ✅ done.
3. **Deploy.** Everything above is worth shipping in one pass. Then request
   indexing in Search Console and submit the sitemap.
4. **Record QORUM and LODE preview clips** (finding 2a) — the two strongest
   projects are the two with no motion preview.
5. Findings 4, 5, 6 — re-encode the video, shrink the overlay, delete the
   34.12 MB of dead files. This is where the megabytes are.
6. Finding 9 — the noise loop, for battery and CPU.
7. Findings 17 and 19 — the `.htaccess` redirect and cache headers.
8. The rest as cleanup.

---

## Changelog — 2026-09-06

Written up for reference when summarising the work elsewhere. Numbers are
measured, not estimated.

### Fixed: page transitions blocked every route change

`AnimatePresence mode="wait"` was wrapping `<Routes>`, but the element that
actually owned the `exit` variant — a `motion.div` — sat two levels deeper
inside `Layout`. `mode="wait"` holds the outgoing view until it is told the exit
animation has finished, and with a non-motion child that signal never arrives.
The result: the URL changed on every nav click, and the page never did.

The fix was structural rather than a workaround — move `AnimatePresence` next to
the element it is actually animating. Same transition, same 0.5s ease, and
`Header` / `Footer` / `Navigation` stopped remounting on every route change as a
side effect.

That surfaced a second defect worth its own note. Keying `<Routes>` had been
freezing the outgoing subtree by accident; keying the wrapper instead left a
live `<Outlet />` inside a wrapper that stays mounted through its exit
animation. So the incoming page rendered into the *outgoing* wrapper at full
opacity — it flashed, slid away, then animated in again.

The tell was DOM node identity: probing immediately after a nav click, the very
same node that had been showing the homepage was showing the About page at
`opacity: 1`, before any animation started. The fix pins the outgoing tree to
the route it mounted with:

```jsx
function FrozenOutlet() {
  const outlet = useOutlet();
  const frozen = useRef(outlet);
  return frozen.current;
}
```

Worth remembering as a pair: `<Outlet />` renders the *current* route, but
`mode="wait"` keeps the *previous* wrapper on screen. Those two facts are fine
alone and broken together.

- **Symptom:** clicking About or Works changed the URL, rendered nothing.
- **Scope:** every in-page navigation on the site. Deep links still worked, so
  it stayed invisible to anyone arriving from search.
- **Cause:** `AnimatePresence` cannot read an exit animation through a
  non-motion child.
- **Files:** `src/App.jsx`, `src/components/layout/Layout.jsx`.

### Fixed: Google showed no description for laust.ca

The deployed `index.html` was **530 bytes** and contained no meta description.
All metadata was rendered by React 19 after hydration, which crawlers index
inconsistently — so the search result was a bare title with no snippet.

Fixed by splitting the job: a complete static tag set in `index.html` for
crawlers, and a `useSeo()` hook that rewrites those same tags on route change
for humans and link unfurlers.

The hook mutates existing tags rather than rendering `<meta>` from components,
because React 19 hoists metadata into `<head>` but does **not** deduplicate it —
rendering page-level tags on top of static ones leaves two competing
descriptions in the document.

- **Before:** 530-byte HTML shell, no description, no canonical, no sitemap.
  `robots.txt` and `sitemap.xml` both returned the HTML page with a `200`,
  because the SPA rewrite swallowed them.
- **After:** full static meta set + JSON-LD `Person`, real `robots.txt` and
  `sitemap.xml`, canonical tags, and unique titles/descriptions/`og:image` per
  route — including one per project on `/works/:projectId`, which turns 4 case
  studies into 4 indexable pages.
- **Verified:** constant 19 `<meta>` tags across a full navigation cycle, with
  exactly one description at all times.

### Fixed: hover previews downloaded megabytes to render nothing

The project tooltips fed `.gif` and `.png` files into a `<video>` element. A
`<video>` can only decode real video, so all four previews failed silently — the
file downloaded, the element stayed blank, no console error. Hovering the moo.v
card pulled **14.76 MB** to show an empty box.

The working MP4s were already in the repo, unreferenced. The fix picks the
element from the file type rather than assuming one:

```jsx
const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);
```

Two projects now play MP4s, two render stills, and video previews carry
`preload="none"` so nothing downloads until hover. The misleading `previewgif`
field was renamed `preview`.

- **Before:** 4/4 previews blank; 23.59 MB of GIFs downloaded for nothing.
- **After:** 4/4 render; MP4s reach `readyState 4` and play, stills load.
- **Knock-on:** the two GIFs are now dead weight, taking `public/work/`'s
  unreferenced total to **34.12 MB**.

Also removed a placeholder `link` on moo.v — `https://example.com/sunset-showdown`,
left over from a deleted project — that rendered a "View Live" button going
nowhere.

### Added: corner-pinned project titles on the works canvas

Each project name is now set in Editorial Ultralight and centred on the corner
of its card that faces away from the middle of the composition — the corner is
derived from the card's own slot (`cornerFor()`), not stored per project, so
moving a card to a different quadrant moves its label with it. Roughly three
quarters of the word overhangs the square rather than sitting inside it.

Card positions were retuned to give each label clear space, and the works
stage's `overflow-hidden` moved from the card link down onto a thumbnail-only
wrapper, since the title deliberately needs to spill outside the square.

**Verified:** on the built bundle, all four labels measured `offsetFromCornerPx: 0`
against their card's outward corner, with the expected corner assignment for
each (QORUM top-left, LODE top-right, moo.v bottom-left, Paws & Relax
bottom-right). Confirmed at 800px, 1280px, and 1600px with no off-screen
labels, and confirmed the mobile grid is untouched (desktop-only by design).

### Fixed: hover tooltip had no scrim, so bright screenshots washed out the text

The tooltip's dark background sat *behind* the preview media, which is
absolutely positioned to cover the whole tooltip — so a bright screenshot (like
QORUM's white marketing page) had no scrim under the neon title and white body
text at all. This is the contrast problem the site owner flagged directly.

Added a dedicated scrim layer between the media and the text (`bg-black/65`).
**Verified:** worst case (a pure-white screenshot under the scrim) now measures
**6.2:1** for the neon title and **7.0:1** for body copy — both clear WCAG AA's
4.5:1 threshold for normal text.

### Rewritten: all four case studies, for a hiring audience rather than a critique

Section headings changed from Concept & Vision / Design & Planning /
Development & Implementation / Challenges & Learnings to **Overview / Design &
UX / What I Built / Hard Problems**. Content was rewritten to lead with scope,
status, and ownership rather than design intent, and the challenges sections
now describe concrete engineering problems (QORUM's RLS recursion fix, LODE's
eight-role permission model) instead of personal growth narrative. Detail was
pulled from the project's own `ref/` briefs that had never made it onto the
site.

Tailwind's reset had zeroed every margin, so the restructured copy (lead
paragraph followed by a labelled list) rendered as one unbroken block. Added
scoped `.case-study` spacing in `index.css` to fix it.

**Not fixed, left for the owner:** the `<b>` labels inside each list item are
not visibly bold, because only the Ultralight weight of PP Editorial New is
registered — the browser synthesises a fake bold from an ultralight face,
which barely reads. The Ultrabold file already exists in the repo, unused.
Registering it would fix the labels, but `h2 { font-weight: bold }` elsewhere
in the CSS means it would also change every heading site-wide, so this is a
design call rather than a bug fix.

### Added: mouse-driven parallax between the thumbnail and its title

The two layers on each work card — the thumbnail (layer 1) and the
corner-pinned title (layer 2) — now drift independently based on cursor
position over the whole works canvas, on both axes, so movement is diagonal
wherever the cursor is rather than only vertical. The title drifts about 3×
further than the thumbnail beneath it; that differential, not the absolute
distance, is what reads as depth. Driven by a shared Framer Motion spring
(same feel as the existing custom cursor) so it settles rather than snapping,
and eases back to centre when the cursor leaves the canvas. The existing float
animation is untouched — it lives on the card wrapper via CSS keyframes, while
the parallax drives the image and title inside it via a separate `transform`.

**Verification took a detour worth recording.** Two independent test methods
(synthetic `dispatchEvent`, and the browser pane's `hover` action) produced
contradictory, apparently sign-flipped readings. Rather than patch based on
guesswork, the motion values were exposed directly and driven with fixed test
inputs, bypassing event simulation entirely — this isolated the fault to the
spring's *output* never advancing, while its *input* updated normally. Root
cause: this environment's browser pane reports `document.hidden: true`, which
suspends `requestAnimationFrame`, the mechanism Framer Motion's spring runs on
— the same limitation already identified during the page-transition fix.
Re-tested with the same rAF shim used then (injected into the built HTML
ahead of the bundle, for testing only), and the output matched hand
calculation to the decimal in all four directions — left, right, and both
diagonals. Debug hooks were removed before the final build, which was diffed
clean.

### Rewritten: About page bio copy

Replaced with owner-supplied copy pairing prior video-production and freight-
logistics experience with the current front-end/UX focus, and naming QORUM
directly as shipped, in-production work. Both cities (Vancouver and Toronto)
now appear in the visible body copy, not just metadata — closing the gap
flagged earlier in the session, where the JSON-LD and meta descriptions
already covered both but the on-page text still read Vancouver only.

**Verified:** on the built bundle, the text overflows its scrollable container
by only 38px at a 1280px viewport (functionally invisible), confirming the
new copy fits the space about as tightly as the original despite covering more
ground. Mobile shows more scroll, but that's pre-existing — the container was
already a fixed-height, scroll-on-overflow box before this edit (same pattern
as the FAQ box below it), and word count is comparable to the copy it
replaced.

**Revised once more** in the same session — two small wording changes
("and I wouldn't have it any other way" in place of "and that's the point";
the Thinkific sentence reworded to "on the ground floor before they became as
big as they are now"). Second paragraph unchanged. Same length, same fit.

### Added, then corrected: mouse-driven parallax on the landing name and the About page

Extended the works-canvas technique to the two other pages with a clear
candidate for it, but not identically — each got the layering that actually
fits its content.

- **Landing page:** the name and subtitle read as one lockup, not two
  independent layers the way a Works card's thumbnail and overhanging title
  do. Splitting them into separate drift rates risked reading as
  misalignment rather than depth, so the whole block moves as a single slight
  drift (`±10px`) against the fixed background video — foreground text over a
  static backdrop, tracked across the full landing viewport.
- **About page — first attempt (corrected below):** the profile photo initially
  got the Works-thumbnail treatment verbatim — the image panned *inside* its
  frame, with the frame itself scaled up to cover the pan. The site owner
  flagged this as wrong: the frame should be what moves, not the photo inside
  it, and the grey content card around the whole page should drift too. Both
  are fair — a photo panning inside a static frame reads as a windowed crop
  effect, not depth, and a single moving element with nothing else on the page
  responding to the cursor doesn't read as a layered scene.
- **About page — corrected:** now two nested layers on a shared cursor
  position. The grey content card drifts `±6px`; the profile photo's frame —
  a child of that card — drifts a further `±16px` **on top of** the card's own
  drift, since the two transforms compose through normal DOM nesting rather
  than needing to be summed manually. That composition is what makes it read
  as genuine depth: page → card → photo, each layer moving more than its
  parent. The photo no longer scales at all — it moves as one rigid frame,
  image included, so there is no clipped edge to cover and nothing left to
  gate behind hover support (the earlier `matchMedia("(hover: hover)")` check
  existed solely to avoid a permanent crop from the old scale-based approach,
  which no longer applies). Body copy, tech-stack icons, and the FAQ still stay
  static — the card's own drift is enough ambient motion without also panning
  paragraph text against its own scroll.

**Verified the correction on the built bundle:** dispatching a mouse move to
the far corner of the stage and reading both elements' transforms directly —
the card's own transform (`5.86px, -5.82px`) and the photo frame's own
transform (`15.63px, -15.63px`) are each independently correct for their
constants, and the photo's **on-screen** position moved by their sum
(`21.49px, -21.35px`), confirming the nesting composes rather than one
overriding the other. Also confirmed the `<figure>` element itself now carries
the background image directly (zero children, no `overflow-hidden`) — there is
no separate inner layer left panning independently inside it.

### Added: drop shadows on the nearer parallax layers

Requested as a follow-up once the layering above was corrected: a subtle
shadow on the layer that's meant to read as closer, both to reinforce the
depth cue and to help legibility.

- **Works title.** `filter: drop-shadow(0 4px 6px rgba(0,0,0,0.6))` on the
  corner-pinned title span. This stage sits inside `mix-blend-difference`
  (`WorksPage.jsx`'s wrapper `div`), so the shadow's own rendered color gets
  inverted along with everything else there — worth flagging since a blend
  mode can make an ordinary shadow render unpredictably. Checked visually
  rather than assumed: it reads as a soft dark lift behind the letters against
  both the dark canvas and the lighter thumbnails (QORUM), with no colour
  artifacts from the blend.
- **About page photo.** Replaced the pre-existing `shadow-xl` Tailwind
  utility — `0 20px 25px -5px rgba(0,0,0,0.1)`, already fairly diffuse — with
  an inline `boxShadow: "0 18px 30px -10px rgba(0,0,0,0.35)"` for more
  deliberate control over the value. The About page has no blend mode, so this
  one behaves exactly as written.

Neither shadow moves with the parallax itself — both are fixed, so the effect
stays exactly as subtle as asked rather than adding a second axis of motion on
top of the drift that's already there.

### Audited, not yet changed

Measured while auditing, kept here as the backlog:

| Finding | Measurement |
|---|---|
| Background video | **19.19 MB**, and mobile downloads it anyway — `useState(false)` mounts the `<video>` before the effect can skip it |
| Overlay texture | **3.74 MB** JPEG rendered at 10% opacity |
| Unreferenced files in `public/work/` | **34.12 MB** deployed on every push (after the preview fix freed the two GIFs) |
| Noise canvas | 62,500 `Math.random()` calls ~30×/sec, never cancelled on unmount, no mobile gate |
| JS bundle | one 440 KB chunk (150 KB gzipped), no code splitting |

Total asset payload: roughly **75 MB**.
