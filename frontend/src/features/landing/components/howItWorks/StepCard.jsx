import { motion } from "framer-motion";

export default function StepCard({ step, index }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: "-50px",
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
      }}
      className="relative h-full"
    >
      <div className="hiw-card h-full clay-card p-8 flex flex-col">

        <div className="absolute -top-6 left-6 w-12 h-12 clay-btn clay-btn-secondaryh flex items-center justify-center font-black text-lg">
          {step.number}
        </div>

        <div className="mb-6 mt-4">
          <div className="inline-flex p-4 clay-badge">
            <Icon
              className="w-8 h-8 text-(--primary)"
              strokeWidth={2}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-(--text-dark) mb-3">
          {step.title}
        </h3>

        <p className="text-(--text-light) leading-relaxed">
          {step.description}
        </p>

      </div>
    </motion.div>
  );
}