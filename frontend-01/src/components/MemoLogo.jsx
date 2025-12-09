import { motion } from "framer-motion";

const MemoLogo = () => {
  return (
    <div className="h-10 flex items-center select-none">
      <motion.h1
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-2xl font-pacifico text-transparent bg-clip-text drop-shadow-sm tracking-wide pl-1 pr-2"
        style={{
          backgroundImage: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
        }}
      >
        Memo Chat
      </motion.h1>
    </div>
  );
};

export default MemoLogo;