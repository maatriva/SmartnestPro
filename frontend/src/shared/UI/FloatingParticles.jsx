import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

export default function FloatingParticles() {
  const particleRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const particles = useMemo(() => {
    // 8 on desktop, 4 on mobile
    const count = isMobile ? 4 : 8;
    const palette = [
      "#F0C675", // Honey Gold
      "#F2B8A8", // Rose Clay
      "#D9825F", // Terracotta
      "#A8B89A", // Sage
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${10 + (i * 85) / count}%`,
      top: `${15 + ((i * 37) % 70)}%`,
      size: isMobile ? 18 + (i % 2) * 8 : 22 + (i % 3) * 10,
      color: palette[i % palette.length],
      opacity: 0.12 + (i % 3) * 0.04,
    }));
  }, [isMobile]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tweens = [];

    particleRefs.current.forEach((particle, idx) => {
      if (!particle) return;

      const tween = gsap.to(particle, {
        y: -(30 + (idx % 3) * 25),
        x: (idx % 2 === 0 ? 1 : -1) * (15 + idx * 3),
        opacity: 0.06,
        duration: 6 + idx * 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, [particles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={p.id}
          ref={(el) => {
            particleRefs.current[i] = el;
          }}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            boxShadow: `inset 2px 2px 4px rgba(255,255,255,0.7), 0 4px 10px rgba(58,43,43,0.04)`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
