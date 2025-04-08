import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Create a singleton to persist state across component instances
const CursorSingleton = {
  instance: null,
  initialize(ref, update) {
    if (!this.instance) {
      this.instance = {
        mouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        delayedMouse: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        ref,
        update,
        animationId: null,
      };

      // Setup global mouse tracking
      window.addEventListener("mousemove", this.handleMouseMove);

      // Start animation loop
      this.startAnimation();
    } else {
      // Update ref when component remounts
      this.instance.ref = ref;
      this.instance.update = update;
    }

    return this.instance;
  },

  handleMouseMove(e) {
    if (CursorSingleton.instance) {
      CursorSingleton.instance.mouse = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  },

  startAnimation() {
    const animate = () => {
      const instance = CursorSingleton.instance;
      if (instance && instance.ref.current) {
        // Calculate smooth position
        instance.delayedMouse = {
          x: CursorSingleton.lerp(
            instance.delayedMouse.x,
            instance.mouse.x,
            0.04
          ),
          y: CursorSingleton.lerp(
            instance.delayedMouse.y,
            instance.mouse.y,
            0.04
          ),
        };

        // Update position
        gsap.set(instance.ref.current, {
          x: instance.delayedMouse.x,
          y: instance.delayedMouse.y,
          xPercent: -50,
          yPercent: -50,
        });

        // Trigger React state update occasionally to prevent stale refs
        if (Math.random() < 0.05) instance.update(Date.now());
      }

      instance.animationId = requestAnimationFrame(animate);
    };

    animate();
  },

  lerp(start, end, t) {
    return start * (1 - t) + end * t;
  },

  cleanup() {
    if (this.instance?.animationId) {
      cancelAnimationFrame(this.instance.animationId);
    }
    window.removeEventListener("mousemove", this.handleMouseMove);
    this.instance = null;
  },
};

function Cursor() {
  const circleRef = useRef(null);
  // Use state to force occasional re-renders to keep the ref fresh
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    // Initialize cursor tracking with current ref
    CursorSingleton.initialize(circleRef, forceUpdate);

    // Only clean up on full app unmount, not page transitions
    return () => {};
  }, []);

  return (
    <div
      ref={circleRef}
      className="fixed top-0 left-0 bg-primary rounded-full pointer-events-none mix-blend-difference z-50 hidden md:block"
      style={{
        width: 80,
        height: 80,
      }}
    />
  );
}

export default Cursor;
