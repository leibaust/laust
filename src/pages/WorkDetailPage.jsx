import WorkDetailCard from "../components/ui/WorkDetailCard";
import { motion } from "framer-motion";

function WorkDetailPage() {
  return (
    <>
      <motion.div
        initial={{ y: 1200, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-[calc(100vh-8rem)] overflow-auto">
          <div className="w-full sm:max-w-4/5 max-w-3xl mx-auto bg-secondary p-4">
            <WorkDetailCard />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default WorkDetailPage;
