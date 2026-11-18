import { useRef } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  ShieldAlert, 
  Sparkles, 
  Activity, 
  BellRing, 
  ShieldCheck, 
  HeartHandshake,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import supportingParentsImage from "../../images/supportingParents.webp";

export default function SupportingParents() {
  const sectionRef = useRef(null);

  const safetyPillars = [
    {
      icon: <ShieldAlert className="text-(--primary)" size={26} />,
      title: "Contactless Respiratory & Apnea Alerts",
      description: "Continuous passive monitoring detects irregular breathing intervals or sudden temperature fluctuations instantly—without attaching any wires, socks, or wearable straps to your baby's delicate skin.",
      badge: "Clinical Safety",
    },
    {
      icon: <BellRing className="text-(--primary)" size={26} />,
      title: "Real-Time Cry Triage & Prompt Alerts",
      description: "Proprietary acoustic AI identifies the specific nature of every cry—distinguishing hunger, tiredness, colic pain, or distress—and alerts parents right away with clear recommended actions.",
      badge: "Smart Triage",
    },
    {
      icon: <Heart className="text-(--primary)" size={26} />,
      title: "Parent Peace of Mind & Better Sleep",
      description: "Nighttime anxiety is the leading cause of sleep deprivation for new parents. Maatriva's continuous background vigil allows parents to sleep soundly, knowing they will be alerted if baby stirs.",
      badge: "Parental Wellness",
    },
    {
      icon: <HeartHandshake className="text-(--primary)" size={26} />,
      title: "Maternal Mental Health & Caregiver Support",
      description: "Designed in collaboration with maternal health experts, the companion assistant helps recognize caregiver burnout, providing compassionate, evidence-based guidance during vulnerable postpartum months.",
      badge: "Maternal Care",
    },
  ];

  return (
    <section
      id="supporting-parents"
      ref={sectionRef}
      className="clay-section blend-features text-(--text)"
      aria-label="Safety, Critical Alerts, and Parent Peace of Mind"
    >
      {/* Decorative Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-(--primary) opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-(--primary) opacity-5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="clay-section-header"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 clay-badge text-xs sm:text-sm font-bold mb-3 border border-(--primary)/20">
            <ShieldCheck size={16} className="text-(--primary)" />
            <span>Safety & Trust</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight mb-3 font-display">
            Critical Alerts & Parent <br />
            <span className="text-(--primary)">Peace of Mind</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-(--text) font-medium max-w-2xl mx-auto leading-relaxed">
            Every feature in Maatriva is designed to keep your newborn safe and relieve late-night parental worry with clear, plain-language insights.
          </p>
        </motion.div>

        {/* Top Hero Trust Block: Photo in Clay Frame + Core Reassurance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-14">
          
          {/* Left Side: Photo Frame with High-Opacity Overlay Clay Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="clay-card p-4 sm:p-5 rounded-[36px] overflow-hidden shadow-2xl relative">
              <div className="relative rounded-[26px] overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src={supportingParentsImage}
                  alt="Mother and newborn resting peacefully with Maatriva smart monitoring"
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                
                {/* 85%+ Opacity Clay Scrim Panel for Guaranteed Legibility */}
                <div className="absolute inset-x-3 bottom-3 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white shadow-lg">
                  <div className="flex items-center gap-2 text-xs font-black text-(--primary) uppercase tracking-wider mb-1">
                    <Sparkles size={14} />
                    <span>Non-Invasive Infant Safeguard</span>
                  </div>
                  <p className="text-sm sm:text-base text-(--text-dark) font-bold leading-snug">
                    Zero wearable electrodes • 100% contactless peace of mind for whole family.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Reassurance Statement with High Contrast */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-block px-3.5 py-1 rounded-full bg-(--primary)/15 text-(--primary) text-xs font-bold uppercase tracking-wider">
              Pediatric Guidance
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-(--text-dark) leading-tight font-display">
              Intelligent Support Grounded in Clinical Infant Care
            </h3>

            <p className="text-base sm:text-lg text-(--text) leading-relaxed font-medium">
              More than a smart bassinet, Maatriva serves as a continuous guardian. It bridges infant sleep data with compassionate parental reassurance, turning complex biological signals into calm, actionable clarity.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="clay-card p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-(--primary) shrink-0" />
                <span className="text-sm sm:text-base font-bold text-(--text-dark)">Instant Apnea Threshold Alerts</span>
              </div>
              <div className="clay-card p-4 rounded-2xl flex items-center gap-3">
                <CheckCircle2 size={20} className="text-(--primary) shrink-0" />
                <span className="text-sm sm:text-base font-bold text-(--text-dark)">Encrypted Pediatric Data Vault</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Equal-Height Safety & Alert Cards (2x2 Grid on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {safetyPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="clay-card p-7 sm:p-8 rounded-3xl flex flex-col justify-between hover:scale-[1.01] transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-2xl clay-badge text-(--primary) shadow-xs">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-(--primary) bg-(--bg-secondary) px-3 py-1 rounded-full border border-(--primary)/15">
                    {pillar.badge}
                  </span>
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-(--text-dark) mb-3 font-display">
                  {pillar.title}
                </h4>

                <p className="text-base sm:text-lg text-(--text) leading-relaxed font-medium">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-(--border)/30 flex items-center gap-2 text-xs font-bold text-(--text-dark)">
                <span className="w-2 h-2 rounded-full bg-(--primary)" />
                <span>Active 24/7 Monitoring Protocol</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
