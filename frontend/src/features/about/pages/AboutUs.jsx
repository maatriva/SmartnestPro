import React from "react";
import useAboutUs from "../hooks/useAboutUs";
import AboutHero from "../components/AboutHero";
import AboutGenesis from "../components/AboutGenesis";
import ScienceSafety from "../components/ScienceSafety";
import TeamSection from "../components/TeamSection";

export default function AboutUs() {
  const { expandedCards, toggleCard } = useAboutUs();

  return (
    <div className="min-h-screen bg-(--bg) text-(--text) fade-in pb-20">
      <main className="space-y-20">
        <AboutHero />
        <AboutGenesis />
        <ScienceSafety />
        <TeamSection expandedCards={expandedCards} toggleCard={toggleCard} />
      </main>
    </div>
  );
}
