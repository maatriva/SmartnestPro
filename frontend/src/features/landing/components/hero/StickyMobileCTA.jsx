import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If final CTA section is in view, hide the sticky button
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-4 left-4 right-4 z-40 md:hidden pointer-events-auto"
        >
          <div className="clay-card p-2 rounded-full border-2 border-white shadow-2xl bg-white/95 backdrop-blur-md flex items-center justify-between gap-3">
            <div className="pl-3 flex items-center gap-2">
              <Sparkles size={15} className="text-(--primary) shrink-0" />
              <div className="leading-tight">
                <span className="text-xs font-black text-(--text-dark) block">
                  Maatriva Smart Cradle
                </span>
                <span className="text-[10px] text-(--text-light) font-semibold block">
                  Contactless infant peace of mind
                </span>
              </div>
            </div>

            <Link
              to="/survey"
              className="px-5 py-2.5 rounded-full clay-btn clay-btn-primary text-xs font-extrabold text-white flex items-center gap-1.5 shrink-0 shadow-md active:scale-95 transition-transform"
            >
              <span>Get Maatriva</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
