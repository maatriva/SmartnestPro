import "../../styles/theme.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleClick = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <section
      id="diseases"
      className="py-24 px-6 clay-even-section text-[var(--text)] overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 clay-badge text-sm font-bold mb-4">
            Monitoring
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-6">
            Diseases that are monitored by us
          </h2>
          <p className="text-xl text-[var(--text-light)]">
            Our smart baby cradle tracks vital patterns to detect symptoms early.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full overflow-hidden my-8">
        <div className="flex whitespace-nowrap marquee">
          {[...tickerData, ...tickerData].map((item, i) => (
            <div
              key={i}
              ref={(el) => (chipRefs.current[i] = el)}
              onClick={() => handleClick(i)}
              className={`mx-8 cursor-pointer text-sm md:text-base px-5 py-2.5 transition-all duration-300 rounded-full
              ${activeIndex === i
                  ? "clay-card text-[var(--text-dark)] scale-110"
                  : "clay-badge text-[var(--text-light)]"
                }`}
            >
              <div className="font-bold inline-block mr-2">
                {item.name}:
              </div>

              <span className="font-semibold text-xs md:text-sm">
                {activeIndex === i ? item.full : item.short}
              </span>

              <span className="mx-6 text-[var(--primary-light)]">•</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Button */}
        <div className="flex w-full justify-center mt-12">
          <button 
            onClick={() => navigate('/diseases')}
            className="px-6 py-3 clay-btn clay-btn-primary"
          >
            Know more
          </button>
        </div>
      </div>
    </section>
  );
};

export default Diseases;