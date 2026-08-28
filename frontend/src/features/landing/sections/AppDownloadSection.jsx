import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, 
  Smartphone, 
  Activity, 
  Heart, 
  Volume2, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  QrCode,
  Zap,
  Moon,
  Play
} from "lucide-react";
import AppDownloadModal from "../../../shared/components/AppDownloadModal";
import { APP_DOWNLOAD_LINK } from "../../../shared/constants/navigation";

export default function AppDownloadSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("monitor");

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
          
          {/* Phone Frame Mockup (Left Column) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[9/18] bg-slate-950 rounded-[48px] p-4 shadow-2xl border-[6px] border-slate-800 ring-1 ring-teal-500/20 overflow-hidden">
              
              {/* Phone Camera Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center">
                <div className="w-3 h-3 bg-slate-950 rounded-full mr-2" />
                <div className="w-12 h-1 bg-slate-800 rounded-full" />
              </div>

              {/* Inside App Screen Preview */}
              <div className="w-full h-full bg-slate-900 rounded-[36px] pt-8 p-4 text-white flex flex-col justify-between overflow-hidden relative">
                
                {/* App Screen Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-black text-xs">
                      M
                    </div>
                    <div>
                      <p className="text-xs font-black tracking-tight leading-none text-slate-100">Maatriva AI</p>
                      <p className="text-[10px] text-teal-400 font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" /> Cradle Connected
                      </p>
                    </div>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
                    <Activity size={14} />
                  </div>
                </div>

                {/* Main Screen Dashboard Card */}
                <div className="my-auto space-y-3">
                  
                  {/* Status Banner */}
                  <div className="bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-500/30 p-3 rounded-2xl">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-teal-300 flex items-center gap-1">
                        <Moon size={12} /> Baby Status
                      </span>
                      <span className="text-[10px] bg-teal-500/30 px-2 py-0.5 rounded-full text-teal-200 font-bold">
                        Sleeping Comfortably
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium">Gentle soothing swing active at Speed 2</p>
                  </div>

                  {/* Vitals Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/50">
                      <div className="flex items-center gap-1.5 text-rose-400 text-[10px] font-bold">
                        <Heart size={12} /> Heart Rate
                      </div>
                      <p className="text-lg font-black text-white mt-0.5">124 <span className="text-[10px] text-slate-400 font-normal">BPM</span></p>
                    </div>
                    <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/50">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
                        <Activity size={12} /> SpO2 Level
                      </div>
                      <p className="text-lg font-black text-white mt-0.5">99.2<span className="text-[10px] text-slate-400 font-normal">%</span></p>
                    </div>
                  </div>

                  {/* AI Cry Translation Widget */}
                  <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700/80">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1">
                        <Volume2 size={12} className="text-amber-400" /> AI Cry Analysis
                      </span>
                      <span className="text-[10px] text-slate-400">2 min ago</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="px-2.5 py-1 bg-amber-500/20 text-amber-300 font-bold rounded-lg text-xs border border-amber-500/30">
                        Hungry (86% Confidence)
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">Auto-soothing engaged</span>
                    </div>
                  </div>
                </div>

                {/* Bottom App Navigation Bar */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-around text-slate-400">
                  <button className="flex flex-col items-center gap-0.5 text-teal-400 font-bold">
                    <Smartphone size={16} />
                    <span className="text-[9px]">Home</span>
                  </button>
                  <button className="flex flex-col items-center gap-0.5 hover:text-slate-200">
                    <Activity size={16} />
                    <span className="text-[9px]">Vitals</span>
                  </button>
                  <button className="flex flex-col items-center gap-0.5 hover:text-slate-200">
                    <Volume2 size={16} />
                    <span className="text-[9px]">Audio</span>
                  </button>
                </div>
              </div>
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
                  className="flex-1 min-w-[200px] py-4 px-6 rounded-2xl clay-btn clay-btn-primary text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-teal-500/25"
                >
                  <Download size={20} />
                  <span>Download Direct APK</span>
                </a>

                {/* Open Modal CTA Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="py-4 px-6 rounded-2xl clay-card text-(--text-dark) font-bold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-teal-500/10 transition-all cursor-pointer"
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
