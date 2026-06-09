import React from "react";
import { motion } from "framer-motion";

export default function SurveyProgress({ progress }) {
  return (
    <div className="fixed top-0 left-0 w-full h-2 bg-white/30 backdrop-blur-sm z-50">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-gradient-to-r from-(--primary) to-(--primary-light) shadow-[0_0_15px_rgba(74,111,165,0.4)]"
      />
    </div>
  );
}
