import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";

const pageVariants = {
  initial: { opacity: 0, y: 300 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

/**
 * Renders the route that was current when this instance mounted, and keeps
 * rendering it.
 *
 * A live <Outlet /> always reflects the *current* router location. Under
 * mode="wait" the outgoing wrapper stays mounted for the length of its exit
 * animation, so a live Outlet would swap the incoming page into it the instant
 * the URL changes — the new page appears at full opacity, animates out with the
 * old wrapper, then animates in again on the new one. Capturing the outlet
 * element on mount pins the outgoing tree to the route it started with.
 *
 * Each keyed wrapper mounts its own instance, so the incoming route captures
 * itself and nothing goes stale.
 */
function FrozenOutlet() {
  const outlet = useOutlet();
  const frozen = useRef(outlet);
  return frozen.current;
}

function Layout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen z-10">
      <Header />
      <main className="p-4">
        <div className="h-full w-full">
          {/* AnimatePresence must wrap the motion element directly. With a
              non-motion child it never receives an exit-complete signal, so
              mode="wait" holds the outgoing route and blocks the incoming one.
              Keying here also keeps Header and Footer mounted across routes. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              <FrozenOutlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
