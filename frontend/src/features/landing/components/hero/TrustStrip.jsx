import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const TRUST_LOGOS = [
  {
    name: "F6S #24 Top Company in AI",
    png: "/achievements/f6s-top-company.png",
    webp: "/achievements/f6s-top-company.webp",
    className: "h-7 sm:h-9 max-w-[140px]",
  },
  {
    name: "IHFC — IIT Delhi",
    png: "/achievements/ihfc-iit-delhi.png",
    webp: "/achievements/ihfc-iit-delhi.webp",
    className: "h-7 sm:h-9 max-w-[110px]",
  },
  {
    name: "IIT Delhi",
    png: "/achievements/iit-delhi.png",
    webp: "/achievements/iit-delhi.webp",
    className: "h-7 sm:h-9 max-w-[90px]",
  },
  {
    name: "IIT Mandi Catalyst",
    png: "/achievements/iit-mandi-catalyst.png",
    webp: "/achievements/iit-mandi-catalyst.webp",
    className: "h-7 sm:h-9 max-w-[95px]",
  },
  {
    name: "IIT Mandi",
    png: "/achievements/iit-mandi.png",
    webp: "/achievements/iit-mandi.webp",
    className: "h-7 sm:h-9 max-w-[90px]",
  },
  {
    name: "Wadhwani Foundation",
    png: "/achievements/wadhwani-foundation.png",
    webp: "/achievements/wadhwani-foundation.webp",
    className: "h-7 sm:h-9 max-w-[95px]",
  },
];

export default function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollToAchievements = (e) => {
    e.preventDefault();
    const el = document.getElementById("achievements");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative z-20 -mt-6 sm:-mt-8 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <motion.a
        href="#achievements"
        onClick={handleScrollToAchievements}
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="block clay-card p-3.5 sm:p-4 rounded-2xl sm:rounded-full border border-white/95 shadow-md hover:shadow-lg transition-all group cursor-pointer"
        aria-label="View our incubators, institutional partners, and global recognitions"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Label */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-(--text-dark) shrink-0 whitespace-nowrap">
            <Sparkles size={14} className="text-(--primary)" />
            <span>Incubated, backed & recognized by:</span>
          </div>

          {/* Logo Strip */}
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 flex-1">
            {TRUST_LOGOS.map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-200"
                title={logo.name}
              >
                <picture>
                  <source srcSet={logo.webp} type="image/webp" />
                  <img
                    src={logo.png}
                    alt={logo.name}
                    loading="lazy"
                    decoding="async"
                    className={`${logo.className} object-contain filter contrast-105`}
                  />
                </picture>
              </div>
            ))}
          </div>

          {/* Action indicator */}
          <div className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-(--primary) group-hover:translate-x-1 transition-transform shrink-0">
            <span>View details</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </motion.a>
    </div>
  );
}
