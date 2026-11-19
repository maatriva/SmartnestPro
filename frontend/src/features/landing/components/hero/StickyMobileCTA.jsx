import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // 1. Observe footer & contact sections so pill never overlaps footer/disclaimers
    const targetElements = [
      document.getElementById("contact"),
      document.querySelector("footer"),
      document.getElementById("footer"),
    ].filter(Boolean);

    let observer;
    if (targetElements.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          const isAnyIntersecting = entries.some((entry) => entry.isIntersecting);
          setIsVisible((prev) => !isAnyIntersecting);
        },
        {
          root: null,
          threshold: 0.05,
        }
      );

      targetElements.forEach((el) => observer.observe(el));
    }

    // 2. Hide when any modal is active in DOM
    const checkModalActive = () => {
      const hasModal = Boolean(
        document.querySelector('[role="dialog"]') ||
        document.querySelector('.fixed.inset-0.z-50') ||
        document.body.style.overflow === "hidden"
      );
      if (hasModal) {
        setIsVisible(false);
      }
    };

    const mutationObserver = new MutationObserver(checkModalActive);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 z-40 md:hidden pointer-events-auto"
        >
          <div className="clay-card-light p-2.5 rounded-full border border-(--border-card) bg-(--surface)/95 backdrop-blur-md flex items-center justify-between gap-3 shadow-lg">
            <div className="pl-3 flex flex-col justify-center">
              <span className="text-xs font-bold text-(--text-primary) block leading-tight">
                Maatriva Smart Cradle
              </span>
              <span className="text-[11px] text-(--text-secondary) font-medium block leading-tight">
                Non-contact monitoring
              </span>
            </div>

            <Link
              to="/survey"
              className="px-4 py-2 rounded-full clay-btn clay-btn-primary text-xs font-semibold text-white flex items-center gap-1.5 shrink-0 shadow-sm active:scale-95 transition-transform"
            >
              <span>Take Survey</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
