import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, BookOpen } from "lucide-react";
import TermsHeader from "../components/TermsHeader";
import TermsSectionCard from "../components/TermsSectionCard";
import { termsSections } from "../constants/termsData";

export default function Terms() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("1");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sec of termsSections) {
        const el = document.getElementById(`section-${sec.num}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec.num);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, num) => {
    e.preventDefault();
    const el = document.getElementById(`section-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-dvh bg-(--bg-canvas) text-(--text-primary) fade-in pb-20 pt-28 sm:pt-32">
      <Helmet>
        <title>Terms & Conditions | Maatriva</title>
        <meta
          name="description"
          content="Read the official Terms and Conditions for purchasing, using, and accessing Maatriva's AI-powered smart cradle products and health monitoring apps."
        />
        <meta name="keywords" content="terms and conditions, user agreement, purchase terms, smart cradle policy, Maatriva terms" />
        <link rel="canonical" href="https://maatriva.co.in/terms" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 clay-btn clay-btn-secondary mb-8 font-semibold text-xs sm:text-sm cursor-pointer shadow-xs"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>

        {/* Page Header */}
        <TermsHeader />

        {/* 2-Column Layout: Sticky TOC Sidebar on Left + Content on Right (65-75ch width) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          
          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-28">
            <div className="clay-card-light bg-(--surface) p-6 rounded-2xl border border-(--border-card) shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-(--brand-accent) mb-4">
                <BookOpen size={16} />
                <span>Table of Contents</span>
              </div>
              <nav className="space-y-1">
                {termsSections.map((sec) => {
                  const isActive = activeSection === sec.num;
                  return (
                    <a
                      key={sec.num}
                      href={`#section-${sec.num}`}
                      onClick={(e) => scrollToSection(e, sec.num)}
                      className={`block px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-(--brand-accent) text-white font-semibold shadow-xs"
                          : "text-(--text-secondary) hover:text-(--brand-accent) hover:bg-(--bg-canvas)"
                      }`}
                    >
                      <span className="opacity-75 mr-2">{sec.num}.</span>
                      {sec.title}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content (65-75ch reading width) */}
          <main className="lg:col-span-8 max-w-[70ch] space-y-6">
            {termsSections.map((sec) => (
              <TermsSectionCard key={sec.num} sec={sec} />
            ))}
          </main>

        </div>

        {/* Footer note */}
        <div className="text-center mt-12 text-xs sm:text-sm text-(--text-secondary) font-medium">
          Copyright © 2026 Maatriva MedTech. All rights reserved.
        </div>
      </div>
    </div>
  );
}
