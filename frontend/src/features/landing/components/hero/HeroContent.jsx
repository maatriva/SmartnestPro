import { Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

export default function HeroContent({
  headingRef,
  badge,
  title,
  description,
  buttonText,
}) {
  const triggerStarBurst = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      colors: ["#D9825F", "#F0C675", "#F2B8A8", "#FFF6EE", "#A8B89A"],
      ticks: 120,
      gravity: 0.8,
      scalar: 0.9,
    });
  };

  return (
    <div className="relative z-20 clay-hero-panel bg-white/40 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded-3xl lg:rounded-none border border-white/60 lg:border-none shadow-xl lg:shadow-none">
      {/* Celestial Pill Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          clay-badge
          mb-6
          shadow-sm
        "
      >
        <Sparkles size={16} className="text-(--primary) animate-spin-slow" />
        <span className="text-xs sm:text-sm font-bold text-(--text-dark)">
          {badge || "AI Powered Baby Care"}
        </span>
      </motion.div>

      {/* Main Headline */}
      <h1
        ref={headingRef}
        className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
          font-black
          leading-[1.12]
          text-(--text-dark)
          tracking-tight
          [text-wrap:balance]
        "
      >
        {title.first}
        <br className="hidden sm:inline" />{" "}
        <span className="text-(--primary) drop-shadow-sm">
          {title.second}
        </span>
      </h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="
          mt-6
          text-base
          sm:text-lg
          md:text-xl
          leading-relaxed
          max-w-xl
          text-(--text)
          font-medium
          [text-wrap:pretty]
        "
      >
        {description}
      </motion.p>

      {/* ONE Primary CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-8"
      >
        <Link
          to="/survey"
          onClick={triggerStarBurst}
          className="clay-btn clay-btn-primary px-9 py-4 text-base sm:text-lg font-bold inline-flex items-center gap-2.5 justify-center shadow-lg hover:shadow-xl active:scale-95 transition-transform"
        >
          <span>{buttonText || "Experience Maatriva"}</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>

      {/* Trust Mini Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-(--border)/40 text-sm sm:text-base text-(--text-dark) font-bold"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-(--primary-soft) text-(--primary) flex items-center justify-center">
            <ShieldCheck size={14} />
          </div>
          <span>Pediatric-safe Non-contact AI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-(--primary-soft) text-(--primary) flex items-center justify-center">
            <Heart size={14} />
          </div>
          <span>Supported by IIT Mandi Catalyst & IHFC IIT Delhi</span>
        </div>
      </motion.div>
    </div>
  );
}
