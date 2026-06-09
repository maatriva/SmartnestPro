import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function DiseaseModal({
  selected,
  onClose,
}) {
  return (
    <AnimatePresence>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="clay-card p-10 max-w-xl w-full relative z-10 text-(--text)"
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
          >
            <button
              onClick={onClose}
              className="
                absolute
                top-4
                right-4
                text-(--text-light)
                hover:text-(--primary)
                transition-colors
                p-2
                hover:bg-(--bg-hover)
                rounded-full
              "
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-3xl font-black mb-6 text-(--text-dark)">
              {selected.name}
            </h2>

            <p className="mb-4 font-semibold text-lg">
              {selected.description}
            </p>

            <p className="italic text-(--text-light) font-medium">
              {selected.aiRole}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}