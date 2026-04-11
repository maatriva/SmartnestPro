import { Sparkles, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="footer" className="bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text)] py-16 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Section 1: Brand & Socials (Spans 5 columns) */}
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
              <a href="#" id="social-facebook" aria-label="Follow us on Facebook" className="w-11 h-11 bg-[var(--bg-glass)] hover:bg-[var(--primary)] hover:text-white rounded-full flex items-center justify-center transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" id="social-twitter" aria-label="Follow us on Twitter" className="w-11 h-11 bg-[var(--bg-glass)] hover:bg-[var(--primary)] hover:text-white rounded-full flex items-center justify-center transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/maatriva_?igsh=eXNrdzAzNHZ5ejFx" id="social-instagram" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="w-11 h-11 bg-[var(--bg-glass)] hover:bg-[var(--primary)] hover:text-white rounded-full flex items-center justify-center transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.youtube.com/channel/UCWKAIrA9O3h8fNVFCYq2qQg" id="social-youtube" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Youtube" className="w-11 h-11 bg-[var(--bg-glass)] hover:bg-[var(--primary)] hover:text-white rounded-full flex items-center justify-center transition-all border border-[var(--border)] group focus:ring-2 focus:ring-[var(--primary)] outline-none">
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Section 2: Product Links (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <h4 id="footer-product-heading" className="font-bold text-[var(--text-dark)] uppercase tracking-[0.15em] text-xs mb-8">
              Product
            </h4>
            <nav aria-labelledby="footer-product-heading">
              <ul className="space-y-4">
                <li>
                  <a href="#features" id="link-features" className="text-[var(--text-light)] hover:text-[var(--primary)] transition-colors inline-block focus:outline-none focus:underline decoration-2 underline-offset-4">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" id="link-how-it-works" className="text-[var(--text-light)] hover:text-[var(--primary)] transition-colors inline-block focus:outline-none focus:underline decoration-2 underline-offset-4">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#pricing" id="link-pricing" className="text-[var(--text-light)] hover:text-[var(--primary)] transition-colors inline-block focus:outline-none focus:underline decoration-2 underline-offset-4">
                    Pricing
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Section 3: Newsletter (Spans 4 columns) */}
          <div className="lg:col-span-4">
            <h4 id="footer-newsletter-heading" className="font-bold text-[var(--text-dark)] uppercase tracking-[0.15em] text-xs mb-8">
              Stay Updated
            </h4>
            <p className="text-sm text-[var(--text-light)] mb-6">
              Subscribe to get notified about new features and safety updates.
            </p>
            
            <form className="relative group flex flex-col gap-3">
              <div className="relative">
                <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-[var(--text-light)] group-focus-within:text-[var(--primary)] transition-colors" aria-hidden="true" />
                </div>
                
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  placeholder="email@example.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[var(--bg-glass)] border border-[var(--border)] rounded-2xl text-[var(--text)] placeholder:text-[var(--text-light)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
                />
              </div>

              <button 
                type="submit"
                id="newsletter-submit"
                className="w-full py-4 bg-[var(--primary)] text-white font-semibold rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[var(--primary)]/10"
              >
                Join Newsletter
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-6 text-[13px] text-[var(--text-light)] font-medium">
          <p id="footer-copyright">© 2026 Smart Nest Pro. All rights reserved.</p>
          
          <div className="flex gap-8">
            <a href="#privacy" id="link-privacy" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</a>
            <a href="#terms" id="link-terms" className="hover:text-[var(--primary)] transition-colors">Terms</a>
            <a href="#cookies" id="link-cookies" className="hover:text-[var(--primary)] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}