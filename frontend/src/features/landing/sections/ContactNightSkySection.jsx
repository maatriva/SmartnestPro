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
    <section id="contact" className="clay-section night-sky-section relative text-(--text-dark)">
      {/* Background Soft Celestial Warmth */}
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

        {/* Warm Golden & Rose Aura Orbs */}
        <div className="absolute top-1/4 -right-20 w-[450px] h-[450px] bg-[#F2B8A8] opacity-25 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-[#F0C675] opacity-20 blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Reassurance & Celestial Invitation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge text-xs sm:text-sm font-bold border border-(--primary)/20">
              <Sparkles size={14} className="text-(--primary)" />
              <span>We're Here For You</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight font-display [text-wrap:balance]">
              Let's Bring Peace{" "}
              <span className="text-(--primary)">To Your Nursery.</span>
            </h2>

            <p className="text-base sm:text-lg text-(--text) leading-relaxed font-medium [text-wrap:pretty]">
              Have questions about how Maatriva adapts to your newborn? Want to explore partnerships or hospital nursery deployments? Reach out and our team will get back to you with care.
            </p>

            {/* Direct Contacts in Soft Clay Pill */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm sm:text-base text-(--text-dark) font-bold bg-white/80 p-3.5 rounded-2xl border border-white shadow-xs">
                <div className="w-10 h-10 rounded-full bg-(--primary-soft) text-(--primary) flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <span>contact@maatriva.co.in</span>
              </div>

              <div className="flex items-center gap-3 text-sm sm:text-base text-(--text-dark) font-bold bg-white/80 p-3.5 rounded-2xl border border-white shadow-xs">
                <div className="w-10 h-10 rounded-full bg-(--primary-soft) text-(--primary) flex items-center justify-center shrink-0">
                  <Heart size={18} />
                </div>
                <span>Incubated at IIT Delhi IHFC & IIT Mandi Catalyst</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Soft Clay Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="clay-card-dark p-8 sm:p-10 relative shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-(--text-dark) mb-2 font-display [text-wrap:balance]">
                Send a Gentle Message
              </h3>
              <p className="text-sm sm:text-base text-(--text) mb-6 font-medium [text-wrap:pretty]">
                Whether you're an expectant parent, pediatrician, or partner, we'd love to connect.
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-(--text-dark) mb-1.5">
                    Your Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--cocoa)/60 pointer-events-none" />
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Priya Sharma"
                      className="w-full pl-11 pr-4 py-3.5 clay-input text-sm sm:text-base font-medium transition-all focus:ring-4 focus:ring-[#F0C675]/35 focus:border-[#F0C675]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-(--text-dark) mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--cocoa)/60 pointer-events-none" />
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. priya@example.com"
                      className="w-full pl-11 pr-4 py-3.5 clay-input text-sm sm:text-base font-medium transition-all focus:ring-4 focus:ring-[#F0C675]/35 focus:border-[#F0C675]"
                    />
                  </div>
                </div>

                {/* Organization / Role */}
                <div>
                  <label htmlFor="contact-org" className="block text-xs font-bold uppercase tracking-wider text-(--text-dark) mb-1.5">
                    Organization / Role (Optional)
                  </label>
                  <div className="relative">
                    <Building size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-(--cocoa)/60 pointer-events-none" />
                    <input
                      id="contact-org"
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="e.g. Parent, Pediatrician, or Daycare"
                      className="w-full pl-11 pr-4 py-3.5 clay-input text-sm sm:text-base font-medium transition-all focus:ring-4 focus:ring-[#F0C675]/35 focus:border-[#F0C675]"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-msg" className="block text-xs font-bold uppercase tracking-wider text-(--text-dark) mb-1.5">
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
                      placeholder="Share your question, story, or inquiries..."
                      className="w-full p-4 clay-input text-sm sm:text-base font-medium resize-none transition-all focus:ring-4 focus:ring-[#F0C675]/35 focus:border-[#F0C675]"
                    />
                  </div>
                </div>

                {/* Status Messages */}
                {status.message && (
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm font-bold ${
                      status.type === "success"
                        ? "bg-amber-50/90 text-(--primary) border border-(--primary)/30"
                        : "bg-rose-50/90 text-(--primary) border border-(--primary)/30"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                {/* Big Friendly Puffy Submit Button with Squish & Spring */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 mt-2 clay-btn clay-btn-primary text-base font-bold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer transition-transform"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Gentle Message</span>
                      <Send size={18} />
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
