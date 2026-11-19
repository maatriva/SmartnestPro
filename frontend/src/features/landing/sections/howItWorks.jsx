import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import StepCard from "../components/howItWorks/StepCard";
import HowItWorksHeader from "../components/howItWorks/HowItWorksHeader";
import { STEPS } from "../data/stepsData";

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="clay-section relative text-(--text) bg-[#FBE4DB] pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden z-10"
      aria-label="How Maatriva Smart Cradle Works"
    >
      {/* Background Soft Celestial Blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-(--rose-clay) opacity-10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        <HowItWorksHeader />

        <div className="relative mt-14">
          {/* Constellation SVG Line connecting the 3 steps on Desktop */}
          <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[40px] z-0 pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 40"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Dim Base Constellation Track */}
              <path
                d="M 50 20 L 500 20 L 950 20"
                stroke="rgba(217, 130, 95, 0.25)"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              {/* Active Golden Constellation Beam */}
              <motion.path
                d="M 50 20 L 500 20 L 950 20"
                stroke="#F0C675"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength }}
                className="drop-shadow-[0_0_8px_rgba(240,198,117,0.8)]"
              />
            </svg>
          </div>

          {/* Cards Grid: 3 Symmetrical Steps on Desktop & Tablet, Stacked on Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch">
            {STEPS.map((step, index) => (
              <StepCard
                key={step.title}
                step={step}
                index={index}
                totalSteps={STEPS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
