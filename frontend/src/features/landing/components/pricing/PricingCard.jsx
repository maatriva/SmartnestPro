import { Check } from "lucide-react";
import ExpandableModelCard from "./ExpandableModelCard";

export default function PricingCard({
  plan,
  cradleModels,
  onToggleModels,
  showAllModels,
  expandedModel,
  setExpandedModel,
  onPreOrder,
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
        <div className="flex flex-col gap-4 mb-4">
          <p className="text-sm text-(--text-light) mb-1">
            Select a model ↓
          </p>

          <ExpandableModelCard
            model={cradleModels.Basic}
            isExpanded={expandedModel === "Basic"}
            onToggle={() =>
              setExpandedModel(expandedModel === "Basic" ? null : "Basic")
            }
            onPreOrder={onPreOrder}
          />

          <ExpandableModelCard
            model={cradleModels.AIPro}
            isExpanded={expandedModel === "AIPro"}
            onToggle={() =>
              setExpandedModel(expandedModel === "AIPro" ? null : "AIPro")
            }
            onPreOrder={onPreOrder}
          />

          <ExpandableModelCard
            model={cradleModels.Custom}
            isExpanded={expandedModel === "Custom"}
            onToggle={() =>
              setExpandedModel(expandedModel === "Custom" ? null : "Custom")
            }
            onPreOrder={onPreOrder}
          />

          <button
            onClick={onToggleModels}
            className="mt-4 px-4 py-2 clay-badge hover:scale-105 transition font-bold self-center cursor-pointer"
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