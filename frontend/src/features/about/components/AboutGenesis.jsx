import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

import withoutBabyImage from "../../images/withoutbaby.jpeg";

export default function AboutGenesis() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-(--bg-canvas) px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl clay-card-light bg-(--surface) p-6 sm:p-10 lg:p-14 rounded-2xl border border-(--border-card) shadow-sm grid items-center gap-10 lg:gap-14 lg:grid-cols-[1fr_1.05fr]">
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
          transition={isMobile ? { duration: 0 } : { duration: 0.4 }}
        >
          <h2 className="text-3xl font-bold leading-tight text-(--text-primary) sm:text-4xl font-display">
            Born from a Parent's Need
          </h2>
          <p className="mt-5 text-base leading-relaxed text-(--text-secondary) font-normal">
            Maatriva started from a simple need: better rest for parents and continuous, gentle safety for newborn infants. Navigating the exhaustion of the early postpartum months, our team set out to engineer non-contact monitoring that avoids uncomfortable wearable wires.
          </p>
          <p className="mt-4 text-base leading-relaxed text-(--text-secondary) font-normal">
            Supported by robotics and medical researchers at IHFC IIT Delhi and IIT Mandi Catalyst, we focus on safe materials, calibrated soothing, and clear vitals logs you can share with your pediatrician.
          </p>
          <div className="mt-7 flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--bg-canvas) text-(--brand-accent) border border-(--border-card)">
              <Heart size={18} />
            </div>
            <p className="text-sm font-medium text-(--text-primary)">
              Built with biomedical engineers and tested with parents.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: isMobile ? "0px" : "-100px" }}
          transition={isMobile ? { duration: 0 } : { duration: 0.4, delay: 0.1 }}
          className="overflow-hidden rounded-xl border border-(--border-card) w-full p-2 bg-(--bg-canvas)"
        >
        <img
          src={withoutBabyImage}
          alt="Smart Maatriva cradle in a nursery"
          width="800"
          height="560"
          loading="lazy"
          className="h-[360px] w-full object-cover sm:h-[480px] lg:h-[560px] rounded-2xl"
        />
        </motion.div>
      </div>
    </section>
  );
}
