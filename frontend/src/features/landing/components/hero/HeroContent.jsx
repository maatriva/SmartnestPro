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
    <div className="relative z-20">
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
          leading-[1.1]
          text-(--text-dark)
          tracking-tight
        "
      >
        {title.first}
        <br />
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
        "
      >
        {description}
      </motion.p>

      {/* Two Puffy CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex flex-wrap items-center gap-4 mt-8"
      >
        <Link
          to="/survey"
          onClick={triggerStarBurst}
          className="clay-btn clay-btn-primary px-8 py-4 text-base sm:text-lg font-bold inline-flex items-center gap-2 justify-center shadow-lg hover:shadow-xl"
        >
          <span>{buttonText || "Take Baby Survey"}</span>
          <ArrowRight size={18} />
        </Link>

        <a
          href="#features"
          onClick={triggerStarBurst}
          className="clay-btn clay-btn-secondary px-7 py-4 text-base font-bold inline-flex items-center gap-2 justify-center text-(--text-dark) shadow-md hover:shadow-lg"
        >
          <span>Explore Cradle</span>
        </a>
      </motion.div>

      {/* Trust Mini Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-(--border)/40 text-xs sm:text-sm text-(--text-light) font-semibold"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 flex items-center justify-center">
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
