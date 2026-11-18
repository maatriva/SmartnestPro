import { useEffect, useRef } from "react";

export default function CelestialStarTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Check for touch device or reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

    if (prefersReducedMotion || isTouchDevice) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isHidden = document.hidden;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const handleVisibility = () => {
      isHidden = document.hidden;
      if (!isHidden && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const particles = [];
    const colors = ["#F0C675", "#F2B8A8", "#D9825F", "#FFF6EE"];
    const MAX_PARTICLES = 30;

    const addParticle = (x, y) => {
      if (particles.length >= MAX_PARTICLES) return;
      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        size: Math.random() * 2.5 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.8,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.08,
        decay: Math.random() * 0.025 + 0.025,
      });
    };

    let lastX = 0;
    let lastY = 0;
    const handleMouseMove = (e) => {
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 12) {
        addParticle(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Draw 4-point star shape
    const drawStar = (cx, cy, spikes, outerRadius, innerRadius, color, alpha, rot) => {
      ctx.save();
      ctx.beginPath();
      ctx.translate(cx, cy);
      ctx.rotate(rot);
      const step = Math.PI / spikes;

      for (let i = 0; i < 2 * spikes; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(i * step) * r;
        const y = Math.sin(i * step) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (isHidden) {
        animationFrameId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.opacity -= p.decay;

        if (p.opacity <= 0) {
          particles.splice(i, 1);
          continue;
        }

        drawStar(p.x, p.y, 4, p.size * 2, p.size * 0.7, p.color, p.opacity, p.rotation);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
