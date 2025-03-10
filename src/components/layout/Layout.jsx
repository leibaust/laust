import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import backgroundVideo from "../../assets/bg.mp4";
import overlayImage from "../../assets/overlay.jpg";
import Footer from "./Footer";
import Noise from "../ui/Noise";
import Cursor from "../ui/Cursor";

function Layout() {
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

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
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
          <main className="p-4">
            <Outlet />
          </main>
          <Footer />
          <Cursor />
        </div>
      </div>
    </>
  );
}

export default Layout;
