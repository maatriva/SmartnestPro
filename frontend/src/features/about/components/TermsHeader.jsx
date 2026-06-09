import React from "react";
import { FileText } from "lucide-react";

export default function TermsHeader() {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center p-3 rounded-2xl clay-badge mb-4 text-(--primary)">
        <FileText size={32} />
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-(--text-dark) leading-tight">
        Terms & Conditions
      </h1>
      <p className="text-(--text-light) font-medium mt-3">
        Last updated: June 2026 • Maatriva Smart Baby Cradle
      </p>
    </div>
  );
}
