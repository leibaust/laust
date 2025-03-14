import AboutInfo from "../components/ui/AboutInfo.jsx";
import Faq from "../components/ui/Faq.jsx";
import TechStack from "../components/ui/TechStack.jsx";
import { motion } from "framer-motion";

function AboutPage() {
  return (
    <>
      <motion.div
        initial={{ y: 800, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-center min-h-screen p-0">
          <div className="w-full min-h-screen sm:max-w-4/5 max-w-3xl bg-secondary">
            <h1>About</h1>
            <TechStack />
            <AboutInfo />
            <Faq />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default AboutPage;
