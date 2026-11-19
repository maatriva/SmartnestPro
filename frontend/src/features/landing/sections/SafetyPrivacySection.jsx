import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Lock, Clock, FileCheck, Shield, Sparkles } from "lucide-react";
import safetyData from "../data/safetyPrivacy.json";

const iconMap = {
  shield: ShieldCheck,
  lock: Lock,
  clock: Clock,
  "file-shield": FileCheck,
};

export default function SafetyPrivacySection() {
  const shouldReduceMotion = useReducedMotion();

  // Strict Policy: Render ONLY cards that are confirmed and do not need confirmation
  const confirmedCards = useMemo(() => {
    return (safetyData.cards || []).filter(
      (card) => card.confirmed === true && !card.needsConfirmation
    );
  }, []);

  return (
    <section
      id="safety-privacy"
      className="clay-section relative text-(--text) bg-[#FFF6EE] pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden z-10"
      aria-label="Safety and Privacy"
    >
      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header: Direct, Plain Language, No Eyebrow Pills */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            Safety and privacy
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base sm:text-lg md:text-xl text-(--text) font-medium max-w-2xl mx-auto leading-relaxed text-center [text-wrap:balance]"
          >
            Your baby's data stays secure, private, and under your control.
          </motion.p>
        </div>

        {/* 4 Equal-Height Clay Cards (2x2 on Desktop, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {confirmedCards.map((card, index) => {
            const Icon = iconMap[card.icon] || ShieldCheck;

            return (
              <motion.div
                key={card.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className="h-full flex flex-col"
              >
                <div className="clay-card-blush bg-[#FFF0E6] p-7 sm:p-8 rounded-3xl flex flex-col justify-between h-full border-2 border-white/90 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-white text-(--primary) flex items-center justify-center mb-5 shadow-xs border border-white">
                      <Icon size={24} strokeWidth={2.2} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-(--text-dark) mb-2.5 font-display tracking-tight min-h-[3.25rem] flex items-center [text-wrap:balance]">
                      {card.title}
                    </h3>

                    <p className="text-base sm:text-lg text-(--text) leading-relaxed font-medium [text-wrap:pretty]">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-(--border)/30 flex items-center gap-2 text-xs font-bold text-(--text-dark)">
                    <span className="w-2 h-2 rounded-full bg-(--primary)" />
                    <span>Verified Protocol Standard</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
