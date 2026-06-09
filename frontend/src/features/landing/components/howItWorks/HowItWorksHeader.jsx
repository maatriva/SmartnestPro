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
      className="text-center max-w-3xl mx-auto mb-16"
    >
      <div className="inline-block px-4 py-2 clay-badge text-sm font-bold mb-4">
        How It Works
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-(--text-dark) mb-6">
        Get started in
        <br />
        <span className="text-(--primary)">
          4 simple steps
        </span>
      </h2>

      <p className="text-xl text-(--text-light)">
        From unboxing to sweet dreams, we've made it incredibly easy to set up
        and use.
      </p>
    </motion.div>
  );
}