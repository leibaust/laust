import { createContext, useContext, useRef, useState } from "react";

const VideoContext = createContext(null);

export function VideoProvider({ children }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <VideoContext.Provider value={{ videoRef, isPlaying, toggle }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideo() {
  return useContext(VideoContext);
}
