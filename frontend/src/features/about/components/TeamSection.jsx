import React from "react";
import TeamOrbit from "./TeamOrbit";

export default function TeamSection() {
  return (
    <section className="py-20 bg-(--bg) px-5 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl clay-card-static p-8 sm:p-12 lg:p-16 mb-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <div className="inline-block px-3 py-1.5 clay-badge text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              The Minds Behind Maatriva
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-(--text-dark) sm:text-4xl">
              Meet the Visionaries Behind Maatriva
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-(--text) lg:ml-auto font-semibold">
            A team of aspiring developers and innovators building the future of baby care through technology and AI.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <TeamOrbit />
      </div>
    </section>
  );
}
