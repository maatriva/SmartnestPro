import { useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function FeatureCard({ feature, index = 0 }) {
  const Icon = feature.icon;
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    const rotateY = ((x / rect.width - 0.5) * 8).toFixed(2);
    const rotateX = (-(y / rect.height - 0.5) * 8).toFixed(2);

    cardRef.current.style.setProperty("--tilt-x", `${rotateX}deg`);
    cardRef.current.style.setProperty("--tilt-y", `${rotateY}deg`);
    cardRef.current.style.setProperty("--glow-x", `${xPct}%`);
    cardRef.current.style.setProperty("--glow-y", `${yPct}%`);
    cardRef.current.style.setProperty("--glow-opacity", "0.25");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--tilt-x", "0deg");
    cardRef.current.style.setProperty("--tilt-y", "0deg");
    cardRef.current.style.setProperty("--glow-opacity", "0");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full flex flex-col"
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
        className="relative clay-card p-7 sm:p-8 flex flex-col justify-between h-full select-none overflow-hidden group hover:shadow-2xl transition-all duration-300"
      >
        {/* Soft Radial Glow on Hover */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[32px] transition-opacity duration-300 z-0"
          style={{
            opacity: "var(--glow-opacity, 0)",
            background: "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(240, 198, 117, 0.28), transparent 60%)",
          }}
        />

        <div className="relative z-10">
          {/* Aligned Icon Badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl clay-badge flex items-center justify-center mb-6 text-(--primary) group-hover:scale-105 transition-transform duration-300 shadow-sm border border-white/60">
            <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.2} />
          </div>

          {/* Card Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-(--text-dark) mb-2.5 tracking-tight font-display">
            {feature.title}
          </h3>

          {/* One-Line Benefit / Clear High-Contrast Plain Text */}
          <p className="text-(--text) leading-relaxed text-base sm:text-lg font-medium">
            {feature.description}
          </p>
        </div>

        {/* Aligned Bottom Benefit Tag */}
        <div className="mt-6 pt-4 border-t border-(--border)/30 flex items-center justify-between text-xs sm:text-sm font-bold text-(--primary) relative z-10">
          <span className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-(--accent)" />
            <span>{feature.tag}</span>
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-(--accent) group-hover:scale-125 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}
