import { Routes, Route, useLocation } from "react-router-dom";
import "../index.css";

import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Footer } from "./components/Footer";
import Diseases from "./components/Diseases";
import { LiveDemo } from "./components/LiveDemo";
import TrendingSideNav from "./components/TrendingSideNav";
import Survey from "./components/pages/Survey";
import AboutUs from "./components/pages/AboutUs";
import Navbar from "./components/Navbar";
import DetailedDiseases from "./components/DetailedDiseases";
import FloatingParticles from "./components/FloatingParticles";

function Home() {
  return (
    <div className="relative bg-[var(--bg-secondary)] text-[var(--text)] fade-in">
      <Hero />
      <Diseases />
      <Features />
      <HowItWorks />
      <LiveDemo />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="relative bg-[var(--bg-secondary)] text-[var(--text)]">
      <FloatingParticles />
      <Navbar />
      {location.pathname === "/" && <TrendingSideNav />}

      <div className={`${location.pathname === "/" ? "" : "pt-32"} relative z-10`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route
            path="/detailed-diseases"
            element={<DetailedDiseases />}
          />
        </Routes>
      </div>
    </div>
  );
}

