import React from "react";
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
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          
          {/* Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[var(--text-dark)]/40 backdrop-blur-md"
          />

          {/* SMALL MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[var(--white)] rounded-2xl shadow-xl p-6 border border-[var(--border)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-[var(--bg-hover)] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold mb-4 text-[var(--text-dark)]">
              Contact Us
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />

              <input
                type="text"
                name="organization"
                placeholder="Organization"
                value={formData.organization}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />

              <textarea
                name="message"
                rows="3"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />

              {status.message && (
                <p
                  className={`text-sm ${
                    status.type === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}