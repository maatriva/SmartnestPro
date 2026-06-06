import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navRef = useRef(null);
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Survey", path: "/survey" },
    { name: "About Us", path: "/about-us" },
    { name: "Diseases", path: "/diseases" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".demo-navbar", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      tl.from(".nav-logo", {
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.6
      }, "-=0.5");

      tl.from(".nav-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.3");

      tl.from(".nav-cta", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.2");

    }, navRef);

    return () => ctx.revert();
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <nav ref={navRef} className="demo-navbar fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4 
    bg-transparent text-[var(--text)]">

      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 sm:px-6 clay-navbar relative">

        {/* Logo */}
        <Link to="/" className="nav-logo inline-block font-bold tracking-wide flex items-center justify-center">
          <img src="/Faviconsimple (2).png" alt="Maatriva Logo" className="w-[100px] h-[100px] md:w-[100px] md:h-[100px] object-contain scale-125 md:scale-150" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8 font-semibold">
          {navLinks.map((link, i) => (
            <li key={i} className="nav-item">
              <Link 
                to={link.path} 
                className={`nav-link inline-block hover:text-[var(--text-dark)] transition duration-200 ${
                  location.pathname === link.path ? "text-[var(--primary)]" : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          {user?.is_admin && (
            <li className="nav-item">
              <Link to="/admin" className={`nav-link inline-block text-[var(--primary)] font-black hover:text-[var(--text-dark)] transition duration-200 ${
                  location.pathname === "/admin" ? "bg-[var(--primary-light)] px-3 py-1 rounded-full text-white" : ""
                }`}>
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4 nav-cta">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-[var(--text-dark)] font-medium">
                Hi, {user.name.split(' ')[0]}
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
          className="lg:hidden p-2 text-[var(--text-dark)] hover:bg-[var(--bg-hover)] rounded-xl transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-24 right-4 bottom-4 left-4 lg:hidden 
              clay-card overflow-hidden flex flex-col p-8 z-[-1] pt-12"
            >
              <div className="flex flex-col gap-6 text-center">
                {navLinks.map((link, i) => (
                  <Link 
                    key={i}
                    to={link.path}
                    className={`text-2xl font-bold transition-colors ${
                      location.pathname === link.path ? "text-[var(--primary)]" : "text-[var(--text-dark)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {user?.is_admin && (
                  <Link 
                    to="/admin"
                    className="text-2xl font-bold text-[var(--primary)]"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>

              <div className="mt-auto flex flex-col gap-4">
                {user ? (
                  <>
                    <div className="text-center p-4 bg-[var(--bg-glass)] rounded-2xl border border-[var(--border)]">
                      <p className="text-[var(--text-light)] text-sm mb-1">Logged in as</p>
                      <p className="font-bold text-[var(--text-dark)]">{user.name}</p>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full py-4 clay-btn clay-btn-destructive font-bold text-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="w-full py-4 clay-btn clay-btn-primary font-bold text-center text-lg flex items-center justify-center"
                  >
                    Login to Account
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </nav>
  );
};

export default Navbar;