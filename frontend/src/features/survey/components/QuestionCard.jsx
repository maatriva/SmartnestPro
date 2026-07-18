import React from "react";
import { motion } from "framer-motion";

export default function QuestionCard({ q, qIndex, answers, handleChange }) {
  const currentAnswer = answers[qIndex];

  return (
    <div className="relative">
      <div className="flex items-start gap-4 mb-6">
        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-(--primary)/10 text-(--primary) flex items-center justify-center font-bold text-xs border border-(--primary)/20">
          {qIndex + 1}
        </span>
        <h4 className="text-xl md:text-2xl font-bold text-(--text-dark) leading-tight">
          {q.question || "Rate your response"}
        </h4>
      </div>

      <div className="ml-0 md:ml-10">
        {q.type === "range" ? (
          <div className="space-y-6 py-4">
            <input
              type="range"
              min="0"
              max={q.options.length - 1}
              step="1"
              value={q.options.indexOf(currentAnswer) !== -1 ? q.options.indexOf(currentAnswer) : 0}
              onChange={(e) => handleChange(qIndex, q.options[parseInt(e.target.value)], "radio")}
              aria-label={q.question}
              aria-valuetext={currentAnswer}
              className="w-full h-3 bg-white/50 backdrop-blur rounded-lg appearance-none cursor-pointer accent-(--text-dark) focus:outline-none focus:ring-2 focus:ring-(--primary-light)/50"
            />
            <div className="flex justify-between px-2 gap-1">
              {q.options.map((opt, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 flex-1 min-w-0">
                  <div className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${
                    currentAnswer === opt ? "bg-(--text-dark) scale-150" : "bg-gray-300"
                  }`} />
                  <span className={`text-[10px] sm:text-xs font-bold text-center break-words transition-all ${
                    currentAnswer === opt ? "text-(--text-dark) scale-110" : "text-gray-400"
                  }`}>
                    {opt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {q.options.map((opt, idx) => {
                const isSelected = q.type === "radio" 
                    ? currentAnswer === opt 
                    : currentAnswer?.includes(opt);

                return (
                  <button
                    key={idx}
                    onClick={() => handleChange(qIndex, opt, q.type)}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all duration-300 group/btn ${
                      isSelected 
                        ? "clay-btn clay-btn-primary text-white scale-[1.02]" 
                        : "clay-card text-(--text) bg-white/50"
                    }`}
                  >
                    <span className="font-semibold">{opt}</span>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected 
                        ? "clay-badge bg-white text-(--primary) scale-110" 
                        : "border-(--primary)/20 group-hover/btn:border-(--primary)/40 bg-white/40"
                    }`}>
                      {isSelected && (
                        q.type === "radio" 
                          ? <div className="w-3 h-3 rounded-full bg-(--text-dark)" />
                          : <div className="w-3 h-3 bg-(--text-dark) rounded-sm" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom input for Q8 (index 7) when Custom is selected */}
            {qIndex === 7 && currentAnswer?.includes("Custom") && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <label className="block text-sm font-black text-(--text-dark) mb-3 uppercase tracking-wider">
                  Please specify your baby care challenge:
                </label>
                <textarea
                  value={answers["7_custom"] || ""}
                  onChange={(e) => handleChange("7_custom", e.target.value, "text")}
                  placeholder="Describe your specific challenge here..."
                  rows={3}
                  className="w-full p-5 rounded-2xl border-2 clay-input focus:outline-none text-sm font-semibold shadow-inner leading-relaxed"
                />
              </motion.div>
            )}

            {/* Custom input for Q12 (index 11) when Custom is selected */}
            {qIndex === 11 && currentAnswer?.includes("Custom") && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <label className="block text-sm font-black text-(--text-dark) mb-3 uppercase tracking-wider">
                  Please specify other topics or features:
                </label>
                <textarea
                  value={answers["11_custom"] || ""}
                  onChange={(e) => handleChange("11_custom", e.target.value, "text")}
                  placeholder="features you would like"
                  rows={3}
                  className="w-full p-5 rounded-2xl border-2 clay-input focus:outline-none text-sm font-semibold shadow-inner leading-relaxed"
                />
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
