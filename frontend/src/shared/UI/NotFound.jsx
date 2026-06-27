import React from "react";
import { Helmet } from "react-helmet-async";
import NotFoundGlow from "./components/NotFoundGlow";
import NotFoundAnimation from "./components/NotFoundAnimation";
import NotFoundContent from "./components/NotFoundContent";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] bg-(--bg) text-(--text) overflow-hidden">
      <Helmet>
        <title>404 - Page Not Found | Maatriva</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Background soft glow matching site theme */}
      <NotFoundGlow />

      <div className="z-10 flex flex-col items-center max-w-2xl text-center px-4">
        {/* Floating Lottie Animation */}
        <NotFoundAnimation />

        {/* Content & Action Button */}
        <NotFoundContent />
      </div>
    </div>
  );
}
