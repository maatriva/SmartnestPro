import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SurveyHeader() {
  return (
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 clay-badge text-sm font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4" />
          Community Survey
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-(--text-dark) to-(--primary) bg-clip-text text-transparent">
          MAATRIVA Survey
        </h1>
        <p className="text-(--text-light) text-lg max-w-xl mx-auto font-medium">
          Join us in redefining baby care. Your insights help us build the perfect nest.
        </p>
      </motion.div>
    </div>
  );
}
