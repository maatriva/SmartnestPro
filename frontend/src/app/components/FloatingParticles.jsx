import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export default function FloatingParticles() {
  const particleRefs = useRef([]);

  const particles = useMemo(() => {
    const palette = [
      "var(--primary-light)",
      "var(--primary)",
      "var(--bg-hover)",
    ];

    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 5 + Math.random() * 10,
      color: palette[i % palette.length],
      opacity: 0.18 + Math.random() * 0.22,
    }));
  }, []);

  useEffect(() => {
    const tweens = [];

    particleRefs.current.forEach((particle) => {
      if (!particle) return;

      const tween = gsap.to(particle, {
        y: gsap.utils.random(-150, -50),
        x: gsap.utils.random(-30, 30),
        opacity: 0,
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        repeatRefresh: true,
        ease: "sine.inOut",
      });

      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => tween.kill());
    };
  }, []);

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
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}

