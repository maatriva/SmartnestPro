import { Helmet } from "react-helmet-async";
import { Suspense, lazy } from "react";

import Hero from "../sections/Hero";
import TrustStrip from "../components/hero/TrustStrip";
import StickyMobileCTA from "../components/hero/StickyMobileCTA";
import WavyDivider from "../components/WavyDivider";

const ProblemSection = lazy(() => import("../sections/ProblemSection"));
const HowItWorks = lazy(() => import("../sections/howItWorks"));
const ProductDetailsSection = lazy(() => import("../sections/ProductDetailsSection"));
const HealthFocusSection = lazy(() => import("../sections/HealthFocusSection"));
const AppDownloadSection = lazy(() => import("../sections/AppDownloadSection"));
const HowWeHelpSection = lazy(() => import("../sections/HowWeHelpSection"));
const SafetyPrivacySection = lazy(() => import("../sections/SafetyPrivacySection"));
const AchievementsSection = lazy(() => import("../sections/AchievementsSection"));
const Pricing = lazy(() => import("../sections/Pricing"));
const FAQSection = lazy(() => import("../sections/FAQSection"));
const ContactNightSkySection = lazy(() => import("../sections/ContactNightSkySection"));

export default function Home() {
  return (
    <div className="relative bg-(--bg) text-(--text) fade-in overflow-hidden">
      <Helmet>
        <title>Maatriva | Smart Baby Cradle with Non-Contact Monitoring</title>
        <meta
          name="description"
          content="Maatriva is an AI-powered smart baby cradle featuring automated gentle soothing, cry translation, and contactless infant health monitoring."
        />
        <meta name="keywords" content="smart cradle, infant monitoring, AI baby care, healthcare technology, newborn monitoring, baby safety, parent assistance" />
        <link rel="canonical" href="https://maatriva.co.in/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Maatriva | Smart Baby Care Powered by AI" />
        <meta
          property="og:description"
          content="Maatriva is an AI-powered smart baby cradle featuring automated gentle soothing, cry translation, and newborn health monitoring."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.co.in/" />
        <meta property="og:image" content="https://maatriva.co.in/AIPro.jpeg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maatriva | Smart Baby Care Powered by AI" />
        <meta name="twitter:description" content="Maatriva is an AI-powered smart baby cradle featuring automated gentle soothing, cry translation, and newborn health monitoring." />
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
        {/* Section 1: The Problem (Cream #FFF6EE) */}
        <ProblemSection />
        <WavyDivider fromColor="#FFF6EE" toColor="#FBE4DB" />

        {/* Section 2: How It Works (Blush #FBE4DB) */}
        <HowItWorks />
        <WavyDivider fromColor="#FBE4DB" toColor="#FFF6EE" inverted />

        {/* Section 3: Product Details Bento (Cream #FFF6EE) */}
        <ProductDetailsSection />
        <WavyDivider fromColor="#FFF6EE" toColor="#FBE4DB" />

        {/* Section 4: Health Focus (Blush #FBE4DB) */}
        <HealthFocusSection />
        <WavyDivider fromColor="#FBE4DB" toColor="#FFF6EE" inverted />

        {/* Section 5: App Showcase (Cream #FFF6EE) */}
        <AppDownloadSection />
        <WavyDivider fromColor="#FFF6EE" toColor="#FBE4DB" />

        {/* Section 6: Who Maatriva Helps (Blush #FBE4DB) */}
        <HowWeHelpSection />
        <WavyDivider fromColor="#FBE4DB" toColor="#FFF6EE" inverted />

        {/* Section 7: Safety & Privacy (Cream #FFF6EE) */}
        <SafetyPrivacySection />
        <WavyDivider fromColor="#FFF6EE" toColor="#FBE4DB" />

        {/* Section 8: Recognitions & Partners (Blush #FBE4DB) */}
        <AchievementsSection />
        <WavyDivider fromColor="#FBE4DB" toColor="#FFF6EE" inverted />

        {/* Section 9: Cradle Models & Pricing (Cream #FFF6EE) */}
        <Pricing />
        <WavyDivider fromColor="#FFF6EE" toColor="#FBE4DB" />

        {/* Section 10: FAQ (Blush #FBE4DB) */}
        <FAQSection />
        <WavyDivider fromColor="#FBE4DB" toColor="#FFF6EE" inverted />

        {/* Section 11: Final CTA & Contact Form (Soft Blush #FBE4DB) */}
        <ContactNightSkySection />
      </Suspense>

      {/* Sticky Mobile "Get Maatriva" CTA button (auto-hides when #contact is visible) */}
      <StickyMobileCTA />
    </div>
  );
}
