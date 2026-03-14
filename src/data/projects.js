export const projects = [
  {
    id: "lode",
    title: "LODE",
    shortDescription: "A full-stack trucking operations platform",
    concept: `<p>LODE is a full-stack operations platform built to replace legacy trucking software for a freight company, with a multi-tenant SaaS architecture designed to scale across future clients. It unifies dispatch, warehouse, driver workflows, and customer tracking in a single system.<br /><br />
    <li><b>Problem: </b>Logistics staff were manually translating emails into old software, warehouse teams were hand-writing DIM sheets, and shipment tracking was entirely manual.</li>
    <li><b>Vision: </b>A single platform covering the full freight lifecycle — from job creation through dispatch, warehouse intake, and final delivery POD.</li>
    <li><b>Architecture: </b>Multi-tenant from day one, with every table scoped by tenant_id and Supabase RLS enforcing data isolation at the database layer.</li>
    <li><b>Roles: </b>8 distinct user roles — Administrator, Management, Accounting, Logistics, Dispatcher, Driver, Warehouse Staff, and Customer — each with scoped access.</li></p>`,

    design: `<p>Designed as a dense, data-heavy operations tool with a dark interface that reduces eye strain during long shifts. The UI prioritizes clarity and speed over decoration.<br /><br />
    <li><b>Theme: </b>Dark mode with an amber accent system — operators can personalize their accent color (Ember, Teal, Cobalt, Amber, Violet, Sage, White).</li>
    <li><b>Dispatch Board: </b>Kanban-style column layout (Unassigned / Assigned / Completed) with inline driver assignment and job detail expansion.</li>
    <li><b>PWA-first: </b>Built as an installable Progressive Web App — drivers save to homescreen for a full-screen, native-feeling mobile experience without an app store.</li>
    <li><b>Density: </b>Dashboard surfaces driver availability, job counts, week-over-week stats, and system health in a single view.</li></p>`,

    development: `<p>Built with React + Vite as a PWA, backed by Supabase for database, auth, real-time, and storage. Zustand handles client state.<br /><br />
    <li><b>Stack: </b>React + Vite + Tailwind CSS (PWA), Zustand, Supabase (PostgreSQL + Auth + RLS + Storage), Google Maps API.</li>
    <li><b>Two core systems: </b>Dispatch/Jobs (local delivery lifecycle) and Warehouse/Shipments (AWB-based freight tracking) — intersecting at key handoff points.</li>
    <li><b>DIM Sheets: </b>Warehouse staff upload PDF DIM sheets directly into the platform, which are then attached to jobs or released to third-party drivers.</li>
    <li><b>RLS Security: </b>Row Level Security enforces tenant isolation and role-based access at the database layer — security is not just UI-gated.</li>
    <li><b>Real-time: </b>Supabase Realtime subscriptions keep the dispatch board and driver status live without polling.</li></p>`,

    challenges: `<p>Building a multi-role, multi-tenant operations platform presented significant architectural and UX challenges:<br /><br />
    <li><b>Multi-tenancy from scratch: </b>Every query, every RLS policy, and every UI component had to be tenant-scoped from the first line of code — retrofitting this later would have been impossible.</li>
    <li><b>Role-adaptive UI: </b>The same login flow serves 8 roles with entirely different views and permissions — designing a clean role-routing system without duplicating components took careful planning.</li>
    <li><b>Two intersecting systems: </b>Jobs and Shipments are independent workflows that can link at multiple points (an import spawning a last-mile job, an export pickup creating a shipment) — modelling these relationships cleanly required multiple schema iterations.</li>
    <li><b>PWA on mobile: </b>Getting a true full-screen, installable experience across Android and iOS without React Native required careful PWA manifest and service worker configuration.</li>
    <li><b>Real-world constraints: </b>Building against the workflows of an actual freight company meant requirements shifted as we discovered how operations actually worked vs. how they were described.</li></p>`,
    technologies: ["React.js", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "Zustand", "PWA", "Google Maps API"],
    images: {
      thumbnail: "/work/lode-login.png",
      gallery: ["/work/lode-dashboard.png", "/work/lode-dispatch.png", "/work/lode-dimsheets.png", "/work/lode-settings.png"],
      previewgif: "/work/lode-login.png",
    },
    link: "https://trucking-topaz.vercel.app/",
  },
  {
    id: "moov",
    title: "moo.v",
    shortDescription: "A responsive React web application",
    concept: `<p>A React-based movie discovery platform designed to break away from traditional movie-library aesthetics, emphasizing minimalism and visual engagement.<br /><br />
  <li><b>Vision: </b>Minimal, visually-driven interface prioritizing movies themselves</li>
  <li><b>Approach: </b>Reduce information overload with intuitive, progressive content reveal</li></p>`,

    design: `<p>Responsive UI/UX design emphasizing minimalism, usability, and interactivity.<br /><br />
  <li><b>Process: </b>Iterative Figma designs with user feedback</li>
  <li><b>Aesthetics: </b>Clean style, neutral palette with brown accents</li>
  <li><b>Typography: </b>Modern sans-serif headings, readable body fonts</li>
  <li><b>Interactivity: </b>Interactive movie cards with progressive hover/tap reveals</li>
  <li><b>Consistency: </b>Comprehensive component library for design uniformity</li></p>`,

    development: `<p>Collaborative React app integrating TMDb API for interactive movie browsing.<br /><br />
  <li><b>Role: </b>Developed interactive movie cards, real-time search, and favorites management with React Context</li>
  <li><b>Technologies: </b>React, React Router, localStorage, CSS Grid/Flexbox, React Transition Groups</li>
  <li><b>Features: </b>Responsive layouts, keyboard navigation, smooth transitions, custom pagination</li>
  <li><b>Best Practices: </b>Clean, maintainable code with clear documentation for future collaboration</li></p>`,

    challenges: `<p>Valuable React and API integration challenges overcome through the project:<br /><br />
  <li><b>Responsive Components: </b>Consistent behavior across devices and screen sizes</li>
  <li><b>API Integration: </b>Managed asynchronous API calls, search debouncing, error handling, and loading states</li>
  <li><b>State Management: </b>Complex global states managed effectively using React Context</li>
  <li><b>Performance Optimization: </b>Improved performance via conditional rendering and useEffect cleanup</li>
  <li><b>Key Learnings: </b>React Hooks, responsive design practices, and effective API integration patterns</li></p>`,
    technologies: ["HTML/CSS/Javascript", "API", "PHP", "React.js", "Figma"],
    images: {
      thumbnail: "/work/movie.png",
      gallery: ["/work/figma1.png", "/work/movie.png"],
      previewgif: "/work/moov.gif",
    },
    link: "https://example.com/sunset-showdown",
    github: "https://github.com/dfelices/danielle-leibrandt-ian-movie-app",
    figma:
      "https://www.figma.com/design/6SLr74GDyhZiLtIZ9X01ee/Movie-Database-Prototype-2024?node-id=0-1&t=QayONoX1pMVZaFGG-1",
  },
  {
    id: "qorum",
    title: "QORUM",
    shortDescription: "A white-label Association Management System",
    concept: `<p>QORUM is a reusable Association Management System (AMS) built to be deployed for any professional chapter or member organization. The first client is the SFPE Prairies Provinces Chapter — a fire protection engineering association spanning Alberta, Saskatchewan, and Manitoba.<br /><br />
    <li><b>Vision: </b>Build once, reskin per client — each new organization gets their own Next.js frontend connected to a shared multi-tenant database, with full brand customization.</li>
    <li><b>Scope: </b>Covers the full member lifecycle: signup, profile management, event registration, news publishing, email campaigns, and an admin console for chapter organizers.</li>
    <li><b>Multi-tenancy: </b>Every table is scoped by org_id, with Supabase RLS enforcing data isolation so no organization can ever access another's data.</li></p>`,

    design: `<p>QORUM has two distinct visual identities — a clean, professional public-facing site for members, and a dense admin console for chapter organizers.<br /><br />
    <li><b>Public site: </b>Light, editorial layout with the organization's brand colors and logo — fully customizable per client via the Admin Customization panel.</li>
    <li><b>Member portal: </b>Warm, card-based dashboard showing upcoming events, membership status, quick links, and renewal prompts.</li>
    <li><b>Admin console: </b>Sidebar-driven interface covering Members, Events, News, Email, Media, Reports, and Customization — designed for non-technical chapter admins.</li>
    <li><b>Brand tokens: </b>Primary and accent colors, logo, email header styles, and footer text are all configurable per organization without touching code.</li></p>`,

    development: `<p>Built on Next.js 16 App Router with Tailwind CSS v4, backed by Supabase for database, auth, storage, and email delivered via Resend.<br /><br />
    <li><b>Stack: </b>Next.js 16 (App Router, React Server Components), Tailwind CSS v4, Supabase (PostgreSQL + Auth + RLS + Storage), Resend, Vercel.</li>
    <li><b>Events system: </b>Full event lifecycle — creation, ticket types (free/paid, member-only/public), registration flow with custom questions, registrant management, and post-event automated emails.</li>
    <li><b>Email engine: </b>Rich campaign editor (Tiptap), merge tags, template library, list management with CSV/Excel import, scheduled send, and a Vercel Cron job that processes the send queue every 15 minutes.</li>
    <li><b>Server-first: </b>Heavy use of React Server Components and Next.js Server Actions — client components are leaf nodes only, keeping the bundle small and pages fast.</li>
    <li><b>Auth pattern: </b>Three Supabase client types (admin, server, browser) used strictly by context — service role never exposed to the browser.</li></p>`,

    challenges: `<p>Building a genuinely reusable multi-tenant SaaS product — not just a one-off site — introduced constraints that shaped every decision:<br /><br />
    <li><b>RLS recursion: </b>Standard RLS policies caused infinite recursion when policies queried the members table to determine org context. Solved with SECURITY DEFINER helper functions (auth_member_org_id(), auth_is_admin()) that break the recursion cleanly.</li>
    <li><b>Auth bootstrap problem: </b>New member signup needed to insert into the members table before RLS could determine their org — solved by using the service role client exclusively for that insert, then handing off to normal scoped clients.</li>
    <li><b>Server component session propagation: </b>Next.js server components don't re-render on client-side auth state changes. Router.refresh() had to precede router.push() after login so the Nav server component picks up the new session correctly.</li>
    <li><b>Email at scale: </b>Sending blast campaigns to full member lists required a proper queue — campaigns are marked as scheduled, then a Vercel Cron processes them in batches to avoid Resend rate limits.</li>
    <li><b>White-label flexibility: </b>Every hardcoded color, string, and logo had to be replaced with org-level config pulled from the database — including email header backgrounds, footer text, and logo sizing.</li></p>`,
    technologies: ["Next.js", "Tailwind CSS", "Supabase", "PostgreSQL", "Resend", "Vercel"],
    images: {
      thumbnail: "/work/qorum-thumbnail.png",
      gallery: ["/work/qorum-admin.png", "/work/qorum-portal.png", "/work/qorum-event.png"],
      previewgif: "/work/qorum-thumbnail.png",
    },
    link: "https://ams-rho-eight.vercel.app/",
  },
  {
    id: "paws",
    title: "Paws & Relax",
    shortDescription: "A Wordpress website for a pet massage business",
    concept: `<p>A fully custom WordPress theme designed from scratch for a dog massage business, aimed at creating a warm and inviting digital experience reflective of the spa's nurturing physical atmosphere. As the lead UI/UX designer, I carefully curated a soothing and professional aesthetic.<br /><br />
    <li><b>Vision: </b>A calming, welcoming online presence emphasizing a seamless journey from discovering services to booking appointments.</li>
    <li><b>Color Palette: </b>Earthy tones including terracotta, sage green, and soft neutral backgrounds to evoke tranquility and natural wellness.</li></p>`,

    design: `<p>As the primary UI/UX designer, I led the comprehensive design process starting from initial research through detailed Figma wireframes and mockups. The design prioritized usability, modularity, and consistency across the website.<br /><br />
    <li><b>Typography: </b>Montserrat for clarity and readability paired with Grown for distinctive, stylish headings.</li>
    <li><b>Responsive Design: </b>Ensured seamless user experiences across all devices, from mobile to desktop.</li>
    <li><b>Brand Identity: </b>Developed a custom SVG logo capturing the nurturing spirit of the brand.</li>
    <li><b>Information Architecture: </b>Structured content intuitively, guiding users effortlessly from service discovery to booking.</li>
    <li><b>Visual Hierarchy: </b>Strategically placed elements and clear call-to-action points to maximize engagement and conversions.</li>
    <li><b>Block-Based Design: </b>Custom modular blocks that enabled easy content updates while maintaining consistent aesthetics.</li></p>`,

    development: `<p>My dual role as designer and developer enabled informed design choices that aligned with practical development considerations. In development, I contributed directly to building key functional elements.<br /><br />
    <li><b>Custom Blocks: </b>Created custom WordPress blocks for displaying critical company details such as address, email, and phone number using the Block API.</li>
    <li><b>Interactive Animations: </b>Implemented the Animate On Scroll (AOS) library to enhance user engagement subtly.</li>
    <li><b>Front Page Template: </b>Developed strategically arranged content blocks to promote user engagement and drive conversions.</li>
    <li><b>Specialized Templates: </b>Crafted templates for diverse content types, including services, team profiles, and testimonials.</li>
    <li><b>Maintainability: </b>Followed WordPress best practices to ensure clean, modular, and maintainable code structure.</li></p>`,

    challenges: `<p>This project presented several significant technical and design challenges that enhanced my professional growth:<br /><br />
    <li><b>Font Optimization: </b>Addressed font loading inconsistencies through optimization techniques, including selecting proper web formats and caching strategies.</li>
    <li><b>Block Editor Customization: </b>Gained deep expertise in WordPress Block API to balance customization flexibility and design integrity.</li>
    <li><b>Responsive Navigation: </b>Developed intuitive navigation systems suitable for all screen sizes, leveraging progressive enhancement techniques.</li>
    <li><b>WooCommerce Integration: </b>Customized the booking system to align with specific business needs, ensuring consistent branding throughout the booking process.</li>
    <li><b>Cross-Discipline Insight: </b>Strengthened my understanding of the vital intersection between design considerations and development feasibility.</li></p>`,
    technologies: [
      "HTML/CSS/Javascript",
      "Wordpress",
      "Figma",
      "WooCommerce",
      "Google API",
    ],
    images: {
      thumbnail: "/work/paws.png",
      gallery: ["/work/paws1.png", "/work/paws2.png"],
      previewgif: "/work/paws.gif",
    },
    link: "https://pawsandrelax.bcitwebdeveloper.ca/",
    figma:
      "https://www.figma.com/design/3fuxzvbt7udzKRtGkIiFxW/Paws-%26-Relax-Wireframe?node-id=0-1&t=MoGVUZZXB47uiLc8-1",
    github: "https://github.com/htpwebdesign/paws-relax-theme",
  },
  // Add more projects
];
