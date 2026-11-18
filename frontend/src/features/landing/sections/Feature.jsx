import { useRef } from "react";
import FeatureCard from "../components/features/FeatureCard";
import FeaturesHeader from "../components/features/FeaturesHeaders";
import { FEATURES } from "../data/featuresData";

export default function Features() {
  const gridRef = useRef(null);

  return (
    <section
      id="features"
      className="clay-section blend-features text-(--text)"
      aria-label="Core Features of Maatriva Smart Cradle"
    >
      {/* Decorative Warm Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-(--honey-gold) opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-(--terracotta) opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        <FeaturesHeader />

        {/* Symmetric Bento Grid Layout: 3 Columns on Desktop, 2 on Tablet, 1 on Mobile */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
