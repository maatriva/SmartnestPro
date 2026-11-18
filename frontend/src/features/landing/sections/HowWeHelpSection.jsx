import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Briefcase,
  Users,
  Building2,
  Stethoscope,
  Moon,
  Volume2,
  Eye,
  Video,
  Bell,
  Shield,
  QrCode,
  Lock,
  Clock,
  FileText,
  Download,
  Activity,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import howWeHelpData from "../data/howWeHelp.json";
import AudiencePhoneMockup from "../components/howWeHelp/AudiencePhoneMockup";
import RealLifeMomentVignette from "../components/howWeHelp/RealLifeMomentVignette";

// Map icon strings to Lucide components
const iconMap = {
  moon: Moon,
  sound: Volume2,
  eye: Eye,
  camera: Video,
  bell: Bell,
  shield: Shield,
  users: Users,
  lock: Lock,
  clock: Clock,
  "file-text": FileText,
  download: Download,
  stethoscope: Stethoscope,
  activity: Activity,
  "file-check": FileText,
  "heart-pulse": Heart,
};

export default function HowWeHelpSection() {
  const [selectedAudienceId, setSelectedAudienceId] = useState("new-mothers");
  const shouldReduceMotion = useReducedMotion();

  const audiences = useMemo(() => howWeHelpData.audiences || [], []);

  const currentAudience = useMemo(() => {
    return (
      audiences.find((item) => item.id === selectedAudienceId) ||
      audiences[0]
    );
  }, [audiences, selectedAudienceId]);

  const audienceIcons = {
    "new-mothers": Heart,
    "working-mothers": Briefcase,
    "families-caregivers": Users,
    "hospitals-clinics": Building2,
  };

  return (
    <section
      id="how-we-help"
      className="clay-section relative text-(--text) bg-gradient-to-b from-[#FFF6EE] via-[#FFFDFB] to-[#FFF6EE] pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden z-10"
      aria-label="How We Help Real Families and Healthcare Teams"
    >
      {/* Background Soft Celestial Warmth Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#F0C675] opacity-10 blur-[130px] rounded-full" />
        <div className="absolute bottom-1/3 -left-20 w-96 h-96 bg-[#D9825F] opacity-10 blur-[130px] rounded-full" />
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
            <Sparkles size={14} className="text-(--primary)" />
            <span>Care in Real Life</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            Support for every part of the <span className="text-(--primary)">journey.</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-3 text-base sm:text-lg md:text-xl text-(--text) font-medium max-w-2xl mx-auto leading-relaxed text-center [text-wrap:balance]"
          >
            {howWeHelpData.subtitle}
          </motion.p>
        </div>

        {/* Audience Selector: Sticky on desktop, Horizontally scrollable row on mobile */}
        <div className="flex justify-start sm:justify-center mb-10 sm:mb-14 overflow-x-auto pb-3 pt-1 px-2 no-scrollbar">
          <div
            className="inline-flex p-1.5 sm:p-2 rounded-full clay-card-static border-2 border-white shadow-md relative shrink-0 gap-1 sm:gap-2"
            role="tablist"
            aria-label="Select audience group"
          >
            {audiences.map((aud) => {
              const isSelected = aud.id === selectedAudienceId;
              const AudIcon = audienceIcons[aud.id] || Heart;

              return (
                <button
                  key={aud.id}
                  type="button"
                  role="tab"
                  id={`tab-${aud.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${aud.id}`}
                  onClick={() => setSelectedAudienceId(aud.id)}
                  className={`relative z-10 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap select-none ${
                    isSelected
                      ? "text-white"
                      : "text-(--text-dark) hover:text-(--primary)"
                  }`}
                >
                  <AudIcon size={16} />
                  <span>{aud.tabLabel}</span>

                  {isSelected && (
                    <motion.div
                      layoutId="active-audience-pill"
                      className="absolute inset-0 bg-gradient-to-r from-(--primary) to-[#E28D6A] rounded-full -z-10 shadow-md shadow-(--primary)/25"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Panel with Shared-Axis Smooth Slide & Fade Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAudience.id}
            id={`panel-${currentAudience.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentAudience.id}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="clay-card p-6 sm:p-10 lg:p-12 rounded-[36px] border-2 border-white shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Side: Headline, Empathetic Paragraph, Benefit List, & Help Box */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7">
                
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-(--primary) bg-(--bg-secondary) px-3.5 py-1 rounded-full border border-(--primary)/15">
                    {currentAudience.tabLabel} Care Continuum
                  </span>
                  
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-(--text-dark) mt-3 leading-tight font-display tracking-tight [text-wrap:balance]">
                    {currentAudience.headline}
                  </h3>

                  <p className="mt-3 text-base sm:text-lg text-(--text) font-medium leading-relaxed [text-wrap:pretty]">
                    {currentAudience.description}
                  </p>
                </div>

                {/* 3-Item Benefit List with Animated Clay Icons */}
                <div className="space-y-4 pt-1">
                  {currentAudience.benefits.map((benefit, bIdx) => {
                    const BIcon = iconMap[benefit.icon] || Sparkles;

                    return (
                      <motion.div
                        key={bIdx}
                        initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * bIdx + 0.1, duration: 0.4 }}
                        className="p-4 rounded-2xl bg-white/75 border border-white shadow-2xs flex items-start gap-4 hover:shadow-xs transition-shadow"
                      >
                        <div className="w-10 h-10 rounded-xl clay-badge text-(--primary) flex items-center justify-center shrink-0 shadow-xs border border-white">
                          <BIcon size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm sm:text-base font-bold text-(--text-dark)">
                            {benefit.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-(--text-light) font-medium mt-0.5 leading-relaxed">
                            {benefit.text}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* SPECIAL BOX: Postpartum Wellbeing Box (for New Mothers) */}
                {currentAudience.postpartumHelpBox && (
                  <div className="p-5 rounded-2xl bg-[#FFF3EC] border-2 border-(--primary)/35 shadow-xs space-y-2.5">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-(--primary) uppercase tracking-wider">
                      <AlertTriangle size={17} className="text-(--primary)" />
                      <span>{currentAudience.postpartumHelpBox.title}</span>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-(--text-dark) leading-relaxed">
                      {currentAudience.postpartumHelpBox.message}
                    </p>

                    <p className="text-xs sm:text-sm font-bold text-(--primary-dark)">
                      ⚠️ {currentAudience.postpartumHelpBox.emergencyNote}
                    </p>

                    <div className="pt-2 flex items-center justify-between gap-3 text-xs">
                      <span className="text-xs text-(--text-light) font-semibold">
                        Confidential maternal wellness guidance
                      </span>
                      <a
                        href={`#${currentAudience.postpartumHelpBox.healthFocusAnchor}`}
                        className="inline-flex items-center gap-1 font-bold text-(--primary) hover:underline"
                      >
                        <span>Open Health Focus Guide</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                )}

                {/* SPECIAL BOX: Clinic & Hospital Partnership Callout */}
                {currentAudience.partnerCallout && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/85 border border-(--primary)/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <p className="text-sm font-bold text-(--text-dark)">
                        🏥 {currentAudience.partnerCallout}
                      </p>
                      <p className="text-xs text-(--text-light) font-semibold mt-0.5">
                        Pilot enquiries welcome. Explore research collaboration with our team.
                      </p>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full clay-btn clay-btn-primary text-xs font-bold shrink-0 shadow-xs"
                    >
                      <span>Contact Us</span>
                      <ArrowRight size={13} />
                    </a>
                  </div>
                )}

                {/* Consultation Notice */}
                {currentAudience.consultationNotice && (
                  <div className="p-3.5 rounded-xl bg-white/70 border border-white text-xs text-(--text-light) font-semibold">
                    🩺 <strong>Clinical Context:</strong> {currentAudience.consultationNotice}
                  </div>
                )}

              </div>

              {/* Right Side: Tactile Clay Phone Mockup */}
              <div className="lg:col-span-5 flex justify-center items-center py-4">
                <AudiencePhoneMockup screenType={currentAudience.screenType} />
              </div>

            </div>

            {/* Real Life Moment Mini-Scene Strip */}
            <RealLifeMomentVignette moment={currentAudience.realLifeMoment} />

          </motion.div>
        </AnimatePresence>

        {/* Section Call to Action Strip */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-[32px] clay-card-secondary border-2 border-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-(--text-dark) font-display">
              Ready to bring gentle vigilance to your nursery?
            </h4>
            <p className="text-sm sm:text-base text-(--text) font-medium mt-1">
              Whether you are an expectant family or a healthcare pilot team, we are here for you.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 shrink-0">
            <a
              href="#contact"
              className="px-6 sm:px-7 py-3 rounded-full clay-btn clay-btn-secondary text-sm font-bold text-(--text-dark) hover:text-(--primary) shadow-sm cursor-pointer"
            >
              Talk to our team
            </a>
            <a
              href="/survey"
              className="px-6 sm:px-7 py-3 rounded-full clay-btn clay-btn-primary text-sm font-bold text-white shadow-md cursor-pointer"
            >
              Get Maatriva
            </a>
          </div>
        </div>

        {/* Section Footer Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-(--text-light) font-semibold max-w-2xl mx-auto leading-relaxed">
            <strong>Notice:</strong> {howWeHelpData.disclaimer}
          </p>
        </div>

      </div>
    </section>
  );
}
