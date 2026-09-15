import React, { useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactModal({
  isOpen,
  onClose,
  formData,
  handleChange,
  handleSubmit,
  loading,
  status,
}) {
  const modalRef = useRef(null);
  const initialFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

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

    // Focus first input field initially
    setTimeout(() => {
      initialFocusRef.current?.focus();
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-(--text-dark)/40 backdrop-blur-md"
          />

          {/* SMALL MODAL */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md clay-card p-6"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 hover:bg-(--bg-hover) rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-(--primary-light)/50"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="contact-modal-title" className="text-xl font-bold mb-4 text-(--text-dark)">
              Contact Us
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                ref={initialFocusRef}
                type="text"
                name="name"
                placeholder="Full Name"
                aria-label="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 clay-input"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 clay-input"
              />

              <input
                type="text"
                name="organization"
                placeholder="Organization"
                aria-label="Organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 clay-input"
              />

              <textarea
                name="message"
                rows="3"
                placeholder="Your Message"
                aria-label="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 clay-input"
              />

              {status.message && (
                <p
                  className={`text-sm ${
                    status.type === "success"
                      ? "text-(--primary) font-semibold"
                      : "text-red-500 font-semibold"
                  }`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 clay-btn clay-btn-primary flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}