import API from "../../../shared/services/api";

export const fetchDiseases = async () => {
  const response = await API.get("/diseases");
  return response.data;
};