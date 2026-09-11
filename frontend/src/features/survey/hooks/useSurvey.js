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
  const [validationError, setValidationError] = useState("");

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const start = page * QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(start, start + QUESTIONS_PER_PAGE);

  const progress = ((page + 1) / totalPages) * 100;

  const handleChange = (qIndex, option, type) => {
    setValidationError(""); // Clear error on change

    if (type === "radio" || type === "scale" || type === "textarea") {
      setAnswers((prev) => ({ ...prev, [qIndex]: option }));
    } else if (type === "other_text") {
      setAnswers((prev) => ({ ...prev, [`${qIndex}_other`]: option }));
    } else if (type === "checkbox") {
      const prevAnswers = answers[qIndex] || [];
      const questionDef = questions[qIndex];
      const maxSelections = questionDef?.maxSelections || 2;

      if (prevAnswers.includes(option)) {
        setAnswers((prev) => ({
          ...prev,
          [qIndex]: prevAnswers.filter((o) => o !== option),
        }));
      } else {
        if (prevAnswers.length >= maxSelections) {
          setValidationError(`Select up to ${maxSelections} features only. Please deselect one to choose another.`);
          return;
        }
        setAnswers((prev) => ({
          ...prev,
          [qIndex]: [...prevAnswers, option],
        }));
      }
    }
  };

  const isPageComplete = () => {
    return currentQuestions.every((q, i) => {
      if (q.required === false) return true;
      const qIndex = start + i;
      const ans = answers[qIndex];
      if (q.type === "checkbox") {
        return Array.isArray(ans) && ans.length > 0 && ans.length <= (q.maxSelections || 2);
      }
      return ans !== undefined && ans !== null && ans !== "";
    });
  };

  const handleNext = async () => {
    for (let i = 0; i < currentQuestions.length; i++) {
      const q = currentQuestions[i];
      if (q.required === false) continue;

      const qIndex = start + i;
      const ans = answers[qIndex];

      if (q.type === "checkbox") {
        if (!Array.isArray(ans) || ans.length === 0) {
          setValidationError(`Please answer ${q.number || `Q${qIndex + 1}`}: Choose at least 1 feature (up to 2).`);
          return;
        }
        if (ans.length > (q.maxSelections || 2)) {
          setValidationError(`${q.number || `Q${qIndex + 1}`} allows a maximum of ${q.maxSelections || 2} selections.`);
          return;
        }
      } else if (ans === undefined || ans === null || ans === "") {
        setValidationError(`Please answer ${q.number || `Q${qIndex + 1}`} before continuing.`);
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
      // Format answers using question numbers (Q1..Q16) for standardized PostgreSQL JSONB querying and analytics
      const formattedAnswers = {};
      questions.forEach((q, idx) => {
        const val = answers[idx];
        if (val !== undefined && val !== null && val !== "") {
          formattedAnswers[q.number] = val;
        } else {
          formattedAnswers[q.number] = "";
        }
        if (answers[`${idx}_other`]) {
          formattedAnswers[`${q.number}_other`] = answers[`${idx}_other`];
        }
      });

      await submitSurveyAnswers({
        name: user ? user.name : "Anonymous Respondent",
        email: user ? user.email : null,
        phone: null,
        gender: null,
        user_id: user ? user.id : null,
        answers: formattedAnswers,
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
