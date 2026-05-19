import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-[var(--bg-secondary)] text-[var(--text)] overflow-hidden">
      <Helmet>
        <title>404 - Page Not Found | Maatriva</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Background glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center max-w-2xl text-center px-4">
        {/* Lottie Animation */}
        <div className="w-64 h-64 md:w-96 md:h-96 mb-6">
          <DotLottieReact
            src="https://lottie.host/0bd80261-460f-431e-924b-325d7426c483/M16nI2Dtzj.json" 
            loop
            autoplay
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-lg mx-auto">
          It looks like you've wandered into the unknown. The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate('/')}
          className="px-8 py-3 rounded-full bg-[var(--primary)] text-white font-semibold text-lg hover:bg-[var(--primary)]/90 transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.6)] transform hover:-translate-y-1"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
