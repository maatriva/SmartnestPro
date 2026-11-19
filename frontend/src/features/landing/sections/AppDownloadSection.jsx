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
      title: "Live vital readings",
      description: "Non-contact tracking of breathing rate, heart rate, and temperature while your baby rests."
    },
    {
      icon: <Volume2 className="text-(--primary)" size={22} />,
      title: "Cry alerts",
      description: "Sound sensors detect crying patterns and send instant alerts to your phone."
    },
    {
      icon: <Zap className="text-(--primary)" size={22} />,
      title: "Cradle controls",
      description: "Start or stop rocking, adjust speed, and play lullabies directly from the app."
    },
    {
      icon: <Moon className="text-(--primary)" size={22} />,
      title: "Sleep logs",
      description: "Daily and weekly sleep summaries ready to review or export for your pediatrician."
    }
  ];

  return (
    <section
      id="app"
      ref={containerRef}
      className="clay-section relative text-(--text-primary) bg-(--bg-canvas) pt-14 pb-20 sm:pt-20 sm:pb-24 overflow-hidden z-10"
      aria-label="Maatriva Mobile Companion App"
    >
      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header: Plain, Direct Language */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) tracking-tight leading-tight mb-3 font-display text-center [text-wrap:balance]"
          >
            The Maatriva companion app
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="text-base sm:text-lg font-normal text-(--text-secondary) leading-relaxed max-w-2xl mx-auto text-center [text-wrap:pretty]"
          >
            Check live video, track vitals, and adjust rocking speeds from your phone.
          </motion.p>
        </div>

        {/* Main Content Grid: Phone Mockup on Left + Features on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Mobile App Phone in Clay Frame */}
          <motion.div
            style={{ y: phoneParallaxY }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            {/* Tactile Clay Phone Bezel Frame */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative p-3 sm:p-3.5 rounded-[40px] bg-gradient-to-b from-[#FFFDFB] via-[#FFF6EE] to-[#F3DDD0] border-2 border-white shadow-xl max-w-[300px] sm:max-w-[330px] w-full"
            >
              {/* Phone Speaker & Camera Cutout */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-(--cocoa) rounded-full z-20 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-(--cocoa-light)/80 ml-auto mr-1.5" />
              </div>

              {/* Inner Screen Container */}
              <div className="relative rounded-[30px] overflow-hidden bg-[#261A24] aspect-[9/18.5]">
                <img
                  src={appMockupImage}
                  alt="Maatriva Mobile Companion App Interface showing live vitals and cry translator"
                  width="576"
                  height="1024"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </div>

              {/* Bottom Status Pill */}
              <div className="mt-3 py-1 px-3 text-center text-[11px] font-semibold text-(--text-primary) bg-white/80 rounded-full border border-white flex items-center justify-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-(--brand-accent) animate-pulse" />
                <span>Live Cradle Sync Active</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Features List & Actions (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {appFeatures.map((feat, index) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.08 * index }}
                  className="clay-card-light bg-(--surface) p-5 sm:p-6 rounded-2xl flex flex-col justify-between border border-(--border-card) shadow-sm hover:shadow-md transition-[transform,box-shadow] duration-200"
                >
                  <div>
                    <div className="p-2.5 rounded-xl bg-(--bg-canvas) w-fit mb-3 text-(--brand-accent) border border-(--border-card)">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-(--text-primary) mb-1.5 font-display flex items-center [text-wrap:balance]">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-(--text-secondary) leading-relaxed font-normal [text-wrap:pretty]">
                      {feat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Download Buttons Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="clay-card-light bg-(--surface) p-6 sm:p-8 rounded-2xl border border-(--border-card) shadow-sm space-y-5"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-(--text-primary) font-display">
                    Download Maatriva App
                  </h3>
                  <p className="text-sm text-(--text-secondary) font-normal mt-0.5">
                    Install directly on Android devices with cloud and offline sync.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-(--brand-accent) bg-(--bg-canvas) flex items-center gap-2 hover:bg-(--surface) border border-(--border-card) transition-colors cursor-pointer shrink-0"
                >
                  <QrCode size={15} /> QR Code Scan
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-1">
                {/* Direct APK Download Button */}
                <a
                  href={APP_DOWNLOAD_LINK}
                  download="maatriva-app.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] py-3.5 px-6 clay-btn clay-btn-primary text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-transform shadow-md"
                >
                  <Download size={18} />
                  <span>Download Direct APK</span>
                </a>

                {/* Open Modal CTA Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="py-3.5 px-6 clay-btn clay-btn-secondary text-(--text-primary) font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Smartphone size={18} className="text-(--brand-accent)" />
                  <span>App Specs & Guide</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-(--text-secondary) pt-3 border-t border-(--border-card)">
                <span className="flex items-center gap-1.5 text-(--brand-accent)">
                  <ShieldCheck size={16} /> Verified APK (Malware-Free & Safe)
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-(--brand-accent)" /> Android 8.0 or Higher
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
