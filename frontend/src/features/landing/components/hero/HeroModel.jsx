import { lazy, Suspense } from "react";
import { motion } from "framer-motion";

const ModelCursor = lazy(() => import("../../../../animations/ModelCursor"));

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
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[310px] h-[310px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] flex items-center justify-center relative"
        >
          <Suspense fallback={<div className="w-12 h-12 border-4 border-(--primary) border-t-transparent rounded-full animate-spin" />}>
            <ModelCursor targetSize={3} modelColor="#8EC1D1" />
          </Suspense>
        </motion.div>
      </div>
    </motion.div>
  );
}