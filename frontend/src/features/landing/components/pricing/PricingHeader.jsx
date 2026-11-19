export default function PricingHeader() {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) leading-tight mb-3 text-center [text-wrap:balance] font-display">
        Cradle models & pricing
      </h2>

      <p className="text-base sm:text-lg text-(--text-secondary) font-normal max-w-2xl mx-auto leading-relaxed text-center [text-wrap:pretty]">
        Choose the model that fits your nursery. Every cradle is engineered with contactless vitals sensing, automatic soothing, and instant mobile alerts.
      </p>
    </div>
  );
}