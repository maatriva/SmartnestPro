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
      className="py-24 px-6 blend-pricing text-(--text) relative"
    >
      <div className="max-w-7xl mx-auto">
        <PricingHeader />

        {/* Primary Cradle Models Comparison (3 columns on Desktop, 2 on Tablet with last centered, stacked on Mobile) */}
        <div className="pricing-grid flex flex-wrap justify-center gap-8 relative z-20">
          {Object.values(CRADLE_MODELS).map((model, idx) => (
            <div
              key={model.name}
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex"
            >
              <PricingCard
                plan={{
                  name: model.name,
                  price: `₹${model.price}`,
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
        <div className="mt-20 border-t border-slate-200/20 pt-16 relative z-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-(--text-dark)">
              Commercial & Hospital Plans
            </h3>
            <p className="text-(--text-light) text-sm mt-2">
              Tailored smart cradle deployments for healthcare and bulk nurseries
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