import { useRef, useMemo } from "react";
import HeroContent from "../components/hero/HeroContent";
import CelestialMoonSanctuary from "../components/hero/CelestialMoonSanctuary";
import useHeroTextAnimation from "../hooks/useHeroTextAnimation";
import { HERO_DATA } from "../constants/heroData";

export default function Hero() {
  const headingRef = useRef(null);
  useHeroTextAnimation(headingRef);

  // Clean, subtle twinkling celestial stars (reduced by half for optimal clarity)
  const stars = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      x: `${(i * 23) % 100}%`,
      y: `${(i * 19) % 70}%`,
      size: (i % 3) * 0.8 + 1.2,
      delay: (i % 4) * 0.8,
      duration: 3 + (i % 3) * 0.8,
      opacity: 0.6,
    }));
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-dvh overflow-hidden clay-hero pt-28 pb-16 lg:pt-32 lg:pb-24 flex items-center"
    >
      {/* Subtle Twinkling Stars in Dawn Sky */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white twinkle-star"
            style={{
              left: star.x,
              top: star.y,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(240, 198, 117, 0.7)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 items-center min-h-[calc(100dvh-140px)] gap-10 lg:gap-14">
          <HeroContent
            headingRef={headingRef}
            badge={HERO_DATA.badge}
            title={HERO_DATA.title}
            description={HERO_DATA.description}
            buttonText={HERO_DATA.buttonText}
          />

          <CelestialMoonSanctuary />
        </div>
      </div>

      {/* Soft Wavy Bottom Transition into Cream */}
      <div className="absolute bottom-0 left-0 right-0 wavy-divider pointer-events-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-(--bg) w-full h-12">
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}
