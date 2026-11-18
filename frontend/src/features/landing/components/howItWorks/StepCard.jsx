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

      <div className="hiw-card h-full clay-card p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
        <div>
          {/* Step Number in Clay Pill */}
          <div className="flex items-center justify-between mb-5">
            <div className="inline-flex p-3.5 clay-badge text-(--primary) group-hover:scale-110 transition-transform shadow-xs">
              <Icon className="w-7 h-7" strokeWidth={2.2} />
            </div>
            <span className="text-3xl font-black text-(--primary) font-display tracking-tight opacity-40">
              {step.number}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-(--text-dark) mb-3 tracking-tight font-display min-h-[3.25rem] flex items-center [text-wrap:balance]">
            {step.title}
          </h3>

          <p className="text-(--text) leading-relaxed text-base sm:text-lg font-medium [text-wrap:pretty]">
            {step.description}
          </p>
        </div>

        {/* Constellation subtle footnote */}
        <div className="mt-6 pt-3.5 border-t border-(--border)/30 flex items-center justify-between text-xs sm:text-sm text-(--text-dark) font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-(--accent)" />
            <span>Step {index + 1} of {totalSteps}</span>
          </div>
          <span className="text-(--primary) font-semibold">{step.tag}</span>
        </div>
      </div>
    </motion.div>
  );
}
