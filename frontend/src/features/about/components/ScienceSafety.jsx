import React from "react";
import { motion } from "motion/react";
import { scienceCards } from "../constants/aboutData";

export default function ScienceSafety() {
  return (
    <section className="py-20 clay-even-section px-5 sm:px-8 lg:px-12  mt-20">
      <div className="mx-auto max-w-7xl clay-card-secondary p-8 sm:p-12 lg:p-16">
        <div className="mx-auto max-w-2xl  text-center">
          <h2 className="text-3xl font-black text-(--text-dark) sm:text-4xl">
            The Science & Safety
          </h2>
          <p className="mt-4 text-sm leading-7 text-(--text) font-semibold">
            We leverage advanced robotics and AI to ensure your baby's
            safety and comfort, grounded in clinical research.
          </p>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {scienceCards.map(({ icon: Icon, title, copy }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="clay-card p-8 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center clay-badge text-(--text-dark)">
                <Icon size={24} />
              </div>
              <h3 className="mt-7 text-xl font-black text-(--text-dark)">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-(--text)">
                {copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
