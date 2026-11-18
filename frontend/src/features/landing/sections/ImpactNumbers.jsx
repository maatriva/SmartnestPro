import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, ShieldCheck, Heart, Moon, Radio } from "lucide-react";

function CounterItem({ end, suffix = "", decimals = 0, label, sublabel, icon: Icon, index }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const duration = 1800;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * end;
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="clay-card p-6 sm:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden group select-none h-full"
    >
      {/* Subtle Shine Sweep Effect across badge */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
        <div
          className="absolute -top-[50%] -left-[60%] w-[40%] h-[200%] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-[25deg] transition-transform duration-1000 ease-in-out group-hover:translate-x-[450%]"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Icon badge */}
      <div className="w-14 h-14 rounded-2xl clay-badge text-(--primary) flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
        <Icon size={26} strokeWidth={2.2} />
      </div>

      {/* Number Counter */}
      <div className="text-4xl sm:text-5xl font-black text-(--text-dark) font-display tracking-tight mb-2">
        {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
        <span className="text-(--primary)">{suffix}</span>
      </div>

      {/* Label */}
      <div className="text-base sm:text-lg font-bold text-(--text-dark)">
        {label}
      </div>

      {/* Sublabel */}
      <p className="text-xs sm:text-sm text-(--text-light) font-semibold mt-1">
        {sublabel}
      </p>
    </motion.div>
  );
}

export default function ImpactNumbers() {
  const metrics = [
    {
      end: 99.9,
      decimals: 1,
      suffix: "%",
      label: "BLE Mesh Uptime",
      sublabel: "Reliable non-stop vital monitoring",
      icon: Radio,
    },
    {
      end: 4,
      decimals: 0,
      suffix: "-in-1",
      label: "Cry Classification",
      sublabel: "Hungry, Tired, Colic, Wet Diaper",
      icon: Moon,
    },
    {
      end: 100,
      decimals: 0,
      suffix: "+",
      label: "Curated Lullabies",
      sublabel: "Pediatric white noise & soothing audio",
      icon: Sparkles,
    },
    {
      end: 2,
      decimals: 0,
      suffix: " Hubs",
      label: "Incubator Partners",
      sublabel: "IHFC at IIT Delhi & IIT Mandi Catalyst",
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="clay-section relative bg-(--bg)">
      <div className="max-w-7xl mx-auto clay-container relative z-10">
        
        {/* Header */}
        <div className="clay-section-header">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full clay-badge text-xs sm:text-sm font-bold mb-3">
            <Sparkles size={14} className="text-(--primary)" />
            <span>Proven Benchmarks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-(--text-dark) leading-tight mb-3">
            Engineered for Safety,
            <br />
            <span className="text-(--primary)">Measured in Peace of Mind</span>
          </h2>
          <p className="text-base sm:text-lg text-(--text-light) font-medium max-w-2xl mx-auto leading-relaxed">
            Validated by pediatric specialists and tested continuously across thousands of restful nights.
          </p>
        </div>

        {/* Counters Grid with subtle shine sweep and symmetric equal heights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {metrics.map((metric, index) => (
            <CounterItem key={index} {...metric} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
