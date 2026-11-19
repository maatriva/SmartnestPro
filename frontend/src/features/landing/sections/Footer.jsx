import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Youtube, Sparkles, Heart } from "lucide-react";

import ContactModal from "../../../shared/components/ContactModal";
import useContactForm from "../hooks/useContactForm";
import { SOCIAL_LINKS, FOOTER_LINKS } from "../data/footerData";

const RECOGNIZED_PARTNERS = [
  { name: "IHFC", href: "#achievements" },
  { name: "IIT Mandi Catalyst", href: "#achievements" },
  { name: "Wadhwani Foundation", href: "#achievements" },
  { name: "F6S AI #17", href: "#achievements" },
  { name: "F6S AI #24", href: "#achievements" },
];

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
        className="relative bg-gradient-to-b from-[#FFF6EE] via-[#F8E7D8] to-[#F3DDD0] text-(--text-dark) overflow-hidden z-20 border-t border-(--border)/40"
      >
        {/* Wavy Top Edge Divider flowing from section above */}
        <div className="absolute top-0 left-0 right-0 wavy-divider -translate-y-[98%] pointer-events-none z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="fill-[#FBE4DB] w-full h-8 sm:h-12">
            <path d="M0,0 C200,80 400,-30 600,45 C800,120 1000,10 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        {/* Twinkling Stars in Footer Links Canvas */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {footerStars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-[#F0C675]/60 twinkle-star"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8 sm:pt-10 pb-12">
          {/* Symmetrical 4-Column Grid on Desktop, 2-Column on Tablet, Stacked on Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-(--border)/30 items-start">
            
            {/* Column 1: Brand & Purpose */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl clay-badge flex items-center justify-center text-(--primary) shadow-sm">
                  <Sparkles size={20} />
                </div>
                <span className="text-2xl font-black text-(--text-dark) tracking-tight font-display">
                  Maatriva
                </span>
              </div>
              <p className="text-sm sm:text-base font-medium text-(--text) leading-relaxed">
                Non-contact infant vitals monitoring, automatic soothing motion, and secure parental sharing. Designed for family peace of mind.
              </p>
              
              {/* Social Icons with Clay Badges */}
              <div className="flex items-center gap-3 pt-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/90 hover:bg-(--primary) text-(--text-dark) hover:text-white border border-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-sm"
                    aria-label={link.name}
                  >
                    {getSocialIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Solutions & Technology */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-(--brand-accent)">
                Features
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="/#product-details" className="text-sm sm:text-base font-medium text-(--text-secondary) hover:text-(--brand-accent) transition-colors">
                    Smart Motion Soothing
                  </a>
                </li>
                <li>
                  <a href="/#health-focus" className="text-sm sm:text-base font-medium text-(--text-secondary) hover:text-(--brand-accent) transition-colors">
                    Vital Health Monitoring
                  </a>
                </li>
                <li>
                  <a href="/#how-it-works" className="text-sm sm:text-base font-medium text-(--text-secondary) hover:text-(--brand-accent) transition-colors">
                    Audio & Cry Detection
                  </a>
                </li>
                <li>
                  <a href="/#app" className="text-sm sm:text-base font-medium text-(--text-secondary) hover:text-(--brand-accent) transition-colors">
                    Caregiver Mobile App
                  </a>
                </li>
                <li>
                  <a href="/#product-details" className="text-sm sm:text-base font-medium text-(--text-secondary) hover:text-(--brand-accent) transition-colors">
                    Cradle Specifications
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Company & Ecosystem */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-(--brand-accent)">
                Company
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.path.startsWith("/#") ? (
                      <a
                        href={link.path}
                        className="text-sm sm:text-base font-medium text-(--text-secondary) hover:text-(--brand-accent) transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm sm:text-base font-medium text-(--text-secondary) hover:text-(--brand-accent) transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <a href="/#achievements" className="text-sm sm:text-base font-medium text-(--text-secondary) hover:text-(--brand-accent) transition-colors">
                    Recognitions & Partners
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Inquiries & Support */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-(--brand-accent)">
                Inquiries
              </h4>
              <p className="text-sm font-normal text-(--text-secondary) leading-relaxed">
                Have questions about our smart cradle, pre-orders, or doctor and clinic partnerships?
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 w-full py-3 text-sm font-semibold rounded-full clay-btn clay-btn-primary cursor-pointer text-center block shadow-md text-white"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Recognized By Mention */}
          <div className="py-4 border-b border-(--border)/30 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-medium text-(--text)">
            <div className="flex items-center gap-2 text-(--text-dark) font-bold">
              <Sparkles size={14} className="text-(--primary)" />
              <span>Recognised & Supported by:</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-(--text) font-semibold">
              {RECOGNIZED_PARTNERS.map((partner, idx) => (
                <a
                  key={idx}
                  href={partner.href}
                  className="hover:text-(--primary) transition-colors inline-flex items-center gap-1"
                >
                  <span>{partner.name}</span>
                  {idx < RECOGNIZED_PARTNERS.length - 1 && <span className="text-(--border) ml-3">·</span>}
                </a>
              ))}
            </div>
          </div>

          {/* Medical Disclaimer Banner */}
          <div className="py-5 border-b border-(--border)/30 text-xs sm:text-sm text-(--text) leading-relaxed text-center sm:text-left">
            <span className="font-bold text-(--primary)">Medical Note:</span> Maatriva is designed for home monitoring, soothing motion, and parental reassurance. It does not replace medical advice, physician diagnosis, or clinical healthcare.
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-bold text-(--text-dark)">
            <p>© 2026 Maatriva MedTech. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-(--primary) transition-colors">
                Terms of Service
              </Link>
              <a href="#home" className="hover:text-(--primary) transition-colors">
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
