import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Wind, Activity, Brain, ArrowLeft, Search, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import "../../index.css";

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
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#A8DADC] transition-all cursor-pointer group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#A8DADC]/10 text-[#4A6FA5] rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#A8DADC] group-hover:text-white transition-colors">
          {icon}
        </div>
        <div className="text-left">
          <h3 className="font-bold text-gray-900 leading-tight group-hover:text-[#4A6FA5] transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide">CLICK FOR DETAILS</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function DetailedDiseases() {
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery) return diseaseData;
    
    return diseaseData.map(section => ({
      ...section,
      diseases: section.diseases.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(section => section.diseases.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text-dark)] selection:bg-[var(--primary)] selection:text-white">
      
      {/* HEADER SECTION */}
      <div className="pb-12 relative overflow-hidden">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <nav className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center relative z-10">
          <Link to="/" className="flex items-center gap-2 font-bold text-[var(--text-dark)] hover:opacity-80 transition-opacity bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/40 rounded-full text-xs font-black uppercase tracking-widest text-[var(--text-dark)] backdrop-blur-md border border-white/20">
            <ShieldCheck className="w-4 h-4" />
            Clinical Protocol v2.4
          </div>
        </nav>

        <header className="max-w-4xl mx-auto px-6 pt-8 pb-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-[var(--text-dark)] mb-6 tracking-tighter uppercase">
            Monitoring Registry
          </h1>
          <p className="text-[var(--text-dark)]/70 text-xl mb-12 max-w-2xl mx-auto font-semibold leading-relaxed">
            Real-time diagnostic coverage for neonatal care. Powered by Smart Nest Pro AI.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-[var(--text-dark)]/40" />
            <input 
              type="text"
              placeholder="SEARCH CLINICAL CONDITIONS OR SYMPTOMS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border-none outline-none focus:ring-4 focus:ring-[var(--primary)]/20 transition-all text-[var(--text-dark)] placeholder:text-[var(--text-dark)]/30 font-bold text-sm tracking-wider"
            />
          </div>
        </header>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-8 pb-24 relative z-20">
        {filteredData.length > 0 ? (
          filteredData.map((section, sIdx) => (
            <section key={sIdx} className="mb-20 last:mb-0">
              <div className="flex items-center gap-4 mb-8 border-b border-[var(--text-dark)]/10 pb-4">
                <div className="p-3 bg-[var(--text-dark)] text-white rounded-2xl shadow-lg">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-black text-[var(--text-dark)] uppercase tracking-tighter">
                  {section.category}
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--text-dark)]/20 to-transparent ml-4" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.diseases.map((disease, i) => (
                  <DiseaseCard
                    key={i}
                    name={disease.name}
                    icon={section.icon}
                    onSelect={() => setSelected(disease)}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="py-40 text-center">
            <Activity className="w-20 h-20 text-[var(--text-dark)] opacity-10 mx-auto mb-6" />
            <h3 className="text-3xl font-black text-[var(--text-dark)] uppercase">No Intelligence Matches</h3>
            <p className="text-[var(--text-dark)]/50 mt-2 font-bold uppercase tracking-widest text-xs">Refine your search parameters</p>
          </div>
        )}
      </div>

      <footer className="py-20 text-center bg-white/10 backdrop-blur-sm border-t border-white/10">
        <div className="text-[var(--text-dark)] font-black uppercase tracking-[0.4em] text-[10px] opacity-40">
          Smart Nest Pro Clinical System • Secure Data Layer
        </div>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              className="absolute inset-0 bg-[var(--text-dark)]/60 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="bg-white rounded-[3rem] max-w-xl w-full shadow-[0_30px_100px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-3 bg-gradient-to-r from-[var(--primary)] to-[var(--bg-secondary)]" />
              <div className="p-10 sm:p-14">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-16 h-16 bg-[var(--bg-secondary)] text-[var(--text-dark)] rounded-[1.5rem] flex items-center justify-center shadow-inner">
                    <ShieldCheck className="w-9 h-9" />
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-3 rounded-full hover:bg-gray-100 transition-colors group"
                  >
                    <X className="w-7 h-7 text-gray-300 group-hover:text-[var(--text-dark)]" />
                  </button>
                </div>

                <h2 className="text-4xl font-black text-[var(--text-dark)] mb-8 leading-none tracking-tighter uppercase">
                  {selected.name}
                </h2>

                <div className="space-y-12">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-[var(--text-light)] tracking-[0.4em] mb-4">Registry Data</h4>
                    <p className="text-[var(--text-dark)]/80 text-xl border-l-4 border-[var(--bg-secondary)] pl-6 leading-relaxed font-medium">
                      {selected.description}
                    </p>
                  </div>

                  <div className="bg-[var(--bg-secondary)]/10 p-8 rounded-[2rem] border border-[var(--bg-secondary)]/20 relative">
                    <div className="absolute top-4 right-6 text-[var(--bg-secondary)] opacity-30">
                      <Brain className="w-12 h-12" />
                    </div>
                    <h4 className="flex items-center gap-3 text-[10px] font-black uppercase text-[var(--primary)] tracking-[0.3em] mb-5">
                      Intervention AI
                    </h4>
                    <p className="text-[var(--text-dark)] font-bold italic text-xl leading-relaxed pr-8">
                      "{selected.aiRole}"
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelected(null)}
                  className="w-full mt-12 py-6 bg-[var(--text-dark)] text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl text-xs"
                >
                  Close Specification
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}