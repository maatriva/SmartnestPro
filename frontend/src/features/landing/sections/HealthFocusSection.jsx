import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Heart, Baby, ShieldCheck, ExternalLink, CheckCircle2 } from "lucide-react";
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

  const activeCards = activeTab === "baby" ? babyCards : motherCards;

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
      className="clay-section relative text-(--text) bg-gradient-to-b from-[#FFF6EE] via-[#FFFDFB] to-[#FFF6EE] pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden z-10"
      aria-label="Health Focus and Clinical Awareness"
    >
      {/* Background Soft Celestial Blobs (Honey Gold & Rose Clay) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F0C675] opacity-10 blur-[130px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#D9825F] opacity-10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header */}
        <div className="clay-section-header">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge text-xs sm:text-sm font-bold mb-3 border border-(--primary)/20"
          >
            <ShieldCheck size={16} className="text-(--primary)" />
            <span>Health Vigil & Care Continuum</span>
            <Sparkles size={14} className="text-(--accent)" />
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            What we <span className="text-(--primary)">watch over</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-3 text-base sm:text-lg md:text-xl text-(--text) font-medium max-w-2xl mx-auto leading-relaxed text-center [text-wrap:balance]"
          >
            Caring for baby and mother, from the first breath to full recovery.
          </motion.p>
        </div>

        {/* Two-Tab Switcher in Celestial Clay Style */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div
            className="inline-flex p-1.5 sm:p-2 rounded-full clay-card-static border-2 border-white shadow-md relative"
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
              className={`relative z-10 px-6 sm:px-9 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-colors duration-200 cursor-pointer flex items-center gap-2 select-none ${
                activeTab === "baby"
                  ? "text-white"
                  : "text-(--text-dark) hover:text-(--primary)"
              }`}
            >
              <Baby size={18} />
              <span>Baby</span>
              {activeTab === "baby" && (
                <motion.div
                  layoutId="active-health-tab"
                  className="absolute inset-0 bg-gradient-to-r from-(--primary) to-[#E28D6A] rounded-full -z-10 shadow-md shadow-(--primary)/25"
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
              className={`relative z-10 px-6 sm:px-9 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-colors duration-200 cursor-pointer flex items-center gap-2 select-none ${
                activeTab === "mother"
                  ? "text-white"
                  : "text-(--text-dark) hover:text-(--primary)"
              }`}
            >
              <Heart size={18} />
              <span>Mother (Postpartum)</span>
              {activeTab === "mother" && (
                <motion.div
                  layoutId="active-health-tab"
                  className="absolute inset-0 bg-gradient-to-r from-(--primary) to-[#E28D6A] rounded-full -z-10 shadow-md shadow-(--primary)/25"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mother Reassurance Note (Shown when Mother tab is active) */}
        {activeTab === "mother" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-white/70 border border-(--primary)/20 max-w-xl mx-auto text-center shadow-2xs"
          >
            <p className="text-sm sm:text-base text-(--text-dark) font-bold">
              🌸 {healthData.motherReassurance}
            </p>
          </motion.div>
        )}

        {/* Symmetrical Grid of Cards: 3 Columns Desktop, 2 Tablet, 1 Mobile */}
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
            />
          ))}
        </div>

        {/* Trust Elements Below the Grid: Educational Sources */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-(--border)/40">
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
                href="https://www.marchofdimes.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-(--primary) transition-colors inline-flex items-center gap-1 font-bold"
              >
                <span>March of Dimes</span>
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
