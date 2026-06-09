import { Check } from "lucide-react";

export default function PricingCard({
  plan,
  cradleModels,
  onModelClick,
  onToggleModels,
  showAllModels,
}) {
  return (
    <div
      className={`pricing-card p-8 clay-card transition-all duration-300 ${
        plan.popular
          ? "border-(--primary) scale-105"
          : ""
      }`}
    >
      <h3 className="text-2xl font-bold mb-2 text-(--text-dark)">
        {plan.name}
      </h3>

      <p className="text-(--text-light) mb-4">
        {plan.description}
      </p>

      <div className="text-4xl font-bold mb-6">
        {plan.price === "Custom"
          ? plan.price
          : `${plan.price}`}
      </div>

      {plan.name !== "Cradle" && (
        <ul className="space-y-2 mb-6">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-2"
            >
              <Check className="w-4 h-4 text-(--primary)" />
              {feature}
            </li>
          ))}
        </ul>
      )}

      {plan.name === "Cradle" && (
        <div className="flex flex-col gap-7 mb-4">
          <p className="text-sm text-(--text-light)">
            Select a model ↓
          </p>

          <button
            onClick={() =>
              onModelClick(cradleModels.Basic)
            }
            className="py-4 clay-btn clay-btn-secondary"
          >
            Basic Model
          </button>

          <button
            onClick={() =>
              onModelClick(cradleModels.AIPro)
            }
            className="py-4 clay-btn clay-btn-secondary"
          >
            Standard Model
          </button>

          <button
            onClick={() =>
              onModelClick(cradleModels.Custom)
            }
            className="py-4 clay-btn clay-btn-primary"
          >
            Pro Model
          </button>

          <button
            onClick={onToggleModels}
            className="mt-2 px-4 py-2 clay-badge hover:scale-105 transition font-bold self-center"
          >
            {showAllModels
              ? "Hide All Models"
              : "View All Models"}
          </button>
        </div>
      )}
    </div>
  );
}