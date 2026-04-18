import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Wind, Activity, Brain, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import "../../index.css";

const diseaseData = [
  {
    category: "Respiratory & Pulmonary",
    icon: <Wind className="w-6 h-6" />,
    diseases: [
      {
        name: "Bronchopulmonary Dysplasia",
        description: "A chronic lung disease seen in premature babies causing difficulty in breathing and low oxygen levels.",
        aiRole: "AI monitors irregular breathing patterns and detects oxygen drops early.",
      },
      {
        name: "Central Hypoventilation",
        description: "A rare condition where the baby fails to breathe properly during sleep.",
        aiRole: "Detects shallow breathing or apnea in real time and alerts instantly.",
      },
      {
        name: "Cystic Fibrosis",
        description: "A genetic disorder that causes thick mucus buildup in lungs leading to infections.",
        aiRole: "Tracks breathing rate spikes to predict early infections.",
      }
    ],
  },
  {
    category: "Cardiovascular (Heart)",
    icon: <Heart className="w-6 h-6" />,
    diseases: [
      {
        name: "Septal Defects (VSD/ASD)",
        description: "Holes in the heart that affect normal blood flow.",
        aiRole: "Monitors abnormal heart rate and fatigue indicators.",
      },
      {
        name: "Tetralogy of Fallot",
        description: "A combination of heart defects causing low oxygen levels.",
        aiRole: "Tracks heart rate stability during distress episodes.",
      },
      {
        name: "Arrhythmias",
        description: "Irregular heart rhythms (too fast or too slow).",
        aiRole: "Continuously monitors heart rate outside safe limits.",
      }
    ],
  },
  {
    category: "Neurological",
    icon: <Brain className="w-6 h-6" />,
    diseases: [
      {
        name: "Infantile Epilepsy",
        description: "A neurological disorder causing recurrent seizures due to abnormal brain activity.",
        aiRole: "Detects rhythmic distress movements during sleep.",
      },
      {
        name: "Hydrocephalus",
        description: "Fluid buildup in the brain that can increase pressure.",
        aiRole: "Monitors optimal head positioning for comfort.",
      }
    ]
  }
];

const ZeroGravityCard = ({ item, index, onSelect }) => {
  const duration = 6 + index;

  return (
    <motion.div
      onClick={() => onSelect(item)}
      className="cursor-pointer p-8 bg-[var(--bg-glass)] backdrop-blur-xl border border-[var(--border)] rounded-[var(--radius-lg)] shadow-[var(--shadow)] flex flex-col items-center justify-center text-center w-full max-w-[220px]"
      
      animate={{
        y: [0, -12, 0],
        x: [0, 6, 0],
        rotate: [0, 1.5, -1.5, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}

      whileHover={{
        scale: 1.05,
        y: -18,
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-12 h-12 bg-[var(--primary-light)] rounded-xl flex items-center justify-center mb-4">
        <Activity className="w-6 h-6 text-[var(--primary)]" />
      </div>

      <h3 className="text-sm font-bold text-[var(--text-dark)]">
        {item.name}
      </h3>
    </motion.div>
  );
};

export default function DetailedDiseases() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#A8DADC] text-[var(--text)] relative pb-24">
      
      {/* NAV */}
      <nav className="px-8 py-6">
        <Link to="/" className="flex items-center gap-2 text-[var(--primary)] font-bold">
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-6">
          Diseases We Monitor
        </h1>

        {diseaseData.map((section, sIdx) => (
          <div key={sIdx} className="mb-16">
            <div className="flex justify-center items-center gap-3 mb-8">
              {section.icon}
              <h2 className="text-xl font-semibold text-[var(--primary)]">
                {section.category}
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              {section.diseases.map((disease, i) => (
                <ZeroGravityCard
                  key={i}
                  item={disease}
                  index={i}
                  onSelect={setSelected}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 FAST MODAL */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Background */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelected(null)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[var(--bg-glass)] backdrop-blur-xl border border-[var(--border)] p-6 rounded-[var(--radius-lg)] max-w-md w-full shadow-2xl"
                
                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 40 }}
                transition={{ duration: 0.2 }}

                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-full hover:bg-[var(--bg-hover)] transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h2 className="text-xl font-bold mb-3 text-[var(--primary)]">
                  {selected.name}
                </h2>

                <p className="text-[var(--text)] mb-4">
                  {selected.description}
                </p>

                <div className="bg-[var(--bg-hover)] p-3 rounded">
                  🤖 {selected.aiRole}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}