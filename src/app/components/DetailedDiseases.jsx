import { useState } from "react";

const diseaseData = [
  {
    category: "Respiratory & Pulmonary",
    diseases: [
      {
        name: "Bronchopulmonary Dysplasia (BPD)",
        description:
          "A chronic lung disease seen in premature babies causing difficulty in breathing and low oxygen levels.",
        aiRole:
          "AI monitors irregular breathing patterns and detects oxygen drops early.",
      },
      {
        name: "Congenital Central Hypoventilation Syndrome (CCHS)",
        description:
          "A rare condition where the baby fails to breathe properly during sleep.",
        aiRole:
          "Detects shallow breathing or apnea in real time and alerts instantly.",
      },
      {
        name: "Cystic Fibrosis (CF)",
        description:
          "A genetic disorder that causes thick mucus buildup in lungs leading to infections.",
        aiRole:
          "Tracks breathing rate spikes to predict early infections.",
      },
      {
        name: "Infantile Sleep Apnea",
        description:
          "Breathing repeatedly stops during sleep (central or obstructive).",
        aiRole:
          "Detects breathing pauses and sends emergency alerts.",
      },
    ],
  },

  {
    category: "Cardiovascular (Heart)",
    diseases: [
      {
        name: "Septal Defects (VSD/ASD)",
        description:
          "Holes in the heart that affect normal blood flow.",
        aiRole:
          "Monitors abnormal heart rate and fatigue indicators.",
      },
      {
        name: "Tetralogy of Fallot",
        description:
          "A combination of heart defects causing low oxygen levels.",
        aiRole:
          "Tracks heart rate stability during distress episodes.",
      },
      {
        name: "Patent Ductus Arteriosus (PDA)",
        description:
          "A heart condition where a vessel fails to close after birth.",
        aiRole:
          "Detects abnormal heart workload and breathing stress.",
      },
      {
        name: "Arrhythmias",
        description:
          "Irregular heart rhythms (too fast or too slow).",
        aiRole:
          "Continuously monitors heart rate outside safe limits.",
      },
    ],
  },
];

export default function DetailedDiseases() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Diseases We Monitor
      </h1>

      {diseaseData.map((section, idx) => (
        <div key={idx} className="mb-12">
          
          {/* Category Title */}
          <h2 className="text-2xl text-purple-400 mb-6">
            {section.category}
          </h2>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.diseases.map((disease, i) => {
              const isOpen = openCard === disease.name;

              return (
                <div
                  key={i}
                  className="bg-[#141a2e] rounded-xl p-5 border border-gray-700 hover:border-purple-400 transition cursor-pointer"
                  onClick={() =>
                    setOpenCard(isOpen ? null : disease.name)
                  }
                >
                  {/* Disease Name */}
                  <h3 className="text-lg font-semibold mb-2">
                    {disease.name}
                  </h3>

                  {/* Short Preview */}
                  {!isOpen && (
                    <p className="text-sm text-gray-400">
                      Click to view details →
                    </p>
                  )}

                  {/* Expanded Info */}
                  {isOpen && (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm text-gray-300">
                        {disease.description}
                      </p>

                      <div className="bg-purple-600/20 p-3 rounded-lg border border-purple-500">
                        <p className="text-sm text-purple-300">
                          🤖 {disease.aiRole}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Warning Section */}
      <div className="mt-16 bg-red-900/30 p-6 rounded-xl border border-red-500">
        <h2 className="text-xl font-bold text-red-400 mb-3">
          ⚠️ Important Safety Notes
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
          <li>Not suitable for premature babies before skin development</li>
          <li>Avoid use with pacemakers or implants</li>
          <li>Do not expose directly to eyes for long durations</li>
        </ul>
      </div>
    </div>
  );
}