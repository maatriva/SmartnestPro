import { Helmet } from "react-helmet-async";
import { Suspense, lazy } from "react";

import Hero from "../sections/Hero";

const OurStorySection = lazy(() => import("../sections/OurStorySection"));
const Features = lazy(() => import("../sections/Feature"));
const Diseases = lazy(() => import("../../diseases/components/diseases/Diseases"));
const AppDownloadSection = lazy(() => import("../sections/AppDownloadSection"));
const HowItWorks = lazy(() => import("../sections/howItWorks"));
const ImpactNumbers = lazy(() => import("../sections/ImpactNumbers"));
const ParentStories = lazy(() => import("../../parentStories/ParentStories"));
const SupportingParents = lazy(() => import("../sections/SupportingParents"));
const Pricing = lazy(() => import("../sections/Pricing"));
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

      {/* 1. Hero with Dawn Gradient, Bobbing Clay Moon & Floating Clouds */}
      <Hero />

      <Suspense fallback={<div className="h-48" />}>
        {/* 2. About / Our Story with Clay Illustration & Scroll Reveal */}
        <OurStorySection />

        {/* 3. What We Offer: 3D Tilt Puffy Clay Cards */}
        <Features />

        {/* 4. Pediatric Monitoring Registry */}
        <Diseases />

        {/* 5. Mobile Companion App */}
        <AppDownloadSection />

        {/* 6. How It Works: Constellation Journey Timeline */}
        <HowItWorks />

        {/* 7. Impact Numbers: Animated Count-up Counters in Clay Badges */}
        <ImpactNumbers />

        {/* 8. Supporting Parents: Holistic AI Companion Ecosystem */}
        <SupportingParents />

        {/* 9. Parent Stories: Soft Clay Carousel */}
        <ParentStories />

        {/* 10. Pricing Plans & Cradle Models */}
        <Pricing />

        {/* 11. FAQ: Clay Accordion */}
        <FAQSection />

        {/* 12. Contact / CTA: Night-sky Section in Plum Dusk with Soft Form */}
        <ContactNightSkySection />
      </Suspense>
    </div>
  );
}
