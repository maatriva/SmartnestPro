import React from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsSectionCard({ sec }) {
  return (
    <motion.div
      id={`section-${sec.num}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="clay-card-light bg-(--surface) p-6 sm:p-8 rounded-2xl border border-(--border-card) shadow-sm space-y-4 scroll-mt-28"
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-(--bg-canvas) text-(--brand-accent) border border-(--border-card) font-bold text-sm shrink-0">
          {sec.num}
        </span>
        <h2 className="text-xl font-bold text-(--text-primary) font-display">
          {sec.title}
        </h2>
      </div>
      
      <p className="text-sm sm:text-base leading-relaxed text-(--text-secondary) font-normal pl-0 sm:pl-11 [text-wrap:pretty]">
        {sec.content}
      </p>

      {sec.bullets && (
        <ul className="list-disc pl-5 sm:pl-16 space-y-2.5">
          {sec.bullets.map((b, i) => (
            <li key={i} className="text-xs sm:text-sm leading-relaxed text-(--text-secondary) font-normal">
              {b}
            </li>
          ))}
        </ul>
      )}

      {sec.alert && (
        <div className="sm:ml-11 p-4 bg-[#FFF1EB] border border-(--brand-accent)/30 rounded-xl flex gap-3 items-start text-(--brand-accent) text-xs sm:text-sm leading-relaxed font-medium">
          <Shield className="w-5 h-5 shrink-0 text-(--brand-accent) mt-0.5" />
          <p className="text-(--text-primary)">{sec.alert}</p>
        </div>
      )}
    </motion.div>
  );
}
