import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, CheckCircle2, ClipboardCheck, Sparkles, Brain, Shield, Info } from "lucide-react";
import API from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const QUESTIONS_PER_PAGE = 4;

const questions = [
  // Q1–Q4
  {
    question: "What is your current parenting status?",
    type: "checkbox",
    options: [
      "Expecting a child",
      "Parent of a newborn (0–6 months)",
      "Parent of an infant (6–18 months)",
      "Parent of a toddler (18 months–3 years)",
      "Parent of multiple children",
      "Grandparent / caregiver",
      "Healthcare professional",
    ],
  },
  {
    question: "What is your age group?",
    type: "radio",
    options: ["Under 22", "22–28", "29–35", "36–42", "43+"],
  },
  {
    question: "What is your household type?",
    type: "radio",
    options: [
      "Nuclear family",
      "Joint family",
      "Single parent",
      "Co-parenting",
      "Other",
    ],
  },
  {
    question: "Monthly household income?",
    type: "radio",
    options: [
      "Below ₹30,000",
      "₹30k–₹60k",
      "₹60k–₹1L",
      "₹1L–₹2L",
      "Above ₹2L",
    ],
  },

  // Q5–Q8
  {
    question: "What is your city type?",
    type: "radio",
    options: ["Metro", "Tier 2", "Tier 3", "Rural"],
  },
  {
    question: "Are you a working parent?",
    type: "radio",
    options: [
      "Both working full-time",
      "One working",
      "Freelance",
      "Not working",
    ],
  },
  {
    question: "How satisfied are you with current baby monitoring solutions?",
    type: "range",
    options: ["1","2","3","4","5","6","7","8","9","10"],
  },
  {
    question: "Which challenges do you face?",
    type: "checkbox",
    options: [
      "Breathing concern",
      "Temperature issues",
      "Understanding crying",
      "Sleep deprivation",
      "SIDS worry",
      "No childcare",
      "Night monitoring",
      "Feeding concerns",
    ],
  },

  // Q9–Q12
  {
    question: "How much sleep do you get?",
    type: "radio",
    options: ["<3 hrs", "3–5 hrs", "5–7 hrs", "7+ hrs"],
  },
  {
    question: "Rate your level of anxiety regarding baby's sleep and safety:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "AI chatbot usefulness?",
    type: "radio",
    options: [
      "Extremely valuable",
      "Very valuable",
      "Somewhat",
      "Not sure",
      "Not valuable",
    ],
  },
  {
    question: "AI chatbot topics?",
    type: "checkbox",
    options: [
      "Breastfeeding",
      "Sleep training",
      "Milestones",
      "Nutrition",
      "Vaccination",
      "Cry detection",
      "Mental health",
    ],
  },

  // Q13–Q16
  {
    question: "Interest in AI-powered health monitoring (real-time alerts):",
    type: "checkbox",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "How much do you value cry detection and translation?",
    type: "range",
    options: ["1","2","3","4","5","6","7","8","9","10"],
  },
  {
    question: "Cry types needed?",
    type: "checkbox",
    options: [
      "Hunger",
      "Pain",
      "Sleep",
      "Colic",
      "Burping",
      "Attention",
      "Illness",
    ],
  },
  {
    question: "AI sleep prediction feature?",
    type: "radio",
    options: ["Yes", "Maybe", "Depends", "No"],
  },

  // Q17–Q20
  {
    question: "Importance of aesthetic design in baby furniture:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Importance of premium and sustainable materials:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Importance of portability and modular design:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Preferred cradle design?",
    type: "radio",
    options: [
      "Elephant",
      "Giraffe",
      "Hippo",
      "Whale",
      "Bear",
      "Bunny",
      "Lion",
      "Minimal",
    ],
  },

  // Q21–Q24
  {
    question: "Preferred color palette?",
    type: "checkbox",
    options: [
      "White/Grey",
      "Wood tones",
      "Blue",
      "Pink",
      "Mint",
      "Multicolor",
      "All white",
    ],
  },
  {
    question: "Material preference?",
    type: "radio",
    options: [
      "Plastic",
      "Wood",
      "Fabric",
      "Metal",
      "No preference",
    ],
  },
  {
    question: "Cradle size?",
    type: "radio",
    options: ["Compact", "Standard", "Large", "Portable"],
  },
  {
    question: "Transform to toddler bed?",
    type: "radio",
    options: ["Yes", "Yes (not priority)", "No", "No preference"],
  },

  // Q25–Q28
  {
    question: "Max price?",
    type: "radio",
    options: [
      "<₹15k",
      "₹15k–₹25k",
      "₹25k–₹40k",
      "₹40k–₹55k",
      "₹55k–₹75k",
      "₹75k+",
    ],
  },
  {
    question: "Payment model?",
    type: "radio",
    options: [
      "One-time",
      "EMI",
      "Subscription",
      "Rent-to-own",
      "Hospital use",
    ],
  },
  {
    question: "Monthly app price?",
    type: "radio",
    options: [
      "No subscription",
      "₹99",
      "₹100–₹299",
      "₹300–₹499",
      "₹500+",
    ],
  },
  {
    question: "Buy-back program effect?",
    type: "radio",
    options: ["Very positive", "Somewhat", "Neutral", "Negative"],
  },

  // Q29–Q32
  {
    question: "Buy refurbished product?",
    type: "radio",
    options: ["Yes", "No", "Maybe"],
  },
  {
    question: "Willingness to buy a certified refurbished Maatriva:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Data privacy comfort?",
    type: "radio",
    options: [
      "Yes fully",
      "Yes anonymized",
      "No",
      "Need more info",
    ],
  },
  {
    question: "Trust Indian startup?",
    type: "radio",
    options: [
      "Yes fully",
      "With hesitation",
      "Prefer big brand",
      "No",
    ],
  },

  // Q33–Q36
  {
    question: "Overall interest in a subscription-based model for AI features:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Clinical use cases?",
    type: "checkbox",
    options: ["NICU", "Hospital", "Clinic", "Daycare", "Home care"],
  },
  {
    question: "Clinical pricing?",
    type: "checkbox",
    options: [
      "₹40k–₹60k",
      "₹60k–₹80k",
      "₹80k–₹1.2L",
      "₹1.2L+",
    ],
  },
  {
    question: "Used baby monitor before?",
    type: "radio",
    options: ["Yes", "No", "Maybe"],
  },

  // Q37–Q40
  {
    question: "Known products?",
    type: "checkbox",
    options: [
      "Owlet",
      "Nanit",
      "Motorola",
      "Philips",
      "Miku",
      "iBaby",
      "None",
    ],
  },
  {
    question: "Biggest complaint?",
    type: "checkbox",
    options: [
      "Expensive",
      "False alarms",
      "Bad app",
      "Offline issues",
      "Privacy",
      "No AI",
    ],
  },
  {
    question: "Likelihood of upgrading to the Pro version in the future:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "How likely are you to recommend Maatriva to others?",
    type: "range",
    options: ["1","2","3","4","5","6","7","8","9","10"],
  },
];

