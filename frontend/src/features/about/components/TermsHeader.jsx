import React from "react";
import { FileText } from "lucide-react";

export default function TermsHeader() {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-(--bg-canvas) border border-(--border-card) mb-3 text-(--brand-accent)">
        <FileText size={28} />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-(--text-primary) leading-tight font-display">
        Terms & Conditions
      </h1>
      <p className="text-sm text-(--text-secondary) font-normal mt-2">
        Last updated: June 2026 · Maatriva Smart Baby Cradle
      </p>
    </div>
  );
}
