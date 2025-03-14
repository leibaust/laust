import React, { useEffect, useRef } from "react";
import gsap from "gsap";

function Cursor() {
  // circle size
  const size = 100;
  const circle = useRef();
  const mouse = useRef({
    x: 0,
    y: 0,
  });
  const delayedMouse = useRef({
    x: 0,
    y: 0,
  });

  // tracks and logs the mouse position
  const manageMouseMove = (e) => {
    const { clientX, clientY } = e;
    // console.log(clientX, clientY);
    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const moveCircle = (x, y) => {
    gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;
    // Delay animation configuration
    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.04),
      y: lerp(y, mouse.current.y, 0.04),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
    window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => window.removeEventListener("mousemove", manageMouseMove);
  }, []);

  return (
    <div
      ref={circle}
      className="fixed top-0 left-0 bg-primary rounded-full pointer-events-none mix-blend-difference z-50 hidden md:block"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}

export default Cursor;
