import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/adminServices";

export default function useAdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // "overview" | "preorders" | "contacts" | "users" | "surveys"
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStats = async () => {
    setIsRefreshing(true);
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load dashboard stats:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const filterData = (data) => {
    if (!data) return [];
    if (!searchTerm.trim()) return data;

    const term = searchTerm.toLowerCase();
    return data.filter(
      (item) =>
        item.name?.toLowerCase().includes(term) ||
        item.email?.toLowerCase().includes(term) ||
        item.organization?.toLowerCase().includes(term) ||
        item.phone?.toLowerCase().includes(term) ||
        item.address?.toLowerCase().includes(term) ||
        item.message?.toLowerCase().includes(term)
    );
  };

  return {
    stats,
    loading,
    isRefreshing,
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