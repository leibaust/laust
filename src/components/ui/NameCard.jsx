import { useState } from "react";

function NameCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsClicked(!isClicked);

  return (
    <div
      className="fixed top-50% left-50% flex items-center justify-center text-white cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="text-center">
        <h2
          className={`text-4xl font-bold mb-2 transition-all duration-300 ${
            isHovered ? "text-primary" : "text-white"
          } ${isClicked ? "mb-4" : ""}`}
        >
          Leibrandt Austria
        </h2>
        <div
          className={`transition-all duration-300 ${
            isClicked ? "opacity-100 max-h-full" : "opacity-0 max-h-0"
          }`}
        >
          <p>designing unique user experiences through</p>
          <p>visual storytelling and web development</p>
        </div>
        <cite
          className={`text-xl transition-all duration-300 ${
            isHovered ? "text-primary" : "text-white"
          } ${isClicked ? "mt-4" : ""}`}
        >
          Web Developer & Digital Creator
        </cite>
      </div>
    </div>
  );
}

export default NameCard;
