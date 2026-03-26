import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 
    bg-[var(--bg-secondary)] text-[var(--text)]">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-8 rounded-[var(--radius-lg)] 
      bg-[var(--bg-glass)] backdrop-blur-xl border border-white/40 shadow-[var(--shadow)]">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Smart Nest Pro
        </Link>

        {/* Links */}
        <ul className="flex gap-8 font-semibold">
          <li>
            <Link to="/" className="hover:text-[var(--text-dark)] transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/survey" className="hover:text-[var(--text-dark)] transition duration-200">
              Survey
            </Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-[var(--text-dark)] transition duration-200">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/detailed-diseases" className="hover:text-[var(--text-dark)] transition duration-200">
              Diseases
            </Link>
          </li>
        </ul>

        {/* CTA */}
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