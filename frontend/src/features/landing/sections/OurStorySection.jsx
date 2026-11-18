import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Heart, Sparkles, ArrowRight, ShieldCheck, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import supportingParentsImage from "../../images/supportingParents.webp";

export default function OurStorySection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });
  const imageY = useTransform(smoothProgress, [0, 1], [-25, 25]);
  const orbY = useTransform(smoothProgress, [0, 1], [35, -35]);

  return (
    <section
      id="our-story"
      ref={sectionRef}
      className="clay-section relative bg-(--bg)"
    >
      {/* Background Organic Blobs (Transform Only) */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-(--rose-clay) opacity-20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-(--honey-gold) opacity-15 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto clay-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Clay Illustrated Photo Frame with Layered Parallax */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: imageY }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="clay-card p-4 sm:p-5 relative overflow-hidden shadow-2xl"
            >
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/3] sm:aspect-square">
                <img
                  src={supportingParentsImage}
                  alt="Parents resting peacefully with baby"
                  width="800"
                  height="800"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-(--cocoa)/60 via-transparent to-transparent" />
                
                {/* Floating Clay Pill Status Inside Frame */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/95 shadow-md">
                  <div className="flex items-center gap-2 text-xs font-black text-(--primary) uppercase tracking-wider mb-0.5">
                    <Sparkles size={14} />
                    <span>Mindful MedTech Sanctuary</span>
                  </div>
                  <p className="text-xs text-(--text-dark) font-bold">
                    Safe, contactless sleep intelligence designed with pediatric care.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Orbiting Layered Parallax Heart Clay Orb */}
            <motion.div
              style={{ y: orbY }}
              className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#E28D6A] to-[#C26F4C] border-2 border-white/80 shadow-[inset_3px_3px_6px_rgba(255,255,255,0.7),0_10px_20px_rgba(217,130,95,0.35)] flex items-center justify-center text-white z-20 pointer-events-none"
            >
              <Heart size={26} className="fill-white drop-shadow" />
            </motion.div>
          </div>

          {/* Right Side: Our Story Narrative with Staggered Text Line Reveals */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 clay-badge text-xs sm:text-sm font-bold"
            >
              <Sparkles size={14} className="text-(--primary)" />
              <span>The Genesis</span>
            </motion.div>

            {/* Headline Line Reveal */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-(--text-dark) leading-tight"
            >
              Born from a Parent's Love,
              <br />
              <span className="text-(--primary)">Nurtured by AI.</span>
            </motion.h2>

            {/* Paragraph 1 Line Reveal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-(--text) leading-relaxed"
            >
              Maatriva started from a fundamental need: exhausted nights, fragile cries, and the deep instinct to give every newborn a safe haven. Early parenthood taught our founders that traditional nursery tech had not evolved to truly assist mothers and fathers when they need rest the most.
            </motion.p>

            {/* Paragraph 2 Line Reveal */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-(--text) leading-relaxed"
            >
              We asked: <em className="font-semibold text-(--text-dark)">What if a baby crib could sense discomfort before it turns into distress?</em> Incubated by leading research ecosystems—including <strong>IHFC at IIT Delhi</strong> and <strong>IIT Mandi Catalyst</strong>—Maatriva merges pediatric sleep science with intelligent robotics.
            </motion.p>

            {/* Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="clay-card-secondary p-5 sm:p-6 rounded-2xl flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-(--primary) text-white flex items-center justify-center shrink-0 shadow-sm">
                <Heart size={20} className="fill-white" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-bold italic text-(--text-dark)">
                  "Nurturing is our nature, innovation is our instrument."
                </p>
                <span className="text-xs text-(--text-light) font-semibold mt-1 block">
                  — The Founding Philosophy of Maatriva
                </span>
              </div>
            </motion.div>

            {/* Read More Link */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2"
            >
              <Link
                to="/about-us"
                className="clay-btn clay-btn-secondary px-7 py-3 text-sm sm:text-base font-bold inline-flex items-center gap-2 text-(--text-dark)"
              >
                <span>Meet the Team & Science</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
