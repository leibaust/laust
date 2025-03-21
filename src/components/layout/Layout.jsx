import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import backgroundVideo from "../../assets/bg.mp4";
import overlayImage from "../../assets/overlay.jpg";
import Footer from "./Footer";
import Noise from "../ui/Noise";
import Cursor from "../ui/Cursor";

function Layout() {
  // Basic state
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const toggleVideoPlayback = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 300 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden bg-darkbg">
        {/* Background video */}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover filter brightness-40"
          src={backgroundVideo}
          autoPlay
          loop
          muted
        />

        {/* Image overlay */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ backgroundImage: `url(${overlayImage})`, opacity: 0.1 }}
        />

        {/* Noise overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header
            toggleVideoPlayback={toggleVideoPlayback}
            isPlaying={isPlaying}
          />
          <Cursor />
          <main className="p-4">
            <div className="h-full w-full">
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                <Outlet />
              </motion.div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
