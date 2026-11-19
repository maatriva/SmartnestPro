import React from "react";
import { ChevronLeft, ChevronRight, Send, Check } from "lucide-react";

export default function SurveyControls({
  page,
  totalPages,
  loading,
  handleNext,
  handlePrev,
}) {
  return (
    <div className="flex items-center justify-between clay-card-light bg-(--surface) border border-(--border-card) p-4 sm:p-5 rounded-2xl shadow-sm mt-6">
      <button
        type="button"
        onClick={handlePrev}
        disabled={page === 0}
        className={`flex items-center gap-1.5 px-4 sm:px-6 py-2.5 clay-btn clay-btn-secondary text-xs sm:text-sm font-semibold transition-opacity ${
          page === 0 
          ? "opacity-0 pointer-events-none" 
          : "opacity-100"
        }`}
      >
        <ChevronLeft size={16} />
        Back
      </button>

      {/* Segmented Progress Dots with Clear Completion States */}
      <div className="flex gap-2 items-center">
        {[...Array(totalPages)].map((_, i) => {
          const isDone = i < page;
          const isCurrent = i === page;
          return (
            <div
              key={i}
              className={`flex items-center justify-center rounded-full transition-all duration-200 text-[10px] font-bold ${
                isDone
                  ? "w-6 h-6 bg-(--safe) text-white"
                  : isCurrent
                  ? "w-7 h-7 bg-(--brand-accent) text-white shadow-sm"
                  : "w-6 h-6 bg-(--bg-canvas) text-(--text-secondary) border border-(--border-card)"
              }`}
              title={`Step ${i + 1}`}
            >
              {isDone ? <Check size={12} strokeWidth={3} /> : i + 1}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleNext}
        disabled={loading}
        className="flex items-center gap-1.5 clay-btn clay-btn-primary px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md disabled:opacity-50"
      >
        {loading ? (
          "Submitting..."
        ) : (
          <>
            {page === totalPages - 1 ? "Complete Survey" : "Next Section"}
            {page === totalPages - 1 ? <Send size={15} /> : <ChevronRight size={15} />}
          </>
        )}
      </button>
    </div>
  );
}
