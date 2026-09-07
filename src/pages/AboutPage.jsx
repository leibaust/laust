import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AboutInfo from "../components/ui/AboutInfo.jsx";
import Faq from "../components/ui/Faq.jsx";
import TechStack from "../components/ui/TechStack.jsx";
import profileImage from "../assets/img/profilewide.jpg";
import useSeo from "../hooks/useSeo.js";

// Same technique as the works canvas thumbnails: the photo pans a few px
// against the cursor, scaled up just enough to cover the pan without
// uncovering an edge. Scoped to the photo alone — the body copy and icons
// stay static, since panning text would fight its own scroll.
const PHOTO_PARALLAX_PX = 8;
const PHOTO_PARALLAX_SCALE = 1.1;

function AboutPage() {
  useSeo({
    title: "About | Leibrandt Austria",
    description:
      "Leibrandt Austria is a web developer working across Vancouver, BC and Toronto, ON, specializing in UI/UX design and high-performance web applications.",
    path: "/about",
  });

  const stageRef = useRef(null);
  const stageX = useMotionValue(0);
  const stageY = useMotionValue(0);
  const springX = useSpring(stageX, { stiffness: 50, damping: 20, mass: 1 });
  const springY = useSpring(stageY, { stiffness: 50, damping: 20, mass: 1 });

  // Touch devices can never trigger the pan, so the scale that makes room for
  // it would just be a permanent, pointless 10% crop on the photo. Skip both
  // and fall back to the photo's plain framing on anything without a mouse.
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  const photoScale = canHover ? PHOTO_PARALLAX_SCALE : 1;
  const photoTransform = useTransform(
    [springX, springY],
    ([x, y]) =>
      `translate3d(${x * PHOTO_PARALLAX_PX}px, ${y * PHOTO_PARALLAX_PX}px, 0) scale(${photoScale})`
  );

  const handleStageMouseMove = (e) => {
    if (!canHover) return;
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

  return (
    <section
      ref={stageRef}
      className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]"
      onMouseMove={handleStageMouseMove}
      onMouseLeave={handleStageMouseLeave}
    >
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 gap-6
          w-full sm:max-w-5xl
          bg-secondary
          p-4 sm:p-8
          my-4 sm:my-0
          relative
        "
      >
        {/* Left column */}
        <div className="space-y-6 z-10">
          <TechStack />
          <AboutInfo />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Profile image. The frame stays put in the grid; only the photo
              inside it pans, so overflow-hidden lives on the frame. */}
          <figure
            className="w-full md:max-w-md h-[300px] bg-primary shadow-xl relative overflow-hidden"
            aria-label="Profile picture"
          >
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: photoTransform,
              }}
            />
          </figure>

          <Faq />
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
