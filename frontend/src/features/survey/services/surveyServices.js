import API from "../../../shared/services/api";

export const submitSurveyAnswers = async (surveyData) => {
  const res = await API.post("/surveys", surveyData);
  return res.data;
};
