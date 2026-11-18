import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Youtube, Sparkles, Heart } from "lucide-react";

import ContactModal from "../../../shared/components/ContactModal";
import useContactForm from "../hooks/useContactForm";
import { SOCIAL_LINKS, FOOTER_LINKS } from "../data/footerData";
import AchievementsSection from "./AchievementsSection";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const {
    formData,
    loading,
    status,
    handleChange,
    handleSubmit,
  } = useContactForm(handleCloseModal);

  const getSocialIcon = (name) => {
    switch (name) {
      case "Facebook":
        return <Facebook size={18} />;
      case "Linkedin":
        return <Linkedin size={18} />;
      case "Instagram":
        return <Instagram size={18} />;
      case "Youtube":
        return <Youtube size={18} />;
      default:
        return null;
    }
  };

  const footerStars = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: `${(i * 17) % 100}%`,
      y: `${(i * 31) % 100}%`,
      size: (i % 3) * 0.7 + 1.2,
      delay: (i % 4) * 0.8,
    }));
  }, []);

  return (
    <>
      <footer
        id="footer"
        className="relative bg-(--plum-dusk-deep) text-white overflow-hidden z-20"
      >
        {/* Wavy Top Edge Divider */}
        <div className="absolute top-0 left-0 right-0 wavy-divider -translate-y-[98%] pointer-events-none z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-(--plum-dusk-deep) w-full h-12">
            <path d="M0,0 C200,80 400,-30 600,45 C800,120 1000,10 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        {/* 🏆 Achievements Section - Direct integration with zero color break */}
        <AchievementsSection />

        {/* Twinkling Stars in Footer Links Canvas */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {footerStars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-white/70 twinkle-star"
              style={{
                left: star.x,
                top: star.y,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Main Footer Links Container: Symmetric, Equal-Width Aligned Columns */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4 pb-12">
          {/* Symmetrical 4-Column Grid on Desktop, 2-Column on Tablet, Stacked on Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-white/10 items-start">
            
            {/* Column 1: Brand & Purpose */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl clay-badge-dark flex items-center justify-center text-[#F0C675]">
                  <Sparkles size={20} />
                </div>
                <span className="text-2xl font-black text-white tracking-tight font-display">
                  Maatriva
                </span>
              </div>
              <p className="text-sm font-medium text-[#E2D3E4] leading-relaxed">
                Empowering parents with gentle, AI-guided contactless infant monitoring and soothing technology. Grounded in pediatric care and maternal wellness.
              </p>
              
              {/* Social Icons with Clay Badges */}
              <div className="flex items-center gap-3 pt-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-(--primary) text-white border border-white/20 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-md"
                    aria-label={link.name}
                  >
                    {getSocialIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Solutions & Technology */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#F2B8A8]">
                Technology
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="/#features" className="text-sm font-semibold text-[#E2D3E4] hover:text-(--accent) transition-colors">
                    Smart Motion Soothing
                  </a>
                </li>
                <li>
                  <a href="/#diseases" className="text-sm font-semibold text-[#E2D3E4] hover:text-(--accent) transition-colors">
                    Vital Health Monitoring
                  </a>
                </li>
                <li>
                  <a href="/#how-it-works" className="text-sm font-semibold text-[#E2D3E4] hover:text-(--accent) transition-colors">
                    AI Cry Acoustic Engine
                  </a>
                </li>
                <li>
                  <a href="/#app" className="text-sm font-semibold text-[#E2D3E4] hover:text-(--accent) transition-colors">
                    Caregiver Mobile App
                  </a>
                </li>
                <li>
                  <a href="/#products" className="text-sm font-semibold text-[#E2D3E4] hover:text-(--accent) transition-colors">
                    Cradle Models & Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Company & Ecosystem */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#F2B8A8]">
                Company
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.path.startsWith("/#") ? (
                      <a
                        href={link.path}
                        className="text-sm font-semibold text-[#E2D3E4] hover:text-(--accent) transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm font-semibold text-[#E2D3E4] hover:text-(--accent) transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <a href="/#achievements" className="text-sm font-semibold text-[#E2D3E4] hover:text-(--accent) transition-colors">
                    Achievements & Partners
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Inquiries & Support */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#F2B8A8]">
                Inquiries
              </h4>
              <p className="text-xs font-medium text-[#E2D3E4] leading-relaxed">
                Have questions about our smart cradle, pre-orders, or research collaborations?
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 w-full py-3 text-xs font-bold uppercase tracking-wider rounded-full clay-btn clay-btn-primary cursor-pointer text-center block shadow-lg"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="py-5 border-b border-white/10 text-xs text-[#E2D3E4]/80 leading-relaxed text-center sm:text-left">
            <span className="font-bold text-[#F0C675]">Pediatric Safety Note:</span> Maatriva is designed as an additional layer of non-contact infant monitoring, cry translation, and sleep assistance. It does not replace medical advice, physician diagnosis, or clinical healthcare.
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#E2D3E4]/70">
            <p>© 2026 Maatriva MedTech. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-(--accent) transition-colors">
                Terms of Service
              </Link>
              <a href="#home" className="hover:text-(--accent) transition-colors">
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        status={status}
      />
    </>
  );
}
