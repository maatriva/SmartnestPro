import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedPrice } from "./AnimatedPrice";

export default function ExpandableModelCard({
  model,
  isExpanded,
  onToggle,
  onPreOrder,
}) {
  const [showDescription, setShowDescription] = useState(false);

  // Staggered list variants for features
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Feature slide-in from left and fade-in
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Map the models to display titles nicely as "Basic Smart Cradle", "Standard Smart Cradle", etc.
  const displayTitle =
    model.name === "Basic Model"
      ? "Basic Smart Cradle"
      : model.name === "Standard Model"
      ? "Standard Smart Cradle"
      : model.name === "Pro Model"
      ? "Pro Smart Cradle"
      : model.name;

  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.7,
      }}
      className={`w-full overflow-hidden rounded-[32px] text-left transition-all duration-300 ${
        isExpanded
          ? "bg-white border-2 border-[#7B8CFF]/60 shadow-[0_10px_30px_rgba(123,140,255,0.25)] p-6"
          : "bg-white/40 border border-white/60 shadow-sm p-4 hover:bg-white/60 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
      }`}
      onClick={() => {
        if (!isExpanded) onToggle();
      }}
    >
      {/* Header element (clickable to toggle) */}
      <div
        className="flex items-center justify-between select-none"
        onClick={(e) => {
          if (isExpanded) {
            e.stopPropagation();
            onToggle();
          }
        }}
      >
        <span
          className={`text-lg font-bold transition-colors duration-300 ${
            isExpanded ? "text-[#7B8CFF]" : "text-(--text-dark)"
          }`}
        >
          {model.name}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${isExpanded ? "text-[#7B8CFF]" : "text-(--text-light)"}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      {/* Expanded Showcase Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: { type: "spring", stiffness: 100, damping: 15 },
                opacity: { duration: 0.3, delay: 0.05 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { type: "spring", stiffness: 100, damping: 15 },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            {/* Divider line */}
            <div className="h-[1px] bg-slate-100 my-4" />

            {/* Product Image with floating & scale effect */}
            {model.img && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -6, 0],
                }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 },
                  y: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  },
                }}
                className="w-full flex justify-center my-6"
              >
                <img
                  src={model.img}
                  alt={model.name}
                  className="w-full max-w-[180px] h-40 object-cover rounded-2xl shadow-md border-2 border-white/80"
                />
              </motion.div>
            )}

            {/* Title & Animated Price */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center mb-6"
            >
              <h4 className="text-xl font-extrabold text-(--text-dark)">
                {displayTitle}
              </h4>
              <div className="text-2xl font-bold text-[#7B8CFF] mt-1">
                <AnimatedPrice value={model.price} />
              </div>
            </motion.div>

            {/* Features (Staggered slide from left) */}
            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-3 mb-6 px-1"
            >
              {model.features.map((feature, i) => (
                <motion.li
                  key={i}
                  variants={featureVariants}
                  className="flex items-center gap-3 text-sm text-(--text) font-medium"
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#7B8CFF]/15 text-[#7B8CFF]">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Action Buttons (Know More / Pre-Order) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
              className="flex gap-4 mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDescription(!showDescription);
                }}
                className="flex-1 py-3 bg-[#F4F8F8] text-[#223B66] border border-white/80 rounded-full font-bold shadow-[inset_2px_2px_5px_rgba(255,255,255,0.95),inset_-2px_-2px_5px_rgba(166,180,200,0.45)] hover:bg-white text-sm cursor-pointer"
              >
                {showDescription ? "Hide Info" : "Know More"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onPreOrder(model);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-[#7B8FF8] to-[#5A78D6] text-white border border-white/40 rounded-full font-bold shadow-[inset_2px_2px_5px_rgba(255,255,255,0.5),inset_-2px_-2px_5px_rgba(20,30,90,0.45)] text-sm cursor-pointer"
              >
                Pre-Order
              </motion.button>
            </motion.div>

            {/* Inline description expanded by "Know More" */}
            <AnimatePresence>
              {showDescription && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-4 rounded-2xl bg-[#7B8CFF]/10 text-xs text-(--text-dark) border border-[#7B8CFF]/15"
                >
                  <p className="font-semibold mb-1">Product Details</p>
                  <p className="text-(--text-light) leading-relaxed">
                    {model.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
