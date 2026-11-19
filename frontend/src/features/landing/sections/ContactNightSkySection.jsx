import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Mail, Building, User, MessageCircle, Heart } from "lucide-react";
import useContactForm from "../hooks/useContactForm";
import confetti from "canvas-confetti";

export default function ContactNightSkySection() {
  const { formData, loading, status, handleChange, handleSubmit } = useContactForm(() => {});

  // Night stars
  const nightStars = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 1.2,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }));
  }, []);

  const handleFormSubmit = async (e) => {
    await handleSubmit(e);
    if (!status.type || status.type === "success") {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#F0C675", "#F2B8A8", "#D9825F", "#FFF6EE"],
      });
    }
  };

  return (
    <section id="contact" className="clay-section relative text-(--text-primary) bg-(--bg-alt) overflow-hidden z-10 pt-14 pb-20 sm:pt-20 sm:pb-24">
      {/* Background Soft Celestial Stars */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {nightStars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-[#F0C675] twinkle-star"
            style={{
              left: star.x,
              top: star.y,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: `0 0 ${star.size * 2}px rgba(240, 198, 117, 0.7)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Direct Contacts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) leading-tight font-display [text-wrap:balance]">
              Contact our team
            </h2>

            <p className="text-base sm:text-lg text-(--text-secondary) leading-relaxed font-normal [text-wrap:pretty]">
              Have questions about the cradle, pre-orders, or partnerships? Send us a message and our team will get back to you directly.
            </p>

            {/* Direct Contacts in Light Clay Card */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm sm:text-base text-(--text-primary) font-semibold bg-(--surface) p-4 rounded-xl border border-(--border-card) shadow-sm">
                <div className="w-9 h-9 rounded-full bg-(--brand-accent) text-white flex items-center justify-center shrink-0">
                  <Mail size={17} />
                </div>
                <span>contact@maatriva.co.in</span>
              </div>

              <div className="flex items-center gap-3 text-sm sm:text-base text-(--text-primary) font-semibold bg-(--surface) p-4 rounded-xl border border-(--border-card) shadow-sm">
                <div className="w-9 h-9 rounded-full bg-(--brand-accent) text-white flex items-center justify-center shrink-0">
                  <Heart size={17} />
                </div>
                <span>Supported by IHFC, IIT Mandi Catalyst & Wadhwani Foundation</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="bg-(--surface) rounded-2xl p-6 sm:p-9 relative shadow-sm border border-(--border-card)">
              <h3 className="text-2xl font-bold text-(--text-primary) mb-1.5 font-display [text-wrap:balance]">
                Send a message
              </h3>
              <p className="text-sm sm:text-base text-(--text-secondary) mb-6 font-normal [text-wrap:pretty]">
                Whether you are a parent, hospital, or doctor, we would love to connect.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs sm:text-sm font-semibold text-(--text-primary) mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full !pl-11 pr-4 py-2.5 clay-input text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs sm:text-sm font-semibold text-(--text-primary) mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full !pl-11 pr-4 py-2.5 clay-input text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Organization / Role */}
                <div>
                  <label htmlFor="contact-org" className="block text-xs sm:text-sm font-semibold text-(--text-primary) mb-1.5">
                    Organization / Role (Optional)
                  </label>
                  <div className="relative">
                    <Building size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-secondary) pointer-events-none" />
                    <input
                      id="contact-org"
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Hospital, clinic, or parent (optional)"
                      className="w-full !pl-11 pr-4 py-2.5 clay-input text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-msg" className="block text-xs sm:text-sm font-semibold text-(--text-primary) mb-1.5">
                    Your Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="contact-msg"
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can our team help you?"
                      className="w-full p-3.5 clay-input text-sm font-medium resize-none"
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {status.message && (
                  <div
                    className={`p-3.5 rounded-xl text-xs sm:text-sm font-semibold ${
                      status.type === "success"
                        ? "bg-amber-50 text-(--brand-accent) border border-(--brand-accent)/30"
                        : "bg-rose-50 text-rose-700 border border-rose-300"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                {/* Primary Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 mt-2 clay-btn clay-btn-primary text-base font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-98 cursor-pointer transition-transform"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
