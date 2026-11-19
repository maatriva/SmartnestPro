import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Moon, HeartHandshake, Eye, Sparkles } from "lucide-react";

export default function ProblemSection() {
  const shouldReduceMotion = useReducedMotion();

  const painPoints = [
    {
      icon: Moon,
      title: "Frequent night checks",
      description:
        "Waking up repeatedly through the night just to check if your baby is breathing steadily, leaving you exhausted.",
    },
    {
      icon: Eye,
      title: "Unknown cry reasons",
      description:
        "Trying to tell whether 3 a.m. crying means hunger, gas pain, overtiredness, or a rising temperature.",
    },
    {
      icon: HeartHandshake,
      title: "Caregiver exhaustion",
      description:
        "Physical and emotional fatigue from continuous 24/7 care, especially during the early postpartum recovery weeks.",
    },
  ];

  return (
    <section
      id="the-problem"
      className="clay-section relative text-(--text) bg-[#FFF6EE] pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden z-10"
      aria-label="The Challenges of Early Parenthood"
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
            The challenges of early parenthood
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base sm:text-lg md:text-xl text-(--text) font-medium max-w-2xl mx-auto leading-relaxed text-center [text-wrap:balance]"
          >
            Frequent night wakings, worrying about breathing, and constant checking leave new parents depleted. Maatriva helps watch over your baby so you can rest.
          </motion.p>
        </div>

        {/* 3 Empathetic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {painPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.1 }}
                className="h-full flex flex-col"
              >
                <div className="clay-card-blush bg-[#FFF0E6] p-6 sm:p-8 rounded-3xl flex flex-col justify-between h-full border-2 border-white/90 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white text-(--primary) flex items-center justify-center mb-5 shadow-xs border border-white">
                      <Icon size={22} strokeWidth={2.2} />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-(--text-dark) mb-3 font-display tracking-tight min-h-[3.25rem] sm:min-h-[3.75rem] flex items-center [text-wrap:balance]">
                      {point.title}
                    </h3>

                    <p className="text-base text-(--text) leading-relaxed font-medium [text-wrap:pretty]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Transition Bridge to Solution */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-(--primary-dark) font-bold max-w-xl mx-auto">
            ✨ Maatriva was designed with biomedical engineers and parents to turn nocturnal uncertainty into quiet, contactless reassurance.
          </p>
        </div>
      </div>
    </section>
  );
}
