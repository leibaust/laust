import headerLogo from "../../assets/la-logo.svg";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="flex items-center">
      <Link
        to="/about"
        className="text-white m-3 hover:scale-105 hover:text-primary transition-transform duration-300"
      >
        About
      </Link>
      <Link
        to="/"
        className="hover:scale-105 transition-transform duration-300"
      >
        <img src={headerLogo} alt="Site Logo" className="h-12" />
      </Link>
      <Link
        to="/works"
        className="text-white m-3 hover:scale-105 hover:text-primary transition-transform duration-300"
      >
        Works
      </Link>
    </div>
  );
}

export default Navigation;
