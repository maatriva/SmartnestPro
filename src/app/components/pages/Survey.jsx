import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QuestionPagination } from "../QuestionPagination";

export default function Survey() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Questions
  
  // Lifted state for all 16 questions
  const [answers, setAnswers] = useState(
    Array.from({ length: 16 }).reduce((acc, _, i) => ({ ...acc, [i]: "" }), {})
  );

  const [form, setForm] = useState({
    name: "",
    babyAge: "",
    email: ""
  });

  const isStep1Complete = form.name.trim() !== "" && form.babyAge.trim() !== "" && form.email.trim() !== "";
  const isSurveyComplete = Object.values(answers).every(v => v.trim() !== "");

  function setField(key) {
    return (e) => {
      const value = e?.target?.value;
      setForm((prev) => ({ ...prev, [key]: value }));
    };
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(1);
      // Reset answers and form for demo
      setAnswers(Array.from({ length: 16 }).reduce((acc, _, i) => ({ ...acc, [i]: "" }), {}));
      setForm({ name: "", babyAge: "", email: "" });
      console.log("Survey submit:", { ...form, answers });
    }, 2200);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] text-[var(--text)] px-6 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[var(--text-dark)] mb-3 tracking-tight">
            Smart Nest Pro Survey
          </h1>
          <p className="text-[var(--text-light)] text-base max-w-xl mx-auto">
            Quick feedback to shape the future of baby monitoring.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)] p-10 space-y-8"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-semibold text-[var(--text-dark)] flex items-center gap-3">
                     <span className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm">1</span>
                     Basic Details
                   </h2>
                   <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Required Section</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-dark)]">Full Name</label>
                    <input
                      value={form.name}
                      onChange={setField("name")}
                      placeholder="Enter your name"
                      className="w-full px-5 py-4 rounded-[var(--radius)] border border-[var(--border)] bg-white/50 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[var(--text-dark)]">Baby's Age (approx.)</label>
                    <input
                      value={form.babyAge}
                      onChange={setField("babyAge")}
                      placeholder="e.g., 8 months"
                      className="w-full px-5 py-4 rounded-[var(--radius)] border border-[var(--border)] bg-white/50 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[var(--text-dark)]">Contact Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={setField("email")}
                    placeholder="you@example.com"
                    className="w-full px-5 py-4 rounded-[var(--radius)] border border-[var(--border)] bg-white/50 focus:ring-2 focus:ring-[var(--primary)] outline-none transition-all"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!isStep1Complete}
                className="w-full py-5 rounded-full font-bold text-white bg-black hover:bg-[var(--primary)] hover:shadow-xl transition-all scale-100 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isStep1Complete ? "Continue to Questions" : "Please fill all details"}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                     <span className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm">2</span>
                     <h2 className="text-2xl font-semibold text-[var(--text-dark)]">User Insights</h2>
                  </div>
                  <button onClick={() => setStep(1)} className="text-sm font-bold text-[var(--primary)] hover:underline">Edit Details</button>
               </div>

               <QuestionPagination answers={answers} setAnswers={setAnswers} />

               <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--bg-glass)] backdrop-blur-md p-6 rounded-[var(--radius-lg)] border border-[var(--border)]">
                  <p className="text-sm text-[var(--text-light)] max-w-xs text-center md:text-left">
                    {isSurveyComplete 
                      ? "Success! Click submit to finish your application." 
                      : "Please answer all 16 questions to unlock the submit button."}
                  </p>
                  <button
                    onClick={handleSubmit}
                    disabled={!isSurveyComplete || submitted}
                    className="w-full md:w-auto px-10 py-4 rounded-full font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] shadow-lg hover:shadow-[var(--shadow-primary)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {submitted ? "Saving..." : "Submit Survey"}
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {submitted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
          >
            <div className="bg-white rounded-[var(--radius-lg)] p-12 text-center shadow-2xl max-w-md">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                ✓
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-dark)] mb-4">Awesome!</h2>
              <p className="text-[var(--text-light)] mb-8">
                Your survey has been submitted. We'll be in touch soon if you're 
                selected for the testing program!
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}