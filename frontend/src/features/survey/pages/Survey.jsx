import React from "react";
import { Helmet } from "react-helmet-async";
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
    personalInfo,
    setPersonalInfo,
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
    validationError,
    setValidationError,
  } = useSurvey();

  if (submitted) {
    return <SurveySuccess />;
  }

  return (
    <div className="min-h-screen bg-(--bg) px-4 pt-32 pb-12 md:pt-36 md:pb-20 font-sans text-(--text-dark)">
      <Helmet>
        <title>Baby Health Assessment | Maatriva</title>
        <meta
          name="description"
          content="Complete the Maatriva baby health assessment survey. Help our pediatric AI analyze your infant's sleeping patterns and soothing requirements."
        />
        <meta name="keywords" content="baby health assessment, pediatric survey, smart baby care survey, infant wellness screening, Maatriva" />
        <link rel="canonical" href="https://maatriva.vercel.app/survey" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Baby Health Assessment | Maatriva" />
        <meta
          property="og:description"
          content="Complete the Maatriva baby health assessment survey. Help our pediatric AI analyze your infant's sleeping patterns and soothing requirements."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.vercel.app/survey" />
        <meta property="og:image" content="https://maatriva.vercel.app/BasicCradle.jpeg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Baby Health Assessment | Maatriva" />
        <meta name="twitter:description" content="Complete the Maatriva baby health assessment survey. Help our pediatric AI analyze your infant's sleeping patterns and soothing requirements." />
        <meta name="twitter:image" content="https://maatriva.vercel.app/BasicCradle.jpeg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Baby Health Assessment Survey - Maatriva",
            "description": "Pediatric wellness assessment and AI soothing analysis for infants.",
            "publisher": {
              "@type": "Organization",
              "name": "Maatriva",
              "logo": "https://maatriva.vercel.app/android-chrome-512x512.png"
            }
          })}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto relative">
        
        {/* Progress Header */}
        <SurveyProgress progress={progress} />

        {/* Survey Branding Header */}
        <SurveyHeader showKarmaNote={page === 0} />

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
                    <h2 className="text-xl font-bold text-(--text-dark)">
                      {page === 0 ? "Personal Information" : `Section ${page}`}
                    </h2>
                    <p className="text-sm text-(--text-light)">
                      {page === 0 ? "Tell us about yourself" : "Step for the future"}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-2xl font-black text-(--primary)">{Math.round(progress)}%</span>
                  <p className="text-xs uppercase tracking-widest font-bold text-(--text-light)">Complete</p>
                </div>
              </div>

              {page === 0 ? (
                <div className="grid gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-(--text-dark) flex items-center gap-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={personalInfo.name}
                      onChange={(e) => {
                        setValidationError("");
                        setPersonalInfo({ ...personalInfo, name: e.target.value });
                      }}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 clay-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-(--text-dark) flex items-center gap-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={personalInfo.email}
                      onChange={(e) => {
                        setValidationError("");
                        setPersonalInfo({ ...personalInfo, email: e.target.value });
                      }}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 clay-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-(--text-dark)">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => {
                        setValidationError("");
                        setPersonalInfo({ ...personalInfo, phone: e.target.value });
                      }}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 clay-input"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-bold text-(--text-dark) flex items-center gap-1">
                      What is your gender? <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {["Male", "Female", "Other", "Prefer not to say"].map((option) => {
                        const isSelected = personalInfo.gender === option;
                        return (
                          <label
                            key={option}
                            className={`flex items-center gap-3 p-4 rounded-2xl cursor-pointer border transition-all duration-300 ${
                              isSelected
                                ? "bg-(--primary)/20 border-(--primary) shadow-[inset_2px_2px_4px_rgba(255,255,255,0.9),_inset_-2px_-2px_4px_rgba(0,0,0,0.05),_0_0_15px_rgba(74,111,165,0.2)]"
                                : "bg-white/10 border-white/20 hover:bg-white/20"
                            }`}
                          >
                            <input
                              type="radio"
                              name="gender"
                              value={option}
                              checked={isSelected}
                              onChange={() => {
                                setValidationError("");
                                setPersonalInfo({ ...personalInfo, gender: option });
                              }}
                              className="accent-(--primary) w-4 h-4 cursor-pointer"
                            />
                            <span className="font-semibold text-sm text-(--text-dark)">
                              {option}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
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
              )}
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-600 px-6 py-4 rounded-2xl font-semibold text-sm text-center shadow-sm backdrop-blur-md"
              >
                {validationError}
              </motion.div>
            )}

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
