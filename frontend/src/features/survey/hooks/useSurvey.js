import { useState } from "react";
import useAuth from "../../auth/hooks/useAuth";
import { submitSurveyAnswers } from "../services/surveyServices";
import { questions, QUESTIONS_PER_PAGE } from "../constants/questions";
import { validateEmail } from "../../../shared/utils/validation";

export default function useSurvey() {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: "",
    gender: "",
  });
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [validationError, setValidationError] = useState("");

  // Total pages = questions pages + 1 (the first personal info page)
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE) + 1;
  const start = page === 0 ? 0 : (page - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = page === 0 ? [] : questions.slice(start, start + QUESTIONS_PER_PAGE);

  const progress = ((page + 1) / totalPages) * 100;

  const handleChange = (qIndex, option, type) => {
    setValidationError(""); // Clear error on change
    if (type === "radio" || type === "text") {
      setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    } else {
      const prevAnswers = answers[qIndex] || [];
      if (prevAnswers.includes(option)) {
        setAnswers((prev) => {
          const updated = {
            ...prev,
            [qIndex]: prevAnswers.filter((o) => o !== option),
          };
          if (qIndex === 7 && option === "Custom") {
            delete updated["7_custom"];
          }
          if (qIndex === 11 && option === "Custom") {
            delete updated["11_custom"];
          }
          return updated;
        });
      } else {
        setAnswers((prev) => ({
          ...prev,
          [qIndex]: [...prevAnswers, option],
        }));
      }
    }
  };

  const isPageComplete = () => {
    if (page === 0) {
      return (
        personalInfo.name?.trim() &&
        personalInfo.email?.trim() &&
        validateEmail(personalInfo.email) &&
        personalInfo.gender
      );
    }
    return currentQuestions.every((_, i) => {
      const qIndex = start + i;
      const ans = answers[qIndex];
      return ans !== undefined && (Array.isArray(ans) ? ans.length > 0 : true);
    });
  };

  const handleNext = async () => {
    if (page === 0) {
      if (!personalInfo.name?.trim()) {
        setValidationError("Full Name is required.");
        return;
      }
      if (!personalInfo.email?.trim()) {
        setValidationError("Email Address is required.");
        return;
      }
      if (!validateEmail(personalInfo.email)) {
        setValidationError("Please enter a valid email address.");
        return;
      }
      if (!personalInfo.gender) {
        setValidationError("Please select your gender.");
        return;
      }
    } else {
      const incomplete = currentQuestions.some((_, i) => {
        const qIndex = start + i;
        const ans = answers[qIndex];
        return ans === undefined || (Array.isArray(ans) && ans.length === 0);
      });
      if (incomplete) {
        setValidationError("Please answer all questions on this page before moving to the next section.");
        return;
      }
    }

    setValidationError("");
    if (page < totalPages - 1) {
      setDirection(1);
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      await submitSurvey();
    }
  };

  const handlePrev = () => {
    setValidationError("");
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
        name: personalInfo.name,
        email: personalInfo.email,
        phone: personalInfo.phone || null,
        gender: personalInfo.gender,
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

  return {
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
    isPageComplete,
    validationError,
    setValidationError,
  };
}
