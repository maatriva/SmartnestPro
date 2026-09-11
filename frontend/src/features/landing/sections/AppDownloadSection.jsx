import { useState } from "react";
import { motion } from "framer-motion";
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
import appMockupImage from "../../images/maatrivaAppMockup.png";

export default function AppDownloadSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appFeatures = [
    {
      icon: <Activity className="text-teal-500" size={20} />,
      title: "Real-Time Vital Monitoring",
      description: "Continuous tracking of baby breathing patterns, heart rate, and body temperature with instant safety alerts."
    },
    {
      icon: <Volume2 className="text-emerald-500" size={20} />,
      title: "AI Cry Translator",
      description: "Advanced acoustic AI decodes your baby's cry into actionable needs—Hungry, Tired, Colic, or Wet diaper."
    },
    {
      icon: <Zap className="text-blue-500" size={20} />,
      title: "Automated Cradle Soothing",
      description: "Trigger or automate soothing swing motions, gentle white noise, and thermal comfort routines remotely."
    },
    {
      icon: <Moon className="text-purple-500" size={20} />,
      title: "Sleep Quality Analytics",
      description: "Detailed nightly sleep cycles, movement history, and clinical-grade health logs for your pediatrician."
    }
  ];

  return (
    <section id="app" className="py-20 px-6 relative overflow-hidden bg-transparent">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full clay-badge border border-teal-500/20 mb-4"
          >
            <Sparkles size={16} className="text-(--primary)" />
            <span className="text-xs sm:text-sm font-bold text-(--text-dark)">
              Maatriva Mobile Companion App
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) tracking-tight leading-tight"
          >
            Your Baby's Care & Vitals, <br />
            <span className="text-(--primary)">Right in Your Pocket</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg font-semibold text-(--text-light) leading-relaxed"
          >
            Stay seamlessly connected to your baby cradle anywhere in the world. Receive instant alerts, stream HD audio, and let AI assist you 24/7.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Mobile App Phone Mockup (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center items-center relative"
          >
            {/* Ambient Background Radial Glow behind phone */}
            <div className="absolute w-72 h-96 bg-(--primary)/20 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="relative w-full max-w-[280px] sm:max-w-[320px] transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={appMockupImage}
                alt="Maatriva Mobile Companion App Interface"
                width="576"
                height="1024"
                loading="lazy"
                className="w-full h-auto object-contain drop-shadow-[0_20px_45px_rgba(34,59,102,0.22)] select-none pointer-events-none"
              />
            </div>
          </motion.div>

          {/* Features List & Actions (Right Column) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {appFeatures.map((feat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="clay-card p-5 rounded-2xl border border-teal-200/20 hover:scale-[1.02] transition-transform duration-200"
                >
                  <div className="p-2.5 rounded-xl bg-teal-500/10 w-fit mb-3">
                    {feat.icon}
                  </div>
                  <h4 className="text-base font-bold text-(--text-dark) mb-1">
                    {feat.title}
                  </h4>
                  <p className="text-xs font-semibold text-(--text-light) leading-relaxed">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Action Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="clay-card p-6 sm:p-8 rounded-3xl border border-teal-200/30 bg-teal-500/5 space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-(--text-dark)">
                    Download Maatriva App Today
                  </h3>
                  <p className="text-xs font-semibold text-(--text-light) mt-1">
                    Instant installation on Android devices • Full cloud sync supported
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-bold clay-badge text-(--primary) flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer shrink-0"
                >
                  <QrCode size={16} /> QR Code Scan
                </button>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                {/* Direct APK Download Button */}
                <a
                  href={APP_DOWNLOAD_LINK}
                  download="app-release.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] py-4 px-6 clay-btn clay-btn-primary text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#5A78D6]/25"
                >
                  <Download size={20} />
                  <span>Download Direct APK</span>
                </a>

                {/* Open Modal CTA Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="py-4 px-6 clay-btn clay-btn-secondary text-(--text-dark) font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Smartphone size={20} className="text-(--primary)" />
                  <span>App Info & Specs</span>
                </button>
              </div>

              {/* Badges / Guarantees */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-(--text-light) pt-2 border-t border-teal-200/20">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck size={16} /> Verified APK (Safe & Malware Free)
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={16} className="text-(--primary)" /> Android 8.0 or Higher
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* App Download Modal */}
      <AppDownloadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
