import { useRef, useMemo } from "react";
import HeroContent from "../components/hero/HeroContent";
import CelestialMoonSanctuary from "../components/hero/CelestialMoonSanctuary";
import useHeroTextAnimation from "../hooks/useHeroTextAnimation";
import { HERO_DATA } from "../constants/heroData";

export default function Hero() {
  const headingRef = useRef(null);
  useHeroTextAnimation(headingRef);

  // Generate twinkling celestial stars
  const stars = useMemo(() => {
    return Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 75}%`,
      size: Math.random() * 3 + 1.5,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 2,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden clay-hero pt-28 pb-16 lg:pt-32 lg:pb-24 flex items-center"
    >
      {/* Twinkling Stars in Dawn Sky */}
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
              boxShadow: `0 0 ${star.size * 2}px rgba(240, 198, 117, 0.9)`,
            }}
          />
        ))}

        {/* Ambient Warm Celestial Blobs */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-(--primary) opacity-20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#F0C675] opacity-20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-(--rose-clay) opacity-25 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 items-center min-h-[calc(100vh-140px)] gap-10 lg:gap-14">
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
