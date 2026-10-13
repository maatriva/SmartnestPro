import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  ClipboardList,
  TrendingUp,
  Mail,
  Send,
  Calendar,
  Layers,
  Search,
  Download,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Stethoscope,
  Building,
  CheckCircle,
  Clock,
  Filter,
  Eye,
  AlertCircle,
  Package,
  MessageSquare,
  ShieldAlert,
  Info,
} from "lucide-react";

import useAdminDashboard from "../hooks/useAdminDashboard";
import { sendAdminAlert } from "../services/adminServices";
import DashboardHeader from "../components/DashboardHeader";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/users/UserCard";
import SurveyCard from "../components/survey/SurveyCard";
import PreorderCard from "../components/preorder/PreorderCard";
import ContactCard from "../components/contacts/ContactCard";
import EmailAlertModal from "../components/EmailAlertModal";

const INLINE_PRESETS = [
  {
    id: "inquiry_reply",
    label: "Inquiry Follow-up",
    subject: "Follow-up regarding your inquiry with Maatriva",
    title: "Thank You for Contacting Maatriva",
    priority: "normal",
    message:
      "Thank you for reaching out to Maatriva. We have reviewed your inquiry and would be delighted to assist you further.\n\nOur pediatric clinical team is available to schedule a detailed demonstration of our intelligent cradle and health analytics platform. Let us know a convenient time for a call.",
  },
  {
    id: "preorder_update",
    label: "Pre-Order Update",
    subject: "Update on your Maatriva Smart Cradle Pre-Order",
    title: "Fulfillment & Production Update",
    priority: "info",
    message:
      "We are excited to share an update on your Maatriva pre-order! Our manufacturing and sensor calibration processes are progressing on schedule.\n\nOur logistics team will contact you prior to shipment to verify your preferred delivery address and setup requirements. Thank you for being an early pioneer in next-generation infant care.",
  },
  {
    id: "announcement",
    label: "Platform Announcement",
    subject: "Exciting New Features Announced at Maatriva",
    title: "New Health Monitoring Capabilities",
    priority: "info",
    message:
      "We are thrilled to announce new updates to the Maatriva healthcare ecosystem. Our clinical disease detection algorithms and sleep posture tracking have received enhanced AI models with superior accuracy.\n\nExplore our latest updates on the portal or reach out to our team with any questions.",
  },
  {
    id: "urgent_notice",
    label: "Important Notice",
    subject: "Important Service Notification | Maatriva",
    title: "Important Account & Device Notice",
    priority: "urgent",
    message:
      "Please be advised of an important service update regarding the Maatriva portal.\n\nIf you have any active inquiries or require immediate clinical assistance, please contact our dedicated careline at support@maatriva.co.in.",
  },
];

