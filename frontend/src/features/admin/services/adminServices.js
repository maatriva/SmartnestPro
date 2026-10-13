import API from "../../../shared/services/api";

export const getDashboardStats = async () => {
  const res = await API.get("/admin/stats");
  return res.data;
};

export const sendAdminAlert = async (alertPayload) => {
  const res = await API.post("/admin/send-alert", alertPayload);
  return res.data;
};