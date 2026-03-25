import { Sparkles, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer id="footer" className="bg-[var(--bg-glass)] backdrop-blur-xl text-[var(--text)] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-7 h-7 text-[var(--primary)]" />
              <span className="text-xl font-semibold text-[var(--text-dark)]">
                Smart Nest Pro
              </span>
            </div>

            <p className="text-[var(--text-light)] mb-6 leading-relaxed">
              The world's first AI-powered smart baby cradle that learns your baby's needs and gives you peace of mind.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-[var(--bg-glass)] hover:bg-[var(--primary)] 
                  rounded-full flex items-center justify-center transition-colors border border-[var(--border)]"
                >
                  <Icon className="w-5 h-5 text-[var(--text)]" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {[
            {
              title: "Product",
              links: ["Features", "How It Works", "Pricing", "Specifications", "Compare Models"]
            },
            {
              title: "Support",
              links: ["Help Center", "Contact Us", "Warranty", "Shipping Info", "Returns"]
            },
            {
              title: "Company",
              links: ["About Us", "Careers", "Press Kit", "Blog", "Partners"]
            }
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-[var(--text-dark)] mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[var(--text-light)] hover:text-[var(--primary)] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Newsletter */}
        <div className="border-t border-[var(--border)] pt-12 pb-8">
          <div className="max-w-md mx-auto text-center mb-12">

            <h4 className="font-semibold text-[var(--text-dark)] mb-2">
              Stay Updated
            </h4>

            <p className="text-[var(--text-light)] mb-4 text-sm">
              Get the latest news, tips, and exclusive offers delivered to your inbox.
            </p>

            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-light)]" />
                
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 
                  bg-[var(--bg-glass)] border border-[var(--border)] 
                  rounded-full text-[var(--text)] placeholder-[var(--text-light)] 
                  focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>

              <button className="px-6 py-3 
              bg-[var(--primary)] text-white rounded-full 
              hover:bg-[var(--primary-hover)] transition-all whitespace-nowrap">
                Subscribe
              </button>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--text-light)]">
          
          <div>
            © 2026 Smart Nest Pro. All rights reserved.
          </div>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[var(--primary)] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}