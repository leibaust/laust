import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

// Simplified Layout without background elements
function Layout() {
  // State to track video playback status from global controller
  const [isVideoPlaying, setIsVideoPlaying] = useState(
    window.__videoController?.isPlaying ?? true
  );

  // Update local state when global state changes
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (window.__videoController?.isPlaying !== undefined) {
        setIsVideoPlaying(window.__videoController.isPlaying);
      }
    }, 500); // Check every half second

    return () => clearInterval(intervalId);
  }, []);

  const toggleVideoPlayback = () => {
    // Call the global toggle function
    if (window.__videoController?.toggle) {
      window.__videoController.toggle();
      // Local state will be updated via the effect above
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 300 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  return (
    <div className="relative min-h-screen z-10">
      <Header
        toggleVideoPlayback={toggleVideoPlayback}
        isPlaying={isVideoPlaying}
      />
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
  );
}

export default Layout;
