import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Check, AlertCircle } from "lucide-react";

export default function QuestionCard({ q, qIndex, answers, handleChange }) {
  const currentAnswer = answers[qIndex];
  const otherAnswer = answers[`${qIndex}_other`] || "";
  const isPriority = Boolean(q.isPriority);
  const isOptional = q.required === false;

  // Selected count for checkbox (Q6)
  const selectedCheckboxCount = Array.isArray(currentAnswer) ? currentAnswer.length : 0;
  const maxSelections = q.maxSelections || 2;

  return (
    <div
      className={`relative transition-all duration-300 rounded-3xl ${
        isPriority
          ? "p-6 sm:p-8 bg-gradient-to-br from-white/90 via-[#F3F7FA]/80 to-[#EBF3FF]/60 border-2 border-(--primary)/40 shadow-[0_10px_30px_rgba(90,120,214,0.12),inset_0_2px_4px_rgba(255,255,255,0.9)] ring-1 ring-(--primary)/20"
          : "p-4 sm:p-6 bg-white/40 border border-white/60 rounded-3xl backdrop-blur-sm"
      }`}
    >
      {/* Priority Badge */}
      {isPriority && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-(--primary) text-white shadow-sm mb-4">
          <Star size={13} className="fill-white" />
          Key Evaluation Question
        </div>
      )}

      {/* Header: Question Number, Title, Instructions & Required Status */}
      <div className="flex items-start gap-3 sm:gap-4 mb-3">
        <span
          className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm border transition-all ${
            isPriority
              ? "bg-(--primary) text-white border-(--primary) shadow-sm"
              : "bg-(--primary)/10 text-(--primary) border-(--primary)/20"
          }`}
        >
          {q.number || `Q${qIndex + 1}`}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <h4 className="text-lg sm:text-xl font-bold text-(--text-dark) leading-snug">
              {q.question}
            </h4>
            {isOptional ? (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
                Optional
              </span>
            ) : (
              <span className="text-xs font-semibold text-red-500 flex items-center gap-0.5" title="Required question">
                *
              </span>
            )}
          </div>

          {/* Sub-instruction label */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-(--text-light)">
            <span className="px-2.5 py-1 rounded-lg bg-white/70 border border-black/5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
              {q.instruction || (q.type === "checkbox" ? `Select up to ${maxSelections}` : "Choose ONE")}
            </span>
            {q.type === "checkbox" && (
              <span
                className={`transition-colors ${
                  selectedCheckboxCount === maxSelections
                    ? "text-(--primary) font-black"
                    : "text-(--text-light)"
                }`}
              >
                ({selectedCheckboxCount} of {maxSelections} selected)
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 sm:ml-11">
        {/* =========================================================
            1) SCALE RATING (1-5 or 0-10)
           ========================================================= */}
        {q.type === "scale" && (
          <div className="space-y-4">
            {/* Number buttons row */}
            <div
              className={
                q.scaleMax === 10
                  ? "grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2"
                  : "grid grid-cols-5 gap-2 sm:gap-3"
              }
            >
              {q.options.map((opt) => {
                const isSelected = String(currentAnswer) === String(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleChange(qIndex, opt, "scale")}
                    aria-pressed={isSelected}
                    className={`py-3 sm:py-3.5 px-2 rounded-2xl font-black text-sm sm:text-base transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
                      isSelected
                        ? "clay-btn clay-btn-primary text-white scale-105 shadow-md ring-2 ring-white"
                        : "clay-card bg-white/70 hover:bg-white text-(--text-dark) border border-white/60 hover:scale-102"
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* End Labels (Min & Max) */}
            <div className="flex justify-between items-start pt-2 px-1 text-xs font-bold text-(--text-light) gap-4">
              <span className="max-w-[45%] text-left leading-relaxed">
                {q.minLabel || `${q.scaleMin} = Lowest`}
              </span>
              <span className="max-w-[45%] text-right leading-relaxed">
                {q.maxLabel || `${q.scaleMax} = Highest`}
              </span>
            </div>

            {/* Selected confirmation preview */}
            {currentAnswer !== undefined && currentAnswer !== null && currentAnswer !== "" && (
              <div className="pt-1 flex items-center justify-end">
                <span className="text-xs font-bold text-(--primary) bg-(--primary)/10 px-3 py-1 rounded-full border border-(--primary)/20">
                  Selected score: {currentAnswer} / {q.scaleMax}
                </span>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            2) SINGLE-CHOICE RADIO BUTTONS
           ========================================================= */}
        {q.type === "radio" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {q.options.map((opt, idx) => {
                const isSelected = currentAnswer === opt;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleChange(qIndex, opt, "radio")}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer group/btn ${
                      isSelected
                        ? "clay-btn clay-btn-primary text-white scale-[1.01] shadow-md"
                        : "clay-card text-(--text-dark) bg-white/60 hover:bg-white/90 border-white/80"
                    }`}
                  >
                    <span className="font-semibold text-sm sm:text-base leading-snug pr-3">
                      {opt}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? "bg-white text-(--primary) border-white shadow-inner scale-105"
                          : "border-(--primary)/30 group-hover/btn:border-(--primary)/60 bg-white/50"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-(--primary)" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Input for "Other" */}
            {q.hasOther && currentAnswer === "Other" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2"
              >
                <label className="block text-xs font-bold text-(--text-dark) mb-2 uppercase tracking-wider">
                  Please specify your answer:
                </label>
                <input
                  type="text"
                  value={otherAnswer}
                  onChange={(e) => handleChange(qIndex, e.target.value, "other_text")}
                  placeholder="Type your specific response here..."
                  className="w-full px-4 py-3.5 rounded-2xl border-2 clay-input text-sm font-semibold shadow-inner focus:outline-none focus:ring-2 focus:ring-(--primary)/30"
                />
              </motion.div>
            )}
          </div>
        )}

        {/* =========================================================
            3) CHECKBOX BUTTONS (Q6 with max selections constraint)
           ========================================================= */}
        {q.type === "checkbox" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {q.options.map((opt, idx) => {
                const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(opt);
                const isMaxReached = selectedCheckboxCount >= maxSelections && !isSelected;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleChange(qIndex, opt, "checkbox")}
                    className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer group/btn ${
                      isSelected
                        ? "clay-btn clay-btn-primary text-white scale-[1.01] shadow-md"
                        : isMaxReached
                        ? "clay-card text-gray-500 bg-white/30 opacity-75 border-dashed border-gray-300 hover:opacity-90"
                        : "clay-card text-(--text-dark) bg-white/60 hover:bg-white/90 border-white/80"
                    }`}
                  >
                    <span className="font-semibold text-sm sm:text-base leading-snug pr-3">
                      {opt}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all ${
                        isSelected
                          ? "bg-white text-(--primary) border-white shadow-inner scale-105"
                          : "border-(--primary)/30 group-hover/btn:border-(--primary)/60 bg-white/50"
                      }`}
                    >
                      {isSelected && (
                        <Check size={16} className="text-(--primary) stroke-[3]" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedCheckboxCount === maxSelections && (
              <p className="text-xs text-(--text-light) italic font-medium">
                Tip: You have selected the maximum 2 features. Click a selected feature to deselect it before picking another.
              </p>
            )}
          </div>
        )}

        {/* =========================================================
            4) OPEN-ENDED TEXTAREA (Q14 & Q15)
           ========================================================= */}
        {q.type === "textarea" && (
          <div className="space-y-2">
            <textarea
              value={currentAnswer || ""}
              onChange={(e) => handleChange(qIndex, e.target.value, "textarea")}
              placeholder={q.placeholder || "Write your response here..."}
              rows={4}
              className="w-full p-4 sm:p-5 rounded-2xl border-2 clay-input text-sm sm:text-base font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-(--primary)/30 leading-relaxed text-(--text-dark)"
            />
            <div className="flex justify-between items-center text-xs text-(--text-light) px-1 font-medium">
              <span>This question is optional. You may skip it if you wish.</span>
              <span>{(currentAnswer || "").length} characters</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
