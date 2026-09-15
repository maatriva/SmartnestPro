import { useRef } from "react";

import FeatureCard from "../components/features/FeatureCard";
import FeaturesHeader from "../components/features/FeaturesHeaders";

import useFeaturesAnimation from "../hooks/useFeaturesAnimation";
import { FEATURES } from "../data/featuresData";

export default function Features() {
  const gridRef = useRef(null);

  useFeaturesAnimation(gridRef);

  return (
    <section
      id="features"
      className="py-24 px-6 clay-even-section text-(--text) overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        <FeaturesHeader />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
            />
          ))}
        </div>

      </div>
    </section>
  );
}