import { useRef, useState, lazy, Suspense } from "react";
import PricingHeader from "../components/pricing/PricingHeader";
import PricingCard from "../components/pricing/PricingCard";
import { PRICING_PLANS } from "../data/pricing/pricingPlans";
import { CRADLE_MODELS } from "../data/pricing/cradleModel";

const PreOrderForm = lazy(() => import("../components/pricing/PreOrderForm"));

export default function Pricing() {
  const sectionRef = useRef(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="clay-section relative bg-(--bg-canvas) scroll-mt-24 sm:scroll-mt-28 pt-14 pb-20 sm:pt-20 sm:pb-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto clay-container px-4 sm:px-6 lg:px-8 relative z-10">
        <PricingHeader />

        {/* Primary Cradle Models Comparison (3 columns on Desktop, symmetric 2 on Tablet with last centered, stacked on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch relative z-10 mt-8">
          {Object.values(CRADLE_MODELS).map((model, idx) => (
            <div
              key={model.name}
              className={`flex flex-col h-full ${
                idx === 2 ? "md:col-span-2 md:max-w-md md:mx-auto lg:col-span-1 lg:max-w-none w-full" : "w-full"
              }`}
            >
              <PricingCard
                plan={{
                  name: model.name,
                  price: model.price,
                  description: model.description,
                  features: model.features,
                  img: model.img,
                  isModelCard: true,
                  badge: model.name === "Standard Model" ? "Most Popular" : model.name === "Pro Model" ? "Premium AI" : null,
                  index: idx,
                }}
                onPreOrder={setSelectedPlan}
              />
            </div>
          ))}
        </div>

        {/* Secondary Enterprise Plan */}
        <div className="mt-16 sm:mt-20 border-t border-(--text-primary)/10 pt-12 sm:pt-14 relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-display text-(--text-primary)">
              Hospital & Institutional Deployments
            </h3>
            <p className="text-(--text-secondary) text-sm sm:text-base mt-1 max-w-xl mx-auto">
              Custom fleet management, telemetry dashboards, and multi-bed nursery monitoring for clinics and hospitals.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            {PRICING_PLANS.filter(plan => plan.name === "Enterprise").map((plan) => (
              <PricingCard
                key={plan.name}
                plan={{
                  ...plan,
                  index: 3,
                }}
                onPreOrder={setSelectedPlan}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedPlan && (
        <Suspense fallback={null}>
          <PreOrderForm
            selectedPlan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        </Suspense>
      )}
    </section>
  );
}