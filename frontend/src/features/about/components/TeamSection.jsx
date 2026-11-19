import React from "react";
import TeamOrbit from "./TeamOrbit";

export default function TeamSection() {
  return (
    <section className="py-16 sm:py-20 bg-(--bg-canvas) px-4 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl clay-card-light bg-(--surface) p-6 sm:p-10 lg:p-12 rounded-2xl border border-(--border-card) shadow-sm mb-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h2 className="text-3xl font-bold leading-tight text-(--text-primary) sm:text-4xl font-display">
              The founding team behind Maatriva
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-(--text-secondary) lg:ml-auto font-normal">
            Engineers, researchers, and builders developing contactless infant monitoring with real hardware and clinical partners.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <TeamOrbit />
      </div>
    </section>
  );
}
