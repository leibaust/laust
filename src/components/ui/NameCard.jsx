import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// The name is a single lockup (heading + subtitle read as one unit), unlike
// the works canvas where a title deliberately floats over a separate
// thumbnail. Splitting it into two independently drifting layers would read
// as misalignment rather than depth, so it moves as one slight drift against
// the fixed background video instead — foreground text, static backdrop.
const NAME_PARALLAX_PX = 10;

function NameCard() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const stageRef = useRef(null);

  const stageX = useMotionValue(0);
  const stageY = useMotionValue(0);
  const springX = useSpring(stageX, { stiffness: 50, damping: 20, mass: 1 });
  const springY = useSpring(stageY, { stiffness: 50, damping: 20, mass: 1 });
  const nameTransform = useTransform(
    [springX, springY],
    ([x, y]) =>
      `translate3d(${x * NAME_PARALLAX_PX}px, ${y * NAME_PARALLAX_PX}px, 0)`
  );

  const handleStageMouseMove = (e) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stageX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    stageY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleStageMouseLeave = () => {
    stageX.set(0);
    stageY.set(0);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => setIsClicked(!isClicked);

  return (
    <div
      ref={stageRef}
      className="flex items-center justify-center h-screen text-white selection:bg-primary"
      style={{ paddingBottom: "20vh" }}
      onMouseMove={handleStageMouseMove}
      onMouseLeave={handleStageMouseLeave}
    >
      <motion.div
        className="text-center cursor-pointer"
        style={{ transform: nameTransform }}
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
      </motion.div>
    </div>
  );
}

export default NameCard;
