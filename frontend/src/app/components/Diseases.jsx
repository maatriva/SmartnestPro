import "../../styles/theme.css";
import { useRef, useState } from "react";

const tickerData = [
  {
    name: "Cystic Fibrosis",
    short: "Thick mucus buildup in lungs",
    full: "A genetic disorder affecting lungs and digestive system causing severe breathing issues.",
  },
  {
    name: "Sleep Apnea",
    short: "Breathing pauses during sleep",
    full: "A sleep disorder where breathing repeatedly stops and starts, leading to poor sleep quality.",
  },
  {
    name: "Tetralogy of Fallot",
    short: "Heart defect causing low oxygen",
    full: "A congenital heart condition with four defects affecting blood flow.",
  },
  {
    name: "Epilepsy",
    short: "Repeated seizures affecting brain",
    full: "A neurological disorder causing recurrent seizures due to abnormal brain activity.",
  },
  {
    name: "Hydrocephalus",
    short: "Fluid buildup in brain",
    full: "A condition where fluid accumulates in the brain, increasing pressure.",
  },
  {
    name: "Arrhythmias",
    short: "Irregular heart rhythms",
    full: "A condition where the heart beats too fast, too slow, or irregularly.",
  },
];

const Diseases = () => {
  const chipRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <div
      id="diseases"
      className="overflow-hidden bg-white/50 backdrop-blur-sm border border-white/40 shadow-[var(--shadow)] text-[var(--text)] py-6"
    >
      {/* Heading */}
      <h1 className="text-2xl font-bold text-[var(--text-dark)] text-center p-5">
        Diseases That are Monitored by us
      </h1>

      {/* Marquee */}
      <div className="flex whitespace-nowrap marquee hover:[animation-play-state:paused]">
        {[...tickerData, ...tickerData].map((item, i) => (
          <div
            key={i}
            ref={(el) => (chipRefs.current[i] = el)}
            onClick={() => handleClick(i)}
            className={`mx-8 cursor-pointer text-sm md:text-base border rounded-full px-4 py-2 backdrop-blur transition-all duration-300
            ${activeIndex === i
                ? "bg-white text-black shadow-lg scale-110"
                : "bg-[var(--bg-secondary)] border-[var(--border)]"
              }`}
          >
            <div className="font-semibold">
              {item.name}
            </div>

            <span>
              {activeIndex === i ? item.full : item.short}
            </span>

            <span className="mx-6">•</span>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="flex w-full justify-center mt-6">
        <button className="px-5 py-2.5 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--primary-hover)] transition-all font-semibold">
          Know more
        </button>
      </div>
    </div>
  );
};

export default Diseases;