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
      className="clay-section relative text-(--text-primary) bg-(--bg-canvas) pt-12 pb-16 sm:pt-16 sm:pb-20 overflow-hidden z-10"
      aria-label="The Challenges of Early Parenthood"
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
            The challenges of early parenthood
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 text-base sm:text-lg text-(--text-secondary) font-normal max-w-2xl mx-auto leading-relaxed text-center [text-wrap:pretty]"
          >
            Frequent night wakings, worrying about breathing, and constant checking leave new parents exhausted. Maatriva monitors your baby so you can rest.
          </motion.p>
        </div>

        {/* 3 Empathetic Cards: Clean Light Clay */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {painPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="h-full flex flex-col"
              >
                <div className="clay-card-light p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full bg-(--surface) border border-(--border-card) shadow-sm hover:shadow-md transition-[transform,box-shadow] duration-200">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-(--bg-canvas) text-(--brand-accent) flex items-center justify-center mb-4 border border-(--border-card)">
                      <Icon size={20} strokeWidth={2} />
                    </div>

                    <h3 className="text-xl font-bold text-(--text-primary) mb-2.5 font-display tracking-tight flex items-center [text-wrap:balance]">
                      {point.title}
                    </h3>

                    <p className="text-sm sm:text-base text-(--text-secondary) leading-relaxed font-normal [text-wrap:pretty]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance note */}
        <div className="mt-8 sm:mt-10 text-center">
          <p className="text-sm sm:text-base text-(--text-secondary) font-medium max-w-xl mx-auto">
            Designed with engineers and parents to track infant vitals without wearables, wires, or intrusive sensors.
          </p>
        </div>
      </div>
    </section>
  );
}
