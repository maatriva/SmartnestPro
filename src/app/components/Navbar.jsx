import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const Navbar = () => {
  const navRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // 1. Navbar slides down - removed clip-path to ensure visibility
      tl.from(".demo-navbar", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // 2. Logo blurs in
      tl.from(".nav-logo", { 
        opacity: 0, 
        filter: "blur(10px)", 
        duration: 0.6 
      }, "-=0.5");

      // 3. Links stagger in
      tl.from(".nav-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }, "-=0.3");

      // 4. CTA pops in - The 'inline-block' below is what makes this scale work
      tl.from(".nav-cta", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.2");
      
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="demo-navbar fixed top-0 left-0 right-0 z-50 px-6 py-4 
    bg-[var(--bg-secondary)] text-[var(--text)]">
      
      <div className="max-w-7.5xl mx-auto flex items-center justify-between h-20 px-8 rounded-[var(--radius-lg)] 
      bg-[var(--bg-glass)] backdrop-blur-xl border border-white/40 shadow-[var(--shadow)]">

        {/* Logo */}
        <Link to="/" className="nav-logo inline-block text-xl font-bold tracking-wide">
          Smart Nest Pro
        </Link>

        {/* Links */}
        <ul className="flex gap-8 font-semibold">
          {["Home", "Survey", "About Us", "Diseases"].map((text, i) => (
            <li key={i} className="nav-item">
              <Link to={`/${text.toLowerCase().replace(' ', '-')}`} className="nav-link inline-block hover:text-[var(--text-dark)] transition duration-200">
                {text}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/login"
          className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-full 
          hover:bg-[var(--primary-hover)] hover:scale-105 
          hover:shadow-[var(--shadow-primary)] 
          transition-all duration-200 font-semibold"
        >
          Login / Sign Up
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;