import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import AboutInfo from "../components/ui/AboutInfo.jsx";
import Faq from "../components/ui/Faq.jsx";
import TechStack from "../components/ui/TechStack.jsx";
import profileImage from "../assets/img/profilewide.jpg";
import useSeo from "../hooks/useSeo.js";

// Two nested layers, both driven by the same cursor position: the content
// card drifts slightly, and the photo frame — a child of that card — drifts
// further still, so its transform adds on top of the card's rather than
// replacing it. That differential is what reads as depth between the two,
// the same relationship the works canvas uses between its thumbnails and
// titles. Neither layer scales: both move as rigid frames, not as an image
// panning inside a fixed clip, so there's no edge to cover and nothing to
// gate behind hover support — the transform is simply (0, 0) until a mouse
// moves.
const CARD_PARALLAX_PX = 6;
const PHOTO_FRAME_PARALLAX_PX = 16;

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

  const cardTransform = useTransform(
    [springX, springY],
    ([x, y]) =>
      `translate3d(${x * CARD_PARALLAX_PX}px, ${y * CARD_PARALLAX_PX}px, 0)`
  );
  const photoFrameTransform = useTransform(
    [springX, springY],
    ([x, y]) =>
      `translate3d(${x * PHOTO_FRAME_PARALLAX_PX}px, ${y * PHOTO_FRAME_PARALLAX_PX}px, 0)`
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

  return (
    <section
      ref={stageRef}
      className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]"
      onMouseMove={handleStageMouseMove}
      onMouseLeave={handleStageMouseLeave}
    >
      <motion.div
        className="
          grid grid-cols-1 sm:grid-cols-2 gap-6
          w-full sm:max-w-5xl
          bg-secondary
          p-4 sm:p-8
          my-4 sm:my-0
          relative
        "
        style={{ transform: cardTransform }}
      >
        {/* Left column */}
        <div className="space-y-6 z-10">
          <TechStack />
          <AboutInfo />
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Profile image. The whole frame drifts as one rigid unit, on top
              of the card's own drift — the photo itself is static within it. */}
          <motion.figure
            className="w-full md:max-w-md h-[300px] bg-primary shadow-xl relative"
            style={{
              backgroundImage: `url(${profileImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: photoFrameTransform,
            }}
            aria-label="Profile picture"
          />

          <Faq />
        </div>
      </motion.div>
    </section>
  );
}

export default AboutPage;
