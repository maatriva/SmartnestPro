import React, { useState, useMemo, useLayoutEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Wind, Activity, Brain, ArrowLeft, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import DiseaseSideNav from "./DiseaseSideNav";
import "../../index.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const diseaseData = [
  {
    category: "Cardiac & Cardiovascular",
    icon: <Heart className="w-5 h-5" />,
    diseases: [
      { name: "Congenital Heart Disease (CHD)", description: "Structural heart defects present at birth.", aiRole: "Detects abnormal HR patterns and temperature differences." },
      { name: "Patent Ductus Arteriosus (PDA)", description: "Failure of ductus arteriosus to close.", aiRole: "Tracks HRV trends and alerts on deviation." },
      { name: "Ventricular Septal Defect (VSD)", description: "Hole between heart ventricles.", aiRole: "Monitors tachycardia and breathing abnormalities." },
      { name: "Atrial Septal Defect (ASD)", description: "Hole between atria affecting blood flow.", aiRole: "Analyzes HRV variability patterns." },
      { name: "Coarctation of the Aorta", description: "Narrowing of the aorta affecting circulation.", aiRole: "Detects HR and HRV abnormalities." },
      { name: "Tetralogy of Fallot", description: "Complex heart defect causing low oxygen.", aiRole: "Combines HRV + thermal detection." },
      { name: "Hypoplastic Left Heart Syndrome", description: "Underdeveloped left heart.", aiRole: "Tracks weak BCG signals and low HRV." },
      { name: "Supraventricular Tachycardia", description: "Very fast heart rate condition.", aiRole: "Detects sudden HR spikes instantly." },
      { name: "Long QT Syndrome", description: "Electrical disorder affecting heart rhythm.", aiRole: "Analyzes waveform irregularities." },
      { name: "Neonatal Arrhythmias", description: "Irregular heartbeat patterns.", aiRole: "Continuous ECG-like monitoring." },
      { name: "Myocarditis", description: "Inflammation of heart muscle.", aiRole: "Tracks HR + BCG amplitude drop." },
      { name: "Cardiac Tamponade", description: "Fluid pressure around heart affecting function.", aiRole: "Detects HR-breathing mismatch." }
    ]
  },
  {
    category: "Respiratory Conditions",
    icon: <Wind className="w-5 h-5" />,
    diseases: [
      { name: "Apnea of Prematurity", description: "Breathing pauses in preterm infants.", aiRole: "Detects apnea events instantly." },
      { name: "Respiratory Distress Syndrome (RDS)", description: "Immature lungs causing breathing issues.", aiRole: "Monitors tachypnea + distress." },
      { name: "Transient Tachypnea (TTN)", description: "Temporary rapid breathing after birth.", aiRole: "Tracks prolonged breathing rate." },
      { name: "Bronchopulmonary Dysplasia", description: "Chronic lung disease.", aiRole: "Tracks long-term breathing + HRV." },
      { name: "Meconium Aspiration Syndrome", description: "Inhalation of meconium causing distress.", aiRole: "Detects irregular breathing patterns." },
      { name: "SIDS Risk", description: "Sudden unexplained death risk.", aiRole: "24/7 apnea monitoring." },
      { name: "BRUE", description: "Brief unexplained events.", aiRole: "Detects apnea + HR + posture changes." },
      { name: "ALTE", description: "Life-threatening breathing episodes.", aiRole: "Triggers immediate emergency alerts." },
      { name: "Laryngomalacia", description: "Soft airway causing noisy breathing.", aiRole: "Detects stridor in cry." },
      { name: "Tracheomalacia", description: "Weak airway collapsing during breathing.", aiRole: "Cry spectrogram + apnea detection." },
      { name: "Choanal Atresia", description: "Blocked nasal airway.", aiRole: "Detects breathing vs cry anomalies." },
      { name: "Cleft Palate (Respiratory)", description: "Structural defect affecting breathing.", aiRole: "Cry analysis for abnormal sound." },
      { name: "Pierre Robin Sequence", description: "Small jaw causing airway blockage.", aiRole: "Posture + apnea detection." },
      { name: "Obstructive Sleep Apnea", description: "Airway blockage during sleep.", aiRole: "Detects obstructive events." }
    ]
  },
  {
    category: "Neurological & Developmental",
    icon: <Brain className="w-5 h-5" />,
    diseases: [
      { name: "Hypoxic-Ischemic Encephalopathy", description: "Brain damage due to oxygen loss.", aiRole: "Detects HRV + cry + posture abnormalities." },
      { name: "Intraventricular Hemorrhage", description: "Brain bleeding in newborns.", aiRole: "Tracks HRV deterioration." },
      { name: "Periventricular Leukomalacia", description: "Brain white matter damage.", aiRole: "Detects posture asymmetry." },
      { name: "Neonatal Seizures", description: "Abnormal brain activity seizures.", aiRole: "HR spike + movement detection." },
      { name: "Cerebral Palsy", description: "Movement and posture disorder.", aiRole: "Tracks motor delay + posture." },
      { name: "Autism Spectrum Disorder", description: "Developmental communication disorder.", aiRole: "Cry + behavior analysis." },
      { name: "Global Developmental Delay", description: "Delayed milestones.", aiRole: "Tracks development over time." },
      { name: "Down Syndrome", description: "Chromosomal disorder.", aiRole: "Detects hypotonia + apnea." },
      { name: "Spinal Muscular Atrophy", description: "Muscle weakness disease.", aiRole: "Detects BCG amplitude decline." },
      { name: "Rett Syndrome", description: "Neurological disorder affecting girls.", aiRole: "Detects repetitive movement patterns." },
      { name: "Prader-Willi Syndrome", description: "Genetic disorder affecting growth.", aiRole: "Detects hypotonia + feeding issues." }
    ]
  },
  {
    category: "Temperature & Metabolic",
    icon: <Activity className="w-5 h-5" />,
    diseases: [
      { name: "Neonatal Hypothermia", description: "Low body temperature.", aiRole: "Auto heating + alerts." },
      { name: "Neonatal Hyperthermia", description: "High body temperature.", aiRole: "Detects fever patterns." },
      { name: "Cold Stress", description: "Pre-hypothermic condition.", aiRole: "Detects temperature gradients." },
      { name: "Sepsis (Thermal Marker)", description: "Temperature instability due to infection.", aiRole: "Thermal + HRV analysis." },
      { name: "Neonatal Jaundice", description: "High bilirubin levels.", aiRole: "Cry + thermal detection." },
      { name: "Necrotizing Enterocolitis", description: "Intestinal inflammation.", aiRole: "Thermal + HRV + apnea detection." },
      { name: "Hypothyroidism", description: "Low thyroid hormone.", aiRole: "Detects chronic cold patterns." },
      { name: "Hypoglycemia", description: "Low blood sugar.", aiRole: "Detects jitter + pallor." }
    ]
  },
  {
    category: "Infections & Disorders",
    icon: <Activity className="w-5 h-5" />,
    diseases: [
      { name: "Neonatal Sepsis", description: "Severe bloodstream infection.", aiRole: "Early detection via HRV + temp." },
      { name: "Neonatal Pneumonia", description: "Lung infection.", aiRole: "Tracks breathing + fever." },
      { name: "Meningitis", description: "Brain infection.", aiRole: "Cry + posture + fever detection." },
      { name: "Urinary Tract Infection", description: "Infection in urinary system.", aiRole: "Detects fever + irritability." },
      { name: "Viral Encephalitis", description: "Brain inflammation due to virus.", aiRole: "Seizure + fever detection." },
      { name: "COVID-19 / Viral Infection", description: "Respiratory viral illness.", aiRole: "Breathing + temp monitoring." },
      { name: "GBS Infection", description: "Bacterial infection in newborns.", aiRole: "Detects HRV changes early." }
    ]
  },
  {
    category: "Feeding & Nutritional",
    icon: <Activity className="w-5 h-5" />,
    diseases: [
      { name: "Hypoglycemia", description: "Low glucose levels.", aiRole: "Detects tremors + weak cry." },
      { name: "Iron Deficiency Anemia", description: "Low hemoglobin.", aiRole: "Tracks lethargy + pallor." },
      { name: "Vitamin D Deficiency", description: "Weak bones and growth delay.", aiRole: "Tracks milestones." },
      { name: "Vitamin K Deficiency", description: "Bleeding disorder.", aiRole: "Detects neurological signs." },
      { name: "Dehydration", description: "Fluid deficiency.", aiRole: "Detects HR + skin changes." },
      { name: "Failure to Thrive", description: "Poor growth.", aiRole: "Tracks activity + feeding." },
      { name: "Colic", description: "Excessive crying.", aiRole: "Cry pattern detection." },
      { name: "GERD", description: "Acid reflux.", aiRole: "Detects pain cry + posture." }
    ]
  }
];

