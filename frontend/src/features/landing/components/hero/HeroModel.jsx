import { motion } from "framer-motion";
import ModelCursor from "../../../../animations/ModelCursor";

export default function HeroModel() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      className="
        relative
        flex
        items-center
        justify-center
        h-[350px]
        sm:h-[450px]
        lg:h-[650px]
      "
    >
      <div
        className="
          absolute
          w-[260px]
          h-[260px]
          sm:w-[350px]
          sm:h-[350px]
          lg:w-[500px]
          lg:h-[500px]
          rounded-full
          border
          border-(--primary)
          opacity-20
          animate-pulse
        "
      />

      <div
        className="
          absolute
          w-[320px]
          h-[320px]
          sm:w-[450px]
          sm:h-[450px]
          lg:w-[650px]
          lg:h-[650px]
          rounded-full
          border
          border-(--primary)
          opacity-10
        "
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[450px] lg:h-[450px] flex items-center justify-center"
        >
          <ModelCursor />
        </motion.div>
      </div>
    </motion.div>
  );
}