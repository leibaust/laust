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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    technologies: [
      "HTML/Javascript",
      "React.js",
      "Figma",
      "Framer Motion",
      "Tailwind",
    ],
    images: {
      thumbnail: "/work/figma.png",
      gallery: ["/work/figma.png"],
    },
    link: "https://www.laust.ca",
  },
  {
    id: "paws",
    title: "Paws & Relax Website",
    shortDescription: "A Wordpress website for a pet massage business",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    technologies: ["HTML/CSS/Javascript", "Wordpress", "Figma"],
    images: {
      thumbnail: "/work/paws.png",
      gallery: ["/work/paws1.png", "/work/paws2.png"],
      previewgif: "/work/paws.gif",
    },
    link: "https://pawsandrelax.bcitwebdeveloper.ca/",
    figma:
      "https://www.figma.com/design/3fuxzvbt7udzKRtGkIiFxW/Paws-%26-Relax-Wireframe?node-id=0-1&t=MoGVUZZXB47uiLc8-1",
  },
  // Add more projects
];
