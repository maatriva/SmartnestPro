import React, { useLayoutEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PreOrderForm from "./pages/preOrder";

gsap.registerPlugin(ScrollTrigger);

const cradleModels = {
  Basic: {
    name: "Basic Model",
    price: "12,000",
    description: "Light version with essential features.",
    features: ["Auto swing", "Animal shaped cradle", "Custom lullabies", "Attached toys"],
     img : "/BasicCradle.jpeg"
  },
  AIPro: {
    name: "Standard Model",
    price: "45,000",
    description: "Advanced AI cradle with sensors & cloud.",
    features: ["Health & sleep sensors", "Cloud connectivity", "Real-time monitoring", "AI alerts"],
     img : "/AIPro.jpeg"
  },
  Custom: {
    name: "Pro Model",
    price: "75,000",
    description: "Advanced version with full AI capabilities.",
    features: ["Edge AI", "AI Voice Assistant", "Screen + Monitoring", "Made in India AI"],
     img : "/EnterpriseCradle.png"
  }
};

const plans = [
  {
    name: "AI Subscription",
    badge: "Smart AI",
    price: "₹10,000",
    description: "Advanced AI health monitoring & assistant system.",
    popular: false,
    features: [
      "Deep analysis",
      "Disease detection",
      "Meaning of diseases",
      "Caretaker access",
      "Chat assistant (standard)",
      "AI Voice Assistant (pro)"
    ],
  },
  {
    name: "Cradle",
    badge: "Most Popular",
    price: "",
    description: "Smart AI cradle with intelligent modes.",
    popular: true,
    features: [] // ✅ removed features
  },
  {
    name: "Enterprise",
    badge: "Commercial",
    price: "Custom",
    description: "For hospitals & daycare centers.",
    popular: false,
    features: [
      "Bulk deployment",
      "Central monitoring dashboard",
      "Custom integrations",
      "Dedicated support"
    ]
  }
];

export function Pricing() {
  const sectionRef = useRef(null);
  const modelSectionRef = useRef(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeModel, setActiveModel] = useState(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(".pricing-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".pricing-grid",
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleModelClick = (model) => {
    setActiveModel(model);

    setTimeout(() => {
      const target = document.getElementById(`model-${model.name}`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });

        gsap.fromTo(
          target,
          { scale: 0.9 },
          { scale: 1.05, duration: 0.4, ease: "back.out(1.5)", clearProps: "transform" }
        );
      }
    }, 50);
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 px-6 bg-[var(--bg-secondary)] text-[var(--text)]"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
            Pricing
          </h2>
          <p className="text-[var(--text-light)] text-xl">
            Choose your perfect plan
          </p>
        </div>

        {/* PRICING CARDS */}
        <div className="pricing-grid grid md:grid-cols-3 gap-8">

          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card p-8 rounded-xl border transition-all duration-300 
              ${plan.popular ? "border-[var(--primary)] shadow-[var(--shadow-primary)] scale-105" : "border-[var(--border)]"}
              bg-[var(--bg-glass)] hover:shadow-[var(--shadow)]`}
            >
              <h3 className="text-2xl font-bold mb-2 text-[var(--text-dark)]">
                {plan.name}
              </h3>

              <p className="text-[var(--text-light)] mb-4">
                {plan.description}
              </p>

              <div className="text-4xl font-bold mb-6">
                {plan.price === "Custom" ? plan.price : `${plan.price}`}
              </div>

              {/* ✅ Hide features for Cradle */}
              {plan.name !== "Cradle" && (
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="w-4 h-4 text-[var(--primary)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {/* ✅ Cradle Buttons Only */}
              {plan.name === "Cradle" && (
                <div className="flex flex-col gap-7 mb-4">
                  <p className="text-sm text-[var(--text-light)]">
                    Select a model ↓
                  </p>

                  <button
                    onClick={() => handleModelClick(cradleModels.Basic)}
                    className="py-4 mt-2 bg-[var(--bg-secondary)] rounded-lg hover:bg-[var(--bg-secondaryh)] hover:text-white transition font-medium"
                  >
                    Basic Model
                  </button>

                  <button
                    onClick={() => handleModelClick(cradleModels.AIPro)}
                    className="py-4 bg-[var(--bg-secondary)] rounded-lg shadow-md hover:opacity-90 transition font-medium hover:bg-[var(--bg-secondaryh)] hover:text-white"
                  >
                    Standard Model
                  </button>

                  <button
                    onClick={() => handleModelClick(cradleModels.Custom)}
                    className="py-4 bg-[var(--text-dark)]  text-white rounded-lg hover:bg-[var(--primary)] transition font-medium "
                  >
                    Pro Model
                  </button>
                </div>
              )}

            </div>
          ))}

        </div>

        {/* MODELS SECTION */}
        <div
          ref={modelSectionRef}
          className="mt-20 max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
        >
          {Object.values(cradleModels).map((model) => (
            <div
              key={model.name}
              id={`model-${model.name}`}
              className={`p-6 flex flex-col rounded-xl border transition-all duration-300 cursor-pointer
              ${activeModel?.name === model.name
                  ? "border-[var(--primary)] shadow-[var(--shadow-primary)] scale-105"
                  : "border-[var(--border)] hover:shadow-[var(--shadow)] hover:scale-105"
                } bg-[var(--bg-glass)]`}
            >
              {model.img && (
                <div className="w-full h-48 mb-6 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={model.img}
                    alt={model.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 text-[var(--text-dark)]">
                {model.name}
              </h3>

              <p className="text-[var(--text-light)] mb-4 flex-grow">
                {model.description}
              </p>

              <div className="text-3xl font-bold text-[var(--primary)] mb-4">
                ₹{model.price}
              </div>

              {/* ✅ Features only here */}
              <ul className="space-y-2 mb-6">
                {model.features.map((f, i) => (
                  <li key={i} className="flex gap-2 text-[var(--text-dark)]">
                    <Check className="w-4 h-4 text-[var(--primary)] mt-1" />
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(model)}
                className="w-full py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[var(--primary-hover)] transition shadow-md mt-auto"
              >
                Pre-Order
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-[var(--text-light)]">
          Custom enterprise solutions available on request.
        </div>

      </div>

      {selectedPlan && (
        <PreOrderForm
          selectedPlan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  );
}