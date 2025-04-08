import { useState } from "react";

function NameCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsClicked(!isClicked);

  return (
    <div
      className="flex items-center justify-center h-screen text-white selection:bg-primary"
      style={{ paddingBottom: "20vh" }}
    >
      <div
        className="text-center cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <h1
          className={`font-display text-4xl tracking-wider font-bold transition-all duration-500 ease-in-out ${
            isHovered ? "text-primary" : "text-white"
          } ${isClicked ? "transform -translate-y-4" : ""}`}
        >
          LEIBRANDT AUSTRIA
        </h1>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isClicked ? "opacity-100 max-h-32 my-4" : "opacity-0 max-h-0 my-0"
          }`}
        >
          <p className="transition-opacity duration-500 ease-in-out">
            designing unique user experiences through
          </p>
          <p className="transition-opacity duration-500 ease-in-out">
            visual storytelling and web development
          </p>
        </div>
        <cite
          className={`text-3xl block transition-all duration-500 ease-in-out ${
            isHovered ? "text-primary" : "text-white"
          } ${isClicked ? "transform translate-y-4" : ""}`}
        >
          web developer & digital creator
        </cite>
      </div>
    </div>
  );
}

export default NameCard;
