export const projects = [
  {
    id: "qorum",
    title: "QORUM",
    shortDescription:
      "Multi-tenant SaaS for professional associations, live in production at qorum.ca",
    concept: `<p>QORUM is an association management platform — event registration, member records, email campaigns, and site administration in one product. It runs in production at qorum.ca, where the SFPE Prairies Provinces Chapter uses it to run a membership and event programme that previously lived in spreadsheets and inboxes.</p>
    <p>I built it solo, end to end: product design, interface, database schema, and application code. A single codebase serves every client organisation, each with its own branding and its own isolated data.</p>
    <ul>
    <li><b>Status: </b>Live, with a real organisation running day-to-day operations on it.</li>
    <li><b>Scope: </b>Around 25 routes across three access levels — public, member, and admin.</li>
    <li><b>Model: </b>Multi-tenant from the schema up. New client means a new organisation record, not a new deployment.</li></ul>`,

    design: `<p>The product is really three interfaces with different jobs, and most of the design work was deciding how much they should resemble each other.</p>
    <ul>
    <li><b>Public site: </b>Editorial and light, carrying each organisation's logo and brand colours. This is the page a prospective member judges the chapter by, so it reads as the client's site rather than as software.</li>
    <li><b>Member portal: </b>Card-based dashboard leading with what a member actually returns for — upcoming events, membership status, and renewal prompts.</li>
    <li><b>Admin console: </b>Sidebar navigation across Members, Events, News, Email, Media, Reports, and Customisation. Denser than the other two surfaces, because the people using it are working, not browsing.</li>
    <li><b>Built for non-technical admins: </b>Chapter organisers are volunteers, not operators. Destructive actions confirm, empty states explain what to do next, and content is edited through a rich-text editor rather than raw HTML.</li>
    <li><b>Theming without code: </b>Brand colours, logo, email header styling, and footer text are configuration, not a fork. A new client is reskinned through the admin panel.</li></ul>`,

    development: `<p>Next.js App Router with React Server Components, on a shared Postgres database where every row is scoped to an organisation.</p>
    <ul>
    <li><b>Front end: </b>Next.js 16 App Router, React Server Components, Tailwind CSS v4 with brand tokens driven per organisation, Tiptap for rich text, Luxon for timezone-correct event scheduling.</li>
    <li><b>Events: </b>The full lifecycle — creation, ticket types (free or paid, member-only or public), a registration flow with per-event custom questions, registrant management, and automated post-event email.</li>
    <li><b>Email: </b>Campaigns, subscriber lists, reusable templates, and transactional sends through Resend, all rendering with the sending organisation's branding.</li>
    <li><b>Data layer: </b>Supabase for Postgres, Auth, and Storage, with Row Level Security enforcing tenant isolation in the database rather than in application code.</li>
    <li><b>Admin surface: </b>Media library, reports, homepage widget configuration, and editable About and Contact pages, so the client can run the site without me.</li></ul>`,

    challenges: `<p>Two problems shaped the architecture, and both had to be solved before the product could work at all.</p>
    <ul>
    <li><b>Recursive security policies: </b>Row Level Security policies needed to know which organisation the current user belongs to, which meant querying the members table — but that table's own policy asked the same question, so Postgres recursed infinitely. Solved with <code>SECURITY DEFINER</code> helper functions that resolve org and admin status outside the policy evaluation, breaking the cycle without weakening isolation.</li>
    <li><b>One template model, three delivery paths: </b>Campaigns, post-event automations, and transactional mail all needed per-organisation branding. Building them separately would have meant maintaining three near-identical rendering paths, so they share a single template model and differ only in what triggers a send.</li>
    <li><b>Multi-tenancy is an interface problem too: </b>Isolating data is the easy half. The harder half is an admin surface where a volunteer can rebrand an entire site without ever seeing that other tenants exist.</li></ul>`,
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Stripe",
      "Resend",
      "Vercel",
    ],
    images: {
      thumbnail: "/work/qorum-home.png",
      gallery: [
        "/work/qorum-admin.png",
        "/work/qorum-portal.png",
        "/work/qorum-event.png",
      ],
      preview: "/work/qorum-home.png",
    },
    link: "https://qorum.ca/",
  },
  {
    id: "lode",
    title: "LODE",
    shortDescription:
      "An operations platform replacing legacy dispatch software at a freight company",
    concept: `<p>LODE replaces the legacy software a freight company ran its business on. It covers the whole operation — dispatch, warehouse intake, driver workflows on the road, and a public tracking page for customers — in one system, built to be resold to other carriers later.</p>
    <p>The brief came from watching how the company actually worked. Logistics staff were retyping customer emails into a decades-old system, warehouse teams hand-wrote dimension sheets and physically carried them to the office, and shipment status was updated by hand or not at all.</p>
    <ul>
    <li><b>Users: </b>Eight roles, from dispatchers and warehouse staff to drivers on phones and customers who never log in.</li>
    <li><b>Scope: </b>Two operational systems — local delivery jobs and AWB freight shipments — that hand off to each other at several points.</li>
    <li><b>Architecture: </b>Multi-tenant from the first migration, so the second customer does not require a rewrite.</li></ul>`,

    design: `<p>A dense operations tool, designed for people who stare at it for a whole shift rather than visit it occasionally. Clarity and speed matter more than personality here, and almost every decision followed from that.</p>
    <ul>
    <li><b>Dark by default: </b>Dispatchers work long shifts in front of this screen. The dark interface is an ergonomic decision, not a stylistic one, and operators can set their own accent colour from seven options.</li>
    <li><b>Dispatch board: </b>A three-column board — Unassigned, Assigned, Completed — with driver assignment and job detail inline, so a dispatcher never loses the overview to see a detail.</li>
    <li><b>One login, eight interfaces: </b>A driver on a phone at a loading dock and an accountant reviewing billing share an auth system and see almost nothing in common. The UI adapts to the role rather than hiding buttons the user cannot press.</li>
    <li><b>Mobile as a first-class surface: </b>Built as an installable PWA so drivers add it to a homescreen and get a full-screen app with no browser chrome and no app store.</li>
    <li><b>Density that earns its place: </b>The dashboard puts driver availability, job counts, week-over-week movement, and system health in a single view, because that is the view a manager checks first.</li></ul>`,

    development: `<p>React and Vite as an installable PWA, with Supabase providing Postgres, auth, realtime, and file storage. Zustand handles client state.</p>
    <ul>
    <li><b>Front end: </b>React, Vite, Tailwind CSS, Zustand for state, PWA manifest and service worker for installability, Google Maps for the live driver map.</li>
    <li><b>Dispatch and jobs: </b>Job creation from a customer request through to assignment, driver status updates, on-screen signature capture, and delivery photos attached to the job record.</li>
    <li><b>Warehouse and shipments: </b>AWB barcode scanning into warehouse locations, customs status tracking, dimension sheets captured in-app and generated as PDFs, and a release flow for third-party drivers.</li>
    <li><b>Realtime: </b>Supabase subscriptions keep the dispatch board and driver statuses current without polling.</li>
    <li><b>Public tracking: </b>Customers check status and download proof of delivery through a token-scoped page with no account and no login.</li>
    <li><b>Security at the database: </b>Row Level Security scopes every query by tenant and role, so a driver cannot read another driver's jobs even with a hand-written request.</li></ul>`,

    challenges: `<p>Building against a live business meant the hard parts were rarely the ones I expected.</p>
    <ul>
    <li><b>Multi-tenancy has no retrofit: </b>Every table, policy, and query had to be tenant-scoped from the first line. Adding it later would have meant rewriting the data layer, so it went in before there was a second customer to justify it.</li>
    <li><b>Eight roles without eight codebases: </b>The same routes serve wildly different permissions and views. Getting that from one component tree, rather than duplicating screens per role, took several passes at the routing and permission model.</li>
    <li><b>Two systems that touch: </b>Jobs and shipments are independent workflows that link at multiple points — an import spawning a last-mile delivery, an export pickup creating a shipment. Modelling those relationships without making either system depend on the other took several schema revisions.</li>
    <li><b>Requirements that moved: </b>What the office described and what the warehouse actually did were not the same process. A lot of the work was discovering the real workflow and reshaping the interface around it.</li></ul>`,
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Supabase",
      "PostgreSQL",
      "Zustand",
      "PWA",
      "Google Maps API",
    ],
    images: {
      thumbnail: "/work/lode-login.png",
      gallery: [
        "/work/lode-dashboard.png",
        "/work/lode-dispatch.png",
        "/work/lode-dimsheets.png",
        "/work/lode-settings.png",
      ],
      preview: "/work/lode-login.png",
    },
    link: "https://trucking-topaz.vercel.app/",
  },
  {
    id: "moov",
    title: "moo.v",
    shortDescription:
      "A movie discovery interface built with the TMDb API, in a team of three",
    concept: `<p>A movie discovery app built with two other developers, aiming for something closer to a well-set gallery than a database front end. Most film libraries lead with metadata; moo.v leads with the posters and reveals detail as you reach for it.</p>
    <ul>
    <li><b>Team: </b>Three developers. I owned the interactive movie cards, search, and the favourites system.</li>
    <li><b>Premise: </b>Show less by default. Runtime, rating, and synopsis appear on hover or tap rather than competing with the artwork.</li></ul>`,

    design: `<p>Designed in Figma before any components were written, then refined against feedback from people outside the team.</p>
    <ul>
    <li><b>Component library: </b>A shared Figma library so three developers building in parallel produced one consistent interface rather than three dialects of it.</li>
    <li><b>Progressive reveal: </b>Cards carry only the poster and title at rest. Detail surfaces on interaction, which keeps a dense grid readable.</li>
    <li><b>Restraint: </b>Neutral palette with brown accents, sans-serif headings, and generous spacing, so the artwork supplies the colour.</li>
    <li><b>Touch and pointer parity: </b>Hover reveals needed a tap equivalent that did not trap mobile users in a state they could not exit.</li></ul>`,

    development: `<p>React with React Router against the TMDb API. My work covered the card interactions, search, and client-side persistence.</p>
    <ul>
    <li><b>Interactive cards: </b>The hover and tap reveal behaviour, including the transitions between states and the touch fallback.</li>
    <li><b>Search: </b>Live search against TMDb with debounced input, loading and error states, and custom pagination for large result sets.</li>
    <li><b>Favourites: </b>Global favourites state via React Context, persisted to localStorage so a list survives a refresh without a backend.</li>
    <li><b>Accessibility: </b>Keyboard navigation through the grid and card states, so the interface does not depend on a mouse.</li>
    <li><b>Working in parallel: </b>Documented component interfaces so three people could build against each other's work without blocking.</li></ul>`,

    challenges: `<p>The interesting problems were about interaction state rather than the API itself.</p>
    <ul>
    <li><b>Hover has no touch equivalent: </b>A reveal that feels natural with a pointer becomes a trap on a phone. The card state machine had to work for both without a separate mobile build.</li>
    <li><b>Search that does not thrash: </b>Every keystroke firing a request made the UI stutter and wasted quota. Debouncing plus cancelling superseded requests fixed both.</li>
    <li><b>Shared state across a grid: </b>Favourites had to stay in sync across every card, the detail view, and the favourites page. Context solved it, but deciding what belonged in global state and what stayed local took some unpicking.</li>
    <li><b>Cleanup: </b>Async calls resolving after unmount produced state updates on dead components. Effect cleanup and abortable requests removed a whole class of warnings.</li></ul>`,
    technologies: [
      "React",
      "React Router",
      "TMDb API",
      "JavaScript",
      "PHP",
      "Figma",
    ],
    images: {
      thumbnail: "/work/movie.png",
      gallery: ["/work/figma1.png", "/work/movie.png"],
      preview: "/work/moov.mp4",
    },
    github: "https://github.com/dfelices/danielle-leibrandt-ian-movie-app",
    figma:
      "https://www.figma.com/design/6SLr74GDyhZiLtIZ9X01ee/Movie-Database-Prototype-2024?node-id=0-1&t=QayONoX1pMVZaFGG-1",
  },
  {
    id: "paws",
    title: "Paws & Relax",
    shortDescription:
      "Brand identity and a custom WordPress theme for a pet massage studio",
    concept: `<p>A dog massage studio with a calm, tactile physical space and no web presence to match it. I led design and built the theme from an empty directory — no page builder, no purchased template.</p>
    <ul>
    <li><b>Role: </b>Lead UI/UX designer, and developer on the theme and its custom blocks.</li>
    <li><b>Goal: </b>Carry the feel of the room onto the screen, and get visitors from "what is canine massage" to a booked appointment without friction.</li>
    <li><b>Identity: </b>Earthy palette of terracotta, sage, and warm neutrals, with a custom SVG logo drawn for the brand.</li></ul>`,

    design: `<p>Research and wireframes in Figma first, then high-fidelity mockups, then a component inventory that became the theme's block library.</p>
    <ul>
    <li><b>Typography: </b>Montserrat for body copy and interface text, paired with Grown for headings to carry personality without costing legibility.</li>
    <li><b>Information architecture: </b>Structured around the decision a visitor is actually making, moving from what the service is, to who provides it, to booking.</li>
    <li><b>Visual hierarchy: </b>Calls to action placed where the page has already answered the question that precedes them, rather than repeated uniformly down the page.</li>
    <li><b>Modular blocks: </b>Designed as a kit of reusable sections, so the owner can rearrange pages without the design drifting.</li>
    <li><b>Responsive: </b>Laid out mobile-first, since most visitors arrive on a phone looking for hours, location, or a booking link.</li></ul>`,

    development: `<p>A custom WordPress theme built on the block editor, designed so a non-technical owner can maintain the site without breaking it.</p>
    <ul>
    <li><b>Custom blocks: </b>Built with the WordPress Block API for business details — address, phone, email — so contact information is edited in one place and stays consistent everywhere it appears.</li>
    <li><b>Templates: </b>Purpose-built templates for services, team profiles, and testimonials, each with its own content model.</li>
    <li><b>Front page: </b>A block-composed landing page arranged to lead toward booking rather than to list everything the business does.</li>
    <li><b>Commerce: </b>WooCommerce customised for appointment booking, restyled so checkout does not look like it belongs to a different site.</li>
    <li><b>Motion: </b>Scroll-triggered reveals kept subtle enough to guide attention without becoming the point.</li></ul>`,

    challenges: `<p>Most of the difficulty came from the gap between a design that looks right and a theme a client can safely edit.</p>
    <ul>
    <li><b>Freedom versus consistency: </b>The block editor lets a client change anything, including things that break the design. Deciding which controls to expose and which to lock down was the central design decision of the build.</li>
    <li><b>Font loading: </b>The display face flashed and shifted layout on load. Fixing it meant proper web formats, sensible fallbacks, and caching rather than accepting the jump.</li>
    <li><b>Navigation across breakpoints: </b>Getting one navigation pattern to work from a narrow phone to a wide desktop, without a separate mobile menu that drifts out of sync.</li>
    <li><b>Designing what I had to build: </b>Doing both roles meant every design decision arrived with its implementation cost attached — which killed a few ideas early and made the rest cheaper to build.</li></ul>`,
    technologies: [
      "WordPress",
      "PHP",
      "JavaScript",
      "Figma",
      "WooCommerce",
      "Google API",
    ],
    images: {
      thumbnail: "/work/paws.png",
      gallery: ["/work/paws1.png", "/work/paws2.png"],
      preview: "/work/paws.mp4",
    },
    link: "https://pawsandrelax.bcitwebdeveloper.ca/",
    figma:
      "https://www.figma.com/design/3fuxzvbt7udzKRtGkIiFxW/Paws-%26-Relax-Wireframe?node-id=0-1&t=MoGVUZZXB47uiLc8-1",
    github: "https://github.com/htpwebdesign/paws-relax-theme",
  },
  // Add more projects
];
