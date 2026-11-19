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
            <div className="p-6 sm:p-7 pb-4 flex items-start justify-between border-b border-(--border-card) bg-(--surface) shrink-0">
              <div className="flex items-center gap-3.5 sm:gap-4 pr-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-(--bg-canvas) flex items-center justify-center text-(--brand-accent) shrink-0 border border-(--border-card)">
                  <AnimatedHealthIcon iconType={item.iconType} className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-(--brand-accent) mb-1">
                    <span>Clinical Awareness Guide</span>
                  </div>
                  <h2
                    id="health-modal-title"
                    className="text-2xl sm:text-3xl font-bold text-(--text-primary) leading-tight font-display tracking-tight [text-wrap:balance]"
                  >
                    {item.title}
                  </h2>
                </div>
              </div>

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="w-9 h-9 rounded-full clay-btn clay-btn-secondary flex items-center justify-center text-(--text-primary) hover:text-(--brand-accent) transition-colors shrink-0 cursor-pointer"
                aria-label="Close details dialog"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div
              data-lenis-prevent="true"
              className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-7 space-y-5 text-(--text-primary) touch-pan-y"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              
              {/* Block a: What it is */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-(--brand-accent)">
                  <Info size={14} />
                  <span>What It Is</span>
                </div>
                <p id="health-modal-description" className="text-base text-(--text-primary) font-medium leading-relaxed">
                  {item.whatItIs}
                </p>
              </div>

              {/* Block b: Why it matters */}
              <div className="space-y-1.5 p-4 rounded-xl bg-(--bg-canvas) border border-(--border-card)">
                <div className="flex items-center gap-2 text-xs font-semibold text-(--brand-accent)">
                  <HeartHandshake size={14} />
                  <span>Why It Matters</span>
                </div>
                <p className="text-sm sm:text-base text-(--text-secondary) font-normal leading-relaxed">
                  {item.whyItMatters}
                </p>
              </div>

              {/* Block c: Warning signs to watch for */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-(--brand-accent)">
                  <ShieldAlert size={14} />
                  <span>Warning Signs to Watch For</span>
                </div>
                <div className="space-y-2">
                  {item.warningSigns.map((sign, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-(--surface) border border-(--border-card) text-sm text-(--text-primary) font-normal"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-(--brand-accent) mt-2 shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block d: How Maatriva helps */}
              <div className="space-y-1.5 p-4 rounded-xl bg-(--surface) border border-(--border-card)">
                <div className="flex items-center gap-2 text-xs font-semibold text-(--brand-accent)">
                  <Clock size={14} />
                  <span>How Maatriva Supports</span>
                </div>
                <p className="text-sm text-(--text-secondary) font-normal leading-relaxed">
                  {item.howMaatrivaHelps}
                </p>
              </div>

              {/* Block e: When to call a doctor or emergency services */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FFF1EB] border border-(--brand-accent)/40 space-y-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-(--brand-accent)">
                  <AlertTriangle size={16} className="text-(--brand-accent)" />
                  <span>When to Seek Immediate Medical Care</span>
                </div>
                <p className="text-sm font-semibold text-(--text-primary) leading-relaxed">
                  {item.emergencyAction}
                </p>
                <div className="pt-1 text-xs text-(--text-secondary)">
                  Always trust your parental instinct: if you or your baby feel unwell, do not wait. Contact your pediatrician, OB-GYN, or emergency room right away.
                </div>
              </div>

              {/* Block f: Sources */}
              <div className="space-y-2 pt-2 border-t border-(--border-card)">
                <span className="text-xs font-semibold text-(--text-secondary)">
                  Educational References & Guidelines:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.sources.map((source, sIdx) => (
                    <a
                      key={sIdx}
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-(--brand-accent) bg-(--bg-canvas) border border-(--border-card) hover:bg-(--brand-accent) hover:text-white transition-colors"
                    >
                      <span>{source.name}</span>
                      <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Footer Disclaimer */}
              <div className="p-3.5 rounded-xl bg-(--bg-canvas) border border-(--border-card) text-xs text-(--text-secondary) leading-relaxed text-center">
                <p>
                  <strong>Medical Disclaimer:</strong> This information is for awareness only and is not medical advice. Maatriva does not replace a doctor, diagnosis, or clinical evaluation. In an emergency, call your local emergency services or visit the nearest hospital.
                </p>
              </div>

            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 px-6 sm:px-7 border-t border-(--border-card) bg-(--surface) flex items-center justify-between shrink-0">
              <span className="text-xs font-normal text-(--text-secondary)">
                Educational & Awareness Purpose Only
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full clay-btn clay-btn-primary text-xs font-semibold shadow-sm cursor-pointer"
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
