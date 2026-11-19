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
    "doctors-hospitals": Building2,
  };

  return (
    <section
      id="how-we-help"
      className="clay-section relative text-(--text-primary) bg-(--bg-alt) pt-14 pb-20 sm:pt-20 sm:pb-24 overflow-hidden z-10"
      aria-label="Who Maatriva Helps"
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
            {howWeHelpData.title}
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 text-base sm:text-lg text-(--text-secondary) font-normal max-w-2xl mx-auto leading-relaxed text-center [text-wrap:pretty]"
          >
            {howWeHelpData.subtitle}
          </motion.p>
        </div>

        {/* Audience Selector: Tabbed row */}
        <div className="flex justify-start sm:justify-center mb-10 sm:mb-12 overflow-x-auto pb-2 pt-1 px-2 no-scrollbar">
          <div
            className="inline-flex p-1.5 rounded-full bg-(--surface) border border-(--border-card) shadow-sm relative shrink-0 gap-1 sm:gap-1.5"
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
                  className={`relative z-10 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer flex items-center gap-2 whitespace-nowrap select-none ${
                    isSelected
                      ? "text-white"
                      : "text-(--text-primary) hover:text-(--brand-accent)"
                  }`}
                >
                  <AudIcon size={15} />
                  <span>{aud.tabLabel}</span>

                  {isSelected && (
                    <motion.div
                      layoutId="active-audience-pill"
                      className="absolute inset-0 bg-(--brand-accent) rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Split Panel: Asymmetric feature split (No card inside a card) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAudience.id}
            id={`panel-${currentAudience.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentAudience.id}`}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="clay-card-light bg-(--surface) p-6 sm:p-8 lg:p-10 rounded-2xl border border-(--border-card) shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Side: Headline, Description, Divider-separated Benefits */}
              <div className="lg:col-span-7 space-y-6">
                
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-(--text-primary) leading-tight font-display tracking-tight [text-wrap:balance]">
                    {currentAudience.headline}
                  </h3>

                  <p className="mt-3 text-base text-(--text-secondary) font-normal leading-relaxed [text-wrap:pretty]">
                    {currentAudience.description}
                  </p>
                </div>

                {/* Benefits List (Clean dividers, no nested cards) */}
                <div className="space-y-1 divide-y divide-(--border-card) pt-1">
                  {currentAudience.benefits.map((benefit, bIdx) => {
                    const BIcon = iconMap[benefit.icon] || Sparkles;

                    return (
                      <div
                        key={bIdx}
                        className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5"
                      >
                        <div className="w-9 h-9 rounded-xl bg-(--bg-canvas) text-(--brand-accent) flex items-center justify-center shrink-0 border border-(--border-card)">
                          <BIcon size={17} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm sm:text-base font-semibold text-(--text-primary)">
                            {benefit.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-(--text-secondary) font-normal mt-0.5 leading-relaxed">
                            {benefit.text}
                          </p>
                        </div>
                      </div>
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
        <div className="mt-10 sm:mt-12 p-6 sm:p-7 rounded-2xl clay-card-light bg-(--surface) border border-(--border-card) shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h4 className="text-xl font-bold text-(--text-primary) font-display">
              Ready to learn more about Maatriva?
            </h4>
            <p className="text-sm text-(--text-secondary) font-normal mt-1">
              Whether you are an expectant family or a healthcare team, we are here to assist.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full clay-btn clay-btn-secondary text-xs sm:text-sm font-semibold text-(--text-primary) cursor-pointer"
            >
              Talk to our team
            </a>
            <a
              href="/survey"
              className="px-5 py-2.5 rounded-full clay-btn clay-btn-primary text-xs sm:text-sm font-semibold text-white shadow-sm cursor-pointer"
            >
              Take Parent Survey
            </a>
          </div>
        </div>

        {/* Section Footer Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-(--text-secondary) font-normal max-w-2xl mx-auto leading-relaxed">
            <strong>Notice:</strong> {howWeHelpData.disclaimer}
          </p>
        </div>

      </div>
    </section>
  );
}
