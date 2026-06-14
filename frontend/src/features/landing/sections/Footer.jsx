import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Youtube, Sparkles } from "lucide-react";

import ContactModal from "../../../shared/components/ContactModal";
import useContactForm from "../hooks/useContactForm";
import { SOCIAL_LINKS, FOOTER_LINKS } from "../data/footerData";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    formData,
    loading,
    status,
    handleChange,
    handleSubmit,
  } = useContactForm(() =>
    setIsModalOpen(false)
  );

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

  return (
    <>
      <footer
        id="footer"
        className="footer-blend backdrop-blur-xl text-(--text) py-16 px-6 relative overflow-hidden border-t border-teal-200/20 z-20"
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-teal-200/20">
            {/* Brand Section */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg clay-badge text-(--primary) flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <span className="text-xl font-black text-(--text-dark) tracking-tight">
                  Maatriva
                </span>
              </div>
              <p className="text-sm font-semibold text-(--text-light) max-w-sm leading-relaxed">
                Empowering parents with advanced, clinical-grade baby monitoring and comfort technology. Grounded in pediatric research and driven by AI.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full clay-badge text-(--primary) hover:text-blue-600 flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                    aria-label={link.name}
                  >
                    {getSocialIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-4 md:col-start-7 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-(--text-dark)">
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.map((link) => (
                  <li key={link.label}>
                    {link.path.startsWith("/#") ? (
                      <a
                        href={link.path}
                        className="text-sm font-semibold text-(--text) hover:text-(--primary) transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm font-semibold text-(--text) hover:text-(--primary) transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Support Column */}
            <div className="md:col-span-2 md:col-start-11 space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-(--text-dark)">
                Support
              </h4>
              <p className="text-xs font-semibold text-(--text-light) leading-relaxed">
                Have questions or need assistance? Reach out to our team.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-2 w-full py-2.5 text-xs font-black uppercase tracking-wider rounded-full clay-btn clay-btn-primary cursor-pointer text-center block"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Bottom Copyright Row */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-(--text-light)">
            <p>© 2026 Maatriva. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-(--primary) transition-colors">
                Privacy Policy
              </a>
              <Link to="/terms" className="hover:text-(--primary) transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        status={status}
      />
    </>
  );
}