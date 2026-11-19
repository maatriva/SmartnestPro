import { motion } from "framer-motion";

export default function HowItWorksHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-100px",
      }}
      transition={{ duration: 0.6 }}
      className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight mb-3 [text-wrap:balance]">
        How it works
      </h2>

      <p className="text-base sm:text-lg text-(--text) font-medium max-w-2xl mx-auto leading-relaxed [text-wrap:balance]">
        Set up in three steps to start monitoring and soothing your baby.
      </p>
    </motion.div>
  );
}