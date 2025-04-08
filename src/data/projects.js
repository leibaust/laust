export const projects = [
  {
    id: "sunset-showdown",
    title: "Sunset Showdown",
    shortDescription: "A simple HTML5 Canvas/Javascript retro shooter game",
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
    technologies: ["HTML", "CSS", "JavaScript", "Canvas"],
    images: {
      thumbnail: "/work/sunset.png",
      gallery: ["/work/ss1.png", "/work/ss2.png"],
      previewgif: "/work/sunsetpreview.gif",
    },
    link: "https://laust.ca/projects/sunsetshowdown/",
    github: "https://github.com/leibaust/js-game",
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
    id: "portfolio",
    title: "Portfolio",
    shortDescription: "A React core, Tailwind styled portfolio website",
    concept: `<p>A digital showcase reflecting my design philosophy and technical skills, emphasizing essential content and streamlined navigation.<br /><br />
    <li><b>Purpose: </b>Showcase projects and demonstrate design and technical capabilities</li>
    <li><b>Approach: </b>Minimalist navigation, removing unnecessary elements like dedicated contact pages</li></p>`,

    design: `<p>A visually striking interface inspired by 1980s avant-garde magazine layouts, emphasizing typography and analog design influences.<br /><br />
    <li><b>Typography: </b>Editorial body font paired with impactful display fonts (Bebas Neue, Modernline)</li>
    <li><b>Visual Texture: </b>Strategic noise overlays adding depth and tactile feel</li>
    <li><b>Layout Inspiration: </b>Square block elements referencing traditional print media design</li>
    <li><b>Interactivity: </b>Floating, asymmetrical work cards encouraging exploration</li></p>`,

    development: `<p>Built using React and styled with Tailwind CSS, combining modern technical practices and creative visual execution.<br /><br />
    <li><b>Animations: </b>Custom cursor tracking with GSAP, Framer Motion transitions for seamless navigation</li>
    <li><b>Visual Elements: </b>Background video with playback controls, dynamic pseudo-random card positioning</li>
    <li><b>Responsiveness: </b>Fully responsive layouts transforming entirely between mobile and desktop views</li>
    <li><b>Architecture: </b>Reusable, component-based code structure separating UI from layout logic</li></p>`,

    challenges: `<p>Technical challenges encountered and solved during development:<br /><br />
    <li><b>Fluid Animations: </b>Managed viewport-based calculations for smooth animations across screen sizes</li>
    <li><b>Floating Cards: </b>Precise mathematical positioning to prevent overlap and maintain natural arrangement</li>
    <li><b>Custom Cursor: </b>Event handling and animation timing to ensure smooth, responsive interactions</li>
    <li><b>Performance Optimization: </b>Balanced rich visuals (video/noise textures) with loading speed, especially on mobile</li>
    <li><b>Cross-Browser Compatibility: </b>Implemented fallbacks and progressive enhancement for experimental CSS features</li></p>`,
    technologies: [
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Figma",
      "Vite",
    ],
    images: {
      thumbnail: "/work/figma.png",
      gallery: ["/work/figma.png", "/work/port1.png"],
      previewgif: "/work/port.gif",
    },
    link: "https://www.laust.ca",
    github: "https://github.com/leibaust/laust",
    figma:
      "https://www.figma.com/design/tnjguW3FP2VJvXkK9se9dV/Portfolio-Wireframe-V2-2025?node-id=27-278&t=RVbwpZR0IUX7hOMZ-1",
  },
  {
    id: "paws",
    title: "Paws & Relax Website",
    shortDescription: "A Wordpress website for a pet massage business",
    concept: "In Development",
    design: "In Development",
    development: "In Development",
    challenges: "In Development",
    technologies: ["HTML/CSS/Javascript", "Wordpress", "Figma"],
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
