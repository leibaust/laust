import Navigation from "./Navigation";

function Header({ toggleVideoPlayback, isPlaying }) {
  return (
    <div className="flex flex-col">
      {/* Top header with contact info and train button - always at top */}
      <header className="flex items-center justify-between p-4 text-white">
        {/* Left side: Contact info - always visible */}
        <div className="flex items-center gap-4 tracking-wide">
          <div className="flex flex-col gap-1 text-sm">
            <a href="mailto:leibaustria@gmail.com" aria-label="Email">
              leibaustria@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/laaustria"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              linkedin.com/in/laaustria
            </a>
            <a
              href="https://github.com/leibaust"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              github.com/leibaust
            </a>
          </div>
        </div>

        {/* Desktop Navigation - Only visible on medium screens and up */}
        <Navigation />

        {/* Right side: Stop/Start button - always visible */}
        <div className="flex items-center gap-4">
          <button
            className="text-white px-4 py-2 rounded w-36 cursor-pointer"
            aria-label="Stop background video"
            onClick={toggleVideoPlayback}
          >
            <span className="font-body">
              {isPlaying ? "Stop Train" : "Start Train"}
            </span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
