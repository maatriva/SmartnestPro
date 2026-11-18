import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Download, 
  Smartphone, 
  Activity, 
  Volume2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  QrCode,
  Zap,
  Moon
} from "lucide-react";
import AppDownloadModal from "../../../shared/components/AppDownloadModal";
import { APP_DOWNLOAD_LINK } from "../../../shared/constants/navigation";
import appMockupImage from "../../images/maatrivaAppMockup.webp";

export default function AppDownloadSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });
  const phoneParallaxY = useTransform(smoothProgress, [0, 1], [-20, 20]);

  const appFeatures = [
    {
      icon: <Activity className="text-(--primary)" size={22} />,
      title: "Real-Time Vital Monitoring",
      description: "Continuous contactless tracking of breathing rates, heart rate, and temperature with clinical-grade safety thresholds."
    },
    {
      icon: <Volume2 className="text-(--primary)" size={22} />,
      title: "AI Cry Translator",
      description: "Advanced acoustic AI translates cries into clear, actionable states: Hunger, Fatigue, Colic, or Diaper discomfort."
    },
    {
      icon: <Zap className="text-(--primary)" size={22} />,
      title: "Automated Soothing Control",
      description: "Trigger adaptive swaying rhythms, gentle womb acoustics, and thermal presets remotely with one tap."
    },
    {
      icon: <Moon className="text-(--primary)" size={22} />,
      title: "Sleep Cycle Analytics",
      description: "Exportable nightly sleep logs and movement trends ready to share directly with your family pediatrician."
    }
  ];

  return (
    <section
      id="app"
      ref={containerRef}
      className="clay-section relative clay-even-section text-(--text)"
      aria-label="Maatriva Mobile Companion App"
    >
      {/* Background soft celestial glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[550px] h-[550px] bg-(--rose-clay) opacity-10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header */}
        <div className="clay-section-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge border border-(--primary)/20 mb-3"
          >
            <Sparkles size={16} className="text-(--primary)" />
            <span className="text-xs sm:text-sm font-bold text-(--text-dark)">
              Maatriva Mobile Companion
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) tracking-tight leading-tight mb-3 font-display"
          >
            Your Baby's Care & Vitals, <br />
            <span className="text-(--primary)">Right in Your Pocket</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-medium text-(--text) leading-relaxed max-w-2xl mx-auto"
          >
            Stay seamlessly connected to your smart cradle from anywhere. Receive instant alerts, review health trends, and soothe baby with peace of mind.
          </motion.p>
        </div>

        {/* Main Content Grid: Phone Mockup on Left + Features on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Mobile App Phone in Clay Frame with Gentle Float & Parallax */}
          <motion.div
            style={{ y: phoneParallaxY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            {/* Tactile Clay Phone Bezel Frame */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-3.5 sm:p-4 rounded-[44px] bg-gradient-to-b from-[#FFFDFB] via-[#FFF6EE] to-[#F3DDD0] border-4 border-white shadow-[inset_4px_4px_8px_rgba(255,255,255,0.95),inset_-4px_-4px_10px_rgba(217,130,95,0.2),0_25px_50px_rgba(58,43,43,0.18)] max-w-[310px] sm:max-w-[340px] w-full"
            >
              {/* Phone Speaker & Dynamic Island Camera Hole */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-(--cocoa) rounded-full z-20 shadow-inner flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-(--cocoa-light)/80 ml-auto mr-2" />
              </div>

              {/* Inner Screen Container */}
              <div className="relative rounded-[32px] overflow-hidden bg-[#261A24] aspect-[9/18.5] shadow-inner">
                <img
                  src={appMockupImage}
                  alt="Maatriva Mobile Companion App Interface showing live vitals and cry translator"
                  width="576"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />

                {/* Subtle Glass Sheen Gradient */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
              </div>

              {/* Bottom Clay Status Pill */}
              <div className="mt-3 py-1 px-3 text-center text-[11px] font-bold text-(--text-dark) bg-white/70 rounded-full border border-white/80 shadow-xs flex items-center justify-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Cradle Sync Active</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Features List & Actions (Right Column) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {appFeatures.map((feat, index) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="clay-card p-6 rounded-3xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-200"
                >
                  <div>
                    <div className="p-3 rounded-2xl clay-badge w-fit mb-3.5 text-(--primary) shadow-xs">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-(--text-dark) mb-2 font-display">
                      {feat.title}
                    </h3>
                    <p className="text-base text-(--text) leading-relaxed font-medium">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Download Buttons Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="clay-card p-7 sm:p-9 rounded-3xl space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-(--text-dark) font-display">
                    Download Maatriva App
                  </h3>
                  <p className="text-base text-(--text) font-medium mt-1">
                    Instant installation on Android devices • Full cloud & offline sync
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl text-xs font-bold clay-badge text-(--primary) flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer shrink-0 border border-white/80 shadow-xs"
                >
                  <QrCode size={16} /> QR Code Scan
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                {/* Direct APK Download Button */}
                <a
                  href={APP_DOWNLOAD_LINK}
                  download="maatriva-app.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[220px] py-4 px-7 clay-btn clay-btn-primary text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg"
                >
                  <Download size={20} />
                  <span>Download Direct APK</span>
                </a>

                {/* Open Modal CTA Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="py-4 px-7 clay-btn clay-btn-secondary text-(--text-dark) font-bold text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Smartphone size={20} className="text-(--primary)" />
                  <span>App Specs & Guide</span>
                </button>
              </div>

              {/* Badges / Guarantees with High Contrast */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm font-bold text-(--text-dark) pt-3 border-t border-(--border)/40">
                <span className="flex items-center gap-1.5 text-(--primary)">
                  <ShieldCheck size={18} /> Verified APK (Malware-Free & Safe)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={18} className="text-(--primary)" /> Android 8.0 or Higher
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <AppDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
