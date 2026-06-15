import { useRef, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import PricingHeader from "../components/pricing/PricingHeader";
import PricingCard from "../components/pricing/PricingCard";
import SplitCard from "../components/pricing/SplitCard";
import HorizontalSplitCard from "../components/pricing/HorizontalSplitCard";

import { PRICING_PLANS } from "../data/pricing/pricingPlans";
import { CRADLE_MODELS } from "../data/pricing/cradleModel";

import usePricingAnimation from "../hooks/usePricingAnimation";

import PreOrderForm from "../components/pricing/PreOrderForm";

export default function Pricing() {
  const sectionRef = useRef(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeModel, setActiveModel] = useState(null);
  const [showAllModels, setShowAllModels] = useState(false);

  usePricingAnimation(sectionRef);

  const handleModelClick = (model) => {
    setActiveModel(model);

    setTimeout(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();

        const absoluteCenter =
          rect.top +
          window.pageYOffset +
          rect.height / 2;

        const windowCenter =
          window.innerHeight / 2;

        window.scrollTo({
          top: absoluteCenter - windowCenter,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const closeActiveModel = () => {
    setActiveModel(null);

    setTimeout(() => {
      const grid =
        document.querySelector(".pricing-grid");

      if (grid) {
        const y =
          grid.getBoundingClientRect().top +
          window.pageYOffset -
          100;

        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
      }
    }, 100);
  };

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
      className="py-24 px-6 clay-even-section text-(--text) relative"
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
              onModelClick={handleModelClick}
              onToggleModels={handleToggleAllModels}
              showAllModels={showAllModels}
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

        {/* Active Model Modal */}
        <AnimatePresence>
          {activeModel && (
            <div className="absolute inset-0 z-100 flex items-center justify-center p-4 overflow-hidden">

              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeActiveModel}
              />

              <motion.div
                key={activeModel.name}
                className="relative z-10 max-w-3xl w-full mx-auto"
                initial={{
                  scale: 0.8,
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  scale: 0.8,
                  opacity: 0,
                  y: 30,
                }}
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
              >
                <button
                  onClick={closeActiveModel}
                  className="absolute -top-12 right-0 p-2 text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors z-110"
                >
                  <X size={24} />
                </button>

                <HorizontalSplitCard
                  model={activeModel}
                  onPreOrder={(model) => {
                    setSelectedPlan(model);
                    closeActiveModel();
                  }}
                />
              </motion.div>
            </div>
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