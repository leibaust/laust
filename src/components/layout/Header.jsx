import { Link } from "react-router-dom";
import headerLogo from "../../assets/la-logo.svg";

function Header({ toggleVideoPlayback, isPlaying }) {
  return (
    <div className="flex flex-col">
      {/* Top header with contact info and train button - always at top */}
      <header className="flex items-center justify-between p-4 text-white">
        {/* Left side: Contact info - always visible */}
        <div className="flex items-center gap-4">
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
        <div className="hidden md:flex items-center">
          <Link to="/about" className="text-white m-3">
            About
          </Link>
          <Link to="/">
            <img src={headerLogo} alt="Site Logo" className="h-12" />
          </Link>
          <Link to="/works" className="text-white m-3">
            Works
          </Link>
        </div>

        {/* Right side: Stop/Start button - always visible */}
        <div className="flex items-center gap-4">
          <button
            className="text-white px-4 py-2 rounded w-36"
            aria-label="Stop background video"
            onClick={toggleVideoPlayback}
          >
            {isPlaying ? "Stop Train" : "Play Train"}
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
