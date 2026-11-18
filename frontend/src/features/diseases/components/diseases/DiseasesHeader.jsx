export default function DiseasesHeader() {
  return (
    <div className="clay-section-header">
      <div className="inline-block px-4 py-1.5 clay-badge text-xs sm:text-sm font-bold mb-3">
        Monitoring
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight mb-3">
        Diseases Monitored by Our AI
      </h2>

      <p className="text-base sm:text-lg text-(--text) font-medium max-w-2xl mx-auto leading-relaxed">
        Our smart baby cradle tracks vital patterns continuously to
        detect early symptoms with pediatric precision.
      </p>
    </div>
  );
}