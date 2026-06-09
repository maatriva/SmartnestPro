import React from "react";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

export default function SurveyControls({
  page,
  totalPages,
  loading,
  handleNext,
  handlePrev,
}) {
  return (
    <div className="flex items-center justify-between clay-card p-5">
      <button
        onClick={handlePrev}
        disabled={page === 0}
        className={`flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-3 sm:py-4 clay-btn clay-btn-secondary text-sm sm:text-base ${
          page === 0 
          ? "opacity-0 pointer-events-none" 
          : ""
        }`}
      >
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="flex gap-1.5 items-center">
        {[...Array(totalPages)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === page ? "w-8 bg-(--primary)" : "w-1.5 bg-(--primary)/20"
            }`}
          />
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={loading}
        className="flex items-center gap-1 sm:gap-2 clay-btn clay-btn-primary px-5 sm:px-10 py-3 sm:py-4 text-sm sm:text-base disabled:opacity-50"
      >
        {loading ? (
          "Submitting..."
        ) : (
          <>
            {page === totalPages - 1 ? "Complete Survey" : "Next Section"}
            {page === totalPages - 1 ? <Send size={20} /> : <ChevronRight size={20} />}
          </>
        )}
      </button>
    </div>
  );
}
