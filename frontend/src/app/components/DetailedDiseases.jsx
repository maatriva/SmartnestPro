import React, { useState, useMemo, useLayoutEffect, useRef, useEffect } from "react";
import API from "../utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { X, Heart, Wind, Activity, Brain, ArrowLeft, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import DiseaseSideNav from "./DiseaseSideNav";
import "../../index.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getCategoryIcon = (categoryName) => {
  if (!categoryName) return <Activity className="w-5 h-5" />;
  const name = categoryName.toLowerCase();
  if (name.includes('cardiac') || name.includes('parental')) return <Heart className="w-5 h-5" />;
  if (name.includes('respiratory') || name.includes('sleep')) return <Wind className="w-5 h-5" />;
  if (name.includes('neuro')) return <Brain className="w-5 h-5" />;
  if (name.includes('infection') || name.includes('sepsis')) return <ShieldCheck className="w-5 h-5" />;
  return <Activity className="w-5 h-5" />;
};

const DiseaseCard = ({ name, icon, onSelect }) => {
  return (
    <motion.div
      onClick={onSelect}
      className="clay-card p-6 cursor-pointer group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 clay-badge text-[var(--primary)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="font-bold text-[var(--text-dark)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-xs text-[var(--text-light)] mt-2 font-bold tracking-wide uppercase">
            CLICK FOR DETAILS
          </p>
        </div>
      </div>
    </motion.div>
  );
};



export default function DetailedDiseases() {
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);
  const [diseaseData, setDiseaseData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await API.get(`/diseases`);
        const dataWithIcons = response.data.map(section => ({
          ...section,
          icon: getCategoryIcon(section.category)
        }));
        setDiseaseData(dataWithIcons);
      } catch (err) {
        console.error("Error fetching diseases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, []);

  // ✅ FIXED: moved above useLayoutEffect
  const filteredData = useMemo(() => {
    if (!searchQuery) return diseaseData;

    return diseaseData
      .map((section) => ({
        ...section,
        diseases: section.diseases.filter(
          (d) =>
            (d.name && d.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (d.description && d.description.toLowerCase().includes(searchQuery.toLowerCase()))
        ),
      }))
      .filter((section) => section.diseases.length > 0);
  }, [searchQuery, diseaseData]);

  const categories = useMemo(() => filteredData.map((d) => d.category), [filteredData]);

  // 1. Initial Page Load Animations (Only runs once)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".registry-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 2. Continuous Scroll Trigger Monitoring (Updates when data changes)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = containerRef.current.querySelectorAll(".clinical-section");

      sections.forEach((section) => {
        const header = section.querySelector(".section-header");
        const cards = section.querySelectorAll(".disease-card-wrapper");

        if (header) {
          gsap.from(header, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            y: 40,
            opacity: 0,
            scale: 0.98,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      });
      
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [filteredData]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative text-[var(--text-dark)] selection:bg-[var(--primary)] selection:text-white"
    >
      <Helmet>
        <title>Monitoring Registry - MAATRIVA</title>
        <meta name="description" content="Clinical Protocol v2.4. View the MAATRIVA Monitoring Registry for baby health, including cardiac, respiratory, and neurological patterns." />
        <meta property="og:title" content="Monitoring Registry - MAATRIVA" />
      </Helmet>
      <div className="fixed inset-0 bg-[var(--bg-glass)] backdrop-blur-md -z-10" />

      <DiseaseSideNav categories={categories} />

      {/* HEADER */}
      <div className="pb-12 relative overflow-hidden">
        <nav className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 clay-btn clay-btn-secondary px-5 py-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 clay-badge text-[10px] sm:text-xs font-black">
            <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
            Clinical Protocol v2.4
          </div>
        </nav>

        <header className="registry-header max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 uppercase text-[var(--text-dark)]">
            Monitoring Registry
          </h1>

          <input
            type="text"
            placeholder="SEARCH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mt-6 px-6 py-4 clay-input text-lg font-semibold outline-none"
          />
        </header>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-24">
        {loading ? (
          <div className="text-center py-40">
            <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-2xl font-black text-[var(--text-light)]">Loading Clinical Registry...</h3>
          </div>
        ) : filteredData.length > 0 ? (
          filteredData.map((section, sIdx) => (
            <section 
              key={sIdx} 
              id={section.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}
              className="clinical-section mb-20 last:mb-0 scroll-mt-32 will-change-transform"
            >
              <div className="section-header flex items-center gap-4 mb-8">
                <div className="p-3 bg-[var(--primary)] text-[var(--white)] rounded-xl shadow-[var(--shadow)]">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black uppercase">
                  {section.category}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.diseases.map((disease, i) => (
                  <div key={i} className="disease-card-wrapper">
                    <DiseaseCard
                      name={disease.name}
                      icon={section.icon}
                      onSelect={() => setSelected(disease)}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-40">
            <h3 className="text-3xl font-black">No Results Found</h3>
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="clay-card p-10 max-w-xl w-full relative z-10 text-[var(--text)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors p-2 hover:bg-[var(--bg-hover)] rounded-full cursor-pointer animate-none"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-3xl font-black mb-6 text-[var(--text-dark)]">{selected.name}</h2>
              <p className="mb-4 font-semibold text-lg">{selected.description}</p>
              <p className="italic text-[var(--text-light)] font-medium">{selected.aiRole}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}