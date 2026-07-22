import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import AboutHero from "../components/AboutHero";
import AboutGenesis from "../components/AboutGenesis";
import ScienceSafety from "../components/ScienceSafety";
import TeamSection from "../components/TeamSection";

export default function AboutUs() {
  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  return (
    <div className="min-h-screen bg-(--bg) text-(--text) fade-in">
      <Helmet>
        <title>About Maatriva | MedTech for Smart Parenting</title>
        <meta name="description" content="Learn about Maatriva's mission, pediatric science, and founding team dedicated to building India's first AI-powered smart baby care cradle." />
        <meta name="keywords" content="about Maatriva, MedTech parenting, smart cradle team, pediatric science cradle, newborn health startup" />
        <link rel="canonical" href="https://maatriva.co.in/about-us" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="About Maatriva | MedTech for Smart Parenting" />
        <meta property="og:description" content="Learn about Maatriva's mission, pediatric science, and founding team dedicated to building India's first AI-powered smart baby care cradle." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.co.in/about-us" />
        <meta property="og:image" content="https://maatriva.co.in/supportingParents.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Maatriva | MedTech for Smart Parenting" />
        <meta name="twitter:description" content="Learn about Maatriva's mission, pediatric science, and founding team dedicated to building India's first AI-powered smart baby care cradle." />
        <meta name="twitter:image" content="https://maatriva.co.in/supportingParents.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "@id": "https://maatriva.co.in/about-us/#webpage",
              "url": "https://maatriva.co.in/about-us",
              "name": "About Maatriva | MedTech for Smart Parenting",
              "description": "Learn about the mission, science, and team behind Maatriva.",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Maatriva",
                "url": "https://maatriva.co.in"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "@id": "https://maatriva.co.in/#organization",
              "name": "Maatriva",
              "url": "https://maatriva.co.in",
              "logo": "https://maatriva.co.in/android-chrome-512x512.png",
              "description": "MedTech healthcare organization building advanced infant care devices."
            }
          ])}
        </script>
      </Helmet>

      <main className="flex flex-col">
        <AboutHero />
        <AboutGenesis />
        <ScienceSafety />
        <TeamSection />
      </main>
    </div>
  );
}
