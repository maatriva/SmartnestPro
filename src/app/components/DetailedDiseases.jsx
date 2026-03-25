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

import { motion } from "motion/react";

export default function DetailedDiseases() {
  const [openCard, setOpenCard] = useState(null);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text)] p-6">
      
      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-10 text-[var(--text-dark)]"
      >
        Diseases We Monitor
      </motion.h1>

      {diseaseData.map((section, idx) => (
        <div key={idx} className="mb-12 ">
          
          {/* Category Title */}
          <h2 className="text-2xl font-semibold text-[var(--primary)] mb-6">
            {section.category}
          </h2>

          {/* Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {section.diseases.map((disease, i) => {
              const isOpen = openCard === disease.name;

              return (
                <div
                  key={i}
                  className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] p-5 border border-[var(--border)] hover:border-[var(--primary)] shadow-[var(--shadow)] transition cursor-pointer"
                  onClick={() =>
                    setOpenCard(isOpen ? null : disease.name)
                  }
                >
                  {/* Disease Name */}
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-dark)]">
                    {disease.name}
                  </h3>

                  {/* Short Preview */}
                  {!isOpen && (
                    <p className="text-sm text-[var(--text-light)]">
                      Click to view details →
                    </p>
                  )}

                  {/* Expanded Info */}
                  {isOpen && (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm text-[var(--text)]">
                        {disease.description}
                      </p>

                      <div className="bg-[var(--bg-hover)] p-3 rounded-[var(--radius)] border border-[var(--primary-light)]">
                        <p className="text-sm text-[var(--primary)] font-medium">
                          🤖 {disease.aiRole}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      ))}

      {/* Warning Section */}
      <div className="mt-16 bg-[#FFEBEB] p-6 rounded-[var(--radius-lg)] border border-[#FF4D4D]">
        <h2 className="text-xl font-bold text-[#D00000] mb-3">
          ⚠️ Important Safety Notes
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm text-[#D00000]/90">
          <li>Not suitable for premature babies before skin development</li>
          <li>Avoid use with pacemakers or implants</li>
          <li>Do not expose directly to eyes for long durations</li>
        </ul>
      </div>
    </div>
  );
}