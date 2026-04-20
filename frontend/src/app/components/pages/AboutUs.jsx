import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { Footer } from "../Footer";
import withBabyImage from "../../images/withbaby.jpeg";
import withoutBabyImage from "../../images/withoutbaby.jpeg";
import withParentImage from "../../images/withParents.jpeg";
import { motion } from "motion/react";
import { validateEmail } from "../../utils/validation";

export default function AboutUs() {
  const albumImages = [
    { src: withBabyImage, alt: "Baby resting peacefully in smart cradle" },
    { src: withoutBabyImage, alt: "Smart Nest Pro cradle without baby" },
    { src: withParentImage, alt: "Parent caring for baby in Smart Nest Pro" },
    { src: withoutBabyImage, alt: "Smart Nest Pro setup view in room" }
  ];

  return (
    <div id="about-us" className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text)]">
      <Navbar />

      <main className="px-6 pt-3 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">Photo Album</h2>
            <p className="text-[var(--text)] mb-5">
              A quick look at Smart Nest Pro moments and setup.
            </p>

            <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--bg-glass)] backdrop-blur-xl shadow-[var(--shadow)] py-4">
              <div className="about-album-track flex gap-4 w-max px-4">
                {[...albumImages, ...albumImages].map((image, index) => (
                  <div
                    key={`${image.alt}-${index}`}
                    className="w-[320px] h-[190px] md:w-[420px] md:h-[240px] shrink-0 rounded-[var(--radius)] overflow-hidden border border-[var(--border)] bg-[var(--bg)]"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--white)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--white)] to-transparent" />
            </div>
          </section>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg-glass)] border border-[var(--border)] backdrop-blur rounded-full text-[var(--primary)] text-sm font-semibold mb-5">
            About Smart Nest Pro
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-5">
            Sleep Better, Parent Smarter
          </h1>
          <p className="text-[var(--text)] text-lg leading-relaxed mb-8 max-w-3xl">
            Smart Nest Pro helps parents build calmer routines using AI-driven
            insights, comfort automation, and a thoughtful product experience made
            for real homes and real schedules.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-3">Our mission</h2>
              <p className="text-[var(--text)] leading-relaxed">
                Make baby care more informed and less stressful through simple,
                dependable assistance.
              </p>
            </div>

            <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-3">What we build</h2>
              <p className="text-[var(--text)] leading-relaxed">
                A smart cradle system that combines monitoring, soothing support,
                and clear guidance for parents.
              </p>
            </div>

            <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-6">
              <h2 className="text-xl font-semibold text-[var(--text-dark)] mb-3">Our approach</h2>
              <p className="text-[var(--text)] leading-relaxed">
                Safety-first design, practical automation, and continuous
                improvements based on parent feedback.
              </p>
            </div>
          </div>

          <div className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-8 mb-8">
            <h2 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">What we focus on</h2>
            <ul className="space-y-3 text-[var(--text)]">
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[var(--primary)]" />
                Comfort-first soothing and environment awareness.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[var(--primary)]" />
                Clear insights and parent-friendly interactions.
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2 rounded-full bg-[var(--primary)]" />
                Ongoing improvement based on real feedback.
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-4 mb-20">

            <Link
              to="/survey"
              className="px-6 py-3 rounded-full font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] hover:shadow-[var(--shadow-primary)] transition-all"
            >
              Take Survey
            </Link>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
