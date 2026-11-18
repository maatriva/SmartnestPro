import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Info,
  CheckCircle2,
  Clock,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import AnimatedHealthIcon from "./AnimatedHealthIcon";

export default function HealthModal({ item, isOpen, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus trap & keyboard listeners
  useEffect(() => {
    if (!isOpen) return;

    // Prevent body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements.length) return;

        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="health-modal-title"
          aria-describedby="health-modal-description"
        >
          {/* Backdrop with Soft Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container: Bottom sheet on mobile, centered rounded card on tablet/desktop */}
          <motion.div
            ref={modalRef}
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 240 }}
            className="relative w-full max-w-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FFF6EE] rounded-t-[36px] sm:rounded-[36px] border-2 border-white/95 shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col z-10"
          >
            {/* Header Area */}
            <div className="p-6 sm:p-8 pb-4 flex items-start justify-between border-b border-(--border)/30 bg-white/70 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3.5 sm:gap-4 pr-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl clay-badge flex items-center justify-center text-(--primary) shrink-0 shadow-sm border border-white">
                  <AnimatedHealthIcon iconType={item.iconType} className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-(--primary) uppercase tracking-wider mb-1">
                    <Sparkles size={13} className="text-(--accent)" />
                    <span>Clinical Awareness Guide</span>
                  </div>
                  <h2
                    id="health-modal-title"
                    className="text-2xl sm:text-3xl font-black text-(--text-dark) leading-tight font-display tracking-tight [text-wrap:balance]"
                  >
                    {item.title}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-10 h-10 rounded-full clay-btn clay-btn-secondary flex items-center justify-center text-(--text-dark) hover:bg-(--primary) hover:text-white transition-all shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-(--primary)"
                aria-label="Close details dialog"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6 sm:space-y-7 text-(--text) touch-pan-y"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              
              {/* Block a: What it is */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-(--primary) uppercase tracking-wider">
                  <Info size={15} />
                  <span>What It Is</span>
                </div>
                <p id="health-modal-description" className="text-base sm:text-lg text-(--text-dark) font-semibold leading-relaxed">
                  {item.whatItIs}
                </p>
              </div>

              {/* Block b: Why it matters */}
              <div className="space-y-2 bg-white/60 p-4 sm:p-5 rounded-2xl border border-white shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-(--primary) uppercase tracking-wider">
                  <HeartHandshake size={15} />
                  <span>Why It Matters</span>
                </div>
                <p className="text-sm sm:text-base text-(--text) font-medium leading-relaxed">
                  {item.whyItMatters}
                </p>
              </div>

              {/* Block c: Warning signs to watch for (Icon List) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-(--primary) uppercase tracking-wider">
                  <ShieldAlert size={15} />
                  <span>Warning Signs to Watch For</span>
                </div>
                <div className="space-y-2.5">
                  {item.warningSigns.map((sign, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/80 border border-white/90 shadow-2xs text-sm sm:text-base text-(--text-dark) font-medium"
                    >
                      <div className="w-2 h-2 rounded-full bg-(--primary) mt-2 shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block d: How Maatriva helps (Responsible Observational Placeholder) */}
              <div className="space-y-2 p-5 rounded-2xl bg-(--bg-secondary)/40 border border-(--primary)/15">
                <div className="flex items-center gap-2 text-xs font-bold text-(--primary) uppercase tracking-wider">
                  <Clock size={15} />
                  <span>How Maatriva Supports (Wellness Observation)</span>
                </div>
                <p className="text-sm sm:text-base text-(--text) font-medium leading-relaxed">
                  {item.howMaatrivaHelps}
                </p>
              </div>

              {/* Block e: When to call a doctor or emergency services (Prominent Coral/Terracotta Alert Box) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFF1EB] border-2 border-(--primary)/40 shadow-sm space-y-2.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-(--primary) uppercase tracking-wider">
                  <AlertTriangle size={18} className="text-(--primary)" />
                  <span>When to Seek Emergency or Immediate Medical Care</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-(--text-dark) leading-relaxed">
                  {item.emergencyAction}
                </p>
                <div className="pt-1 text-xs text-(--text-light) font-semibold">
                  Always trust your parental instinct: if your baby or you feel unwell, do not wait. Contact your pediatrician, OB-GYN, or emergency room right away.
                </div>
              </div>

              {/* Block f: Sources */}
              <div className="space-y-2 pt-2 border-t border-(--border)/30">
                <span className="text-xs font-bold uppercase tracking-wider text-(--text-light)">
                  Educational References & Guidelines:
                </span>
                <div className="flex flex-wrap gap-3 pt-1">
                  {item.sources.map((source, sIdx) => (
                    <a
                      key={sIdx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-(--primary) bg-white border border-(--primary)/20 hover:bg-(--primary) hover:text-white transition-colors"
                    >
                      <span>{source.name}</span>
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer Disclaimer */}
              <div className="p-4 rounded-xl bg-white/50 border border-white text-xs text-(--text-light) font-semibold leading-relaxed text-center">
                <p>
                  <strong>Medical Disclaimer:</strong> This information is for awareness only and is not medical advice. Maatriva does not replace a doctor, diagnosis, or clinical evaluation. In an emergency, call your local emergency number (such as 102/108 in India or 911) or go to the nearest hospital.
                </p>
              </div>

            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 px-6 sm:px-8 border-t border-(--border)/30 bg-white/80 backdrop-blur-sm flex items-center justify-between shrink-0">
              <span className="text-xs font-semibold text-(--text-light)">
                Educational & Awareness Purpose Only
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-full clay-btn clay-btn-primary text-xs sm:text-sm font-bold shadow-sm cursor-pointer"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
