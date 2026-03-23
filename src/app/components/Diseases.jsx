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
    <div id="diseases" className="overflow-hidden bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white py-3 rounded-xl shadow-md">

<h1 className="text-2xl font-bold text-black text-center p-5 underline">Diseases That are Monitored by us </h1>
      <div className="flex whitespace-nowrap  marquee hover:[animation-play-state:paused]">
        {[...tickerData, ...tickerData].map((item, i) => (
          <div key={i} className="mx-8 text-lg border border-gray-300 rounded-full px-4 py-2 bg-white/20 backdrop-blur-sm">
            <div className="font-bold">{item.name}</div>
            <span className="opacity-90">{item.short}</span>
            <span className="mx-6">•</span>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center mt-6">
            <button
              to="/login"
              className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:shadow-lg transition-all font-semibold"
            >
              Know more  
            </button>
          </div>
    </div>
  );
};

export default Diseases;