import { Helmet } from "react-helmet-async";
import { Suspense, lazy } from "react";

import Hero from "../sections/Hero";

const Diseases = lazy(() => import("../../diseases/components/diseases/Diseases"));
const Features = lazy(() => import("../sections/Feature"));
const AppDownloadSection = lazy(() => import("../sections/AppDownloadSection"));
const HowItWorks = lazy(() => import("../sections/howItWorks"));
const ParentStories = lazy(() => import("../../parentStories/ParentStories"));
const SupportingParents = lazy(() => import("../sections/SupportingParents"));
const Pricing = lazy(() => import("../sections/Pricing"));

export default function Home() {
  return (
    <div className="relative bg-(--bg) text-(--text) fade-in">
      <Helmet>
        <title>Maatriva | Smart Baby Care Powered by AI</title>
        <meta
          name="description"
          content="Experience Maatriva, the world's first AI-powered smart baby cradle. Features automated gentle soothing, cry translation, and newborn health monitoring."
        />
        <meta name="keywords" content="smart cradle, infant monitoring, AI baby care, healthcare technology, newborn monitoring, baby safety, parent assistance" />
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

      <Hero />

      <Suspense fallback={<div className="h-96" />}>
        <Diseases />
        <Features />
        <AppDownloadSection />
        <HowItWorks />
        <ParentStories />
        <SupportingParents />
        <Pricing />
      </Suspense>
    </div>
  );
}