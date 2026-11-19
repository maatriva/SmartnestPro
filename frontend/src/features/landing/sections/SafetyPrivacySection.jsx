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
      className="clay-section relative text-(--text-primary) bg-(--bg-canvas) pt-14 pb-20 sm:pt-20 sm:pb-24 overflow-hidden z-10"
      aria-label="Safety and Privacy"
    >
      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header: Direct, Plain Language */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            Safety and privacy
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 text-base sm:text-lg text-(--text-secondary) font-normal max-w-2xl mx-auto leading-relaxed text-center [text-wrap:pretty]"
          >
            Your baby's data stays secure, private, and under your control.
          </motion.p>
        </div>

        {/* 4 Equal-Height Light Clay Cards (2x2 on Desktop, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {confirmedCards.map((card, index) => {
            const Icon = iconMap[card.icon] || ShieldCheck;

            return (
              <motion.div
                key={card.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="h-full flex flex-col"
              >
                <div className="clay-card-light bg-(--surface) p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full border border-(--border-card) shadow-sm hover:shadow-md transition-[transform,box-shadow] duration-200">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-(--bg-canvas) text-(--brand-accent) flex items-center justify-center mb-4 border border-(--border-card)">
                      <Icon size={22} strokeWidth={2} />
                    </div>

                    <h3 className="text-xl font-bold text-(--text-primary) mb-2 font-display tracking-tight flex items-center [text-wrap:balance]">
                      {card.title}
                    </h3>

                    <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed font-normal [text-wrap:pretty]">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-(--border-card) flex items-center gap-2 text-xs font-semibold text-(--text-secondary)">
                    <span className="w-2 h-2 rounded-full bg-(--brand-accent)" />
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
