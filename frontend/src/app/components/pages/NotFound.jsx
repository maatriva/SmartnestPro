import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-[var(--bg)] text-[var(--text)] overflow-hidden">
      <Helmet>
        <title>404 - Page Not Found | Maatriva</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Background soft glow matching site theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary-light)] opacity-20 blur-[100px] rounded-full pointer-events-none" />

      <div className="z-10 flex flex-col items-center max-w-2xl text-center px-4">
        {/* Floating Lottie Animation */}
        <div className="float-container w-64 h-64 md:w-96 md:h-96 mb-6">
          {/* 
            Tip: If you downloaded the exact JSON file from the screenshot, 
            place it in the `public/` folder and change this src to: src="/your-downloaded-file.json"
          */}
          <DotLottieReact
            src="https://assets10.lottiefiles.com/packages/lf20_kcsr6fcp.json"
            loop
            autoplay
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-4">
          Oops! Page Not Found
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--text-light)] mb-8 max-w-lg mx-auto">
          It looks like you've wandered into the unknown. The page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => navigate('/')}
          className="px-8 py-4 clay-btn clay-btn-primary flex items-center justify-center cursor-pointer text-lg font-bold"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;