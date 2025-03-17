import AboutInfo from "../components/ui/AboutInfo.jsx";
import Faq from "../components/ui/Faq.jsx";
import TechStack from "../components/ui/TechStack.jsx";
import { motion } from "framer-motion";

function AboutPage() {
  return (
    <>
      <motion.div
        initial={{ y: 1200, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-center min-h-screen p-0">
          <div className="w-full min-h-screen sm:max-w-3/5 max-w-3xl bg-secondary sm:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-4">
                <TechStack />
                <AboutInfo />
              </div>
              <div>
                <Faq />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default AboutPage;
