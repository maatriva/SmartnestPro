import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Download, Smartphone } from "lucide-react";
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
      className="demo-navbar fixed top-0 left-0 right-0 z-100 px-4 md:px-6 py-4 bg-transparent text-(--text)"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 clay-navbar relative">
        
        {/* Logo */}
        <Link
          to="/"
          className="nav-logo inline-block font-bold tracking-wide flex items-center justify-center"
        >
          <img
            src="/Faviconsimple (2).png"
            alt="Maatriva Logo"
            width="100"
            height="100"
            className="w-[100px] h-[100px] md:w-[100px] md:h-[100px] object-contain scale-125 md:scale-150"
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8 font-semibold">
          {NAV_LINKS.map((link, i) => (
            <li key={i} className="nav-item">
              {link.path.startsWith("/#") ? (
                <a
                  href={link.path}
                  className="nav-link inline-block hover:text-(--text-dark) transition duration-200"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.path}
                  className={`nav-link inline-block hover:text-(--text-dark) transition duration-200 ${
                    location.pathname === link.path
                      ? "text-(--primary)"
                      : ""
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
                className={`nav-link inline-block text-(--primary) font-black hover:text-(--text-dark) transition duration-200 ${
                  location.pathname === "/admin"
                    ? "bg-(--primary-light) px-3 py-1 rounded-full text-white"
                    : ""
                }`}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4 nav-cta">
          {/* Download App CTA */}
          <a
            href={APP_DOWNLOAD_LINK}
            download="maatriva-app.apk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full clay-badge text-(--primary) font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Download size={16} />
            <span>Download App</span>
          </a>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-(--text-dark) font-medium">
                Hi, {user.name.split(" ")[0]}
              </span>

              <button
                onClick={logout}
                className="px-5 py-2 clay-btn clay-btn-destructive text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2.5 clay-btn clay-btn-primary"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-(--text-dark) hover:bg-(--bg-hover) rounded-xl transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu rendered via Portal to escape transform containing-block */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isMenuOpen && (
              <div className="lg:hidden">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90]"
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Floating Mobile Card */}
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 280,
                  }}
                  className="fixed top-24 left-4 right-4 bottom-6 max-w-md mx-auto z-[95] clay-card-static bg-(--bg) overflow-y-auto flex flex-col p-6 rounded-3xl border border-(--primary)/20 shadow-2xl justify-between"
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-(--border) shrink-0">
                    <div className="flex items-center gap-2">
                      <img
                        src="/Faviconsimple (2).png"
                        alt="Maatriva Logo"
                        width="32"
                        height="32"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="font-extrabold text-lg text-(--text-dark) tracking-tight">
                        Maatriva
                      </span>
                    </div>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-1.5 rounded-xl text-(--text-dark) hover:bg-(--bg-hover) transition-colors"
                      aria-label="Close menu"
                    >
                      <X size={22} />
                    </button>
                  </div>

                  {/* Nav Links */}
                  <div className="flex flex-col gap-1.5 my-auto py-2">
                    {NAV_LINKS.map((link, i) => (
                      link.path.startsWith("/#") ? (
                        <a
                          key={i}
                          href={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="px-4 py-3 rounded-2xl text-lg font-bold text-(--text-dark) hover:text-(--primary) hover:bg-(--primary)/10 transition-colors text-center"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          key={i}
                          to={link.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`px-4 py-3 rounded-2xl text-lg font-bold transition-colors text-center ${
                            location.pathname === link.path
                              ? "text-(--primary) bg-(--primary)/10"
                              : "text-(--text-dark) hover:text-(--primary) hover:bg-(--primary)/5"
                          }`}
                        >
                          {link.name}
                        </Link>
                      )
                    ))}

                    {user?.is_admin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="px-4 py-3 rounded-2xl text-lg font-bold text-(--primary) bg-(--primary)/10 text-center"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                  </div>

                  {/* Actions CTA */}
                  <div className="pt-3 border-t border-(--border) flex flex-col gap-3 shrink-0">
                    <a
                      href={APP_DOWNLOAD_LINK}
                      download="maatriva-app.apk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl clay-btn clay-btn-primary font-bold text-center text-sm flex items-center justify-center gap-2 shadow-md shadow-[#5A78D6]/20"
                    >
                      <Download size={18} />
                      <span>Download Maatriva App</span>
                    </a>

                    {user ? (
                      <div className="flex items-center justify-between gap-3 p-2.5 px-3.5 rounded-xl clay-card-secondary">
                        <div className="truncate">
                          <p className="text-(--text-light) text-xs font-semibold">Logged in as</p>
                          <p className="font-bold text-(--text-dark) text-sm truncate">{user.name}</p>
                        </div>
                        <button
                          onClick={logout}
                          className="px-4 py-1.5 clay-btn clay-btn-destructive font-bold text-xs shrink-0"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full py-3 px-4 rounded-xl clay-btn clay-btn-secondary text-(--text-dark) font-bold text-center text-sm flex items-center justify-center"
                      >
                        Login to Account
                      </Link>
                    )}
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