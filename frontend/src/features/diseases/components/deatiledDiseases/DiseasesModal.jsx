import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function DiseaseModal({ selected, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus close button initially
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected, onClose]);

  const modalLayout = (
    <AnimatePresence>
      {selected && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="disease-modal-title"
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            className="clay-card p-10 max-w-xl w-full relative z-10 text-(--text) bg-white"
            initial={{
              scale: 0.9,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close modal"
              className="
                absolute
                top-4
                right-4
                text-(--text-light)
                hover:text-(--primary)
                transition-colors
                p-2
                hover:bg-(--bg-hover)
                rounded-full
                focus:outline-none
                focus:ring-2
                focus:ring-(--primary-light)/50
              "
            >
              <X className="w-5 h-5" />
            </button>

            <h2 id="disease-modal-title" className="text-3xl font-black mb-6 text-(--text-dark)">
              {selected.name}
            </h2>

            <p className="mb-4 font-semibold text-lg">
              {selected.description}
            </p>

            <p className="italic text-(--text-light) font-medium">
              {selected.aiRole}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalLayout, document.body);
}