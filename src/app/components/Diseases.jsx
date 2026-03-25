import "../../styles/theme.css";
import { motion } from "motion/react";

const tickerData = [
  { name: "Cystic Fibrosis", short: "Thick mucus buildup in lungs" },
  { name: "Sleep Apnea", short: "Breathing pauses during sleep" },
  { name: "Tetralogy of Fallot", short: "Heart defect causing low oxygen" },
  { name: "Epilepsy", short: "Repeated seizures affecting brain" },
  { name: "Hydrocephalus", short: "Fluid buildup in brain" },
  { name: "Arrhythmias", short: "Irregular heart rhythms" }
];

const Diseases = () => {
  return (
    <div
      id="diseases"
      className="overflow-hidden 
      bg-white/50 backdrop-blur-sm  border border-white/40 shadow-[var(--shadow)]
      text-[var(--text)] 
      py-6 "
    >

      {/* Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-[var(--text-dark)] text-center p-5"
      >
        Diseases That are Monitored by us
      </motion.h1>

      {/* Marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex whitespace-nowrap marquee hover:[animation-play-state:paused]"
      >
        {[...tickerData, ...tickerData].map((item, i) => (
          <div
            key={i}
            className="mx-8 text-sm md:text-base 
            border border-[var(--border)] 
            rounded-full px-4 py-2 
            bg-[var(--bg-secondary)] backdrop-blur"
          >
            <div className="font-semibold text-[var(--text-dark)]">
              {item.name}
            </div>
            <span className="text-[var(--text-light)]">
              {item.short}
            </span>
            <span className="mx-6 text-[var(--text-light)]">•</span>
          </div>
        ))}
      </motion.div>

      {/* Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex w-full justify-center mt-6"
      >
        <button
          className="px-5 py-2.5 
          bg-[var(--primary)] text-white 
          rounded-full 
          hover:bg-[var(--primary-hover)] 
          hover:shadow-[var(--shadow-primary)] 
          transition-all font-semibold"
        >
          Know more
        </button>
      </motion.div>
    </div>
  );
};

export default Diseases;