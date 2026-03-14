import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  const pageVariants = {
    initial: { opacity: 0, y: 300 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  return (
    <div className="relative min-h-screen z-10">
      <Header />
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
