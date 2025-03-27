export const projects = [
  {
    id: "sunset-showdown",
    title: "Sunset Showdown",
    shortDescription: "A simple HTML5 Canvas/Javascript retro shooter game",
    concept:
      "Sunset Showdown is a top-down shooter where the player controls a character that automatically shoots projectiles at the nearest enemy. The goal is to survive as long as possible while defeating enemies to earn points. Players can choose from four difficulty modes (Easy, Medium, Hard, and Hell), each affecting enemy spawn rates and projectile cooldowns. The game features health and score tracking, with enemies bouncing off the screen edges and projectiles homing in on targets.",
    design:
      "The game uses a simple, clean design with a canvas for rendering graphics. The player and enemies are represented by PNG sprites, and the UI displays health, score, and high score. The splash screen allows players to select difficulty levels, and the game board dynamically updates during gameplay. Sound effects and background music enhance the experience, with collision detection triggering audio feedback.",
    development:
      "Built with HTML5 Canvas and JavaScript, the game leverages requestAnimationFrame for smooth rendering. Key features include player movement with arrow keys, automatic projectile targeting, and enemy spawning at intervals. The code is modular, with functions for updating and drawing entities, handling collisions, and managing game states. Event listeners control player input and UI interactions, while intervals manage enemy and projectile behavior.",
    challenges:
      "Balancing difficulty levels was tricky, requiring adjustments to spawn rates and cooldowns. Collision detection initially caused performance issues, which were resolved by optimizing loop logic. Managing audio playback without overlapping sounds required cloning audio elements. Another challenge was preventing multiple game loops from stacking, solved by canceling animation frames before resetting the game. Ensuring smooth player movement and screen wrapping also required careful coordinate checks.",
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
    concept:
      "moo.v was conceptualized as a fresh approach to movie discovery platforms, deliberately moving away from the conventional 'Movie Library' aesthetic. As lead UI/UX designer, I evisioned a minimal, visually-driven experience that would allow users to focus on the movies themselves rather than being overwhelmed by excessive information",
    design:
      "As the lead UI/UX designer, me and my team created comprehensive wireframes and protootypes in Figma, focusing on a clean, minimlist aesthetic with ample white space, a responsive, mobile-first design ensuring seamless experiences across all devices, and carefully selected typography with a modern sans-serif font for headings and a readable body font. The final design features interactive movie cards that reveal information progressively through hover/tap states and a color palette centered around neutral tones with strategic use of brown accents for visual interest. The design process included multiple iterations and user feedback sessions, allowing me to refine the interface before development began. I created a detailed component library to ensure design consistency throughout the application.",
    development:
      "As one of three developers on the team, I was responsible for creating the interactive movie card component with its distinctive hover/click behaviours across different screen sizes. I also spearheaded implementing the search functionality with real-time results and keyboard navigation. I also developed the 'Favorites' system using React context for global state management. As a team, we ensured smooth animations and transitions using CSS and React transition groups, along with building responsive layouts with a mobile-first approach using CSS Grid and Flexbox. We also integrated the TMDb API to fetch movie data and implemented a custom pagination system to handle large datasets. The project utilized React, React Router, localStorage for persistence, and CSS animations for fluid interactions. I focused on writing clean, maintainable code with clear documentation to facilitate collaboration and future updates.",
    challenges:
      "As one of my first React projects and my first time working with APIs, moo.v presented several valuable learning opportunities. Some of the challenges include, implementing consistent component behavior across different screen sizes and devices, managing asynchronous API calls while providing smooth user experience, creating an intuitive search functionality with proper debouncing and error handling, handling complex state management for favorites and UI interactions, and optimzing performance with conditional rendering and useEffect cleanup. From this, some of my key learnings include gaining a deep punderstanding of Reac thooks, particularly useState, useEffect, and useContext. Also, I developed skillsing in responsive design implementation using CSS media queries, and learned effective API integration patterns including error handling and loading states. This project significantly strengthened my front-end development skills and gave me practical experience in translating design mockups into functional Reac tcomponents. The lessons learned continue to inform my approach to UI development, particularly in creating visually engaging yet performant web applications.",
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
    concept:
      "My portfolio website was conceptualized as a digital expression of my design philosophy and technical capabilities. Starting with a focused Figma prototype, I aimed to create an experience that prioritizes essential content while eliminating unnecessary navigation elements like a dedicated contact page. The site serves as both a showcase of my work and a demonstration of my approach to creating intuitive, visually distinct web experiences that balance form and function.",
    design:
      "Drawing heavy inspiration from 1980s avant-garde magazine layouts, the design employs typography as a primary visual element, creating a distinct visual hierarchy that guides users through the content. The body text is set in a newspaper-style font (Editorial) to evoke a sense of classic journalism, while display text uses more dramatic typefaces (Bebas Neue and Modernline) for impact. Visual texture comes from strategic noise overlays that add depth and tactile quality to the digital space. Square block elements throughout the interface deliberately reference old-school print publications, creating a bridge between analog design traditions and modern digital execution. The floating work cards create visual interest through asymmetry and motion, encouraging exploration.",
    development:
      "Built with React as the core framework and styled with Tailwind CSS for efficient development, the site combines modern development practices with creative visual execution. Key technical implementations include: (1) Custom cursor tracking with GSAP for smooth animations, (2) Background video integration with controls to start/stop playback, (3) Dynamic card positioning with pseudo-random placement algorithms for visual interest, (4) Responsive layouts that transform completely between mobile and desktop rather than simply repositioning elements, (5) Framer Motion transitions between pages for seamless navigation, and (6) Reusable component architecture for maintainable code. The entire codebase follows component-based architecture principles, separating UI elements from layout structures and page definitions.",
    challenges:
      "Developing this portfolio presented several interesting technical challenges. Creating fluid animations across various screen sizes required careful consideration of viewport dimensions and position calculations. The floating cards system needed precise mathematics to prevent overlap while maintaining a natural, seemingly random arrangement. Implementing the custom cursor required deep understanding of event handling and animation timing to achieve smooth, lag-free movement. Another significant challenge was optimizing the background video and noise textures for performance, especially on mobile devices. Finding the right balance between visual richness and loading speed demanded multiple iterations and performance testing. Finally, ensuring cross-browser compatibility for some of the more experimental CSS features required additional fallback solutions and progressive enhancement techniques.",
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
