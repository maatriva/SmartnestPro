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
    <div className="relative z-20 max-w-xl">
      {/* Main Headline */}
      <h1
        ref={headingRef}
        className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
          font-bold
          leading-[1.12]
          text-(--text-primary)
          tracking-tight
          [text-wrap:balance]
        "
      >
        {title.first}
        <br className="hidden sm:inline" />{" "}
        <span className="text-(--brand-accent)">
          {title.second}
        </span>
      </h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="
          mt-6
          text-base
          sm:text-lg
          md:text-xl
          leading-relaxed
          max-w-xl
          text-(--text-secondary)
          font-normal
          [text-wrap:pretty]
        "
      >
        {description}
      </motion.p>

      {/* ONE Primary CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45 }}
        className="mt-8"
      >
        <Link
          to="/survey"
          onClick={triggerStarBurst}
          className="clay-btn clay-btn-primary px-8 py-3.5 text-base sm:text-lg font-semibold inline-flex items-center gap-2.5 justify-center shadow-lg hover:shadow-xl active:scale-95 transition-transform"
        >
          <span>{buttonText || "Take Parent Survey"}</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>

      {/* Trust Mini Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-(--border)/40 text-sm sm:text-base text-(--text-primary) font-medium"
      >
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-(--primary-soft) text-(--brand-accent) flex items-center justify-center">
            <ShieldCheck size={14} />
          </div>
          <span>Pediatric-safe Non-contact AI</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-(--primary-soft) text-(--brand-accent) flex items-center justify-center">
            <Heart size={14} />
          </div>
          <span>Supported by IIT Mandi Catalyst & IHFC IIT Delhi</span>
        </div>
      </motion.div>
    </div>
  );
}
