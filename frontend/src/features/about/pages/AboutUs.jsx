import React from "react";
import { Helmet } from "react-helmet-async";
import AboutHero from "../components/AboutHero";
import AboutGenesis from "../components/AboutGenesis";
import ScienceSafety from "../components/ScienceSafety";
import TeamSection from "../components/TeamSection";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-(--bg) text-(--text) fade-in">
      <Helmet>
        <title>About Us | Maatriva</title>
        <meta name="description" content="Learn about Maatriva's mission, genesis, science, and the founding team dedicated to building accessible healthcare innovations." />
        <link rel="canonical" href="https://maatriva.vercel.app/about-us" />
        <meta property="og:title" content="About Us | Maatriva" />
        <meta property="og:description" content="Learn about Maatriva's mission, genesis, science, and the founding team dedicated to building accessible healthcare innovations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.vercel.app/about-us" />
        <meta property="og:image" content="https://maatriva.vercel.app/supportingParents.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Maatriva" />
        <meta name="twitter:description" content="Learn about Maatriva's mission, genesis, science, and the founding team dedicated to building accessible healthcare innovations." />
        <meta name="twitter:image" content="https://maatriva.vercel.app/supportingParents.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About Us - Maatriva",
            "description": "Learn about the mission, science, and team behind Maatriva.",
            "publisher": {
              "@type": "Organization",
              "name": "Maatriva",
              "logo": "https://maatriva.vercel.app/MaatrivaFavicon.png"
            }
          })}
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