export default function Survey() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const start = page * QUESTIONS_PER_PAGE;
  const current = questions.slice(start, start + QUESTIONS_PER_PAGE);

  const progress = ((page + 1) / totalPages) * 100;

  const handleChange = (qIndex, option, type) => {
    if (type === "radio") {
      setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    } else {
      const prevAnswers = answers[qIndex] || [];
      if (prevAnswers.includes(option)) {
        setAnswers((prev) => ({
          ...prev,
          [qIndex]: prevAnswers.filter((o) => o !== option),
        }));
      } else {
        setAnswers((prev) => ({
          ...prev,
          [qIndex]: [...prevAnswers, option],
        }));
      }
    }
  };

  const handleNext = () => {
    if ((page + 1) * QUESTIONS_PER_PAGE < questions.length) {
      setDirection(1);
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      submitSurvey();
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setDirection(-1);
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submitSurvey = async () => {
    setLoading(true);
    try {
      // Mapping answers to a more readable format for the backend if needed
      // but for now sending as is
      await API.post("/surveys", { 
          name: user ? user.name : "Anonymous User",
          email: user ? user.email : "anonymous@example.com",
          user_id: user ? user.id : null,
          answers
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit survey. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isPageComplete = () => {
    return current.every((_, i) => {
      const qIndex = start + i;
      const ans = answers[qIndex];
      return ans !== undefined && (Array.isArray(ans) ? ans.length > 0 : true);
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#A8DADC] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/70 backdrop-blur-xl p-12 rounded-[2.5rem] shadow-2xl border border-white text-center"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-dark)] mb-4">You're Amazing!</h2>
          <p className="text-[var(--text-light)] mb-8 font-medium">
            Thank you for helping us shape the future of Maatriva. Your feedback is invaluable to us.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-4 bg-[var(--text-dark)] text-white rounded-2xl font-bold hover:bg-[var(--primary)] transition-all shadow-lg hover:shadow-[var(--text-dark)]/20"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#A8DADC] px-4 py-12 md:py-20 font-sans text-[var(--text-dark)]">
      <div className="max-w-4xl mx-auto relative">
        
        {/* Progress Header */}
        <div className="fixed top-0 left-0 w-full h-2 bg-white/30 backdrop-blur-sm z-50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] shadow-[0_0_15px_rgba(74,111,165,0.4)]"
          />
        </div>

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-bold uppercase tracking-wider mb-4 border border-[var(--primary)]/20">
              <Sparkles className="w-4 h-4" />
              Community Survey
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-[var(--text-dark)] to-[var(--primary)] bg-clip-text text-transparent">
              MAATRIVA Survey
            </h1>
            <p className="text-[var(--text-light)] text-lg max-w-xl mx-auto font-medium">
              Join us in redefining baby care. Your insights help us build the perfect nest.
            </p>
          </motion.div>
        </div>

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
            <div className="bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/60">
              
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-[var(--primary)]/20">
                    {page + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text-dark)]">Section {page + 1}</h2>
                    <p className="text-sm text-[var(--text-light)]">Step for the future</p>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-2xl font-black text-[var(--primary)]">{Math.round(progress)}%</span>
                  <p className="text-xs uppercase tracking-widest font-bold text-[var(--text-light)]">Complete</p>
                </div>
              </div>

              <div className="grid gap-12">
                {current.map((q, i) => {
                  const qIndex = start + i;
                  return (
                    <div key={qIndex} className="relative group">
                      <div className="flex items-start gap-4 mb-6">
                        <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-bold text-xs border border-[var(--primary)]/20 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                          {qIndex + 1}
                        </span>
                        <h4 className="text-xl md:text-2xl font-bold text-[var(--text-dark)] leading-tight">
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
                              value={q.options.indexOf(answers[qIndex]) !== -1 ? q.options.indexOf(answers[qIndex]) : 0}
                              onChange={(e) => handleChange(qIndex, q.options[parseInt(e.target.value)], "radio")}
                              className="w-full h-3 bg-white/50 backdrop-blur rounded-lg appearance-none cursor-pointer accent-[var(--text-dark)]"
                            />
                            <div className="flex justify-between px-2">
                              {q.options.map((opt, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2">
                                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    answers[qIndex] === opt ? "bg-[var(--text-dark)] scale-150" : "bg-gray-300"
                                  }`} />
                                  <span className={`text-xs font-bold transition-all ${
                                    answers[qIndex] === opt ? "text-[var(--text-dark)] scale-110" : "text-gray-400"
                                  }`}>
                                    {opt}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {q.options.map((opt, idx) => {
                              const isSelected = q.type === "radio" 
                                ? answers[qIndex] === opt 
                                : answers[qIndex]?.includes(opt);

                              return (
                                <button
                                  key={idx}
                                  onClick={() => handleChange(qIndex, opt, q.type)}
                                  className={`flex items-center justify-between p-5 rounded-2xl border-2 text-left transition-all duration-300 group/btn ${
                                    isSelected 
                                      ? "bg-[var(--text-dark)] border-[var(--text-dark)] text-white shadow-xl shadow-[var(--text-dark)]/20 scale-[1.02]" 
                                      : "bg-white/50 border-white/80 text-[var(--text)] hover:border-[var(--primary)]/40 hover:bg-white hover:shadow-lg"
                                  }`}
                                >
                                  <span className="font-semibold">{opt}</span>
                                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                    isSelected 
                                      ? "bg-white border-white scale-110" 
                                      : "border-[var(--primary)]/20 group-hover/btn:border-[var(--primary)]/40"
                                  }`}>
                                    {isSelected && (
                                      q.type === "radio" 
                                        ? <div className="w-3 h-3 rounded-full bg-[var(--text-dark)]" />
                                        : <div className="w-3 h-3 bg-[var(--text-dark)] rounded-sm" />
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between bg-white/20 backdrop-blur-md p-5 rounded-3xl border border-white/30 shadow-lg">
              <button
                onClick={handlePrev}
                disabled={page === 0}
                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${
                  page === 0 
                  ? "opacity-0 pointer-events-none" 
                  : "text-[var(--text-dark)] hover:bg-white/50 bg-white/30"
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
                      i === page ? "w-8 bg-[var(--primary)]" : "w-1.5 bg-[var(--primary)]/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={loading}
                className="flex items-center gap-2 bg-[var(--text-dark)] text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:shadow-[var(--text-dark)]/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
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
          </motion.div>
        </AnimatePresence>

        {/* Floating Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[var(--bg-secondary)]/20 rounded-full blur-[120px]" />
        </div>
      </div>
    </div>
  );
}