const DiseaseCard = ({ name, icon, onSelect }) => {
  return (
    <motion.div
      onClick={onSelect}
      className="bg-[var(--white)] border border-[var(--border)] rounded-2xl p-6 shadow-sm hover:shadow-[var(--shadow-primary)] hover:border-[var(--primary)] transition-all cursor-pointer group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[var(--bg-secondary)] text-[var(--primary)] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[var(--primary)] group-hover:text-[var(--white)] transition-colors">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="font-bold text-[var(--text-dark)] leading-tight group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-xs text-[var(--text-light)] mt-2 font-medium tracking-wide">
            CLICK FOR DETAILS
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function DetailedDiseases() {
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  // ✅ FIXED: moved above useLayoutEffect
  const filteredData = useMemo(() => {
    if (!searchQuery) return diseaseData;

    return diseaseData
      .map((section) => ({
        ...section,
        diseases: section.diseases.filter(
          (d) =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((section) => section.diseases.length > 0);
  }, [searchQuery]);

  const categories = useMemo(() => filteredData.map((d) => d.category), [filteredData]);

  // 1. Initial Page Load Animations (Only runs once)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".registry-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 2. Continuous Scroll Trigger Monitoring (Updates when data changes)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = containerRef.current.querySelectorAll(".clinical-section");

      sections.forEach((section) => {
        const header = section.querySelector(".section-header");
        const cards = section.querySelectorAll(".disease-card-wrapper");

        if (header) {
          gsap.from(header, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: header,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            y: 40,
            opacity: 0,
            scale: 0.98,
            duration: 0.6,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }
      });
      
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [filteredData]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative text-[var(--text-dark)] selection:bg-[var(--primary)] selection:text-white"
    >
      <div className="fixed inset-0 bg-[var(--bg-glass)] backdrop-blur-md -z-10" />

      <DiseaseSideNav categories={categories} />

      {/* HEADER */}
      <div className="pb-12 relative overflow-hidden">
        <nav className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold bg-white/20 px-4 py-2 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2 px-4 py-2 bg-white/40 rounded-full text-xs font-black">
            <ShieldCheck className="w-4 h-4" />
            Clinical Protocol v2.4
          </div>
        </nav>

        <header className="registry-header max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-black mb-6 uppercase">
            Monitoring Registry
          </h1>

          <input
            type="text"
            placeholder="SEARCH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mt-6 px-6 py-4 rounded-2xl shadow-xl outline-none"
          />
        </header>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-8 pb-24">
        {filteredData.length > 0 ? (
          filteredData.map((section, sIdx) => (
            <section 
              key={sIdx} 
              id={section.category.toLowerCase().replace(/[^a-z0-9]/g, '-')}
              className="clinical-section mb-20 last:mb-0 scroll-mt-32 will-change-transform"
            >
              <div className="section-header flex items-center gap-4 mb-8">
                <div className="p-3 bg-[var(--primary)] text-[var(--white)] rounded-xl shadow-[var(--shadow)]">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black uppercase">
                  {section.category}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.diseases.map((disease, i) => (
                  <div key={i} className="disease-card-wrapper">
                    <DiseaseCard
                      name={disease.name}
                      icon={section.icon}
                      onSelect={() => setSelected(disease)}
                    />
                  </div>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center py-40">
            <h3 className="text-3xl font-black">No Results Found</h3>
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="bg-[var(--white)] text-[var(--text)] p-10 rounded-3xl max-w-xl w-full relative z-10 shadow-[var(--shadow-primary)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-[var(--text-light)] hover:text-[var(--primary)] transition-colors"
              >
                <X />
              </button>

              <h2 className="text-3xl font-black mb-6 text-[var(--text-dark)]">{selected.name}</h2>
              <p className="mb-4">{selected.description}</p>
              <p className="italic text-[var(--text-light)]">{selected.aiRole}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}