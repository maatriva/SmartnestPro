import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Moon, Award, ShieldCheck } from "lucide-react";

export const ACHIEVEMENTS = [
  {
    id: "ihfc-iit-delhi",
    name: "IHFC — IIT Delhi",
    role: "Technology Innovation Hub",
    badge: "Cobotics Hub",
    png: "/achievements/ihfc-iit-delhi.png",
    webp: "/achievements/ihfc-iit-delhi.webp",
    width: 892,
    height: 407,
    alt: "IHFC Technology Innovation Hub at IIT Delhi logo",
  },
  {
    id: "iit-mandi-catalyst",
    name: "IIT Mandi Catalyst",
    role: "Technology Business Incubator",
    badge: "Incubator Partner",
    png: "/achievements/iit-mandi-catalyst.png",
    webp: "/achievements/iit-mandi-catalyst.webp",
    width: 200,
    height: 200,
    alt: "IIT Mandi Catalyst Technology Business Incubator logo",
  },
  {
    id: "wadhwani-foundation",
    name: "Wadhwani Foundation",
    role: "Global Entrepreneurship",
    badge: "Venture Support",
    png: "/achievements/wadhwani-foundation.png",
    webp: "/achievements/wadhwani-foundation.webp",
    width: 225,
    height: 225,
    alt: "Wadhwani Foundation official logo",
  },
  {
    id: "f6s-top-company-17",
    name: "F6S Global Ranking",
    role: "Global Top Company · June '26",
    badge: "#17 in Artificial Intelligence",
    png: "/achievements/f6s-top-company-17.png",
    webp: "/achievements/f6s-top-company-17.webp",
    width: 1024,
    height: 175,
    alt: "F6S #17 Top Company in Artificial Intelligence recognition wreath badge",
  },
  {
    id: "f6s-top-company-24",
    name: "F6S Global Ranking",
    role: "Global Top Company · Oct '26",
    badge: "#24 in Artificial Intelligence",
    png: "/achievements/f6s-top-company.png",
    webp: "/achievements/f6s-top-company.webp",
    width: 1024,
    height: 179,
    alt: "F6S #24 Top Company in Artificial Intelligence recognition wreath badge",
  },
];

export default function AchievementsSection() {
  const shouldReduceMotion = useReducedMotion();

  // Celestial twinkling stars in the night sky
  const stars = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: `${(i * 19) % 100}%`,
      y: `${(i * 23) % 100}%`,
      size: (i % 3) * 0.8 + 1.2,
      delay: (i % 5) * 0.7,
      duration: 2.4 + (i % 3) * 0.6,
    }));
  }, []);

  return (
    <section
      id="achievements"
      className="clay-section relative text-(--text-primary) bg-(--bg-alt) pt-14 pb-20 sm:pt-20 sm:pb-24 overflow-hidden z-10"
      aria-label="Our Achievements and Recognitions"
    >
      {/* Background Twinkling Night Stars */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white twinkle-star"
            style={{
              left: star.x,
              top: star.y,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(240, 198, 117, 0.8)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header: Plain, direct copy */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            Recognitions and partners
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 text-base sm:text-lg text-(--text-secondary) font-normal max-w-xl mx-auto leading-relaxed text-center [text-wrap:pretty]"
          >
            Supported by technical institutions, incubators, and startup rankings.
          </motion.p>
        </div>

        {/* Responsive Grid */}
        <div className="flex flex-wrap justify-center gap-6 items-stretch">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.35,
                delay: shouldReduceMotion ? 0 : index * 0.06,
                ease: "easeOut",
              }}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col"
            >
              <div className="clay-achievement-card h-52 sm:h-56 w-full p-5 sm:p-6 flex flex-col items-center justify-between text-center select-none cursor-default group relative overflow-hidden bg-(--surface) border border-(--border-card) rounded-2xl shadow-sm hover:shadow-md transition-[transform,box-shadow] duration-200">
                {/* Institutional Badge Pill */}
                <div className="w-full flex justify-center">
                  <span className="text-xs font-semibold text-(--brand-accent) bg-(--bg-canvas) px-2.5 py-0.5 rounded-full border border-(--border-card)">
                    {item.badge}
                  </span>
                </div>

                {/* Centered Logo */}
                <div className="w-full h-24 sm:h-28 flex items-center justify-center px-2 py-1">
                  <picture className="w-full h-full flex items-center justify-center">
                    <source srcSet={item.webp} type="image/webp" />
                    <img
                      src={item.png}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain filter contrast-105"
                    />
                  </picture>
                </div>

                {/* Partner Name & Subtitle Baseline */}
                <div className="w-full pt-2 border-t border-(--border-card)">
                  <h3 className="text-sm sm:text-base font-bold text-(--text-primary) tracking-tight truncate">
                    {item.name}
                  </h3>
                  <p className="text-xs text-(--text-secondary) font-normal truncate mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
