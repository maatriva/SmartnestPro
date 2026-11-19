import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Camera,
  Waves,
  Activity,
  Brain,
  Mic,
  Users,
  FileText,
  ShieldCheck,
} from "lucide-react";
import cradleImage from "../../../features/images/withoutbaby.webp";

const PRODUCT_FEATURES = [
  {
    id: "camera",
    icon: Camera,
    title: "Live night-vision camera",
    description: "1080p HD video with invisible infrared night vision so you can check on your baby in the dark without turning on room lights.",
    spec: "1080p HD · Invisible IR LED",
  },
  {
    id: "motorized",
    icon: Waves,
    title: "Motorized cradle",
    description: "Smooth, automated rocking with calibrated speeds that soothe your baby back to sleep when movement or crying is detected.",
    spec: "Quiet motor · Auto-soothe",
  },
  {
    id: "vitals",
    icon: Activity,
    title: "Contactless vitals sensors",
    description: "Continuously tracks breathing rate, heart rate, skin temperature, and sleep cycles without any wires, bands, or wearable socks on your baby.",
    spec: "100% Non-contact · Zero wearables",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI monitoring",
    description: "Acoustic cry detection identifies when your baby needs attention, and sleep tracking shows how long they slept in each stage.",
    spec: "Cry alerts · Sleep tracking",
  },
  {
    id: "lullabies",
    icon: Mic,
    title: "Lullabies and voice recording",
    description: "Play soothing white noise, womb sounds, or your own recorded voice messages directly through the cradle speaker.",
    spec: "Parent voice · Calming sounds",
  },
  {
    id: "caregiver",
    icon: Users,
    title: "Caregiver access",
    description: "Share live access with grandparents, partners, or babysitters with permissions you can grant and revoke at any time.",
    spec: "Multi-device · Parent controlled",
  },
  {
    id: "reports",
    icon: FileText,
    title: "Report export",
    description: "Download summaries of vitals, sleep patterns, and night wakings to review with your pediatrician during check-ups.",
    spec: "PDF & CSV · Doctor ready",
  },
];

