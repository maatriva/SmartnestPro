import { Helmet } from "react-helmet-async";
import { Suspense } from "react";

import Hero from "../sections/Hero";
import Diseases from "../../diseases/components/diseases/Diseases";
import Features from "../sections/Feature";
import HowItWorks from "../sections/howItWorks";
import Pricing from "../sections/Pricing";

export default function Home() {
  return (
    <div className="relative bg-(--bg) text-(--text) fade-in">
      <Helmet>
        <title>Maatriva | The AI Baby Cradle</title>

        <meta
          name="description"
          content="Discover the world's first AI-powered smart baby cradle."
        />

        <meta
          property="og:title"
          content="Maatriva"
        />

        <meta
          property="og:description"
          content="Discover the world's first AI-powered smart baby cradle."
        />
      </Helmet>

      <Hero />

      <Suspense fallback={<div className="h-96" />}>
        <Diseases />
        <Features />
        <HowItWorks />
        <Pricing />
      </Suspense>
    </div>
  );
}