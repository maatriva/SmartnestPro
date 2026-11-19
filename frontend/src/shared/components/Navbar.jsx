import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download, Sparkles, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import useAuth from "../../features/auth/hooks/useAuth";
import { NAV_LINKS, APP_DOWNLOAD_LINK } from "../constants/navigation";
import useBodyScrollLock from "../hooks/useBodyScrollLock";
import { navbarEntranceAnimation } from "../../animations/navbarAnimation";

const Navbar = () => {
  const navRef = useRef(null);
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useBodyScrollLock(isMenuOpen);

  useLayoutEffect(() => {
    const ctx = navbarEntranceAnimation(navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav
      ref={navRef}
      className="demo-navbar fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 bg-transparent text-(--text) pointer-events-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between h-18 sm:h-20 px-5 sm:px-7 clay-navbar rounded-full relative shadow-lg pointer-events-auto">
        
        {/* Brand Logo */}
        <Link
          to="/"
          className="nav-logo inline-flex items-center group py-1"
          aria-label="Maatriva Home"
        >
          <picture>
            <source srcSet="/maatriva-logo.webp" type="image/webp" />
            <img
              src="/maatriva-logo.png"
              alt="Maatriva Logo"
              width="170"
              height="54"
              decoding="async"
              className="h-10 sm:h-12 md:h-13 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </picture>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-7 font-semibold text-sm">
          {NAV_LINKS.map((link, i) => (
            <li key={i} className="nav-item">
              {link.path.startsWith("/#") ? (
                <a
                  href={link.path}
                  className="nav-link inline-block text-(--text-primary) hover:text-(--brand-accent) transition duration-150"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.path}
                  className={`nav-link inline-block transition duration-150 ${
                    location.pathname === link.path
                      ? "text-(--brand-accent) font-bold"
                      : "text-(--text-primary) hover:text-(--brand-accent)"
                  }`}
                >
                  {link.name}
                </Link>
              )}
            </li>
          ))}

          {user?.is_admin && (
            <li className="nav-item">
              <Link
                to="/admin"
                className={`nav-link inline-block text-(--brand-accent) font-bold hover:text-(--text-primary) transition duration-150 ${
                  location.pathname === "/admin"
                    ? "bg-(--brand-accent) px-3 py-1 rounded-full text-white"
                    : ""
                }`}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3 nav-cta">
          {/* Download App Pill */}
          <a
            href={APP_DOWNLOAD_LINK}
            download="maatriva-app.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full clay-badge text-(--brand-accent) font-semibold text-xs flex items-center gap-1.5 hover:scale-102 active:scale-95 transition-transform shadow-xs"
          >
            <Download size={13} />
            <span>Download APK</span>
          </a>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-(--text-primary) text-sm font-semibold">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="px-4 py-1.5 clay-btn clay-btn-secondary text-xs"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/survey"
              className="px-5 py-2 clay-btn clay-btn-primary text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md"
            >
              Take Survey
            </Link>
          )}
        </div>

        {/* Mobile Clay Hamburger Toggle */}
        <button
          className="lg:hidden w-11 h-11 rounded-full clay-badge flex items-center justify-center text-(--text-dark) hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <div className="lg:hidden pointer-events-auto">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-[#2D1F3B]/50 backdrop-blur-sm z-90"
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Floating Clay Mobile Menu Card */}
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 280,
                  }}
                  className="fixed top-20 left-4 right-4 max-w-md mx-auto z-95 clay-card p-6 rounded-3xl shadow-2xl flex flex-col gap-5"
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-(--border)/40">
                    <div className="flex items-center">
                      <picture>
                        <source srcSet="/maatriva-logo.webp" type="image/webp" />
                        <img
                          src="/maatriva-logo.png"
                          alt="Maatriva Logo"
                          width="140"
                          height="40"
                          decoding="async"
                          className="h-9 w-auto object-contain"
                        />
                      </picture>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-9 h-9 rounded-full clay-badge flex items-center justify-center text-(--text-dark)"
                      aria-label="Close menu"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-2 py-2">
                    {NAV_LINKS.map((link, i) => (
                      link.path.startsWith("/#") ? (
                        <a
                          key={i}
                          href={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="px-4 py-3 rounded-2xl font-bold text-base text-(--text-dark) hover:bg-(--primary-soft) hover:text-(--primary) transition-all"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          key={i}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`px-4 py-3 rounded-2xl font-bold text-base transition-all ${
                            location.pathname === link.path
                              ? "bg-(--primary-soft) text-(--primary)"
                              : "text-(--text-dark) hover:bg-(--primary-soft) hover:text-(--primary)"
                          }`}
                        >
                          {link.name}
                        </Link>
                      )
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="pt-2 border-t border-(--border)/40 flex flex-col gap-3">
                    <a
                      href={APP_DOWNLOAD_LINK}
                      download="maatriva-app.apk"
                      className="w-full py-3 rounded-full clay-btn clay-btn-secondary text-sm font-bold flex items-center justify-center gap-2 text-center"
                    >
                      <Download size={16} />
                      <span>Download Android APK</span>
                    </a>

                    <Link
                      to="/survey"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full py-3.5 rounded-full clay-btn clay-btn-primary text-sm font-bold text-center"
                    >
                      Take Baby Care Survey
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </nav>
  );
};

export default Navbar;
