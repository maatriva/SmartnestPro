import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SurveyHeader({ showKarmaNote }) {
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
        {showKarmaNote && (
          <p className="text-(--text-light) text-xs mt-3 max-w-xl mx-auto italic opacity-85 font-medium">
            P.S.: This survey contains Karma to get free survey responses at{" "}
            <a 
              href="https://surveyswap.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-(--primary) transition-colors"
            >
              SurveySwap.io
            </a>
            .
          </p>
        )}
      </motion.div>
    </div>
  );
}
