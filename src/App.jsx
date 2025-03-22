import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorksPage from "./pages/WorksPage";
import WorkDetailPage from "./pages/WorkDetailPage";
import { useState, useRef, useEffect } from "react";
import backgroundVideo from "./assets/bg.mp4";
import overlayImage from "./assets/overlay.jpg";
import Noise from "./components/ui/Noise";
import Cursor from "./components/ui/Cursor";

// Global video controller
window.__videoController = {
  isPlaying: true,
  toggle: null, // Will be populated with the actual function
};

// Persistent background that stays alive regardless of route changes
function PersistentBackground() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);

      // Update global state
      window.__videoController.isPlaying = !isPlaying;
    }
  };

  // Register toggle function globally on mount
  useEffect(() => {
    window.__videoController.toggle = toggleVideoPlayback;
    window.__videoController.isPlaying = isPlaying;

    return () => {
      // Clean up on unmount
      window.__videoController.toggle = null;
    };
  }, [isPlaying]);

  return (
    <div className="fixed inset-0 z-0">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover filter brightness-40"
        src={backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
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
    </div>
  );
}

// Create a wrapper component that handles animations
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      {/* Background stays outside AnimatePresence to be persistent */}
      <PersistentBackground />

      {/* Cursor also stays outside for persistence */}
      <Cursor />

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="works" element={<WorksPage />} />
            <Route path="works/:projectId" element={<WorkDetailPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
