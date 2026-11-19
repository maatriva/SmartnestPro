import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function StepCard({ step, index, totalSteps = 3 }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative h-full pt-8 group flex flex-col"
    >
      {/* Constellation Star Node atop each card */}
      <div className="absolute -top-1 left-8 sm:left-10 z-20 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F0C675] to-[#FFF6EE] border-2 border-white shadow-[0_0_15px_rgba(240,198,117,0.7),inset_2px_2px_4px_white] flex items-center justify-center text-[#261A24] font-black text-sm group-hover:scale-125 transition-transform duration-300">
          <Sparkles size={16} className="text-[#261A24]" />
        </div>
        <div className="absolute w-14 h-14 rounded-full border border-(--accent)/40 animate-ping pointer-events-none" />
      </div>

      <div className="hiw-card h-full clay-card-light bg-(--surface) p-6 sm:p-7 rounded-2xl flex flex-col justify-between relative overflow-hidden transition-[transform,box-shadow] duration-200 hover:-translate-y-1 border border-(--border-card) shadow-sm hover:shadow-md">
        <div>
          {/* Step Number in Clay Pill */}
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex p-3 rounded-xl bg-(--bg-canvas) text-(--brand-accent) border border-(--border-card)">
              <Icon className="w-6 h-6" strokeWidth={2} />
            </div>
            <span className="text-2xl font-bold text-(--brand-accent) font-display opacity-40">
              {step.number}
            </span>
          </div>

          <h3 className="text-xl font-bold text-(--text-primary) mb-2.5 tracking-tight font-display flex items-center [text-wrap:balance]">
            {step.title}
          </h3>

          <p className="text-(--text-secondary) leading-relaxed text-sm sm:text-base font-normal [text-wrap:pretty]">
            {step.description}
          </p>
        </div>

        {/* Footnote */}
        <div className="mt-6 pt-3.5 border-t border-(--border-card) flex items-center justify-between text-xs text-(--text-secondary) font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-(--brand-gold)" />
            <span>Step {index + 1} of {totalSteps}</span>
          </div>
          <span className="text-(--brand-accent) font-semibold">{step.tag}</span>
        </div>
      </div>
    </motion.div>
  );
}
