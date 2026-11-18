import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Moon, HeartHandshake, Eye, Sparkles } from "lucide-react";

export default function ProblemSection() {
  const shouldReduceMotion = useReducedMotion();

  const painPoints = [
    {
      icon: Moon,
      title: "Endless Nighttime Checking",
      description:
        "Waking up every hour in fear just to place a hand on baby's chest to confirm they are breathing steadily, leaving parents profoundly sleep-deprived.",
    },
    {
      icon: Eye,
      title: "The Anxiety of the Unknown Cry",
      description:
        "Listening to distressed crying at 3 a.m. and wondering whether baby is overtired, in pain from colic, hungry, or running an unseen fever.",
    },
    {
      icon: HeartHandshake,
      title: "Postpartum Caregiver Depletion",
      description:
        "Navigating sensitive postpartum recovery while carrying 24/7 vigil, often without nearby family support or a moment to rest peacefully.",
    },
  ];

  return (
    <section
      id="the-problem"
      className="clay-section relative text-(--text) bg-gradient-to-b from-[#FFF6EE] via-[#FFFDF9] to-[#FFF6EE] pt-12 pb-16 sm:pt-16 sm:pb-24 overflow-hidden z-10"
      aria-label="The Challenge New Parents Face"
    >
      <div className="max-w-7xl mx-auto clay-container relative z-10">
        {/* Section Header */}
        <div className="clay-section-header">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge text-xs sm:text-sm font-bold mb-3 border border-(--primary)/20"
          >
            <Sparkles size={14} className="text-(--primary)" />
            <span>The Reality of Early Parenthood</span>
          </motion.div>

          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            The hardest nights shouldn’t be{" "}
            <span className="text-(--primary)">faced in constant fear.</span>
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base sm:text-lg md:text-xl text-(--text) font-medium max-w-2xl mx-auto leading-relaxed text-center [text-wrap:balance]"
          >
            New parenthood brings unconditional love—and relentless exhaustion. Traditional baby gear offers no real answers when you need them most.
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
                <div className="clay-card p-6 sm:p-8 rounded-3xl flex flex-col justify-between h-full border-2 border-white/90 shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-2xl clay-badge text-(--primary) flex items-center justify-center mb-5 shadow-xs border border-white">
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
