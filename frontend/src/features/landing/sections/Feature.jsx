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
    >
      {/* Decorative Warm Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-(--honey-gold) opacity-10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-(--terracotta) opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        <FeaturesHeader />

        {/* Bento Grid Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {/* Card 0: Large 2-column featured card (AI Learning) */}
          <FeatureCard
            feature={FEATURES[0]}
            index={0}
            isLarge={true}
          />

          {/* Card 1: 1-column card (Smart Soothing) */}
          <FeatureCard
            feature={FEATURES[1]}
            index={1}
            isLarge={false}
          />

          {/* Row 2: 3 uniform cards (App Control, Safe & Secure, Sound Library) */}
          <FeatureCard
            feature={FEATURES[2]}
            index={2}
            isLarge={false}
          />

          <FeatureCard
            feature={FEATURES[3]}
            index={3}
            isLarge={false}
          />

          <FeatureCard
            feature={FEATURES[4]}
            index={4}
            isLarge={false}
          />

          {/* Row 3: Climate Control full-width or wide */}
          <div className="md:col-span-3">
            <FeatureCard
              feature={FEATURES[5]}
              index={5}
              isLarge={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
