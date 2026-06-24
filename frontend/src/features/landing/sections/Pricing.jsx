import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PricingHeader from "../components/pricing/PricingHeader";
import PricingCard from "../components/pricing/PricingCard";
import SplitCard from "../components/pricing/SplitCard";

import { PRICING_PLANS } from "../data/pricing/pricingPlans";
import { CRADLE_MODELS } from "../data/pricing/cradleModel";

import usePricingAnimation from "../hooks/usePricingAnimation";

import PreOrderForm from "../components/pricing/PreOrderForm";

export default function Pricing() {
  const sectionRef = useRef(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [expandedModel, setExpandedModel] = useState(null);
  const [showAllModels, setShowAllModels] = useState(false);

  usePricingAnimation(sectionRef);

  const handleToggleAllModels = () => {
    if (!showAllModels) {
      setShowAllModels(true);

      setTimeout(() => {
        const el =
          document.getElementById(
            "all-models-grid"
          );

        if (el) {
          const y =
            el.getBoundingClientRect().top +
            window.pageYOffset -
            80;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      setShowAllModels(false);

      setTimeout(() => {
        if (sectionRef.current) {
          const y =
            sectionRef.current.getBoundingClientRect()
              .top +
            window.pageYOffset -
            50;

          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 px-6 blend-pricing text-(--text) relative"
    >
      <div className="max-w-7xl mx-auto">

        <PricingHeader />

        {/* Pricing Cards */}
        <div className="pricing-grid grid md:grid-cols-3 gap-8 relative z-20">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              cradleModels={CRADLE_MODELS}
              onToggleModels={handleToggleAllModels}
              showAllModels={showAllModels}
              expandedModel={expandedModel}
              setExpandedModel={setExpandedModel}
              onPreOrder={setSelectedPlan}
            />
          ))}
        </div>

        {/* Compare Models */}
        <AnimatePresence>
          {showAllModels && (
            <motion.div
              id="all-models-grid"
              initial={{
                height: 0,
                opacity: 0,
                overflow: "hidden",
              }}
              animate={{
                height: "auto",
                opacity: 1,
                transitionEnd: {
                  overflow: "visible",
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                overflow: "hidden",
              }}
              className="mt-16 relative z-10"
            >
              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-bold text-(--text-dark)">
                  Compare All Models
                </h3>

                <p className="text-(--text-light) mt-2">
                  Find the perfect smart cradle
                  for your baby
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 pb-12 px-2">
                {Object.values(CRADLE_MODELS).map(
                  (model, idx) => (
                    <SplitCard
                      key={idx}
                      model={model}
                      onPreOrder={setSelectedPlan}
                    />
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {selectedPlan && (
        <PreOrderForm
          selectedPlan={selectedPlan}
          onClose={() =>
            setSelectedPlan(null)
          }
        />
      )}
    </section>
  );
}