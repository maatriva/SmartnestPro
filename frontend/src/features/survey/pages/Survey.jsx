import React from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Info } from "lucide-react";
import useSurvey from "../hooks/useSurvey";
import SurveyProgress from "../components/SurveyProgress";
import SurveyHeader from "../components/SurveyHeader";
import SurveySuccess from "../components/SurveySuccess";
import QuestionCard from "../components/QuestionCard";
import SurveyControls from "../components/SurveyControls";

function SmartCradleIntroCard() {
  return (
    <div className="clay-card p-6 sm:p-8 bg-gradient-to-br from-white/95 via-[#EBF5F6]/85 to-[#E1F1F3]/70 border-2 border-(--primary)/30 shadow-[0_12px_32px_rgba(74,111,165,0.15)] rounded-3xl mb-8 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3 text-(--primary)">
        <Sparkles size={18} className="fill-(--primary)/20" />
        <span className="text-xs font-black uppercase tracking-widest bg-(--primary)/10 px-3 py-1 rounded-full border border-(--primary)/20">
          Product Concept
        </span>
      </div>
      <h3 className="text-xl sm:text-2xl font-black text-(--text-dark) mb-4">
        Imagine a smart infant-monitoring cradle
      </h3>
      <div className="space-y-3 text-sm sm:text-base text-(--text) leading-relaxed font-medium">
        <p>
          A contactless monitoring system that uses cameras and sensors to observe your baby's posture, movement, crying and other relevant indicators while they rest.
        </p>
        <p>
          The system can send alerts to parents when unusual patterns are detected, allowing them to check on the baby.
        </p>
        <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs sm:text-sm font-semibold flex items-start gap-2.5 mt-2">
          <Info size={18} className="shrink-0 mt-0.5 text-amber-600" />
          <span>
            It is designed as an additional layer of monitoring and early prediction and does not replace a doctor or medical care.
          </span>
        </div>
      </div>
    </div>
  );
}

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

  const getSectionInfo = (pageNum) => {
    switch (pageNum) {
      case 0:
        return {
          title: "Personal Information",
          subtitle: "Tell us a bit about yourself",
        };
      case 1:
        return {
          title: "Section 1: Initial Assessment",
          subtitle: "Your current baby care & monitoring concerns (Q1–Q4)",
        };
      case 2:
        return {
          title: "Section 2: Smart Cradle Concept",
          subtitle: "Evaluating the intelligent cradle system (Q5–Q8)",
        };
      case 3:
        return {
          title: "Section 3: Purchase & Trust",
          subtitle: "Preferences, hospital validation & concerns (Q9–Q12)",
        };
      case 4:
        return {
          title: "Section 4: Feedback & Pricing",
          subtitle: "Advocacy, feedback & ₹45k price evaluation (Q13–Q16)",
        };
      default:
        return {
          title: `Section ${pageNum}`,
          subtitle: "Step for the future",
        };
    }
  };

  const sectionInfo = getSectionInfo(page);

  return (
    <div className="min-h-screen bg-(--bg) px-4 pt-32 pb-12 md:pt-36 md:pb-20 font-sans text-(--text-dark)">
      <Helmet>
        <title>Baby Health Assessment | Maatriva</title>
        <meta
          name="description"
          content="Complete the Maatriva baby health assessment survey. Help our pediatric AI analyze your infant's sleeping patterns and soothing requirements."
        />
        <meta name="keywords" content="baby health assessment, pediatric survey, smart baby care survey, infant wellness screening, Maatriva" />
        <link rel="canonical" href="https://maatriva.co.in/survey" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Baby Health Assessment | Maatriva" />
        <meta
          property="og:description"
          content="Complete the Maatriva baby health assessment survey. Help our pediatric AI analyze your infant's sleeping patterns and soothing requirements."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.co.in/survey" />
        <meta property="og:image" content="https://maatriva.co.in/BasicCradle.jpeg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Baby Health Assessment | Maatriva" />
        <meta name="twitter:description" content="Complete the Maatriva baby health assessment survey. Help our pediatric AI analyze your infant's sleeping patterns and soothing requirements." />
        <meta name="twitter:image" content="https://maatriva.co.in/BasicCradle.jpeg" />

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
              "logo": "https://maatriva.co.in/android-chrome-512x512.png"
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
            <div className="clay-card p-5 sm:p-8 md:p-12">
              
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 clay-btn clay-btn-secondary flex items-center justify-center font-black text-xl">
                    {page + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-(--text-dark)">
                      {sectionInfo.title}
                    </h2>
                    <p className="text-sm text-(--text-light)">
                      {sectionInfo.subtitle}
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
                <div className="grid gap-10">
                  {/* Smart Cradle Introduction Card between Q4 and Q5 (Page 2) */}
                  {page === 2 && <SmartCradleIntroCard />}

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
