import WorkCard from "../components/ui/WorkCard";
import { motion } from "framer-motion";

function WorksPage() {
  return (
    <>
      <motion.div
        initial={{ y: 1200, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-center min-h-screen p-0">
          <div className="w-full min-h-screen sm:max-w-1/3 max-w-3xl bg-secondary flex items-start justify-center ">
            <WorkCard />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default WorksPage;
