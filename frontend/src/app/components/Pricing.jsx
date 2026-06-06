import React, { useLayoutEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PreOrderForm from "./pages/preOrder";

gsap.registerPlugin(ScrollTrigger);

const cradleModels = {
  Basic: {
    name: "Basic Model",
    price: "12,000",
    description: "Light version with essential features.",
    features: [
      "Auto swing",
      "Animal shaped cradle",
      "Custom lullabies",
      "Attached toys",
    ],
    img: "/BasicCradle.jpeg",
  },
  AIPro: {
    name: "Standard Model",
    price: "45,000",
    description: "Advanced AI cradle with sensors & cloud.",
    features: [
      "Health & sleep sensors",
      "Cloud connectivity",
      "Real-time monitoring",
      "AI alerts",
    ],
    img: "/AIPro.jpeg",
  },
  Custom: {
    name: "Pro Model",
    price: "75,000",
    description: "Advanced version with full AI capabilities.",
    features: [
      "Edge AI",
      "AI Voice Assistant",
      "Screen + Monitoring",
      "Made in India AI",
    ],
    img: "/EnterpriseCradle.png",
  },
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
      "AI Voice Assistant (pro)",
    ],
  },
  {
    name: "Cradle",
    badge: "Most Popular",
    price: "",
    description: "Smart AI cradle with intelligent modes.",
    popular: true,
    features: [],
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
      "Dedicated support",
    ],
  },
];

