import { Helmet } from "react-helmet-async";
import { Suspense, lazy } from "react";

import Hero from "../sections/Hero";
import TrustStrip from "../components/hero/TrustStrip";
import StickyMobileCTA from "../components/hero/StickyMobileCTA";

const ProblemSection = lazy(() => import("../sections/ProblemSection"));
const HowItWorks = lazy(() => import("../sections/howItWorks"));
const HealthFocusSection = lazy(() => import("../sections/HealthFocusSection"));
const AppDownloadSection = lazy(() => import("../sections/AppDownloadSection"));
const HowWeHelpSection = lazy(() => import("../sections/HowWeHelpSection"));
const SafetyPrivacySection = lazy(() => import("../sections/SafetyPrivacySection"));
const AchievementsSection = lazy(() => import("../sections/AchievementsSection"));
const FAQSection = lazy(() => import("../sections/FAQSection"));
const ContactNightSkySection = lazy(() => import("../sections/ContactNightSkySection"));

export default function Home() {
  return (
    <div className="relative bg-(--bg) text-(--text) fade-in overflow-hidden">
      <Helmet>
        <title>Maatriva | Celestial Clay Smart Baby Care Powered by AI</title>
        <meta
          name="description"
          content="Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and contactless infant health monitoring in our Celestial Clay sanctuary."
        />
        <meta name="keywords" content="smart cradle, infant monitoring, AI baby care, healthcare technology, newborn monitoring, baby safety, parent assistance, celestial clay baby care" />
        <link rel="canonical" href="https://maatriva.co.in/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Maatriva | Smart Baby Care Powered by AI" />
        <meta
          property="og:description"
          content="Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.co.in/" />
        <meta property="og:image" content="https://maatriva.co.in/AIPro.jpeg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maatriva | Smart Baby Care Powered by AI" />
        <meta name="twitter:description" content="Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring." />
        <meta name="twitter:image" content="https://maatriva.co.in/AIPro.jpeg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "@id": "https://maatriva.co.in/#organization",
              "name": "Maatriva",
              "url": "https://maatriva.co.in",
              "logo": "https://maatriva.co.in/android-chrome-512x512.png",
              "image": "https://maatriva.co.in/AIPro.jpeg",
              "description": "Maatriva is an innovative MedTech startup in India building the world's first AI-powered smart baby cradle for infant health and safety.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://maatriva.co.in/#website",
              "name": "Maatriva",
              "url": "https://maatriva.co.in",
              "description": "Smart Baby Care Powered by AI",
              "publisher": {
                "@id": "https://maatriva.co.in/#organization"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Maatriva Smart Baby Cradle",
              "image": "https://maatriva.co.in/AIPro.jpeg",
              "description": "AI-powered smart baby cradle with real-time health monitoring and automated soothing.",
              "brand": {
                "@type": "Brand",
                "name": "Maatriva"
              },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "INR",
                "lowPrice": "12000",
                "highPrice": "75000",
                "offerCount": "3"
              }
            }
          ])}
        </script>
      </Helmet>

      {/* 1. Hero with 3D Cradle, Celestial Moon & Minimal Distraction */}
      <Hero />

      {/* 2. Slim Trust Strip with verified institutional partners */}
      <TrustStrip />

      <Suspense fallback={<div className="h-48" />}>
        {/* 3. The Problem: Short, empathetic challenges parents face */}
        <ProblemSection />

        {/* 4. How It Works: 3 Steps (Pair, Continuous AI Vigil, Real-Time Alerts) */}
        <HowItWorks />

        {/* 5. Health Focus: What we watch over (Baby & Postpartum Mother with Know More Modals) */}
        <HealthFocusSection />

        {/* 6. App Showcase: Real App Screens & Mobile Companion Features */}
        <AppDownloadSection />

        {/* 7. How We Help: Support for real journeys across 4 user profiles */}
        <HowWeHelpSection />

        {/* 8. Safety & Privacy: Encrypted streams, parent access, expiring passes, data ownership */}
        <SafetyPrivacySection />

        {/* 9. Achievements: Full authentic institutional partner grid */}
        <AchievementsSection />

        {/* 10. FAQ: High-clarity Clay Accordion */}
        <FAQSection />

        {/* 11. Final CTA: Night-sky Warm Clay Section with Inquiry Form */}
        <ContactNightSkySection />
      </Suspense>

      {/* Sticky Mobile "Get Maatriva" CTA button (auto-hides when #contact is visible) */}
      <StickyMobileCTA />
    </div>
  );
}
