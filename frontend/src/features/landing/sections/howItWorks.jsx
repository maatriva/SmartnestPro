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
      className="clay-section clay-even-section text-(--text)"
    >
      {/* Background Soft Celestial Blobs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-(--rose-clay) opacity-10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        <HowItWorksHeader />

        <div className="relative mt-14">
          {/* Constellation SVG Line that draws itself as user scrolls (Desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[60px] right-[60px] h-[40px] z-0 pointer-events-none">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1000 40"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Dim Base Constellation Track */}
              <path
                d="M 40 20 L 320 20 L 640 20 L 960 20"
                stroke="rgba(217, 130, 95, 0.2)"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              {/* Active Golden Constellation Beam */}
              <motion.path
                d="M 40 20 L 320 20 L 640 20 L 960 20"
                stroke="#F0C675"
                strokeWidth="4"
                strokeLinecap="round"
                style={{ pathLength }}
                className="drop-shadow-[0_0_8px_rgba(240,198,117,0.8)]"
              />
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
