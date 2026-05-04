import React, { useState } from 'react';
import { Sparkles, Facebook, Instagram, Youtube, Send, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactModal from "./ContactModal";
import { validateEmail } from '../utils/validation';
import API from '../utils/api';

export function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (status.message) setStatus({ type: null, message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const response = await API.post("/contacts", formData);

      if (response.status === 200 || response.status === 201) {
        setStatus({ type: 'success', message: "Message sent successfully!" });
        setFormData({ name: '', email: '', organization: '', message: '' });

        setTimeout(() => {
          setStatus({ type: null, message: '' });
          setIsModalOpen(false);
        }, 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to send message. Please try again.";
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      id="footer"
      className="bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text)] py-16 border-t border-[var(--border)] relative overflow-hidden"
    >
      {/* Background blur */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--primary)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8">

          {/* LEFT */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-[var(--primary)]" />
              <span className="text-2xl font-bold tracking-tight text-[var(--text-dark)]">
                Smart Nest Pro
              </span>
            </div>

            <p className="text-[var(--text-light)] text-lg mb-8 max-w-md leading-relaxed">
              The world's first AI-powered smart baby cradle that learns your baby's needs and gives you peace of mind.
            </p>

            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/share/18P8z1QPAJ/" 
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 border border-[var(--primary)]/10 hover:shadow-[0_0_15px_rgba(74,111,165,0.3)] hover:-translate-y-1"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/maatriva/" 
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 border border-[var(--primary)]/10 hover:shadow-[0_0_15px_rgba(74,111,165,0.3)] hover:-translate-y-1"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/maatriva_/?utm_source=ig_web_button_share_sheet" 
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 border border-[var(--primary)]/10 hover:shadow-[0_0_15px_rgba(74,111,165,0.3)] hover:-translate-y-1"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/channel/UCWKAIrA9O3h8fNVFCYq2qQg" 
                aria-label="YouTube"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--primary)]/5 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 border border-[var(--primary)]/10 hover:shadow-[0_0_15px_rgba(74,111,165,0.3)] hover:-translate-y-1"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* MIDDLE */}
          <div className="lg:col-span-3">
            <h4 className="font-bold pb-5 uppercase text-xs text-[var(--text-dark)] opacity-60">Product</h4>
            <ul className="space-y-4 font-medium">
              <li><Link to="/diseases" className="hover:text-[var(--primary)] transition-colors">Monitoring Registry</Link></li>
              <li><Link to="/about-us" className="hover:text-[var(--primary)] transition-colors">About Us</Link></li>
              <li><Link to="/#features" className="hover:text-[var(--primary)] transition-colors">Features</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-[var(--primary)] transition-colors">How It Works</Link></li>
              <li><Link to="/#pricing" className="hover:text-[var(--primary)] transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4">
            <h4 className="font-bold uppercase text-xs mb-6">Support</h4>

            <div className="bg-[var(--bg-secondary)]/10 p-6 rounded-2xl border border-[var(--primary)]/10">
              <p className="font-medium mb-3">Need help?</p>
              <p className="text-sm mb-4">
                Contact our support team anytime.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3 bg-[var(--primary)] text-white rounded-xl flex items-center justify-center gap-2"
              >
                Contact Us
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-[var(--text-light)]">© 2026 Smart Nest Pro</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>

      {/* ✅ Modal Component */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        status={status}
      />
    </footer>
  );
}