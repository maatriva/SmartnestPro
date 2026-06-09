import React from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function TermsSectionCard({ sec }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full clay-badge text-(--primary) font-bold text-sm">
          {sec.num}
        </span>
        <h2 className="text-xl font-bold text-(--text-dark)">
          {sec.title}
        </h2>
      </div>
      
      <p className="text-base leading-relaxed text-(--text) font-medium pl-11">
        {sec.content}
      </p>

      {sec.bullets && (
        <ul className="list-disc pl-16 space-y-3">
          {sec.bullets.map((b, i) => (
            <li key={i} className="text-sm leading-relaxed text-(--text-light) font-medium">
              {b}
            </li>
          ))}
        </ul>
      )}

      {sec.alert && (
        <div className="ml-11 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex gap-3 items-start text-orange-800 text-sm leading-relaxed font-semibold">
          <Shield className="w-5 h-5 shrink-0 text-orange-600 mt-0.5" />
          <p>{sec.alert}</p>
        </div>
      )}
    </motion.div>
  );
}
