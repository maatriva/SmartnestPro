import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

export default function FloatingParticles() {
  const particleRefs = useRef([]);

  const particles = useMemo(() => {
    const palette = [
      "#f6d8ca", // Soft Peach
      "#d7eef0", // Soft Teal
      "#e8dbfc", // Soft Lavender
      "#fef3c7", // Soft Yellow
      "#ffe4e6", // Soft Pink
      "var(--primary-light)", // Light blue-grey
    ];

    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 25 + Math.random() * 45, // Larger size to show clay shadow clearly
      color: palette[i % palette.length],
      opacity: 0.15 + Math.random() * 0.15,
    }));
  }, []);

  useEffect(() => {
    const tweens = [];

    particleRefs.current.forEach((particle) => {
      if (!particle) return;

      const tween = gsap.to(particle, {
        y: gsap.utils.random(-150, -50),
        x: gsap.utils.random(-40, 40),
        opacity: 0,
        duration: gsap.utils.random(4, 8),
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
          className="absolute clay-orb"
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

