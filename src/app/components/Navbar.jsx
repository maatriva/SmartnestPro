import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-6 ">
        <div className="max-w-7xl mx-auto flex items-center justify-between border w-400 h-20 p-10 rounded-2xl bg-switch-background/80 backdrop-blur-sm border-gray-200 shadow-lg">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Smart Nest Pro
            </Link>
          </div>

          {/* Quick navigation happens via the left dot nav (TrendingSideNav). */}
          {/* This top bar keeps only the brand and main CTA. */}

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all font-semibold"
            >
              Login / Sign Up   
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
