export default function FeatureCard({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="grid-item relative clay-card p-8 flex flex-col h-full">
      <div className="w-16 h-16 clay-badge flex items-center justify-center mb-6">
        <Icon
          className="w-8 h-8 text-(--primary)"
          strokeWidth={2.5}
        />
      </div>

      <h3 className="text-xl font-semibold text-(--text-dark) mb-3">
        {feature.title}
      </h3>

      <p className="text-(--text-light) leading-relaxed flex-1">
        {feature.description}
      </p>
    </div>
  );
}