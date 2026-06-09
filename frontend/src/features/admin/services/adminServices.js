import API from "../../../shared/services/api";

export const getDashboardStats =
  async () => {
    const res =
      await API.get(
        "/admin/stats"
      );

    return res.data;
  };