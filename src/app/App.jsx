import { Routes, Route } from "react-router-dom";
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

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Diseases />
      <Features />
      {/* <TechAcceptBuyForm /> */}
      <HowItWorks />
      <LiveDemo />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative">
      <TrendingSideNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

