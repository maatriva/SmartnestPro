import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedHealthIcon from "./AnimatedHealthIcon";

export default function HealthCard({ item, index, onOpenDetail }) {
  const cardRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    const rotateY = ((x / rect.width - 0.5) * 6).toFixed(2);
    const rotateX = (-(y / rect.height - 0.5) * 6).toFixed(2);

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
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full flex flex-col"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenDetail(item)}
        style={{
          transform: "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transition: "transform 0.25s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.25s ease",
          willChange: "transform",
        }}
        className="relative clay-card p-6 sm:p-8 flex flex-col justify-between h-full select-none overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300 border-2 border-white/90"
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-label={`Learn more about ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenDetail(item);
          }
        }}
      >
        {/* Soft Radial Ambient Clay Glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[32px] transition-opacity duration-300 z-0"
          style={{
            opacity: "var(--glow-opacity, 0)",
            background: "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(217, 130, 95, 0.18), transparent 60%)",
          }}
        />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Top Row: Icon Badge & Medical Review Indicator */}
          <div className="flex items-center justify-between mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl clay-badge flex items-center justify-center text-(--primary) group-hover:scale-105 transition-transform duration-300 shadow-sm border border-white/70">
              <AnimatedHealthIcon iconType={item.iconType} className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <span className="text-[11px] font-bold text-(--primary) bg-(--bg-secondary) px-3 py-1 rounded-full border border-(--primary)/15 uppercase tracking-wider">
              Health Vigil
            </span>
          </div>

          {/* Title (Contrast >= 12:1) */}
          <h3 className="text-xl sm:text-2xl font-black text-(--text-dark) mb-2.5 tracking-tight font-display min-h-[3.25rem] sm:min-h-[3.75rem] flex items-center [text-wrap:balance]">
            {item.title}
          </h3>

          {/* Short Description (Min 16px body, Contrast >= 7:1) */}
          <p className="text-base sm:text-lg text-(--text) leading-relaxed font-medium flex-1 [text-wrap:pretty]">
            {item.shortDescription}
          </p>
        </div>

        {/* Bottom Action Area: Know More Button */}
        <div className="mt-6 pt-4 border-t border-(--border)/30 flex items-center justify-between relative z-10">
          <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-(--primary-dark)">
            <Sparkles size={14} className="text-(--accent)" />
            <span>Awareness Guide</span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(item);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full clay-btn clay-btn-secondary text-xs sm:text-sm font-bold text-(--text-dark) group-hover:bg-(--primary) group-hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label={`Read full awareness guide for ${item.title}`}
          >
            <span>Know more</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
