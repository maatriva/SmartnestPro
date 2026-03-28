import React, { useLayoutEffect, useRef } from "react";
import { Check, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Cradle",
    badge: "Starter",
    price: "599",
    description: "Core AI monitoring for better sleep comfort.",
    popular: false,
    cta: "Pre-Order Now",
    features: [
      "AI sleep & comfort monitoring",
      "Smart soothing routines",
      "Mobile app control",
      "Temperature + environment checks",
      "Shared access (1 user)",
      "Standard warranty"
    ]
  },
  {
    name: "Mattress",
    badge: "Most Popular",
    price: "899",
    description: "Deeper insights + enhanced comfort automation.",
    popular: true,
    cta: "Get Pro",
    features: [
      "Everything in Cradle",
      "Advanced trend insights (demo UI)",
      "Premium soothing library",
      "Health summary reports",
      "Shared access (3 users)",
      "Priority support"
    ]
  },
  {
    name: "Bulk",
    badge: "Coming Soon",
    price: "—",
    description: "Bulk direct contact for retailers & clinics (coming soon).",
    popular: false,
    cta: "Bulk Direct Contact",
    disabledCta: true,
    features: [
      "Bulk pricing & scheduling",
      "Clinic/retailer onboarding",
      "Dedicated account manager",
      "Custom monitoring setup",
      "Install/support packages"
    ]
  }
];

export function Pricing() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Header Animation
      gsap.from(".pricing-header-el", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pricing-header",
          start: "top 90%",
          toggleActions: "play none none none",
        }
      });

      // 2. Cards Animation - Added immediateRender: false
      gsap.from(".pricing-card", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.2)",
        immediateRender: false, // Prevents elements from being hidden before scroll
        scrollTrigger: {
          trigger: ".pricing-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      // 3. Footer Animation
      gsap.from(".pricing-footer", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".pricing-footer",
          start: "top 95%",
        }
      });
      
    }, sectionRef);

    // Force recalculation
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="py-24 px-6 bg-white/50 backdrop-blur-sm text-[var(--text)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="pricing-header text-center max-w-3xl mx-auto mb-16">
          <div className="pricing-header-el inline-flex items-center gap-2 px-4 py-2 
          bg-[var(--bg-glass)] rounded-full 
          text-[var(--primary)] text-sm font-medium mb-4 
          border border-[var(--border)]">
            <Star className="w-4 h-4" />
            Pricing
          </div>

          <h2 className="pricing-header-el text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-6">
            Choose the perfect
            <br />
            <span className="text-[var(--primary)]">
              plan for your family
            </span>
          </h2>

          <p className="pricing-header-el text-xl text-[var(--text-light)]">
            Cradle and Mattress are available now. Bulk direct contact is coming soon.
          </p>
        </div>

        {/* Cards */}
        <div className="pricing-grid grid md:grid-cols-3 gap-8 ">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "pricing-card relative rounded-[var(--radius-lg)] p-8 border transition-all duration-300 flex flex-col h-full",
                plan.popular
                  ? "bg-[var(--white)] border-[var(--primary)] shadow-[var(--shadow-primary)] scale-105 md:scale-110 z-10"
                  : "bg-[var(--white)] border-[var(--border)] hover:shadow-[var(--shadow)] hover:scale-105"
              ].join(" ")}
            >
              <div className="flex-grow">
                {/* Top */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[var(--text-dark)] mb-2">
                    {plan.name}
                  </h3>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 
                  bg-[var(--bg-secod)] border border-[var(--border)] 
                  rounded-full text-sm font-semibold text-[var(--text)] mb-4`}>
                    {plan.popular ? (
                      <>
                        <Star className="w-4 h-4 text-[var(--primary)]" />
                        {plan.badge}
                      </>
                    ) : (
                      <span>{plan.badge}</span>
                    )}
                  </div>

                  <p className="text-[var(--text-light)] mb-6">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-[var(--text-dark)]">
                      {plan.price === "—" ? "—" : `$${plan.price}`}
                    </span>
                    {plan.price !== "—" && (
                      <span className="text-[var(--text-light)]">USD</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full 
                      bg-[var(--primary)] flex items-center justify-center mt-0.5">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-[var(--text)]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button
                type="button"
                disabled={plan.disabledCta}
                className={[
                  "w-full py-4 rounded-full font-medium transition-all whitespace-nowrap",
                  plan.disabledCta
                    ? "bg-[var(--border)] text-[var(--text-light)] cursor-not-allowed"
                    : plan.popular
                      ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] shadow-[var(--shadow-primary)]"
                      : "bg-[var(--text-dark)] text-white hover:bg-[var(--primary)]"
                ].join(" ")}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pricing-footer mt-12 text-center text-sm text-[var(--text-light)]">
          Want a custom bulk quote? Use the Contact page and we’ll reach out (coming soon).
        </div>
      </div>
    </section>
  );
}