import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const TRUST_LOGOS = [
  {
    id: "ihfc-iit-delhi",
    name: "IHFC — IIT Delhi",
    png: "/achievements/ihfc-iit-delhi.png",
    webp: "/achievements/ihfc-iit-delhi.webp",
    className: "h-7 sm:h-8 max-w-[110px] w-auto",
  },
  {
    id: "iit-mandi-catalyst",
    name: "IIT Mandi Catalyst",
    png: "/achievements/iit-mandi-catalyst.png",
    webp: "/achievements/iit-mandi-catalyst.webp",
    className: "h-7 sm:h-8 max-w-[100px] w-auto",
  },
  {
    id: "wadhwani-foundation",
    name: "Wadhwani Foundation",
    png: "/achievements/wadhwani-foundation.png",
    webp: "/achievements/wadhwani-foundation.webp",
    className: "h-7 sm:h-8 max-w-[95px] w-auto",
  },
  {
    id: "f6s-top-company-17",
    name: "F6S #17 Top Company in AI (June '26)",
    png: "/achievements/f6s-top-company-17.png",
    webp: "/achievements/f6s-top-company-17.webp",
    className: "h-7 sm:h-8 max-w-[135px] w-auto",
  },
  {
    id: "f6s-top-company-24",
    name: "F6S #24 Top Company in AI (Oct '26)",
    png: "/achievements/f6s-top-company.png",
    webp: "/achievements/f6s-top-company.webp",
    className: "h-7 sm:h-8 max-w-[135px] w-auto",
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
        transition={{ duration: 0.4 }}
        className="block clay-card-light p-3 sm:p-4 rounded-2xl sm:rounded-full border border-(--border-card) bg-(--surface) shadow-sm hover:shadow-md transition-[transform,box-shadow] duration-200 group cursor-pointer"
        aria-label="View our incubators and recognitions"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Label */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-(--text-primary) shrink-0 whitespace-nowrap">
            <span>Incubated, backed & recognized by:</span>
          </div>

          {/* Logo Strip: Horizontally scrollable on small mobile with no scrollbar, neatly centered flex on sm+ */}
          <div className="w-full lg:w-auto flex items-center justify-start sm:justify-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-1 px-1">
            {TRUST_LOGOS.map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center shrink-0 grayscale hover:grayscale-0 opacity-85 hover:opacity-100 transition-[filter,opacity] duration-200"
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
          <div className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-(--brand-accent) group-hover:translate-x-1 transition-transform shrink-0">
            <span>View details</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </motion.a>
    </div>
  );
}
