import { useState } from "react";
import useAuth from "../../auth/hooks/useAuth";
import { submitSurveyAnswers } from "../services/surveyServices";
import { questions, QUESTIONS_PER_PAGE } from "../constants/questions";

export default function useSurvey() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const start = page * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(start, start + QUESTIONS_PER_PAGE);

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

  const handleNext = async () => {
    if ((page + 1) * QUESTIONS_PER_PAGE < questions.length) {
      setDirection(1);
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      await submitSurvey();
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
      await submitSurveyAnswers({
        name: user ? user.name : "Anonymous User",
        email: user ? user.email : "anonymous@example.com",
        user_id: user ? user.id : null,
        answers,
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
    return currentQuestions.every((_, i) => {
      const qIndex = start + i;
      const ans = answers[qIndex];
      return ans !== undefined && (Array.isArray(ans) ? ans.length > 0 : true);
    });
  };

  return {
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
    isPageComplete,
  };
}
