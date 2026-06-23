import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function SurveySuccess() {
  const [copied, setCopied] = useState(false);
  const code = "04UA-LYJZ-2ISM";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy code.");
    }
  };

  return (
    <div className="min-h-screen bg-(--bg) flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full bg-white rounded-[24px] shadow-[0_10px_30px_rgba(34,59,102,0.1)] p-8 md:p-10 flex flex-col items-center text-center relative border border-slate-100"
      >
        {/* Gift Icon Wrapper */}
        <div className="w-16 h-16 bg-[#EEF2FF] text-[#5A78D6] rounded-full flex items-center justify-center mb-6 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]">
          <Gift size={32} className="animate-bounce" style={{ animationDuration: '3s' }} />
        </div>

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-(--text-dark) mb-3 tracking-tight">
          Get Free Survey Responses
        </h2>

        {/* Description */}
        <p className="text-(--text-light) text-sm md:text-base leading-relaxed mb-6 font-medium">
          The following code gives you Karma that can be used to get free research participants at{" "}
          <a
            href="https://surveyswap.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5A78D6] hover:underline font-semibold"
          >
            SurveySwap.io
          </a>
          .
        </p>

        {/* Claim Karma Button */}
        <motion.a
          href="https://surveyswap.io/sr/04UA-LYJZ-2ISM"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#7B8FF8] to-[#5A78D6] text-white text-center font-bold rounded-2xl shadow-lg shadow-[#5A78D6]/25 hover:shadow-[#5A78D6]/35 transition-all duration-300 block text-base"
        >
          Claim Karma
        </motion.a>

        {/* Divider */}
        <div className="relative flex py-6 items-center w-full">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-4 text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">
            Or enter the code manually
          </span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* Code Box */}
        <div className="flex items-center justify-between w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 pl-5 mb-8">
          <span className="font-mono text-base md:text-lg font-bold tracking-wider text-(--text-dark) select-all">
            {code}
          </span>
          <motion.button
            onClick={handleCopy}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-xs text-(--text-dark) rounded-xl font-bold transition-all shadow-sm cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-500" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Footer */}
        <div className="text-xs text-slate-400 font-semibold tracking-wide mt-2">
          Powered by{" "}
          <a
            href="https://surveyswap.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-(--primary) transition-colors underline decoration-dotted"
          >
            SurveySwap.io
          </a>
        </div>
      </motion.div>
    </div>
  );
}
