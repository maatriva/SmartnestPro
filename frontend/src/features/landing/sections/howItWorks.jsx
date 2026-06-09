import { useRef } from "react";

import StepCard from "../components/howItWorks/StepCard";
import HowItWorksHeader from "../components/howItWorks/HowItWorksHeader";

import useHowItWorksAnimation from "../hooks/howItWorksAnimation";
import { STEPS } from "../data/stepsData";

export default function HowItWorks() {
  const gridRef = useRef(null);

  useHowItWorksAnimation(gridRef);

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 clay-even-section text-(--text) overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">

        <HowItWorksHeader />

        <div className="relative">

          <div
            className="
            hidden
            lg:block
            absolute
            top-1/2
            left-0
            right-0
            h-[2px]
            bg-(--border)
            -translate-y-1/2
          "
          />

          <div
            ref={gridRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          >
            {STEPS.map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}