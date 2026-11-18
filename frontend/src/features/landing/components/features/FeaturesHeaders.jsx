import { motion } from "framer-motion";

export default function FeaturesHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-100px",
      }}
      transition={{ duration: 0.6 }}
      className="clay-section-header"
    >
      <div className="inline-block px-4 py-1.5 clay-badge text-xs sm:text-sm font-bold mb-3">
        Features
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight mb-3">
        Everything you need for
        <br />
        <span className="text-(--primary)">
          peaceful parenting
        </span>
      </h2>

      <p className="text-base sm:text-lg text-(--text-light) font-medium max-w-2xl mx-auto leading-relaxed">
        Cutting-edge technology designed with your baby's comfort and your peace
        of mind at heart.
      </p>
    </motion.div>
  );
}