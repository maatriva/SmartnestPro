import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOTAL_QUESTIONS = 16;
const QUESTIONS_PER_PAGE = 4;

export function QuestionPagination({ answers, setAnswers }) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const scrollRef = useRef(null);
  
  // Calculate current page (section)
  const currentPage = Math.floor(activeIdx / QUESTIONS_PER_PAGE);
  const totalPages = Math.ceil(TOTAL_QUESTIONS / QUESTIONS_PER_PAGE);

  // All questions are visible in the scrollable header
  const allQuestions = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => i);
  
  // Check if a specific section is logically "complete"
  const isSectionComplete = (page) => {
    const start = page * QUESTIONS_PER_PAGE;
    const end = start + QUESTIONS_PER_PAGE;
    const slice = allQuestions.slice(start, end);
    return slice.every(qIdx => answers[qIdx] && answers[qIdx].trim() !== "");
  };

  const handleNextSection = () => {
    const isCurrentComplete = isSectionComplete(currentPage);
    if (currentPage < totalPages - 1 && isCurrentComplete) {
      setActiveIdx((currentPage + 1) * QUESTIONS_PER_PAGE);
    }
  };

  const handlePrevSection = () => {
    if (currentPage > 0) {
      setActiveIdx((currentPage - 1) * QUESTIONS_PER_PAGE);
    }
  };

  const handleNextQuestion = () => {
    // Only allow next question if it's within the current section or if current section is complete
    const isLastInPage = (activeIdx + 1) % QUESTIONS_PER_PAGE === 0;
    if (!isLastInPage && activeIdx < TOTAL_QUESTIONS - 1) {
      setActiveIdx(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    // Allow going back globally
    if (activeIdx > 0) {
      setActiveIdx(prev => prev - 1);
    }
  };

  const updateAnswer = (val) => {
    setAnswers(prev => ({ ...prev, [activeIdx]: val }));
  };

  // Logic for jumping between sections
  const jumpToSection = (page) => {
    // Only allow jumping forward if sections are complete, always allow jumping back
    if (page < currentPage) {
      setActiveIdx(page * QUESTIONS_PER_PAGE);
    } else {
      let canJump = true;
      for (let i = currentPage; i < page; i++) {
        if (!isSectionComplete(i)) {
          canJump = false;
          break;
        }
      }
      if (canJump) setActiveIdx(page * QUESTIONS_PER_PAGE);
    }
  };

  const isFirstOfSection = activeIdx % QUESTIONS_PER_PAGE === 0 && activeIdx !== 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-6 bg-[var(--bg-glass)] backdrop-blur-xl rounded-[var(--radius-lg)] border border-[var(--border)] shadow-[var(--shadow)]">
      
      {/* Navigation Bar - Horizontal Scroll Row */}
      <div className="relative border-b border-[var(--border)] pb-10">
        <div 
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth px-4"
        >
          {allQuestions.map((qIdx) => {
            const isAnswered = answers[qIdx] && answers[qIdx].trim() !== "";
            const qSection = Math.floor(qIdx / QUESTIONS_PER_PAGE);
            
            // A question is unlocked if its section is reached or it's part of an already completed section
            let isUnlocked = qSection <= currentPage;
            if (!isUnlocked) {
               // Special case: show the first question of the *next* section if the current one is complete
               if (qSection === currentPage + 1 && isSectionComplete(currentPage)) {
                 isUnlocked = true;
               }
            }

            return (
              <button
                key={qIdx}
                disabled={!isUnlocked}
                onClick={() => setActiveIdx(qIdx)}
                className={`relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 text-sm font-bold border-2
                  ${activeIdx === qIdx 
                    ? "border-[var(--primary)] text-[var(--primary)] scale-110 z-10" 
                    : isAnswered 
                      ? "border-green-500 bg-green-50 text-green-700" 
                      : !isUnlocked
                        ? "border-[var(--border)] text-[var(--text-light)]/20 opacity-50 cursor-not-allowed"
                        : "border-[var(--border)] text-[var(--text-light)] hover:border-[var(--primary)]"}
                `}
              >
                {qIdx + 1}
                {activeIdx === qIdx && (
                  <motion.div
                    layoutId="activeRing"
                    className="absolute -inset-2 border-2 border-[var(--primary)] rounded-full border-dashed animate-[spin_8s_linear_infinite]"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Global Progress Indicator */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
           {Array.from({ length: totalPages }).map((_, i) => (
             <button 
               key={i} 
               onClick={() => jumpToSection(i)}
               disabled={i > currentPage && !isSectionComplete(currentPage)}
               className={`h-1 rounded-full transition-all duration-500 
               ${currentPage === i ? "w-10 bg-[var(--primary)]" : "w-4 bg-[var(--border)] hover:bg-[var(--primary)]"}`} 
             />
           ))}
        </div>
      </div>

      {/* Question Content Area - Compacted for better focus */}
      <div className="min-h-[280px] flex flex-col justify-center items-center text-center p-6 bg-white/40 rounded-[var(--radius-lg)] border border-[var(--border)] relative overflow-hidden shadow-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-lg space-y-4"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-[var(--primary)] text-white text-[10px] font-black uppercase tracking-widest mb-1 shadow-sm">
               Section {currentPage + 1} // Q{activeIdx + 1}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-dark)] leading-tight tracking-tight">
               {activeIdx === 0 && "How did you hear about Smart Nest Pro?"}
               {activeIdx === 1 && "What is the most important feature for a smart cradle?"}
               {activeIdx === 2 && "Would you prefer AI soothing or manual control?"}
               {activeIdx === 3 && "How much would you pay for a premium AI mattress?"}
               {activeIdx > 3 && `Insight Question #${activeIdx + 1}`}
            </h2>
            <div className="pt-2">
               <textarea 
                 value={answers[activeIdx] || ""}
                 onChange={(e) => updateAnswer(e.target.value)}
                 placeholder="Type your response..."
                 className="w-full h-24 p-4 rounded-[var(--radius)] border border-[var(--border)] bg-white/80 focus:ring-2 focus:ring-[var(--primary)] outline-none shadow-sm resize-none transition-all placeholder:text-[var(--text-light)]/40 text-lg font-medium"
               />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="grid grid-cols-2 gap-4">
        {isFirstOfSection ? (
          <button
            onClick={handlePrevSection}
            className="flex items-center justify-center gap-2 py-4 rounded-full font-bold border border-[var(--border)] text-[var(--text-dark)] hover:bg-black hover:text-white transition-all group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Previous Section
          </button>
        ) : (
          <button
            onClick={handlePrevQuestion}
            disabled={activeIdx === 0}
            className="flex items-center justify-center gap-2 py-4 rounded-full font-bold border border-[var(--border)] text-[var(--text-dark)] hover:bg-black hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Previous Question
          </button>
        )}
        
        {(activeIdx + 1) % QUESTIONS_PER_PAGE === 0 ? (
          <button
            onClick={handleNextSection}
            disabled={!isSectionComplete(currentPage) || (activeIdx + 1 === TOTAL_QUESTIONS)}
            className={`py-4 rounded-full font-bold text-white transition-all scale-100 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2
              ${isSectionComplete(currentPage) ? "bg-[var(--primary)] shadow-lg hover:shadow-[var(--shadow-primary)]" : "bg-gray-400 cursor-not-allowed opacity-50"}
            `}
          >
            {activeIdx + 1 === TOTAL_QUESTIONS ? "Final Question reached" : "Next Section"}
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="flex items-center justify-center gap-2 py-4 rounded-full font-bold bg-black text-white hover:bg-[var(--primary)] shadow-lg hover:shadow-xl transition-all scale-100 hover:scale-[1.02] active:scale-[0.98] group"
          >
            Next Question
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>

      <div className="text-center text-xs font-bold text-[var(--text-light)] uppercase tracking-widest opacity-50 pt-4 border-t border-[var(--border)]">
         Overall Progress: {Math.round((Object.values(answers).filter(v => v.trim() !== "").length / TOTAL_QUESTIONS) * 100)}%
      </div>
    </div>
  );
}
