import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Moon, Award, ShieldCheck } from "lucide-react";

export const ACHIEVEMENTS = [
  {
    id: "f6s-top-company",
    name: "F6S Global Ranking",
    role: "Global Top Company · Oct '26",
    badge: "#24 in Artificial Intelligence",
    png: "/achievements/f6s-top-company.png",
    webp: "/achievements/f6s-top-company.webp",
    width: 1024,
    height: 179,
    alt: "F6S #24 Top Company in Artificial Intelligence recognition wreath badge",
  },
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
    id: "iit-delhi",
    name: "IIT Delhi",
    role: "Indian Institute of Technology",
    badge: "Incubation Partner",
    png: "/achievements/iit-delhi.png",
    webp: "/achievements/iit-delhi.webp",
    width: 480,
    height: 480,
    alt: "Indian Institute of Technology Delhi official logo",
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
    id: "iit-mandi",
    name: "IIT Mandi",
    role: "Indian Institute of Technology",
    badge: "Innovation Ecosystem",
    png: "/achievements/iit-mandi.png",
    webp: "/achievements/iit-mandi.webp",
    width: 251,
    height: 201,
    alt: "Indian Institute of Technology Mandi logo",
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
      className="relative night-sky-section pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden z-10"
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

        {/* Soft Golden & Plum Aura Orbs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[420px] h-[420px] bg-[#F0C675] opacity-10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-4 right-1/4 w-[380px] h-[380px] bg-[#D9825F] opacity-15 blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Header: Consistent 8px Vertical Rhythm */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge-dark text-xs sm:text-sm font-bold mb-3 border border-white/10"
          >
            <Moon size={14} className="text-(--accent) fill-(--accent)/30" />
            <span>Recognition & Milestones</span>
            <Sparkles size={14} className="text-(--accent)" />
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight font-display tracking-tight"
          >
            Our <span className="text-[#F0C675]">Achievements</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-[#E2D3E4] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Proudly recognized globally and incubated, mentored, and supported by India’s premier technical institutions and innovation foundations.
          </motion.p>
        </div>

        {/* Symmetric Responsive Grid: 3 across desktop (2 rows of 3), 2 across tablet (3 rows of 2), 1 on mobile */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-stretch">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
              className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] flex flex-col"
            >
              <div className="clay-achievement-card h-52 sm:h-56 w-full p-5 sm:p-6 flex flex-col items-center justify-between text-center select-none cursor-default group relative overflow-hidden">
                {/* Institutional Badge Pill */}
                <div className="w-full flex justify-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-(--primary) bg-(--bg-secondary) px-3 py-1 rounded-full shadow-xs border border-(--primary)/15">
                    {item.badge}
                  </span>
                </div>

                {/* Centered Logo with picture webp/png fallback, consistent padding & object-fit: contain */}
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
                      className="max-h-full max-w-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                    />
                  </picture>
                </div>

                {/* Partner Name & Subtitle Baseline */}
                <div className="w-full pt-1 border-t border-(--terracotta)/10">
                  <h3 className="text-sm sm:text-base font-bold text-(--text-dark) tracking-tight truncate">
                    {item.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-(--text-light) font-semibold truncate">
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
