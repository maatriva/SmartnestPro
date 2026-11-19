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
      className="clay-section relative text-(--text-dark) bg-[#FFF6EE] pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden z-10"
      aria-label="The Maatriva Cradle and Features"
    >
      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Section Header: Direct, Plain Language, No Eyebrow Pills */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight font-display tracking-tight text-center [text-wrap:balance]"
          >
            The Maatriva cradle
          </motion.h2>

          <motion.p
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mt-3 text-base sm:text-lg md:text-xl text-(--text) font-medium max-w-xl mx-auto leading-relaxed text-center [text-wrap:balance]"
          >
            Built for infant comfort, contactless monitoring, and parent peace of mind.
          </motion.p>
        </div>

        {/* Symmetric Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Main Cradle Centerpiece (6 cols on desktop) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 lg:col-span-6 flex flex-col"
          >
            <div className="clay-card-blush p-6 sm:p-8 rounded-[36px] border-2 border-white/95 shadow-md flex flex-col justify-between h-full relative overflow-hidden group">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-(--primary) bg-white/80 px-3.5 py-1 rounded-full border border-(--primary)/20 shadow-xs">
                    Smart Hardware
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-(--text-dark)">
                    <ShieldCheck size={15} className="text-(--primary)" />
                    <span>Zero wearables required</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-(--text-dark) tracking-tight font-display mb-2">
                  Integrated non-contact infant cradle
                </h3>

                <p className="text-base text-(--text) font-medium leading-relaxed mb-6">
                  Sensors, cameras, and motors are built into the frame so your baby rests freely on clean, breathable surfaces without restrictive wires.
                </p>
              </div>

              {/* Cradle Product Render / Visual Image */}
              <div className="relative rounded-2xl overflow-hidden bg-white/70 border border-white/90 p-3 sm:p-4 shadow-inner flex items-center justify-center min-h-[220px] sm:min-h-[260px]">
                <img
                  src={cradleImage}
                  alt="Maatriva smart infant cradle with breathable fabric and built-in sensors"
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="450"
                  className="max-h-60 sm:max-h-72 w-auto object-contain drop-shadow-md group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              <div className="mt-6 pt-4 border-t border-(--terracotta)/15 flex items-center justify-between text-xs font-bold text-(--text-dark)">
                <span>Solid, stable construction</span>
                <span className="text-(--primary)">Pediatric-safe design</span>
              </div>
            </div>
          </motion.div>

          {/* Feature 1 & 2 (Right side 6 cols on desktop) */}
          <div className="md:col-span-2 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {PRODUCT_FEATURES.slice(0, 2).map((feat, idx) => {
              const Icon = feat.icon;

              return (
                <motion.div
                  key={feat.id}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col h-full"
                >
                  <div className="clay-card-blush p-6 sm:p-7 rounded-[32px] border-2 border-white/95 shadow-md flex flex-col justify-between h-full group hover:shadow-lg transition-shadow">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white text-(--primary) flex items-center justify-center mb-5 shadow-xs border border-white/80">
                        <Icon size={22} strokeWidth={2.2} />
                      </div>

                      <h4 className="text-xl font-bold text-(--text-dark) mb-2.5 font-display tracking-tight min-h-[3rem] flex items-center [text-wrap:balance]">
                        {feat.title}
                      </h4>

                      <p className="text-base text-(--text) leading-relaxed font-medium">
                        {feat.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-(--terracotta)/15 text-xs font-bold text-(--primary)">
                      {feat.spec}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Feature 3: Vitals Sensors spans full width of the right column for balance */}
            <div className="sm:col-span-2">
              {(() => {
                const feat = PRODUCT_FEATURES[2];
                const Icon = feat.icon;

                return (
                  <motion.div
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col h-full"
                  >
                    <div className="clay-card-blush p-6 sm:p-7 rounded-[32px] border-2 border-white/95 shadow-md flex flex-col justify-between h-full group hover:shadow-lg transition-shadow">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-white text-(--primary) flex items-center justify-center mb-5 shadow-xs border border-white/80">
                          <Icon size={22} strokeWidth={2.2} />
                        </div>

                        <h4 className="text-xl font-bold text-(--text-dark) mb-2.5 font-display tracking-tight [text-wrap:balance]">
                          {feat.title}
                        </h4>

                        <p className="text-base text-(--text) leading-relaxed font-medium">
                          {feat.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-(--terracotta)/15 text-xs font-bold text-(--primary)">
                        {feat.spec}
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>

          {/* Features 4, 5, 6, 7 (Bottom 4 cards in a symmetric 4-column row on desktop) */}
          {PRODUCT_FEATURES.slice(3).map((feat, idx) => {
            const Icon = feat.icon;

            return (
              <motion.div
                key={feat.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="md:col-span-1 lg:col-span-3 flex flex-col h-full"
              >
                <div className="clay-card-blush p-6 sm:p-7 rounded-[32px] border-2 border-white/95 shadow-md flex flex-col justify-between h-full group hover:shadow-lg transition-shadow">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white text-(--primary) flex items-center justify-center mb-5 shadow-xs border border-white/80">
                      <Icon size={22} strokeWidth={2.2} />
                    </div>

                    <h4 className="text-xl font-bold text-(--text-dark) mb-2.5 font-display tracking-tight min-h-[3rem] flex items-center [text-wrap:balance]">
                      {feat.title}
                    </h4>

                    <p className="text-base text-(--text) leading-relaxed font-medium">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-(--terracotta)/15 text-xs font-bold text-(--primary)">
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
