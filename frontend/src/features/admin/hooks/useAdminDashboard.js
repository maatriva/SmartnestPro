import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
} from "../services/adminServices";

export default function useAdminDashboard() {
  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("surveys");

  const [
    expandedItem,
    setExpandedItem,
  ] = useState(null);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const fetchStats =
    async () => {
      try {
        const data =
          await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchStats();
  }, []);

  const filterData = (
    data
  ) => {
    if (!data) return [];

    return data.filter(
      (item) =>
        item.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        item.email
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );
  };

  return {
    stats,
    loading,

    activeTab,
    setActiveTab,

    expandedItem,
    setExpandedItem,

    searchTerm,
    setSearchTerm,

    fetchStats,
    filterData,
  };
}