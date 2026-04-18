import React, { useState } from 'react';
import { Sparkles, Facebook, Instagram, Youtube } from 'lucide-react';
import { validateEmail } from '../utils/validation';
import { FaLinkedin } from "react-icons/fa6";

export function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: "Goal! Your message has been sent successfully." });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus({ type: null, message: '' }), 5000);
      } else {
        const data = await response.json().catch(() => ({ error: "Failed to send message." }));
        setStatus({ type: 'error', message: data.error || "Failed to send message. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus({ type: 'error', message: "Connection error. Please check if the server is running." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="footer" className="bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text)] py-16 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-[var(--primary)]" aria-hidden="true" />
              <span className="text-2xl font-bold tracking-tight text-[var(--text-dark)]">
                Smart Nest Pro
              </span>
            </div>
            
            <p className="text-[var(--text-light)] text-lg mb-8 max-w-md leading-relaxed">
              The world's first AI-powered smart baby cradle that learns your baby's needs and gives you peace of mind.
            </p>

            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/18P8z1QPAJ/" className="w-11 h-11 bg-[var(--bg-glass)] hover:bg-[var(--primary)] hover:text-white rounded-full flex items-center justify-center transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/company/maatriva/" className="w-11 h-11 bg-[var(--bg-glass)] hover:bg-[var(--primary)] hover:text-white rounded-full flex items-center justify-center transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none">
                <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/maatriva_?igsh=eXNrdzAzNHZ5ejFx" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[var(--bg-glass)] hover:bg-[var(--primary)] hover:text-white rounded-full flex items-center justify-center transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.youtube.com/channel/UCWKAIrA9O3h8fNVFCYq2qQg" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-[var(--bg-glass)] hover:bg-[var(--primary)] hover:text-white rounded-full flex items-center justify-center transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none">
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-bold text-[var(--text-dark)] uppercase tracking-[0.15em] text-xs mb-8">
              Product
            </h4>
            <nav>
              <ul className="space-y-4">
                <li><a href="#features" className="text-[var(--text-light)] hover:text-[var(--primary)] transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-[var(--text-light)] hover:text-[var(--primary)] transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="text-[var(--text-light)] hover:text-[var(--primary)] transition-colors">Pricing</a></li>
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-4">
            <h4 className="font-bold text-[var(--text-dark)] uppercase tracking-[0.15em] text-xs mb-8">
              Contact Us
            </h4>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-[var(--bg-glass)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)]" />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-[var(--bg-glass)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)]" />
              <input type="tel" name="phone" placeholder="Contact Number" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-[var(--bg-glass)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)]" />
              <textarea name="message" rows="3" placeholder="Your Message" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 bg-[var(--bg-glass)] border border-[var(--border)] rounded-xl text-[var(--text)] focus:ring-2 focus:ring-[var(--primary)] resize-none" />

              {status.message && (
                <div className={`p-3 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-100/10 text-green-500' : 'bg-red-100/10 text-red-500'}`}>
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={loading || status.type === 'success'} className={`w-full py-3 ${status.type === 'success' ? 'bg-green-500' : 'bg-[var(--primary)]'} text-white font-semibold rounded-xl hover:scale-[1.02] transition-all disabled:opacity-70`}>
                {loading ? "Sending..." : status.type === 'success' ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-[var(--text-light)]">
          <p>© 2026 Smart Nest Pro. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[var(--primary)] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}