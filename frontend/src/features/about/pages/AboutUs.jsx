import React from "react";
import AboutHero from "../components/AboutHero";
import AboutGenesis from "../components/AboutGenesis";
import ScienceSafety from "../components/ScienceSafety";
import TeamSection from "../components/TeamSection";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-(--bg) text-(--text) fade-in">
      <main className="flex flex-col">
        <AboutHero />
        <AboutGenesis />
        <ScienceSafety />
        <TeamSection />
      </main>
    </div>
  );
}
