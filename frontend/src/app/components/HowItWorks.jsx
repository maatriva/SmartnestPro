import { Download, Settings, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Download,
    title: 'Setup & Connect',
    description: 'Unbox your Maatriva, plug it in, and connect to the mobile app in under 5 minutes.'
  },
  {
    number: '02',
    icon: Settings,
    title: 'Customize Settings',
    description: 'Set your preferences for rocking speed, music, temperature, and let AI learn your baby\'s patterns.'
  },
  {
    number: '03',
    icon: Zap,
    title: 'AI Takes Over',
    description: 'Our intelligent system automatically responds to your baby\'s needs with soothing motions and sounds.'
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Enjoy Peace of Mind',
    description: 'Relax knowing your baby is safe, comfortable, and sleeping soundly while you get the rest you deserve.'
  }
];

export function HowItWorks() {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".hiw-card");
      if (!cards.length) return;

      const first = cards[0];
      if (!first) return;

      // Make it look like "one card" initially by overlapping others onto the first card.
      // Layout stays the same; only transforms/opacity change.
      const firstRect = first.getBoundingClientRect();

      const overlapStates = cards.map((card, i) => {
        const r = card.getBoundingClientRect();
        const dx = firstRect.left - r.left;
        const dy = firstRect.top - r.top;
        return {
          x: dx,
          y: dy,
          rotation: (i - 2) * 8,
          scale: i === 0 ? 1 : 0.98,
          opacity: i === 0 ? 1 : 0,
        };
      });

      gsap.set(cards, {
        transformOrigin: "center",
        transformPerspective: 600,
        willChange: "transform,opacity",
      });
      cards.forEach((card, i) => gsap.set(card, overlapStates[i]));

      let expanded = false;
      const expandToNormal = () => {
        if (expanded) return;
        expanded = true;

        gsap.to(cards, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: { each: 0.06, from: "start" },
          overwrite: "auto",
          clearProps: "transform,opacity,willChange",
        });
      };

      // Trigger on scroll (once)
      ScrollTrigger.create({
        trigger: grid,
        start: "top 80%",
        once: true,
        onEnter: expandToNormal,
      });

      // Also allow hover to expand (once)
      const onHover = () => expandToNormal();
      first.addEventListener("mouseenter", onHover);

      return () => {
        first.removeEventListener("mouseenter", onHover);
      };
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="how-it-works" 
      className="py-24 px-6 bg-white/50 backdrop-blur-sm text-[var(--text)] overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          
          <div className="inline-block px-4 py-2 clay-badge text-sm font-bold mb-4">
            How It Works
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-6">
            Get started in
            <br />
            <span className="text-[var(--primary)]">
              4 simple steps
            </span>
          </h2>

          <p className="text-xl text-[var(--text-light)]">
            From unboxing to sweet dreams, we've made it incredibly easy to set up and use.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">

          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] 
          bg-[var(--border)] -translate-y-1/2"></div>

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative h-full"
              >

                <div className="hiw-card h-full clay-card p-8 flex flex-col"
                >

                  {/* Step Number */}
                  <div className="absolute -top-6 left-6 w-12 h-12 clay-btn clay-btn-primary flex items-center justify-center text-white font-black text-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className="inline-flex p-4 clay-badge">
                      <step.icon
                        className="w-8 h-8 text-[var(--primary)]"
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                    {step.title}
                  </h3>

                  <p className="text-[var(--text-light)] leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}