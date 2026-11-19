import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Baby, Building2, ExternalLink, ArrowRight } from "lucide-react";
import healthData from "../data/healthAreas.json";
import HealthCard from "../components/healthFocus/HealthCard";
import HealthModal from "../components/healthFocus/HealthModal";

export default function HealthFocusSection() {
  const [activeTab, setActiveTab] = useState("baby");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Filter only enabled items
  const babyCards = useMemo(() => {
    return (healthData.baby || []).filter((item) => item.enabled);
  }, []);

  const motherCards = useMemo(() => {
    return (healthData.mother || []).filter((item) => item.enabled);
  }, []);

  const hospitalCards = useMemo(() => {
    return (healthData.hospitals || []).filter((item) => item.enabled);
  }, []);

  const activeCards = useMemo(() => {
    if (activeTab === "baby") return babyCards;
    if (activeTab === "mother") return motherCards;
    return hospitalCards;
  }, [activeTab, babyCards, motherCards, hospitalCards]);

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseDetail = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="health-focus"
      className="clay-section relative text-(--text-primary) bg-(--bg-alt) pt-14 pb-20 sm:pt-20 sm:pb-24 overflow-hidden z-10"
      aria-label="What We Watch Over"
    >
      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header: Direct, Plain Language */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            What we watch over
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 text-base sm:text-lg text-(--text-secondary) font-normal max-w-2xl mx-auto leading-relaxed text-center [text-wrap:pretty]"
          >
            Tracking vitals for baby, recovery for mothers, and shared reports for doctors and hospitals.
          </motion.p>
        </div>

        {/* Three-Tab Switcher */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div
            className="inline-flex flex-wrap justify-center p-1.5 rounded-full bg-(--surface) border border-(--border-card) shadow-sm relative gap-1"
            role="tablist"
            aria-label="Health focus audience"
          >
            {/* Baby Tab */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "baby"}
              aria-controls="panel-baby"
              id="tab-baby"
              onClick={() => setActiveTab("baby")}
              className={`relative z-10 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer flex items-center gap-2 select-none ${
                activeTab === "baby"
                  ? "text-white"
                  : "text-(--text-primary) hover:text-(--brand-accent)"
              }`}
            >
              <Baby size={16} />
              <span>Baby</span>
              {activeTab === "baby" && (
                <motion.div
                  layoutId="active-health-tab"
                  className="absolute inset-0 bg-(--brand-accent) rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            {/* Mother Tab */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "mother"}
              aria-controls="panel-mother"
              id="tab-mother"
              onClick={() => setActiveTab("mother")}
              className={`relative z-10 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer flex items-center gap-2 select-none ${
                activeTab === "mother"
                  ? "text-white"
                  : "text-(--text-primary) hover:text-(--brand-accent)"
              }`}
            >
              <Heart size={16} />
              <span>Mother (Postpartum)</span>
              {activeTab === "mother" && (
                <motion.div
                  layoutId="active-health-tab"
                  className="absolute inset-0 bg-(--brand-accent) rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>

            {/* Hospitals Tab */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "hospitals"}
              aria-controls="panel-hospitals"
              id="tab-hospitals"
              onClick={() => setActiveTab("hospitals")}
              className={`relative z-10 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer flex items-center gap-2 select-none ${
                activeTab === "hospitals"
                  ? "text-white"
                  : "text-(--text-primary) hover:text-(--brand-accent)"
              }`}
            >
              <Building2 size={16} />
              <span>Hospitals</span>
              {activeTab === "hospitals" && (
                <motion.div
                  layoutId="active-health-tab"
                  className="absolute inset-0 bg-(--brand-accent) rounded-full -z-10 shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Hospital Partner Banner (Shown when Hospitals tab is active) */}
        {activeTab === "hospitals" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 rounded-2xl bg-(--surface) border border-(--border-card) max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-center sm:text-left"
          >
            <div>
              <p className="text-sm sm:text-base text-(--text-primary) font-semibold">
                Are you a pediatrician, clinic, or hospital?
              </p>
              <p className="text-xs sm:text-sm text-(--text-secondary) font-normal mt-0.5">
                Join our network to receive structured vitals reports directly from parents.
              </p>
            </div>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full clay-btn clay-btn-primary text-xs font-semibold text-white whitespace-nowrap shadow-xs hover:scale-102 transition-transform"
            >
              Partner with us
            </a>
          </motion.div>
        )}

        {/* Mother Reassurance Note (Shown when Mother tab is active) */}
        {activeTab === "mother" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-(--surface) border border-(--border-card) max-w-xl mx-auto text-center shadow-xs"
          >
            <p className="text-sm sm:text-base text-(--text-primary) font-semibold">
              {healthData.motherReassurance}
            </p>
          </motion.div>
        )}

        {/* Symmetrical Grid of Cards */}
        <div
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {activeCards.map((item, index) => (
            <HealthCard
              key={item.id}
              item={item}
              index={index}
              onOpenDetail={handleOpenDetail}
              cardBgClass="bg-(--surface)"
            />
          ))}
        </div>

        {/* Medical Disclaimer Banner */}
        <div className="mt-12 p-4 rounded-2xl bg-white/70 border border-white/90 text-xs sm:text-sm text-(--text) font-medium text-center max-w-3xl mx-auto">
          <strong>Notice:</strong> Maatriva is an observational wellness tool. It does not replace medical advice, diagnosis, or clinical evaluation. Always consult your pediatrician or obstetrician for health concerns.
        </div>

        {/* Trust Elements Below the Grid: Educational Sources */}
        <div className="mt-10 pt-6 border-t border-(--border)/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-(--text-light)">
            <span className="font-bold text-(--text-dark)">
              Medical Awareness Sources & Global Guidelines:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="https://www.who.int/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--primary) transition-colors inline-flex items-center gap-1 font-bold"
              >
                <span>World Health Organization (WHO)</span>
                <ExternalLink size={12} />
              </a>
              <span className="text-(--border)" aria-hidden="true">•</span>
              <a
                href="https://www.aap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--primary) transition-colors inline-flex items-center gap-1 font-bold"
              >
                <span>American Academy of Pediatrics (AAP)</span>
                <ExternalLink size={12} />
              </a>
              <span className="text-(--border)" aria-hidden="true">•</span>
              <a
                href="https://nhm.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--primary) transition-colors inline-flex items-center gap-1 font-bold"
              >
                <span>National Health Mission India (NHM)</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Accessible Detail Modal / Bottom Sheet */}
      <HealthModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseDetail}
      />
    </section>
  );
}
