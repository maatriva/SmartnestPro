import { useRef } from "react";

import HeroContent from "../components/hero/HeroContent";
import HeroModel from "../components/hero/HeroModel";

import useHeroTextAnimation from "../hooks/useHeroTextAnimation";
import { HERO_DATA } from "../constants/heroData";

export default function Hero() {
  const headingRef = useRef(null);

  useHeroTextAnimation(headingRef);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden clay-hero"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full" />

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full" />
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
          linear-gradient(to right, var(--primary) 1px, transparent 1px),
          linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center min-h-screen gap-12 lg:gap-16 pt-32 pb-16 lg:pt-24 lg:pb-12">
          <HeroContent
            headingRef={headingRef}
            badge={HERO_DATA.badge}
            title={HERO_DATA.title}
            description={HERO_DATA.description}
            buttonText={HERO_DATA.buttonText}
          />

          <HeroModel />
        </div>
      </div>
    </section>
  );
}