import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundContent() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold text-(--text-dark) mb-4">
        Oops! Page Not Found
      </h1>
      
      <p className="text-lg md:text-xl text-(--text-light) mb-8 max-w-lg mx-auto">
        It looks like you've wandered into the unknown. The page you are looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        className="px-8 py-4 clay-btn clay-btn-primary flex items-center justify-center cursor-pointer text-lg font-bold"
      >
        Return Home
      </button>
    </>
  );
}
