import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedPrice } from "./AnimatedPrice";

export default function PricingCard({ plan, onPreOrder }) {
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });
  const [addAI, setAddAI] = useState(false);
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const isBasicModel = plan.name === "Basic Model";

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative coordinates of mouse inside card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Radial glow tracking coordinates
    setGlow({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setGlow((prev) => ({ ...prev, opacity: 0 }));
  };

  // Viewport sequential animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
        delay: i * 0.12,
        duration: 0.5,
      },
    }),
  };

  // Feature list staggered animation variants
  const featureContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 14,
      },
    },
  };

  // Dynamic pricing calculation
  const basePriceNum = plan.price ? parseInt(plan.price.replace(/[^\d]/g, ""), 10) : 0;
  const finalPriceNum = plan.isModelCard && addAI ? basePriceNum + 10000 : basePriceNum;
  const finalPriceStr = finalPriceNum.toString();

  const handleBuyNow = () => {
    const formattedPrice = finalPriceNum.toLocaleString("en-IN");
    onPreOrder({
      ...plan,
      name: plan.isModelCard && addAI ? `${plan.name} (+ AI Subscription)` : plan.name,
      price: formattedPrice,
    });
  };

  return (
    <motion.div
      custom={plan.index || 0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 22,
        y: { type: "spring", stiffness: 140, damping: 18 },
        scale: { duration: 0.25, ease: "easeOut" },
      }}
      className={`relative w-full rounded-[24px] border-2 bg-white p-8 flex flex-col justify-between h-full select-none transition-all duration-300 z-10 ${
        plan.popular
          ? "border-(--primary-light)/85 shadow-[0_12px_36px_rgba(90,120,214,0.18)]"
          : "border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.03)]"
      } hover:border-(--primary-light)/60 hover:shadow-[0_22px_45px_rgba(90,120,214,0.2)]`}
      style={{
        willChange: "transform",
      }}
    >
      <style>{`
        @keyframes shine-slide {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .shine-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          pointer-events: none;
        }
        .cta-btn-hover:hover .shine-effect {
          animation: shine-slide 0.8s ease-in-out forwards;
        }
      `}</style>

      {/* Dynamic Vercel-like hover glow layer */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[24px] transition-opacity duration-300 z-0"
        style={{
          opacity: glow.opacity,
          background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgba(90, 120, 214, 0.18), transparent 45%)`,
        }}
      />

      <div className="relative z-10 flex flex-col h-full justify-between flex-1">
        <div>
          {/* Header & Badge */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-extrabold tracking-wider text-(--primary) uppercase">
              {plan.isModelCard ? "Cradle Model" : "Plan & Service"}
            </span>
            
            {plan.badge ? (
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                plan.badge === "Most Popular" 
                  ? "bg-(--primary) text-white shadow-sm"
                  : "bg-(--primary)/15 text-(--primary)"
              }`}>
                {plan.badge}
              </span>
            ) : (
              <div className="flex items-center bg-(--primary)/10 border border-(--primary)/20 px-2.5 py-1 rounded-full text-[10px] font-semibold text-(--primary)">
                <span className="relative flex h-2 w-2 mr-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-(--primary-light) opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-(--primary)"></span>
                </span>
                In Stock
              </div>
            )}
          </div>

          {/* Model Name */}
          <h3 className="text-2xl font-black text-(--text-dark) tracking-tight mb-2">
            {plan.name}
          </h3>



          {/* One line short description */}
          <p className="text-sm text-(--text-light) mb-6 leading-relaxed">
            {plan.description}
          </p>

          {/* Optional Product Image */}
          {plan.img && (
            <div className="w-full flex justify-center mb-6 overflow-hidden rounded-2xl">
              <img
                src={plan.img}
                alt={plan.name}
                width="150"
                height="128"
                loading="lazy"
                className="w-full max-w-[150px] h-32 object-cover rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-white/60"
              />
            </div>
          )}

          {/* AI Subscription Checkbox for Cradle Models (Excluded from Basic Model) */}
          {plan.isModelCard && !isBasicModel && (
            <div className="flex flex-col mb-6">
              <div 
                role="checkbox"
                tabIndex={0}
                aria-checked={addAI}
                aria-label="Add 1-Year AI Subscription"
                className="p-4 rounded-xl bg-white/20 border border-white/60 shadow-[inset_2px_2px_6px_rgba(255,255,255,0.4)] flex items-center justify-between transition-all duration-300 hover:bg-white/30 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-(--primary-light)/50"
                onClick={() => setAddAI(!addAI)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setAddAI(!addAI);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-300 ${
                    addAI 
                      ? "bg-(--primary) border-(--primary) text-white shadow-sm shadow-(--primary)/30 scale-105" 
                      : "border-slate-300 bg-white/50 hover:border-slate-400"
                  }`}>
                    {addAI && (
                      <motion.svg
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-3.5 h-3.5 stroke-[3]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </div>
                  
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-(--text-dark)">
                      Add 1-Year AI Subscription
                    </span>
                    <span className="text-[10px] text-(--text-light) flex flex-wrap items-center gap-1 mt-0.5">
                      Advanced health monitoring & alerts.
                      <a
                        href="#ai-features"
                        role="button"
                        aria-expanded={showAIFeatures}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowAIFeatures(!showAIFeatures);
                        }}
                        className="text-(--primary) underline hover:text-(--primary-light) font-bold focus:outline-none focus:ring-1 focus:ring-(--primary-light)/50 rounded px-1"
                      >
                        Tell me about AI subscription features
                      </a>
                    </span>
                  </div>
                </div>
                

              </div>

              {/* Expandable AI features card */}
              <AnimatePresence>
                {showAIFeatures && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    className="overflow-hidden border border-white/60 bg-white/20 p-4 rounded-xl shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4)] text-xs text-left"
                  >
                    <h5 className="font-extrabold text-(--text-dark) mb-2">
                      1-Year AI Subscription Includes:
                    </h5>
                    <ul className="space-y-1.5 text-(--text-light)">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--primary)" />
                        <span>Deep health & sleep analytics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--primary)" />
                        <span>Real-time disease & anomaly alerts</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--primary)" />
                        <span>Caretaker & pediatrician dashboard</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-(--primary)" />
                        <span>24/7 AI chat assistant & voice prompts</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Feature List (Staggered Fade-in) */}
          <motion.ul
            variants={featureContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 mb-8"
          >
            {plan.features && plan.features.map((feature, i) => (
              <motion.li
                key={i}
                variants={featureItemVariants}
                className="flex items-center gap-3 text-sm text-(--text) font-medium"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-(--primary)/12 text-(--primary)">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Action CTA Button (Gradient shine on hover) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleBuyNow}
          className="relative w-full py-3.5 clay-btn clay-btn-primary text-white rounded-full font-bold shadow-lg shadow-[#5A78D6]/25 overflow-hidden cursor-pointer select-none group cta-btn-hover flex items-center justify-center gap-2 mt-auto"
        >
          <div className="shine-effect" />
          <ShoppingBag className="w-4 h-4" />
          <span>{plan.price === "Custom" ? "Contact Us" : "Pre-Order"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}