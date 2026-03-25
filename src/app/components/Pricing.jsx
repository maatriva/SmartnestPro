import { Check, Star } from "lucide-react";

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
    ],
    gradient: "from-purple-500 to-pink-500"
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
    ],
    gradient: "from-blue-500 to-purple-600"
  },
  {
    name: "Bulk",
    badge: "Coming Soon",
    price: "—",
    description: "Bulk direct contact for retailers & clinics (coming soon).",
    popular: false,
    cta: "Bulk Direct Contact (Coming Soon)",
    disabledCta: true,
    features: [
      "Bulk pricing & scheduling",
      "Clinic/retailer onboarding",
      "Dedicated account manager",
      "Custom monitoring setup",
      "Install/support packages"
    ],
    gradient: "from-pink-500 to-purple-500"
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose the perfect
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              plan for your family
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Cradle and Mattress are available now. Bulk direct contact is coming soon.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={[
                "relative rounded-3xl p-8 border transition-all duration-300",
                plan.popular
                  ? "bg-white border-purple-300 shadow-2xl scale-105 md:scale-110"
                  : "bg-white border-gray-200 hover:shadow-xl hover:scale-105"
              ].join(" ")}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/5 rounded-full text-sm font-semibold text-gray-700 mb-4">
                  {plan.popular ? (
                    <>
                      <Star className="w-4 h-4 fill-current text-purple-600" />
                      {plan.badge}
                    </>
                  ) : (
                    <span className="text-gray-600">{plan.badge}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price === "—" ? "—" : `$${plan.price}`}
                  </span>
                  {plan.price === "—" ? null : <span className="text-gray-600">USD</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={[
                        "flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r",
                        plan.gradient,
                        "flex items-center justify-center mt-0.5"
                      ].join(" ")}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                disabled={plan.disabledCta}
                className={[
                  "w-full py-4 rounded-full font-medium transition-all whitespace-nowrap",
                  plan.disabledCta
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : plan.popular
                      ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl`
                      : "bg-gray-900 text-white hover:bg-gray-800"
                ].join(" ")}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-600">
          Want a custom bulk quote? Use the Contact page and we’ll reach out (coming soon).
        </div>
      </div>
    </section>
  );
}
