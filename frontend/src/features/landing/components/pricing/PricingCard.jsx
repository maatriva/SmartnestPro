import { useState } from "react";
import { Check, ShoppingBag, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedPrice } from "./AnimatedPrice";

export default function PricingCard({ plan, onPreOrder }) {
  const [addAI, setAddAI] = useState(false);
  const [showAIFeatures, setShowAIFeatures] = useState(false);
  const isBasicModel = plan.name === "Basic Model";
  const isPopular = plan.popular || plan.badge === "Most Popular";

  // Dynamic pricing calculation
  const basePriceNum = plan.price ? parseInt(plan.price.replace(/[^\d]/g, ""), 10) : 0;
  const finalPriceNum = plan.isModelCard && addAI ? basePriceNum + 10000 : basePriceNum;
  const finalPriceStr = finalPriceNum ? finalPriceNum.toString() : plan.price;

  const handleBuyNow = () => {
    const formattedPrice = finalPriceNum ? `₹${finalPriceNum.toLocaleString("en-IN")}` : plan.price;
    onPreOrder({
      ...plan,
      name: plan.isModelCard && addAI ? `${plan.name} (+ AI Subscription)` : plan.name,
      price: formattedPrice,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (plan.index || 0) * 0.1, ease: "easeOut" }}
      className={`relative w-full rounded-2xl clay-card-light bg-(--surface) p-6 sm:p-8 flex flex-col justify-between h-full select-none transition-[transform,box-shadow] duration-200 hover:-translate-y-1 ${
        isPopular
          ? "border-2 border-(--brand-accent) shadow-md ring-2 ring-(--brand-accent)/15"
          : "border border-(--border-card) shadow-sm hover:shadow-md"
      }`}
    >
      {/* Popular Badge on Top */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
          <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm flex items-center gap-1 ${
            isPopular
              ? "bg-(--brand-accent) text-white"
              : "bg-(--bg-canvas) text-(--brand-accent) border border-(--border-card)"
          }`}>
            {isPopular && <Sparkles size={12} />}
            <span>{plan.badge}</span>
          </span>
        </div>
      )}

      <div className="flex flex-col h-full justify-between flex-1">
        <div>
          {/* Category / Model indicator */}
          <div className="text-xs font-semibold text-(--brand-accent) mb-1">
            {plan.isModelCard ? "Smart Cradle" : "Institutional Fleet"}
          </div>

          {/* Model Name */}
          <h3 className="text-2xl font-bold text-(--text-primary) font-display tracking-tight mb-1">
            {plan.name}
          </h3>

          {/* Price Display */}
          <div className="my-3 pb-3 border-b border-(--text-primary)/10">
            {plan.price === "Custom" ? (
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-(--text-primary) font-display">
                  Custom Quote
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl font-extrabold text-(--text-primary) font-display tracking-tight">
                  <AnimatedPrice value={finalPriceStr} duration={0.4} />
                </span>
                <span className="text-xs text-(--text-secondary) font-normal">
                  {plan.isModelCard ? "one-time" : "per deployment"}
                </span>
              </div>
            )}
            <p className="text-xs text-(--text-secondary) mt-1">
              {plan.price === "Custom" ? "Volume discounts & central monitoring" : "All taxes & delivery setup included"}
            </p>
          </div>

          {/* Short description */}
          <p className="text-sm text-(--text-secondary) mb-5 leading-relaxed font-normal">
            {plan.description}
          </p>

          {/* Product Image */}
          {plan.img && (
            <div className="w-full flex justify-center mb-5 overflow-hidden rounded-xl bg-(--bg-canvas) p-3 border border-(--border-card)">
              <img
                src={plan.img}
                alt={plan.name}
                width="200"
                height="140"
                loading="lazy"
                decoding="async"
                className="max-h-36 w-auto object-contain"
              />
            </div>
          )}

          {/* AI Subscription Add-on for Standard & Pro Models */}
          {plan.isModelCard && !isBasicModel && (
            <div className="flex flex-col mb-5">
              <div 
                role="checkbox"
                tabIndex={0}
                aria-checked={addAI}
                aria-label="Add 1-Year AI Health Cloud Subscription"
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer select-none ${
                  addAI
                    ? "bg-(--bg-canvas) border-(--brand-accent) shadow-xs"
                    : "bg-(--surface) border-(--border-card) hover:border-(--brand-accent)/40"
                }`}
                onClick={() => setAddAI(!addAI)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setAddAI(!addAI);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    addAI 
                      ? "bg-(--brand-accent) border-(--brand-accent) text-white" 
                      : "border-(--text-secondary)/40 bg-white"
                  }`}>
                    {addAI && <Check size={14} strokeWidth={3} />}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-semibold text-(--text-primary)">
                        1-Year AI Cloud Subscription
                      </span>
                      <span className="text-xs font-bold text-(--brand-accent)">
                        +₹10,000/yr
                      </span>
                    </div>
                    <p className="text-xs text-(--text-secondary) mt-0.5">
                      Pediatric risk alerts, cry analytics, and sleep trends.
                    </p>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-(--text-primary)/10 flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAIFeatures(!showAIFeatures);
                    }}
                    className="text-xs font-semibold text-(--brand-accent) hover:underline inline-flex items-center gap-1"
                  >
                    <span>{showAIFeatures ? "Hide details" : "What is included?"}</span>
                    <ChevronDown size={13} className={`transition-transform duration-200 ${showAIFeatures ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>

              {/* Expandable AI features list */}
              <AnimatePresence>
                {showAIFeatures && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="overflow-hidden border border-(--border-card) bg-(--bg-canvas) p-3 rounded-xl text-xs text-left mt-2 space-y-1.5"
                  >
                    <p className="font-semibold text-(--text-primary)">
                      AI Health Cloud features:
                    </p>
                    <ul className="space-y-1 text-(--text-secondary)">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--brand-accent)" />
                        <span>Continuous respiratory trend analytics</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--brand-accent)" />
                        <span>Real-time fever & anomaly push alerts</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--brand-accent)" />
                        <span>Pediatrician-shareable sleep health reports</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--brand-accent)" />
                        <span>24/7 intelligent cry classification</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Features Checklist */}
          <ul className="space-y-2.5 mb-6">
            {plan.features && plan.features.map((feature, i) => (
              <li
                key={i}
                className="flex items-center gap-2.5 text-sm text-(--text-primary) font-normal"
              >
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-(--brand-accent)/10 text-(--brand-accent) shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleBuyNow}
          className={`w-full py-3 sm:py-3.5 clay-btn font-bold rounded-xl flex items-center justify-center gap-2 mt-auto transition-transform ${
            isPopular ? "clay-btn-primary" : "clay-btn-secondary"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{plan.price === "Custom" ? "Request Hospital Quote" : "Pre-Order Cradle"}</span>
        </button>
      </div>
    </motion.div>
  );
}