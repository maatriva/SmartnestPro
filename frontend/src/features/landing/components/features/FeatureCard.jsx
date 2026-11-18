import { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FeatureCard({ feature, index = 0, isLarge = false }) {
  const Icon = feature.icon;
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    // Use CSS variables for 3D tilt and radial glow - ZERO React re-renders!
    const rotateY = ((x / rect.width - 0.5) * 10).toFixed(2);
    const rotateX = (-(y / rect.height - 0.5) * 10).toFixed(2);

    cardRef.current.style.setProperty("--tilt-x", `${rotateX}deg`);
    cardRef.current.style.setProperty("--tilt-y", `${rotateY}deg`);
    cardRef.current.style.setProperty("--glow-x", `${xPct}%`);
    cardRef.current.style.setProperty("--glow-y", `${yPct}%`);
    cardRef.current.style.setProperty("--glow-opacity", "0.22");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--tilt-x", "0deg");
    cardRef.current.style.setProperty("--tilt-y", "0deg");
    cardRef.current.style.setProperty("--glow-opacity", "0");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className={`h-full ${isLarge ? "md:col-span-2" : "col-span-1"}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transition: "transform 0.25s cubic-bezier(0.2, 0, 0, 1)",
          willChange: "transform",
        }}
        className="relative clay-card p-8 sm:p-9 flex flex-col justify-between h-full select-none overflow-hidden group cursor-pointer"
      >
        {/* Soft Radial Glow on Hover */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[32px] transition-opacity duration-300 z-0"
          style={{
            opacity: "var(--glow-opacity, 0)",
            background: "radial-gradient(350px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(240, 198, 117, 0.25), transparent 60%)",
          }}
        />

        {/* Specular clay highlight in top corner */}
        <div className="absolute top-2 right-3 w-16 h-16 rounded-full bg-white/40 blur-lg pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-2xl clay-badge flex items-center justify-center mb-6 text-(--primary) group-hover:scale-105 transition-transform duration-300 shadow-sm">
            <Icon className="w-8 h-8" strokeWidth={2.2} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-(--text-dark) mb-3 tracking-tight font-display">
            {feature.title}
          </h3>

          <p className="text-(--text) leading-relaxed text-base font-medium">
            {feature.description}
          </p>
        </div>

        {/* Bottom subtle tag */}
        <div className="mt-8 pt-4 border-t border-(--border)/30 flex items-center justify-between text-xs font-bold text-(--primary) relative z-10">
          <span className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-(--accent)" />
            <span>Pediatric Engineered</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-(--accent)" />
        </div>
      </div>
    </motion.div>
  );
}
