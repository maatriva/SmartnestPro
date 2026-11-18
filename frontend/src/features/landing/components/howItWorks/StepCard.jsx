import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function StepCard({ step, index }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative h-full pt-8 group"
    >
      {/* Constellation Star Node atop each card */}
      <div className="absolute -top-1 left-8 sm:left-10 z-20 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F0C675] to-[#FFF6EE] border-2 border-white shadow-[0_0_15px_rgba(240,198,117,0.7),inset_2px_2px_4px_white] flex items-center justify-center text-(--cocoa) font-black text-sm group-hover:scale-125 transition-transform duration-300">
          <Sparkles size={16} className="text-[#3A2B2B]" />
        </div>
        <div className="absolute w-14 h-14 rounded-full border border-(--accent)/40 animate-ping pointer-events-none" />
      </div>

      <div className="hiw-card h-full clay-card p-7 sm:p-8 flex flex-col relative overflow-hidden transition-all duration-300 hover:-translate-y-2">
        {/* Step Number in Clay Pill */}
        <div className="flex items-center justify-between mb-5">
          <div className="inline-flex p-3.5 clay-badge text-(--primary) group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7" strokeWidth={2.2} />
          </div>
          <span className="text-3xl font-black text-(--primary)/30 font-display">
            {step.number}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-(--text-dark) mb-3 tracking-tight">
          {step.title}
        </h3>

        <p className="text-(--text) leading-relaxed text-sm sm:text-base font-medium flex-1">
          {step.description}
        </p>

        {/* Constellation subtle footnote */}
        <div className="mt-4 pt-3 border-t border-(--border)/30 flex items-center gap-1.5 text-xs text-(--text-light) font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-(--accent)" />
          <span>Stage {index + 1} of 4</span>
        </div>
      </div>
    </motion.div>
  );
}