export default function AdminDashboard() {
  const {
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
  } = useAdminDashboard();

  // Email Alert Modal State
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedRecipientForAlert, setSelectedRecipientForAlert] = useState(null);

  // Dedicated Inline Email Composer State (for Email Center tab)
  const [inlineEmail, setInlineEmail] = useState({
    target: "all_users",
    to: "",
    recipientName: "",
    subject: "Important Healthcare Update | Maatriva",
    title: "Official Clinical Update",
    message:
      "We are excited to share an update regarding the Maatriva AI health ecosystem. Our pediatric monitoring capabilities continue to expand with higher precision clinical models.",
    priority: "normal",
  });
  const [inlineSending, setInlineSending] = useState(false);
  const [inlineStatus, setInlineStatus] = useState({ type: null, message: "" });

  const openEmailModalWithRecipient = (recipientData = null) => {
    setSelectedRecipientForAlert(recipientData);
    setIsEmailModalOpen(true);
  };

  const handleSendInlineAlert = async (e) => {
    e.preventDefault();

    if (!inlineEmail.subject.trim() || !inlineEmail.message.trim()) {
      setInlineStatus({ type: "error", message: "Please provide both Subject and Message." });
      return;
    }

    if (inlineEmail.target === "individual" && !inlineEmail.to.trim()) {
      setInlineStatus({ type: "error", message: "Please enter a recipient email address." });
      return;
    }

    setInlineSending(true);
    setInlineStatus({ type: null, message: "" });

    try {
      const response = await sendAdminAlert({
        target: inlineEmail.target,
        to: inlineEmail.target === "individual" ? inlineEmail.to.trim() : undefined,
        recipientName:
          inlineEmail.target === "individual" ? inlineEmail.recipientName.trim() : undefined,
        subject: inlineEmail.subject.trim(),
        title: inlineEmail.title.trim() || inlineEmail.subject.trim(),
        message: inlineEmail.message.trim(),
        priority: inlineEmail.priority,
      });

      setInlineStatus({
        type: "success",
        message: response.message || "Email alert successfully dispatched via Resend!",
      });

      fetchStats();
    } catch (err) {
      console.error(err);
      setInlineStatus({
        type: "error",
        message:
          err.response?.data?.error ||
          "Failed to dispatch alert. Check server logs or ensure RESEND_API_KEY is configured.",
      });
    } finally {
      setInlineSending(false);
    }
  };

  const parseAnswers = (answers) => {
    if (!answers) return {};
    if (typeof answers === "string") {
      try {
        return JSON.parse(answers);
      } catch (e) {
        return {};
      }
    }
    return answers;
  };

  const filteredSurveys = filterData(stats?.surveys);
  const filteredPreorders = filterData(stats?.preorders);
  const filteredContacts = filterData(stats?.contacts);
  const filteredUsers = filterData(stats?.users);

  // CSV Export utility
  const handleExportCSV = () => {
    let dataToExport = [];
    let filename = "export.csv";

    if (activeTab === "preorders" || activeTab === "overview") {
      dataToExport = (stats?.preorders || []).map((o) => ({
        ID: o.id,
        Name: `"${o.name || ""}"`,
        Email: o.email || "",
        Phone: `"${o.phone || ""}"`,
        Address: `"${(o.address || "").replace(/"/g, '""')}"`,
        Created_At: o.created_at || "",
      }));
      filename = "maatriva_preorders.csv";
    } else if (activeTab === "contacts") {
      dataToExport = (stats?.contacts || []).map((c) => ({
        ID: c.id,
        Name: `"${c.name || ""}"`,
        Email: c.email || "",
        Organization: `"${c.organization || ""}"`,
        Message: `"${(c.message || "").replace(/"/g, '""')}"`,
        Created_At: c.created_at || "",
      }));
      filename = "maatriva_contacts.csv";
    } else if (activeTab === "users") {
      dataToExport = (stats?.users || []).map((u) => ({
        ID: u.id,
        Name: `"${u.name || ""}"`,
        Email: u.email || "",
        Is_Admin: u.is_admin ? "Yes" : "No",
        Is_Professional: u.is_professional ? "Yes" : "No",
        Created_At: u.created_at || "",
      }));
      filename = "maatriva_users.csv";
    } else {
      dataToExport = (stats?.contacts || []).map((c) => ({
        Name: c.name,
        Email: c.email,
        Organization: c.organization,
        Created_At: c.created_at,
      }));
      filename = "maatriva_summary.csv";
    }

    if (!dataToExport.length) {
      alert("No data available to export.");
      return;
    }

    const headers = Object.keys(dataToExport[0]).join(",");
    const rows = dataToExport.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--bg)">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-(--primary) to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-(--primary)/30"
          >
            <Sparkles size={32} />
          </motion.div>
          <p className="text-lg font-black text-(--text-dark)">Loading Command Center...</p>
          <p className="text-xs text-(--text-light) font-bold">Synchronizing real-time analytics</p>
        </div>
      </div>
    );
  }

  // Count metrics
  const totalUsers = stats?.totalUsers || stats?.users?.length || 0;
  const totalPreorders = stats?.preorders?.length || 0;
  const totalContacts = stats?.contacts?.length || 0;
  const totalSurveys = stats?.surveys?.length || 0;

  const professionalUsers = (stats?.users || []).filter((u) => u.is_professional).length;
  const adminUsers = (stats?.users || []).filter((u) => u.is_admin).length;

  return (
    <div className="min-h-screen bg-(--bg) p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <Helmet>
        <title>Executive Admin Dashboard | Maatriva</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* 1. Header Bar */}
      <DashboardHeader
        onRefresh={fetchStats}
        isRefreshing={isRefreshing}
        onOpenEmailModal={() => openEmailModalWithRecipient(null)}
        onExportData={handleExportCSV}
      />

      {/* 2. Interactive KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Users */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            setActiveTab("users");
            setExpandedItem(null);
          }}
          className={`cursor-pointer clay-card p-6 rounded-3xl transition-all relative overflow-hidden border ${
            activeTab === "users"
              ? "border-(--primary) ring-4 ring-(--primary)/20 shadow-xl"
              : "border-slate-100 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-(--primary) to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Users size={24} />
            </div>
            <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              {professionalUsers} Clinicians
            </span>
          </div>
          <p className="text-xs font-black text-(--text-light) uppercase tracking-wider">
            Total Accounts
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-3xl font-black text-(--text-dark)">{totalUsers}</h3>
            <span className="text-xs font-bold text-slate-400">{adminUsers} Admin(s)</span>
          </div>
        </motion.div>

        {/* Pre-Orders */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            setActiveTab("preorders");
            setExpandedItem(null);
          }}
          className={`cursor-pointer clay-card p-6 rounded-3xl transition-all relative overflow-hidden border ${
            activeTab === "preorders"
              ? "border-emerald-500 ring-4 ring-emerald-500/20 shadow-xl"
              : "border-slate-100 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md">
              <TrendingUp size={24} />
            </div>
            <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              High Intent
            </span>
          </div>
          <p className="text-xs font-black text-(--text-light) uppercase tracking-wider">
            Pre-Orders Placed
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-3xl font-black text-(--text-dark)">{totalPreorders}</h3>
            <span className="text-xs font-bold text-emerald-600">Active Pipeline</span>
          </div>
        </motion.div>

        {/* Contacts */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            setActiveTab("contacts");
            setExpandedItem(null);
          }}
          className={`cursor-pointer clay-card p-6 rounded-3xl transition-all relative overflow-hidden border ${
            activeTab === "contacts"
              ? "border-amber-500 ring-4 ring-amber-500/20 shadow-xl"
              : "border-slate-100 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
              <Mail size={24} />
            </div>
            <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
              Direct Leads
            </span>
          </div>
          <p className="text-xs font-black text-(--text-light) uppercase tracking-wider">
            Inquiries Received
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-3xl font-black text-(--text-dark)">{totalContacts}</h3>
            <span className="text-xs font-bold text-amber-600">Inbound Messages</span>
          </div>
        </motion.div>

        {/* Surveys */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            setActiveTab("surveys");
            setExpandedItem(null);
          }}
          className={`cursor-pointer clay-card p-6 rounded-3xl transition-all relative overflow-hidden border ${
            activeTab === "surveys"
              ? "border-purple-500 ring-4 ring-purple-500/20 shadow-xl"
              : "border-slate-100 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <ClipboardList size={24} />
            </div>
            <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-100">
              Clinical Insights
            </span>
          </div>
          <p className="text-xs font-black text-(--text-light) uppercase tracking-wider">
            Surveys Completed
          </p>
          <div className="flex items-baseline justify-between mt-1">
            <h3 className="text-3xl font-black text-(--text-dark)">{totalSurveys}</h3>
            <span className="text-xs font-bold text-purple-600">Patient Feedback</span>
          </div>
        </motion.div>
      </div>

      {/* 3. Navigation Tab Bar & Controls */}
      <div className="clay-card p-4 rounded-3xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-slate-100 shadow-sm">
        {/* Tab Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
          {[
            { id: "overview", label: "Executive Overview", count: null },
            { id: "email", label: "Email Alert Center", count: null, isSpecial: true },
            { id: "preorders", label: "Pre-Orders", count: totalPreorders },
            { id: "contacts", label: "Contact Inquiries", count: totalContacts },
            { id: "users", label: "Registered Users", count: totalUsers },
            { id: "surveys", label: "Surveys", count: totalSurveys },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedItem(null);
                }}
                className={`py-2.5 px-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? "bg-gradient-to-r from-(--primary) to-indigo-600 text-white shadow-md shadow-(--primary)/20"
                    : tab.isSpecial
                    ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
                    : "text-slate-600 hover:text-(--primary) hover:bg-slate-100"
                }`}
              >
                {tab.isSpecial && <Send size={12} className={isActive ? "text-white" : "text-indigo-600"} />}
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? "bg-white/25 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Global Search Bar */}
        <div className="w-full md:w-72 shrink-0">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search in ${activeTab}...`}
          />
        </div>
      </div>

      {/* 4. Tab Content Views */}
      <AnimatePresence mode="wait">
        {/* TAB: OVERVIEW */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left Column: Growth Trends & Email Broadcast Launcher */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Email Alert Card */}
              <div className="clay-card p-6 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-(--primary) text-white flex items-center justify-center shadow-md">
                    <Send size={18} />
                  </div>
                  <div>
                    <h3 className="font-black text-(--text-dark) text-base">Quick Email Alert</h3>
                    <p className="text-xs text-slate-500 font-semibold">Resend Email Gateway</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Dispatch transactional alerts, status updates, or broadcasts to all registered
                  users, pre-orders, and leads.
                </p>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setInlineEmail((prev) => ({
                        ...prev,
                        target: "all_users",
                        subject: "Important Healthcare Update | Maatriva",
                        title: "Official Member Update",
                      }));
                      setActiveTab("email");
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 hover:border-(--primary) hover:bg-white text-indigo-900 hover:text-(--primary) text-xs font-bold transition-all text-left flex items-center justify-between"
                  >
                    <span>Broadcast to All Users ({totalUsers})</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInlineEmail((prev) => ({
                        ...prev,
                        target: "all_preorders",
                        subject: "Update Regarding Your Maatriva Pre-Order",
                        title: "Production & Fulfillment Update",
                      }));
                      setActiveTab("email");
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-emerald-200 hover:border-emerald-500 hover:bg-white text-emerald-900 hover:text-emerald-600 text-xs font-bold transition-all text-left flex items-center justify-between"
                  >
                    <span>Alert Pre-Order Customers ({totalPreorders})</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setInlineEmail((prev) => ({
                        ...prev,
                        target: "all_contacts",
                        subject: "Follow-up from Maatriva Executive Team",
                        title: "Inquiry Follow-up",
                      }));
                      setActiveTab("email");
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-amber-200 hover:border-amber-500 hover:bg-white text-amber-900 hover:text-amber-600 text-xs font-bold transition-all text-left flex items-center justify-between"
                  >
                    <span>Message All Contact Leads ({totalContacts})</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("email")}
                  className="w-full py-3 rounded-2xl clay-btn clay-btn-primary text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send size={14} />
                  <span>Open Full Email Alert Center</span>
                </button>
              </div>

              {/* Growth Trends / Registrations */}
              <div className="clay-card p-6 rounded-3xl border border-slate-100 shadow-md">
                <h3 className="text-lg font-black text-(--text-dark) mb-4 flex items-center gap-2">
                  <Calendar className="text-(--primary)" size={18} />
                  <span>Recent Registration Activity</span>
                </h3>

                <div className="space-y-3">
                  {stats?.loginStats?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100"
                    >
                      <span className="font-bold text-xs text-slate-700">
                        {new Date(item.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <div className="flex items-center gap-3">
                        <div
                          className="h-2 bg-(--primary) rounded-full transition-all"
                          style={{
                            width: `${
                              (item.count / Math.max(stats.totalUsers, 1)) * 90 + 8
                            }px`,
                          }}
                        />
                        <span className="text-xs font-black text-(--primary) w-6 text-right">
                          +{item.count}
                        </span>
                      </div>
                    </div>
                  ))}

                  {(!stats?.loginStats || stats.loginStats.length === 0) && (
                    <p className="text-center text-xs text-slate-400 py-6 italic font-medium">
                      No signups recorded in recent activity.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Inquiries & Pre-Orders Activity Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Latest Pre-Orders Feed */}
              <div className="clay-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-(--text-dark) flex items-center gap-2">
                      <TrendingUp size={20} className="text-emerald-500" />
                      <span>Recent Pre-Orders</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      Customers awaiting device delivery and clinical setup
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("preorders")}
                    className="text-xs font-bold text-(--primary) hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all ({totalPreorders})</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>

                <div className="space-y-3">
                  {(stats?.preorders || []).slice(0, 4).map((order) => (
                    <PreorderCard
                      key={`preorder-${order.id}`}
                      order={order}
                      expandedItem={expandedItem}
                      setExpandedItem={setExpandedItem}
                      onSendAlert={openEmailModalWithRecipient}
                    />
                  ))}

                  {(!stats?.preorders || stats.preorders.length === 0) && (
                    <div className="text-center py-12 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                      <p className="text-xs font-bold text-slate-400">
                        No pre-orders submitted yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Latest Contact Inquiries Feed */}
              <div className="clay-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-black text-(--text-dark) flex items-center gap-2">
                      <Mail size={20} className="text-(--primary)" />
                      <span>Recent Contact Inquiries</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">
                      Messages submitted through the public website
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("contacts")}
                    className="text-xs font-bold text-(--primary) hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all ({totalContacts})</span>
                    <ArrowUpRight size={13} />
                  </button>
                </div>

                <div className="space-y-3">
                  {(stats?.contacts || []).slice(0, 4).map((contact) => (
                    <ContactCard
                      key={`contact-${contact.id}`}
                      contact={contact}
                      expandedItem={expandedItem}
                      setExpandedItem={setExpandedItem}
                      onSendAlert={openEmailModalWithRecipient}
                    />
                  ))}

                  {(!stats?.contacts || stats.contacts.length === 0) && (
                    <div className="text-center py-12 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
                      <p className="text-xs font-bold text-slate-400">
                        No contact inquiries submitted yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: EMAIL ALERT CENTER (Full-width, 100% visible, no modal constraints) */}
        {activeTab === "email" && (
          <motion.div
            key="email"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Composer (7 cols) */}
              <div className="lg:col-span-7 clay-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-lg space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      Direct Resend Dispatch
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-(--text-dark)">Email Alert Composer</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Compose official announcements, order updates, or personal responses.
                  </p>
                </div>

                <form onSubmit={handleSendInlineAlert} className="space-y-5">
                  {/* 1. Target Audience */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                      1. Select Recipient Audience
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: "individual", label: "Single Recipient", count: "1:1", icon: Mail },
                        { id: "all_users", label: "All Users", count: totalUsers, icon: Users },
                        { id: "all_preorders", label: "Pre-Orders", count: totalPreorders, icon: Package },
                        { id: "all_contacts", label: "Contact Leads", count: totalContacts, icon: MessageSquare },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = inlineEmail.target === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() =>
                              setInlineEmail((prev) => ({ ...prev, target: item.id }))
                            }
                            className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                              isSelected
                                ? "border-(--primary) bg-(--primary)/5 ring-2 ring-(--primary)/20"
                                : "border-slate-200 hover:border-slate-300 bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <Icon
                                size={16}
                                className={isSelected ? "text-(--primary)" : "text-slate-400"}
                              />
                              <span
                                className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                                  isSelected
                                    ? "bg-(--primary) text-white"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {item.count}
                              </span>
                            </div>
                            <span
                              className={`text-xs font-bold ${
                                isSelected ? "text-(--primary)" : "text-slate-700"
                              }`}
                            >
                              {item.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Individual Recipient Inputs */}
                  {inlineEmail.target === "individual" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Recipient Email Address *
                        </label>
                        <input
                          type="email"
                          value={inlineEmail.to}
                          onChange={(e) =>
                            setInlineEmail((prev) => ({ ...prev, to: e.target.value }))
                          }
                          placeholder="recipient@example.com"
                          className="w-full clay-input px-3.5 py-2.5 text-sm bg-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Recipient Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={inlineEmail.recipientName}
                          onChange={(e) =>
                            setInlineEmail((prev) => ({
                              ...prev,
                              recipientName: e.target.value,
                            }))
                          }
                          placeholder="e.g. Dr. Sarah Jenkins"
                          className="w-full clay-input px-3.5 py-2.5 text-sm bg-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Broadcast Banner Note */}
                  {inlineEmail.target !== "individual" && (
                    <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center gap-3 text-indigo-900 text-xs font-semibold">
                      <Info size={16} className="text-(--primary) shrink-0" />
                      <span>
                        Broadcast active: This alert will be sent to all{" "}
                        <strong>{inlineEmail.target.replace("_", " ")}</strong> currently registered
                        in your database via Resend.
                      </span>
                    </div>
                  )}

                  {/* 2. Template Presets */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
                        2. Quick Template Presets
                      </label>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        Click to autofill
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {INLINE_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() =>
                            setInlineEmail((prev) => ({
                              ...prev,
                              subject: preset.subject,
                              title: preset.title,
                              message: preset.message,
                              priority: preset.priority,
                            }))
                          }
                          className="py-1.5 px-3 rounded-xl border border-slate-200 hover:border-(--primary) hover:bg-(--primary)/5 text-slate-700 hover:text-(--primary) text-xs font-bold transition-all cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Priority and Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Alert Priority
                      </label>
                      <select
                        value={inlineEmail.priority}
                        onChange={(e) =>
                          setInlineEmail((prev) => ({ ...prev, priority: e.target.value }))
                        }
                        className="w-full clay-input px-3 py-2.5 text-xs font-bold"
                      >
                        <option value="normal">Standard Notice</option>
                        <option value="info">Platform Update</option>
                        <option value="urgent">Urgent Notification</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-600 mb-1">
                        Header Banner Title
                      </label>
                      <input
                        type="text"
                        value={inlineEmail.title}
                        onChange={(e) =>
                          setInlineEmail((prev) => ({ ...prev, title: e.target.value }))
                        }
                        placeholder="e.g. Official Clinical Update"
                        className="w-full clay-input px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  {/* 4. Subject Line */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Email Subject Line *
                    </label>
                    <input
                      type="text"
                      value={inlineEmail.subject}
                      onChange={(e) =>
                        setInlineEmail((prev) => ({ ...prev, subject: e.target.value }))
                      }
                      placeholder="Subject line in recipient inbox"
                      className="w-full clay-input px-3.5 py-2.5 text-sm font-semibold"
                      required
                    />
                  </div>

                  {/* 5. Message Content */}
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Message Content *
                    </label>
                    <textarea
                      rows="6"
                      value={inlineEmail.message}
                      onChange={(e) =>
                        setInlineEmail((prev) => ({ ...prev, message: e.target.value }))
                      }
                      placeholder="Type your official message body here..."
                      className="w-full clay-input p-3.5 text-sm leading-relaxed resize-none font-medium"
                      required
                    />
                  </div>

                  {/* Status feedback */}
                  {inlineStatus.message && (
                    <div
                      className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-3 ${
                        inlineStatus.type === "success"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-rose-50 text-rose-800 border border-rose-200"
                      }`}
                    >
                      {inlineStatus.type === "success" ? (
                        <CheckCircle size={18} className="shrink-0 text-emerald-600" />
                      ) : (
                        <AlertCircle size={18} className="shrink-0 text-rose-600" />
                      )}
                      <span>{inlineStatus.message}</span>
                    </div>
                  )}

                  {/* Primary Submit Button (Fully visible, prominent) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={inlineSending}
                      className="w-full py-4 rounded-2xl clay-btn clay-btn-primary flex items-center justify-center gap-2.5 text-sm font-black uppercase tracking-wider shadow-xl shadow-(--primary)/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      {inlineSending ? (
                        <span>Dispatching Alert via Resend...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Dispatch Email Alert via Resend</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Email Preview (5 cols) */}
              <div className="lg:col-span-5 space-y-4 sticky top-6">
                <div className="clay-card p-6 rounded-3xl border border-slate-100 shadow-lg">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h4 className="font-black text-(--text-dark) text-sm flex items-center gap-2">
                      <Eye size={16} className="text-(--primary)" />
                      <span>Live Inbox Preview</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      Real-time
                    </span>
                  </div>

                  {/* Mock Email Template Preview */}
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 shadow-inner">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      {/* Subject bar */}
                      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 text-xs text-slate-600 space-y-1">
                        <div>
                          <span className="font-bold text-slate-400">Subject: </span>
                          <span className="font-bold text-slate-800">
                            {inlineEmail.subject || "No subject set"}
                          </span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-400">To: </span>
                          <span>
                            {inlineEmail.target === "individual"
                              ? inlineEmail.to || "recipient@example.com"
                              : `[Broadcast to ${inlineEmail.target.replace("_", " ")}]`}
                          </span>
                        </div>
                      </div>

                      {/* Branded Body */}
                      <div className="p-5">
                        <div className="bg-gradient-to-r from-indigo-600 to-(--primary) p-5 text-center rounded-xl text-white mb-5">
                          <h3 className="text-lg font-bold tracking-wide m-0">MAATRIVA</h3>
                          <p className="text-xs opacity-85 mt-1 m-0">Next-Gen AI Healthcare</p>
                        </div>

                        <div className="mb-3">
                          <span
                            className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              inlineEmail.priority === "urgent"
                                ? "bg-rose-100 text-rose-700"
                                : inlineEmail.priority === "info"
                                ? "bg-sky-100 text-sky-700"
                                : "bg-indigo-100 text-indigo-700"
                            }`}
                          >
                            {inlineEmail.priority === "urgent"
                              ? "URGENT ALERT"
                              : inlineEmail.priority === "info"
                              ? "PLATFORM UPDATE"
                              : "OFFICIAL NOTICE"}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 mb-1">
                          {inlineEmail.title || inlineEmail.subject}
                        </h4>

                        {inlineEmail.recipientName && (
                          <p className="text-xs font-bold text-slate-700 mb-2">
                            Hello {inlineEmail.recipientName},
                          </p>
                        )}

                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                          {inlineEmail.message}
                        </div>

                        <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
                          This communication was dispatched directly by the Maatriva Executive Administration. If you have any questions or require support, reply to this message or contact{" "}
                          <a href="mailto:support@maatriva.co.in" className="text-(--primary) font-bold">
                            support@maatriva.co.in
                          </a>.
                        </p>

                        <div className="mt-5 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400 leading-relaxed">
                          &copy; {new Date().getFullYear()} Maatriva Healthcare Inc. All rights
                          reserved.<br />
                          <span className="text-(--primary) font-semibold">maatriva.co.in</span> &bull; support@maatriva.co.in
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB: PRE-ORDERS */}
        {activeTab === "preorders" && (
          <motion.div
            key="preorders"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="clay-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-md"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-black text-(--text-dark)">Pre-Order Reservations</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  Showing {filteredPreorders.length} order(s) matching filter
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInlineEmail((prev) => ({
                    ...prev,
                    target: "all_preorders",
                    subject: "Update on your Maatriva Pre-Order",
                    title: "Fulfillment & Delivery Update",
                  }));
                  setActiveTab("email");
                }}
                className="py-2.5 px-4 rounded-2xl clay-btn clay-btn-primary text-xs font-black flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Send size={13} />
                <span>Broadcast Alert to All Pre-Orders</span>
              </button>
            </div>

            <div className="space-y-3">
              {filteredPreorders.map((order) => (
                <PreorderCard
                  key={`preorder-${order.id}`}
                  order={order}
                  expandedItem={expandedItem}
                  setExpandedItem={setExpandedItem}
                  onSendAlert={openEmailModalWithRecipient}
                />
              ))}

              {filteredPreorders.length === 0 && (
                <div className="text-center py-20 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">
                  <TrendingUp className="mx-auto text-slate-300 mb-3" size={44} />
                  <p className="text-sm font-bold text-slate-500">
                    No pre-orders found matching your search.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB: CONTACTS */}
        {activeTab === "contacts" && (
          <motion.div
            key="contacts"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="clay-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-md"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-black text-(--text-dark)">Contact Inquiries</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  Showing {filteredContacts.length} inquiry/message(s)
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInlineEmail((prev) => ({
                    ...prev,
                    target: "all_contacts",
                    subject: "Follow-up from Maatriva Team",
                    title: "Inquiry Follow-up Notice",
                  }));
                  setActiveTab("email");
                }}
                className="py-2.5 px-4 rounded-2xl clay-btn clay-btn-primary text-xs font-black flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Send size={13} />
                <span>Broadcast Alert to All Leads</span>
              </button>
            </div>

            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <ContactCard
                  key={`contact-${contact.id}`}
                  contact={contact}
                  expandedItem={expandedItem}
                  setExpandedItem={setExpandedItem}
                  onSendAlert={openEmailModalWithRecipient}
                />
              ))}

              {filteredContacts.length === 0 && (
                <div className="text-center py-20 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">
                  <Mail className="mx-auto text-slate-300 mb-3" size={44} />
                  <p className="text-sm font-bold text-slate-500">
                    No contact submissions found matching your search.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB: USERS */}
        {activeTab === "users" && (
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="clay-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-md"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-black text-(--text-dark)">Registered Members</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  Showing {filteredUsers.length} user account(s)
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setInlineEmail((prev) => ({
                    ...prev,
                    target: "all_users",
                    subject: "Member Notification | Maatriva Ecosystem",
                    title: "Official Member Update",
                  }));
                  setActiveTab("email");
                }}
                className="py-2.5 px-4 rounded-2xl clay-btn clay-btn-primary text-xs font-black flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Send size={13} />
                <span>Broadcast Alert to All Users</span>
              </button>
            </div>

            <div className="space-y-3">
              {filteredUsers.map((u) => (
                <UserCard
                  key={`user-${u.id}`}
                  user={u}
                  expandedItem={expandedItem}
                  setExpandedItem={setExpandedItem}
                  onSendAlert={openEmailModalWithRecipient}
                />
              ))}

              {filteredUsers.length === 0 && (
                <div className="text-center py-20 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">
                  <Users className="mx-auto text-slate-300 mb-3" size={44} />
                  <p className="text-sm font-bold text-slate-500">
                    No user accounts found matching your search.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB: SURVEYS */}
        {activeTab === "surveys" && (
          <motion.div
            key="surveys"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="clay-card p-6 md:p-8 rounded-3xl border border-slate-100 shadow-md"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-black text-(--text-dark)">Patient Health Surveys</h3>
                <p className="text-xs text-slate-400 font-semibold mt-1">
                  Showing {filteredSurveys.length} survey response(s)
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {filteredSurveys.map((survey) => (
                <SurveyCard
                  key={`survey-${survey.id}`}
                  survey={survey}
                  expandedItem={expandedItem}
                  setExpandedItem={setExpandedItem}
                  parseAnswers={parseAnswers}
                  onSendAlert={openEmailModalWithRecipient}
                />
              ))}

              {filteredSurveys.length === 0 && (
                <div className="text-center py-20 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">
                  <ClipboardList className="mx-auto text-slate-300 mb-3" size={44} />
                  <p className="text-sm font-bold text-slate-500">
                    No survey responses found matching your search.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Email Alert Dispatcher Modal (With Sticky Fixed Header and Sticky Fixed Footer) */}
      <EmailAlertModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        initialRecipient={selectedRecipientForAlert}
        onAlertSent={fetchStats}
      />
    </div>
  );
}
