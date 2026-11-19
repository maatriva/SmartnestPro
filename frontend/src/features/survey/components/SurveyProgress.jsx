import React from "react";
import { motion } from "framer-motion";

export default function SurveyProgress({ progress, page = 0, totalPages = 4 }) {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between text-xs font-semibold text-(--text-secondary) mb-2">
        <span>Section {page + 1} of {totalPages}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full h-2 rounded-full bg-(--border-card) overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full bg-(--brand-accent) rounded-full"
        />
      </div>
    </div>
  );
}
