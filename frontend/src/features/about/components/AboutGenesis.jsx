import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";

import withoutBabyImage from "../../images/withoutbaby.jpeg";

export default function AboutGenesis() {
  return (
    <section className="py-20 bg-(--bg) px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl clay-card p-8 sm:p-12 lg:p-16 grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1.5 clay-badge text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            The Genesis
          </div>
          <h2 className="mt-5 text-3xl font-black leading-tight text-(--text-dark) sm:text-4xl">
            Born from a Parent's Love
          </h2>
          <p className="mt-7 text-base leading-8 text-(--text)">
            Maatriva started from a fundamental parent's need for better
            rest and baby safety. Our founders, navigating the exhausted fog
            of early parenthood, realized that sleep technology had not kept
            pace with our understanding of infant wellness.
          </p>
          <p className="mt-5 text-base leading-8 text-(--text)">
            Driven by curiosity, creativity, and a vision for smarter parenting, we created Maatriva to explore how technology can make baby care safer, simpler, and more connected. Our goal is to build innovative solutions that support families through every step of their parenting journey.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full clay-badge text-(--text-dark)">
              <Heart size={20} />
            </div>
            <p className="text-sm italic text-(--text-dark)">
              "Nurturing is our nature, innovation is our instrument."
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="overflow-hidden clay-card w-full p-2"
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
