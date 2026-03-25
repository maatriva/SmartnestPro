import { Routes, Route, useLocation } from "react-router-dom";
import "../index.css"
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
import About from "./components/pages/About";
import Navbar from "./components/Navbar";
import Contact from "./components/pages/Contact";
import DetailedDiseases from "./components/DetailedDiseases";

function Home() {
  return (
    <div className="relative bg-[var(--bg-secondary)] text-[var(--text)]">
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
  <Navbar />

  {location.pathname === "/" && <TrendingSideNav />}

  <div className="pt-28">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/survey" element={<Survey />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/detailed-diseases" element={<DetailedDiseases />} />
  </Routes>
</div>
</div>
  );
}