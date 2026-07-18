import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import withParentImage from "../../images/withParents.jpeg";

export default function AboutHero() {
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
    <section className="relative min-h-[600px] sm:min-h-[720px] md:min-h-[760px] pt-36 flex items-end overflow-hidden">
      <img
        src={withParentImage}
        alt="Parents resting with their baby"
        width="1920"
        height="1080"
        fetchpriority="high"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pb-28">
        <motion.div
          initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={isMobile ? { duration: 0 } : { duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
            Redefining the First Dreams.
          </h1>
          <p className="mt-6 max-w-xl text-base sm:text-lg leading-8 text-white/90">
            A warm, inviting introduction to our mission of safe, smart
            sleep. At Maatriva, we believe every infant deserves a sanctuary
            of peace, and every parent deserves the confidence that comes
            with protective innovation.
          </p>
          <Link
            to="/#features"
            className="mt-9 px-8 py-4 rounded-full bg-(--primary) text-white font-medium hover:scale-105 hover:shadow-[0_8px_24px_rgba(20,184,166,0.35)] active:scale-95 transition-all duration-300 inline-block text-center"
          >
            Discover the Innovation
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
