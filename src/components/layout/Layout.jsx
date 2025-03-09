import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import backgroundVideo from "../../assets/bg.mp4";
import overlayImage from "../../assets/overlay.jpg";
import Footer from "./Footer";

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
    <div className="relative h-screen w-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ backgroundImage: `url(${overlayImage})`, opacity: 0.3 }}
      />
      <div className="relative z-10">
        <Header
          toggleVideoPlayback={toggleVideoPlayback}
          isPlaying={isPlaying}
        />
        <main className="p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
