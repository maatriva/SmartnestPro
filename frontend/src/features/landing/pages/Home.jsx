import { Helmet } from "react-helmet-async";
import { Suspense, lazy } from "react";

import Hero from "../sections/Hero";

const Diseases = lazy(() => import("../../diseases/components/diseases/Diseases"));
const Features = lazy(() => import("../sections/Feature"));
const HowItWorks = lazy(() => import("../sections/howItWorks"));
const ParentStories = lazy(() => import("../../parentStories/ParentStories"));
const SupportingParents = lazy(() => import("../sections/SupportingParents"));
const Pricing = lazy(() => import("../sections/Pricing"));

export default function Home() {
  return (
    <div className="relative bg-(--bg) text-(--text) fade-in">
      <Helmet>
        <title>Maatriva | The AI Baby Cradle</title>
        <meta
          name="description"
          content="Discover the world's first AI-powered smart baby cradle with real-time health monitoring and automated soothing."
        />
        <link rel="canonical" href="https://maatriva.vercel.app/" />
        <meta
          property="og:title"
          content="Maatriva | The AI Baby Cradle"
        />
        <meta
          property="og:description"
          content="Discover the world's first AI-powered smart baby cradle with real-time health monitoring and automated soothing."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.vercel.app/" />
        <meta property="og:image" content="https://maatriva.vercel.app/AIPro.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Maatriva | The AI Baby Cradle" />
        <meta name="twitter:description" content="Discover the world's first AI-powered smart baby cradle with real-time health monitoring and automated soothing." />
        <meta name="twitter:image" content="https://maatriva.vercel.app/AIPro.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Maatriva Smart Baby Cradle",
            "image": "https://maatriva.vercel.app/AIPro.jpeg",
            "description": "Discover the world's first AI-powered smart baby cradle with real-time health monitoring and automated soothing.",
            "brand": {
              "@type": "Brand",
              "name": "Maatriva"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "30000",
              "highPrice": "60000",
              "offerCount": "2"
            }
          })}
        </script>
      </Helmet>

      <Hero />

      <Suspense fallback={<div className="h-96" />}>
        <Diseases />
        <Features />
        <HowItWorks />
        <ParentStories />
        <SupportingParents />
        <Pricing />
      </Suspense>
    </div>
  );
}