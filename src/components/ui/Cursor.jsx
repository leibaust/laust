import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function Cursor() {
  const mouseX = useMotionValue(
    typeof window !== "undefined" ? window.innerWidth / 2 : 0
  );
  const mouseY = useMotionValue(
    typeof window !== "undefined" ? window.innerHeight / 2 : 0
  );

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 1 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 bg-primary rounded-full pointer-events-none mix-blend-difference z-50 hidden md:block"
      style={{
        width: 80,
        height: 80,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

export default Cursor;
