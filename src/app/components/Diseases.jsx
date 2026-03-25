import "../../styles/theme.css";

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
      <h1 className="text-2xl font-bold text-[var(--text-dark)] text-center p-5">
        Diseases That are Monitored by us
      </h1>

      {/* Marquee */}
      <div className="flex whitespace-nowrap marquee hover:[animation-play-state:paused]">
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
      </div>

      {/* Button */}
      <div className="flex w-full justify-center mt-6">
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
      </div>
    </div>
  );
};

export default Diseases;