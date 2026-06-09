import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroContent({
  headingRef,
  badge,
  title,
  description,
  buttonText,
}) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-(--primary)
          mb-6
        "
      >
        <Sparkles size={16} className="text-(--primary)" />

        <span className="text-sm text-(--text-dark)">
          {badge}
        </span>
      </motion.div>

      <h1
        ref={headingRef}
        className="
          text-5xl
          md:text-6xl
          lg:text-7xl
          font-bold
          leading-tight
          text-(--text-dark)
        "
      >
        {title.first}
        <br />
        <span className="text-(--primary)">
          {title.second}
        </span>
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="
          mt-6
          text-lg
          md:text-xl
          leading-relaxed
          max-w-xl
          text-(--text-dark)
        "
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap gap-4 mt-8"
      >
        <button
          className="
            px-8
            py-4
            rounded-full
            bg-(--primary)
            text-white
            font-medium
            hover:scale-105
            transition-all
            duration-300
          "
        >
          {buttonText}
        </button>
      </motion.div>
    </div>
  );
}