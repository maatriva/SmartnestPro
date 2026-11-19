import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import AnimatedHealthIcon from "./AnimatedHealthIcon";

export default function HealthCard({ item, index, onOpenDetail, cardBgClass = "" }) {
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
        className="relative clay-card-light bg-(--surface) p-6 sm:p-7 flex flex-col justify-between h-full select-none overflow-hidden group cursor-pointer hover:shadow-md transition-[transform,box-shadow] duration-200 border border-(--border-card) rounded-2xl"
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
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Top Row: Icon Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-(--bg-canvas) flex items-center justify-center text-(--brand-accent) border border-(--border-card)">
              <AnimatedHealthIcon iconType={item.iconType} className="w-6 h-6" />
            </div>

            {item.hasPartnerButton ? (
              <a
                href="#contact"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-semibold text-white bg-(--brand-accent) px-3 py-1.5 rounded-full hover:bg-(--brand-accent-hover) transition-colors shadow-xs"
              >
                Partner with us
              </a>
            ) : (
              <span className="text-[11px] font-medium text-(--brand-accent) bg-(--bg-canvas) px-2.5 py-0.5 rounded-full border border-(--border-card)">
                Vitals record
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-(--text-primary) mb-2 tracking-tight font-display flex items-center [text-wrap:balance]">
            {item.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed font-normal flex-1 [text-wrap:pretty]">
            {item.shortDescription}
          </p>
        </div>

        {/* Bottom Action Area: Know More Button */}
        <div className="mt-5 pt-3.5 border-t border-(--border-card) flex items-center justify-between relative z-10">
          <span className="text-xs text-(--text-secondary) font-medium">
            Clinical awareness
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetail(item);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full clay-btn clay-btn-secondary text-xs font-semibold text-(--text-primary) hover:text-(--brand-accent) transition-colors cursor-pointer"
            aria-label={`Read full details for ${item.title}`}
          >
            <span>Know more</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
