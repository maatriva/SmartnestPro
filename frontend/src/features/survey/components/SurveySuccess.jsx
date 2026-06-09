import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function SurveySuccess() {
  return (
    <div className="min-h-screen bg-[#A8DADC] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full clay-card p-12 text-center"
      >
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-(--text-dark) mb-4">You're Amazing!</h2>
        <p className="text-(--text-light) mb-8 font-medium">
          Thank you for helping us shape the future of Maatriva. Your feedback is invaluable to us.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="w-full py-4 clay-btn clay-btn-primary"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