const SplitCard = ({ model, onPreOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const toggleOpen = () => {
    const tl = gsap.timeline();
    if (!isOpen) {
      tl.to(frontRef.current, { y: -10, duration: 0.6, ease: "power3.out" }, 0);
      tl.to(backRef.current, { height: "auto", opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
    } else {
      tl.to(frontRef.current, { y: 0, duration: 0.5, ease: "power2.inOut" }, 0);
      tl.to(backRef.current, { height: 0, opacity: 0, duration: 0.5, ease: "power2.inOut" }, 0);
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto z-10 flex flex-col h-full">
      {/* FRONT CARD */}
      <div 
        ref={frontRef} 
        className="demo-card-front relative p-6 flex flex-col flex-1 clay-card z-20"
      >
        {model.img && (
          <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
            <img src={model.img} alt={model.name} className="w-full h-full object-cover" />
          </div>
        )}
        <h3 className="text-2xl font-bold mb-2 text-[var(--text-dark)]">{model.name}</h3>
        <div className="text-3xl font-bold text-[var(--primary)] mb-4">₹{model.price}</div>
        
        <button
          onClick={toggleOpen}
          className="w-full py-2 mb-3 clay-btn clay-btn-secondary"
        >
          {isOpen ? "Close Info" : "Know More"}
        </button>

        <button
          onClick={() => onPreOrder(model)}
          className="w-full py-3 clay-btn clay-btn-primary mt-auto"
        >
          Pre-Order
        </button>
      </div>

      {/* BACK CARD (Drops down in-flow) */}
      <div 
        ref={backRef} 
        className="demo-card-back relative z-10 overflow-hidden"
        style={{ height: 0, opacity: 0, marginTop: "-20px" }}
      >
        <div className="pt-10 pb-6 px-6 flex flex-col clay-card bg-white">
          <h3 className="text-xl font-bold mb-4 text-[var(--primary)]">More Info</h3>
          <p className="text-[var(--text-light)] mb-4">{model.description}</p>
          <ul className="space-y-2 mb-2">
            {model.features.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--text-dark)]">
                <Check className="w-4 h-4 text-[var(--primary)] mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const HorizontalSplitCard = ({ model, onPreOrder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const toggleOpen = () => {
    const isMobileNow = window.innerWidth < 768;
    const tl = gsap.timeline();
    if (!isOpen) {
      if (isMobileNow) {
        tl.to(frontRef.current, { y: -160, duration: 1, ease: "power2.out", delay: 0 }, 0);
        tl.to(backRef.current, { y: 160, duration: 1, ease: "power2.out", delay: 0 }, 0);
      } else {
        tl.to(frontRef.current, { x: 280, duration: 1, ease: "power2.out", delay: 0 }, 0);
        tl.to(backRef.current, { x: 60, duration: 1, ease: "power2.out", delay: 0 }, 0);
      }
    } else {
      tl.to(frontRef.current, { x: 0, y: 0, duration: 1, ease: "power2.out", delay: 0 }, 0);
      tl.to(backRef.current, { x: 0, y: 0, duration: 1, ease: "power2.out", delay: 0 }, 0);
    }
    setIsOpen(!isOpen);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useLayoutEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      className="relative w-full max-w-sm mx-auto z-10 transition-transform duration-1000 ease-[cubic-bezier(0,0.55,0.45,1)]"
      style={{ transform: isOpen ? (isMobile ? "translateY(-60px)" : "translateX(-170px)") : "translate(0px, 0px)" }}
    >
      {/* BACK CARD */}
      <div 
        ref={backRef} 
        className="absolute inset-0 p-6 flex flex-col clay-card bg-white z-0"
      >
        <h3 className="text-xl font-bold mb-4 text-[var(--primary)]">More Info</h3>
        <p className="text-[var(--text-light)] mb-4">{model.description}</p>
        <ul className="space-y-2 mb-6">
          {model.features.map((f, i) => (
            <li key={i} className="flex gap-2 text-sm text-[var(--text-dark)]">
              <Check className="w-4 h-4 text-[var(--primary)] mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* FRONT CARD */}
      <div 
        ref={frontRef} 
        className="relative p-6 flex flex-col clay-card z-10"
      >
        {model.img && (
          <div className="w-full h-48 mb-6 rounded-lg overflow-hidden">
            <img src={model.img} alt={model.name} className="w-full h-full object-cover" />
          </div>
        )}
        <h3 className="text-2xl font-bold mb-2 text-[var(--text-dark)]">{model.name}</h3>
        <div className="text-3xl font-bold text-[var(--primary)] mb-4">₹{model.price}</div>
        
        <button
          onClick={toggleOpen}
          className="w-full py-2 mb-3 clay-btn clay-btn-secondary"
        >
          {isOpen ? "Close Info" : "Know More"}
        </button>

        <button
          onClick={() => onPreOrder(model)}
          className="w-full py-3 clay-btn clay-btn-primary mt-auto"
        >
          Pre-Order
        </button>
      </div>
    </div>
  );
};

export function Pricing() {
  const sectionRef = useRef(null);
  const modelDisplayRef = useRef(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeModel, setActiveModel] = useState(null);
  const [showAllModels, setShowAllModels] = useState(false);

  // Scroll animation (unchanged)
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
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
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 🔥 Click handler
  const handleModelClick = (model) => {
    setActiveModel(model);
    setTimeout(() => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const absoluteCenter = rect.top + window.pageYOffset + (rect.height / 2);
        const windowCenter = window.innerHeight / 2;
        window.scrollTo({ top: absoluteCenter - windowCenter, behavior: "smooth" });
      }
    }, 100);
  };

  const closeActiveModel = () => {
    setActiveModel(null);
    setTimeout(() => {
      const grid = document.querySelector(".pricing-grid");
      if (grid) {
        const y = grid.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const handleToggleAllModels = () => {
    if (!showAllModels) {
      setShowAllModels(true);
      setTimeout(() => {
        const el = document.getElementById("all-models-grid");
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      setShowAllModels(false);
      setTimeout(() => {
        if (sectionRef.current) {
          const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset - 50;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 px-6 bg-[var(--bg-secondary)] text-[var(--text)] relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
            Pricing
          </h2>
          <p className="text-[var(--text-light)] text-xl">
            Choose your perfect plan
          </p>
        </div>

        <div className="pricing-grid grid md:grid-cols-3 gap-8 relative z-20">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card p-8 clay-card transition-all duration-300 
              ${
                plan.popular
                  ? "border-[var(--primary)] scale-105"
                  : ""
              }`}
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

              {plan.name === "Cradle" && (
                <div className="flex flex-col gap-7 mb-4">
                  <p className="text-sm text-[var(--text-light)]">
                    Select a model ↓
                  </p>

                  <button
                    onClick={() => handleModelClick(cradleModels.Basic)}
                    className="py-4 mt-2 clay-btn clay-btn-secondary"
                  >
                    Basic Model
                  </button>

                  <button
                    onClick={() => handleModelClick(cradleModels.AIPro)}
                    className="py-4 clay-btn clay-btn-secondary"
                  >
                    Standard Model
                  </button>

                  <button
                    onClick={() => handleModelClick(cradleModels.Custom)}
                    className="py-4 clay-btn clay-btn-primary"
                  >
                    Pro Model
                  </button>

                  <button
                    onClick={handleToggleAllModels}
                    className="mt-2 px-4 py-2 clay-badge hover:scale-105 transition font-bold self-center"
                  >
                    {showAllModels ? "Hide All Models" : "View All Models"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 🔥 ALL MODELS GRID */}
        <AnimatePresence>
          {showAllModels && (
            <motion.div
              id="all-models-grid"
              initial={{ height: 0, opacity: 0, overflow: "hidden" }}
              animate={{ height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } }}
              exit={{ height: 0, opacity: 0, overflow: "hidden" }}
              className="mt-16 relative z-10"
            >
              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-bold text-[var(--text-dark)]">Compare All Models</h3>
                <p className="text-[var(--text-light)] mt-2">Find the perfect smart cradle for your baby</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 pb-12 px-2">
                {Object.values(cradleModels).map((model, idx) => (
                  <SplitCard key={idx} model={model} onPreOrder={setSelectedPlan} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔥 SECTION CENTER MODEL (POPS OUT) */}
        <AnimatePresence>
          {activeModel && (
            <div className="absolute inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeActiveModel}
              />

              <motion.div
                key={activeModel.name}
                className="relative z-10 max-w-md w-full mx-auto"
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <button
                  onClick={closeActiveModel}
                  className="absolute -top-12 right-0 p-2 text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors z-[110]"
                >
                  <X size={24} />
                </button>
                <HorizontalSplitCard 
                  model={activeModel} 
                  onPreOrder={(m) => {
                    setSelectedPlan(m);
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
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </section>
  );
}

