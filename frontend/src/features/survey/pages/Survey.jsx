import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useSurvey from "../hooks/useSurvey";
import SurveyProgress from "../components/SurveyProgress";
import SurveyHeader from "../components/SurveyHeader";
import SurveySuccess from "../components/SurveySuccess";
import QuestionCard from "../components/QuestionCard";
import SurveyControls from "../components/SurveyControls";

export default function Survey() {
  const {
    page,
    answers,
    submitted,
    loading,
    direction,
    totalPages,
    start,
    currentQuestions,
    progress,
    handleChange,
    handleNext,
    handlePrev,
  } = useSurvey();

  if (submitted) {
    return <SurveySuccess />;
  }

  return (
    <div className="min-h-screen bg-(--bg) px-4 py-12 md:py-20 font-sans text-(--text-dark)">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Progress Header */}
        <SurveyProgress progress={progress} />

        {/* Survey Branding Header */}
        <SurveyHeader />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="space-y-8"
          >
            <div className="clay-card p-8 md:p-12">
              
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 clay-btn clay-btn-secondaryh flex items-center justify-center font-black text-xl">
                    {page + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-(--text-dark)">Section {page + 1}</h2>
                    <p className="text-sm text-(--text-light)">Step for the future</p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-2xl font-black text-(--primary)">{Math.round(progress)}%</span>
                  <p className="text-xs uppercase tracking-widest font-bold text-(--text-light)">Complete</p>
                </div>
              </div>

              <div className="grid gap-12">
                {currentQuestions.map((q, i) => {
                  const qIndex = start + i;
                  return (
                    <QuestionCard
                      key={qIndex}
                      q={q}
                      qIndex={qIndex}
                      answers={answers}
                      handleChange={handleChange}
                    />
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <SurveyControls
              page={page}
              totalPages={totalPages}
              loading={loading}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </motion.div>
        </AnimatePresence>

        {/* Floating Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-(--primary)/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-(--bg-secondary)/20 rounded-full blur-[120px]" />
        </div>
      </div>
    </div>
  );
}
