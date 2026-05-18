import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";

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
  const [currentIndices, setCurrentIndices] = useState(() =>
    Object.fromEntries(diseaseData.map((_, i) => [i, 0]))
  );
  const sectionCardRefs = useRef([]);

  useEffect(() => {
    diseaseData.forEach((_, sectionIdx) => {
      const items = (sectionCardRefs.current[sectionIdx] || []).filter(Boolean);
      if (!items.length) return;

      const currentIndex = currentIndices[sectionIdx] ?? 0;

      items.forEach((item, i) => {
        const offset = i - currentIndex;
        gsap.to(item, {
          rotateY: offset * -30,
          z: offset === 0 ? 50 : -Math.abs(offset) * 30,
          scale: offset === 0 ? 1.2 : 0.85,
          duration: 0.2,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      });
    });
  }, [currentIndices]);

  useEffect(() => {
    return () => {
      sectionCardRefs.current
        .flat()
        .filter(Boolean)
        .forEach((item) => gsap.killTweensOf(item));
    };
  }, []);

  const setActiveIndex = (sectionIdx, cardIdx) => {
    setCurrentIndices((prev) => ({
      ...prev,
      [sectionIdx]: cardIdx,
    }));
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text)] px-6 py-10 md:py-14 shadow-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-4 text-[var(--text-dark)]"
        >
          Diseases We Monitor
        </motion.h1>
        <p className="text-center text-[var(--text-light)] mb-10">
          Hover a card to focus it. Click to see details.
        </p>

        {diseaseData.map((section, idx) => (
          <section
            key={idx}
            className="mb-10 md:mb-12 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl p-6 md:p-8 shadow-[var(--shadow)]"
          >
            {/* Category Title */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-semibold text-[var(--primary)]">
                {section.category}
              </h2>
              <div className="text-xs text-[var(--text-light)]">
                {section.diseases.length} conditions
              </div>
            </div>

            {/* Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6"
              style={{ perspective: "900px" }}
            >
            {section.diseases.map((disease, i) => {
              const isOpen = openCard === disease.name;

              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (!sectionCardRefs.current[idx]) {
                      sectionCardRefs.current[idx] = [];
                    }
                    sectionCardRefs.current[idx][i] = el;
                  }}
                  className="card bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] p-5 border border-[var(--border)] hover:border-[var(--primary)] shadow-[var(--shadow)] hover:shadow-2xl transition cursor-pointer [transform-style:preserve-3d] min-h-[170px] outline-none focus:border-[var(--primary)]"
                  onMouseEnter={() => setActiveIndex(idx, i)}
                  onFocus={() => setActiveIndex(idx, i)}
                  onClick={() =>
                    setOpenCard(isOpen ? null : disease.name)
                  }
                  tabIndex={0}
                >
                  {/* Disease Name */}
                  <h3 className="text-lg font-semibold mb-2 text-[var(--text-dark)]">
                    {disease.name}
                  </h3>

                  {/* Short Preview */}
                  {!isOpen && (
                    <p className="text-sm text-[var(--text-light)]">
                      Click to view details ÔåÆ
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
                          ­ƒñû {disease.aiRole}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            </motion.div>
          </section>
        ))}

        {/* Warning Section */}
        <div className="mt-12 bg-[#FFEBEB] p-6 rounded-[var(--radius-lg)] border border-[#FF4D4D]">
          <h2 className="text-xl font-bold text-[#D00000] mb-3">
            ÔÜá´©Å Important Safety Notes
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-sm text-[#D00000]/90">
            <li>Not suitable for premature babies before skin development</li>
            <li>Avoid use with pacemakers or implants</li>
            <li>Do not expose directly to eyes for long durations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
