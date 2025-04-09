export const projects = [
  {
    id: "sunset-showdown",
    title: "Sunset Showdown",
    shortDescription: "A simple HTML5 Canvas/Javascript retro shooter game",
    concept: `<p>Sunset Showdown is a retro-inspired, top-down shooter built with HTML Canvas and JavaScript. Players control a character that automatically fires at the nearest enemy, with the objective of surviving as long as possible while accumulating points by defeating enemies.<br /><br />
    <li><b>Gameplay: </b>Automatic projectile firing with homing mechanics toward enemies.</li>
    <li><b>Enemies: </b>Continuously spawning and bouncing off screen edges, adding dynamic challenge.</li>
    <li><b>Difficulty Modes: </b>Easy, Medium, Hard, and Hell, influencing enemy spawn rates and projectile cooldowns.</li>
    <li><b>Tracking: </b>Clear display of health, current score, and high score for easy player reference.</li></p>`,

    design: `<p>Designed with simplicity and clarity in mind, utilizing HTML Canvas for graphics rendering. Visual elements include PNG sprites for the player and enemies, supported by a streamlined UI.<br /><br />
    <li><b>Visual Design: </b>Clean and minimalistic aesthetic focused on gameplay clarity.</li>
    <li><b>Interface: </b>Real-time display of player health, score, and high score.</li>
    <li><b>Splash Screen: </b>Interactive difficulty level selection at the start of each game session.</li>
    <li><b>Dynamic Gameplay: </b>Continuous real-time updates of the game board during play.</li>
    <li><b>Audio Feedback: </b>Immersive sound effects and background music, activated by collision events.</li></p>`,

    development: `<p>Developed using HTML5 Canvas and JavaScript to achieve responsive, smooth gameplay animations and interactions.<br /><br />
    <li><b>Rendering: </b>Implemented using requestAnimationFrame for smooth, optimized animations.</li>
    <li><b>Player Control: </b>Responsive player movement controlled via arrow keys.</li>
    <li><b>Game Mechanics: </b>Automatic projectile targeting and timed enemy spawning.</li>
    <li><b>Modular Code: </b>Structured functions handling entity updates, collision detection, and state management for maintainability.</li>
    <li><b>Event Handling: </b>Event listeners managing user input and UI interactions efficiently.</li></p>`,

    challenges: `<p>Several technical challenges arose during the development, each providing valuable learning opportunities:<br /><br />
    <li><b>Difficulty Balancing: </b>Careful tuning of enemy spawn rates and projectile cooldowns to achieve engaging gameplay.</li>
    <li><b>Collision Detection: </b>Initial performance issues were solved through optimized looping logic.</li>
    <li><b>Audio Management: </b>Handled overlapping sounds by cloning audio elements for consistent playback.</li>
    <li><b>Game Loop Control: </b>Resolved issues of stacked loops by properly canceling animation frames before game resets.</li>
    <li><b>Player Movement: </b>Ensured smooth and seamless screen wrapping with precise coordinate calculations.</li></p>`,
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
