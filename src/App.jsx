import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorksPage from "./pages/WorksPage";
import WorkDetailPage from "./pages/WorkDetailPage";
import { useState, useEffect } from "react";
import backgroundVideo from "./assets/bg.mp4";
import overlayImage from "./assets/overlay.jpg";
import Noise from "./components/ui/Noise";
import Cursor from "./components/ui/Cursor";
import ErrorBoundary from "./components/ErrorBoundary";
import { VideoProvider, useVideo } from "./context/VideoContext";

function PersistentBackground() {
  const { videoRef } = useVideo();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {isMobile ? (
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: "#333333" }} />
      ) : (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover filter brightness-40"
          src={backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      )}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ backgroundImage: `url(${overlayImage})`, opacity: 0.1 }}
      />
    </div>
  );
}

function AnimatedRoutes() {
  return (
    <>
      <PersistentBackground />

      <Cursor />

      <div className="fixed inset-0 pointer-events-none z-20">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
      </div>

      {/* Page transitions live in Layout, wrapped directly around the motion
          element. AnimatePresence cannot read an exit animation through a
          non-motion child such as <Routes />, so keying the transition here
          left mode="wait" waiting forever and the next route never mounted. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="works" element={<WorksPage />} />
          <Route path="works/:projectId" element={<WorkDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <VideoProvider>
          <AnimatedRoutes />
        </VideoProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
