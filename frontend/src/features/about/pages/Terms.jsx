import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import TermsHeader from "../components/TermsHeader";
import TermsSectionCard from "../components/TermsSectionCard";
import { termsSections } from "../constants/termsData";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-(--bg) text-(--text) fade-in pb-20 pt-28">
      <Helmet>
        <title>Terms & Conditions | Maatriva</title>
        <meta name="description" content="Read the Terms and Conditions for purchasing and using Maatriva smart cradle and applications." />
      </Helmet>

      {/* Floating Background Glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-(--primary)/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-(--primary-light)/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2.5 clay-badge hover:scale-105 transition-transform mb-8 font-bold text-sm cursor-pointer"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        {/* Page Header */}
        <TermsHeader />

        {/* Terms Content Container */}
        <div className="clay-card p-8 md:p-12 space-y-10">
          {termsSections.map((sec) => (
            <TermsSectionCard key={sec.num} sec={sec} />
          ))}
        </div>

        {/* Footer info */}
        <div className="text-center mt-12 text-sm text-(--text-light) font-bold">
          Copyright © 2026 Maatriva
        </div>
      </div>
    </div>
  );
}
