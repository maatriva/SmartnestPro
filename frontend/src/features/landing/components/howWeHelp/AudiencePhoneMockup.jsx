import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Moon,
  Volume2,
  Video,
  ShieldCheck,
  QrCode,
  Clock,
  Download,
  Activity,
  UserCheck,
  Sparkles,
  Wifi,
  Battery,
  Lock,
} from "lucide-react";

export default function AudiencePhoneMockup({ screenType = "sleep-lullaby" }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[340px] mx-auto select-none">
      {/* Tactile Clay Phone Bezel Frame */}
      <motion.div
        animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative p-3.5 sm:p-4 rounded-[44px] bg-gradient-to-b from-[#FFFDFB] via-[#FFF6EE] to-[#F3DDD0] border-4 border-white shadow-[inset_4px_4px_8px_rgba(255,255,255,0.95),inset_-4px_-4px_10px_rgba(217,130,95,0.2),0_25px_50px_rgba(58,43,43,0.16)] w-full"
      >
        {/* Speaker & Front Camera Hole */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-4 bg-(--cocoa) rounded-full z-20 shadow-inner flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-(--cocoa-light)/80 ml-auto mr-2" />
        </div>

        {/* Inner Screen Display (Soft Clay Theme) */}
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-[#FFF4EC] aspect-[9/18.5] shadow-inner p-4 pt-10 flex flex-col justify-between border border-white/60">
          
          {/* Top Status Bar */}
          <div className="flex items-center justify-between text-[11px] font-bold text-(--text-dark) px-2 pb-2 border-b border-(--primary)/15">
            <span>9:41 AM</span>
            <div className="flex items-center gap-1.5 text-(--primary)">
              <Wifi size={12} />
              <Battery size={13} />
            </div>
          </div>

          {/* DYNAMIC SCREEN CONTENT BASED ON AUDIENCE */}
          <div className="flex-1 flex flex-col justify-center py-2 space-y-3">
            
            {/* 1. Sleep & Lullaby Screen (New Mothers) */}
            {screenType === "sleep-lullaby" && (
              <div className="space-y-3">
                <div className="clay-card p-3.5 rounded-2xl border border-white shadow-xs text-center space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-(--primary)/15 text-(--primary) text-[11px] font-bold">
                    <Moon size={12} />
                    <span>Auto Soothe: Active</span>
                  </div>
                  <h4 className="text-base font-black text-(--text-dark)">Gentle Womb Rhythm</h4>
                  <p className="text-xs text-(--text-light) font-medium">Motorized cradle swaying at 22 cycles/min</p>
                </div>

                <div className="p-3 bg-white/80 rounded-2xl border border-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-(--text-dark)">
                    <span className="flex items-center gap-1.5">
                      <Volume2 size={13} className="text-(--primary)" />
                      <span>Mother's Hum Recording</span>
                    </span>
                    <span className="text-[10px] text-(--primary)">Playing</span>
                  </div>
                  <div className="w-full h-1.5 bg-(--bg-secondary) rounded-full overflow-hidden">
                    <motion.div
                      animate={shouldReduceMotion ? { width: "60%" } : { width: ["20%", "85%", "60%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="h-full bg-(--primary) rounded-full"
                    />
                  </div>
                </div>

                <div className="p-2.5 bg-white/70 rounded-xl flex items-center justify-between text-[11px] font-bold text-(--text-dark)">
                  <span>Night Vision Stream</span>
                  <span className="text-(--primary) flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--primary) animate-ping" />
                    HD Feed
                  </span>
                </div>
              </div>
            )}

            {/* 2. Live Camera Screen (Working Mothers) */}
            {screenType === "live-camera" && (
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-tr from-[#3B2A4A] to-[#5A416D] p-3 text-white flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      LIVE STREAM
                    </span>
                    <span className="flex items-center gap-1 bg-black/30 px-1.5 py-0.5 rounded">
                      <Lock size={10} /> Encrypted
                    </span>
                  </div>

                  <div className="text-center py-2">
                    <Video size={28} className="mx-auto text-white/80 mb-1" />
                    <p className="text-[11px] font-bold">Nursery View: Sleeping</p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] bg-black/40 backdrop-blur-sm p-1.5 rounded-lg">
                    <span>Temp: 24.2°C</span>
                    <span>Breathing: 38 bpm</span>
                  </div>
                </div>

                <div className="p-3 bg-white/80 rounded-2xl border border-white text-center">
                  <span className="text-xs font-black text-(--text-dark) block mb-0.5">
                    Parent Control Active
                  </span>
                  <span className="text-[10px] text-(--text-light) font-semibold">
                    1 guest viewing authorized (Nanny Maya)
                  </span>
                </div>
              </div>
            )}

            {/* 3. Caregiver Access Screen (Families & Caregivers) */}
            {screenType === "caregiver-qr" && (
              <div className="space-y-3">
                <div className="clay-card p-3 rounded-2xl border border-white text-center space-y-2">
                  <div className="w-16 h-16 mx-auto bg-white p-1 rounded-xl shadow-xs border border-(--primary)/20 flex items-center justify-center">
                    <QrCode size={48} className="text-(--text-dark)" />
                  </div>
                  <h4 className="text-xs font-black text-(--text-dark)">Caregiver Guest Pass</h4>
                  <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 bg-(--primary)/15 text-(--primary) rounded-full">
                    Role: View & Soothe
                  </span>
                </div>

                <div className="p-2.5 bg-white/80 rounded-xl border border-white flex items-center justify-between text-[11px] font-bold text-(--text-dark)">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-(--primary)" />
                    <span>Pass Expiry</span>
                  </span>
                  <span className="text-(--primary) font-mono">04:28:12</span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-bold text-(--text-light)">
                    Tap to revoke guest access instantly
                  </span>
                </div>
              </div>
            )}

            {/* 4. PDF Export / Trends Screen (Hospitals & Pediatricians) */}
            {screenType === "pdf-export" && (
              <div className="space-y-3">
                <div className="clay-card p-3 rounded-2xl border border-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-(--text-dark)">
                    <span className="flex items-center gap-1.5">
                      <Activity size={14} className="text-(--primary)" />
                      <span>14-Day Vitals Trend</span>
                    </span>
                    <span className="text-[10px] text-(--primary)">Export Ready</span>
                  </div>

                  {/* Sparkline Visual */}
                  <div className="h-10 w-full flex items-end gap-1.5 pt-2 px-1">
                    {[40, 55, 48, 65, 52, 60, 58, 70, 62, 54, 68, 62].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-(--primary) rounded-t-sm opacity-80"
                        style={{ height: `${val}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] text-(--text-light) font-semibold">
                    <span>Day 1</span>
                    <span>Median 38 bpm</span>
                    <span>Day 14</span>
                  </div>
                </div>

                <div className="p-3 bg-white/90 rounded-2xl border border-white text-center shadow-xs">
                  <button
                    type="button"
                    className="w-full py-2 px-3 rounded-xl clay-btn clay-btn-primary text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Download size={13} />
                    <span>Download Pediatric PDF</span>
                  </button>
                  <span className="text-[9px] text-(--text-light) mt-1 block">
                    Structured 1-page clinical consultation summary
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Dock Navigation Pill */}
          <div className="py-2 px-4 rounded-full bg-white/90 border border-white shadow-xs flex items-center justify-around text-(--primary)">
            <Moon size={16} />
            <Activity size={16} className="opacity-50" />
            <UserCheck size={16} className="opacity-50" />
          </div>

        </div>
      </motion.div>
    </div>
  );
}
