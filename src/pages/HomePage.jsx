import NameCard from "../components/ui/NameCard.jsx";
import { motion } from "framer-motion";

function HomePage() {
  return (
    <>
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -300, opacity: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <NameCard />
      </motion.div>
    </>
  );
}

export default HomePage;
