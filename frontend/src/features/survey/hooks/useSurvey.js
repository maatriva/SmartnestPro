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
    if (page === 0) {
      return (
        personalInfo.name?.trim() &&
        personalInfo.email?.trim() &&
        validateEmail(personalInfo.email) &&
        personalInfo.gender
      );
    }
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