export default function ProductDetailsSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  return (
    <section
      id="product-details"
      ref={sectionRef}
      className="clay-section relative text-(--text-primary) bg-(--bg-canvas) pt-14 pb-20 sm:pt-20 sm:pb-24 overflow-hidden z-10"
      aria-label="The Maatriva Cradle and Features"
    >
      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header: Direct, Plain Language */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            The Maatriva cradle
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="mt-3 text-base sm:text-lg text-(--text-secondary) font-normal max-w-xl mx-auto leading-relaxed text-center [text-wrap:pretty]"
          >
            Built for infant comfort, contactless monitoring, and parent peace of mind.
          </motion.p>
        </div>

        {/* Varied Bento Layout: 6 cols centerpiece + asymmetric feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Cradle Centerpiece (6 cols on desktop) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4 }}
            className="md:col-span-2 lg:col-span-6 flex flex-col"
          >
            <div className="clay-card-light p-6 sm:p-8 rounded-2xl border border-(--border-card) bg-(--surface) shadow-sm flex flex-col justify-between h-full relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold text-(--brand-accent) bg-(--bg-canvas) px-3 py-1 rounded-full border border-(--border-card)">
                    Hardware & Sensors
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-(--text-secondary)">
                    <ShieldCheck size={14} className="text-(--brand-accent)" />
                    <span>Zero wearables required</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-(--text-primary) tracking-tight font-display mb-2">
                  Integrated non-contact infant cradle
                </h3>

                <p className="text-sm sm:text-base text-(--text-secondary) font-normal leading-relaxed mb-6">
                  Sensors, cameras, and soothing motors are integrated directly into the cradle frame, keeping your baby free from restrictive wires or bands.
                </p>
              </div>

              {/* Cradle Product Render / Visual Image (Clean layout, no card-in-card border nesting) */}
              <div className="relative py-4 flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
                <img
                  src={cradleImage}
                  alt="Maatriva smart infant cradle with breathable fabric and built-in sensors"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="450"
                  className="max-h-60 sm:max-h-72 w-auto object-contain drop-shadow-sm"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-(--border-card) flex items-center justify-between text-xs text-(--text-secondary) font-medium">
                <span>Solid, stable construction</span>
                <span className="text-(--brand-accent) font-semibold">Pediatric-safe materials</span>
              </div>
            </div>
          </motion.div>

          {/* Feature 1 & 2 (Right side 6 cols on desktop) */}
          <div className="md:col-span-2 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PRODUCT_FEATURES.slice(0, 2).map((feat, idx) => {
              const Icon = feat.icon;

              return (
                <motion.div
                  key={feat.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="flex flex-col h-full"
                >
                  <div className="clay-card-light p-6 sm:p-7 rounded-2xl border border-(--border-card) bg-(--surface) shadow-sm flex flex-col justify-between h-full group hover:shadow-md transition-[transform,box-shadow] duration-200">
                    <div>
                      <div className="w-11 h-11 rounded-xl bg-(--bg-canvas) text-(--brand-accent) flex items-center justify-center mb-4 border border-(--border-card)">
                        <Icon size={20} strokeWidth={2} />
                      </div>

                      <h4 className="text-lg font-bold text-(--text-primary) mb-2 font-display tracking-tight flex items-center [text-wrap:balance]">
                        {feat.title}
                      </h4>

                      <p className="text-sm text-(--text-secondary) leading-relaxed font-normal">
                        {feat.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-(--border-card) text-xs font-semibold text-(--brand-accent)">
                      {feat.spec}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Feature 3: Vitals Sensors spans full width of the right column */}
            <div className="sm:col-span-2">
              {(() => {
                const feat = PRODUCT_FEATURES[2];
                const Icon = feat.icon;

                return (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.35, delay: 0.16 }}
                    className="flex flex-col h-full"
                  >
                    <div className="clay-card-light p-6 sm:p-7 rounded-2xl border border-(--border-card) bg-(--surface) shadow-sm flex flex-col justify-between h-full group hover:shadow-md transition-[transform,box-shadow] duration-200">
                      <div>
                        <div className="w-11 h-11 rounded-xl bg-(--bg-canvas) text-(--brand-accent) flex items-center justify-center mb-4 border border-(--border-card)">
                          <Icon size={20} strokeWidth={2} />
                        </div>

                        <h4 className="text-lg font-bold text-(--text-primary) mb-2 font-display tracking-tight [text-wrap:balance]">
                          {feat.title}
                        </h4>

                        <p className="text-sm text-(--text-secondary) leading-relaxed font-normal">
                          {feat.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-(--border-card) text-xs font-semibold text-(--brand-accent)">
                        {feat.spec}
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>

          {/* Features 4, 5, 6, 7 (Bottom 4 cards in a 4-column row on desktop) */}
          {PRODUCT_FEATURES.slice(3).map((feat, idx) => {
            const Icon = feat.icon;

            return (
              <motion.div
                key={feat.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: idx * 0.06 }}
                className="md:col-span-1 lg:col-span-3 flex flex-col h-full"
              >
                <div className="clay-card-light p-6 sm:p-7 rounded-2xl border border-(--border-card) bg-(--surface) shadow-sm flex flex-col justify-between h-full group hover:shadow-md transition-[transform,box-shadow] duration-200">
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-(--bg-canvas) text-(--brand-accent) flex items-center justify-center mb-4 border border-(--border-card)">
                      <Icon size={20} strokeWidth={2} />
                    </div>

                    <h4 className="text-lg font-bold text-(--text-primary) mb-2 font-display tracking-tight flex items-center [text-wrap:balance]">
                      {feat.title}
                    </h4>

                    <p className="text-sm text-(--text-secondary) leading-relaxed font-normal">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-(--border-card) text-xs font-semibold text-(--brand-accent)">
                    {feat.spec}
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
