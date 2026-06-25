import React from "react";
import { motion } from "framer-motion";
import { Users, ClipboardList, TrendingUp, Calendar, Mail } from "lucide-react";
import useAdminDashboard from "../hooks/useAdminDashboard";
import DashboardHeader from "../components/DashboardHeader";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/users/UserCard";
import SurveyCard from "../components/survey/SurveyCard";
import PreorderCard from "../components/preorder/PreorderCard";
import ContactCard from "../components/contacts/ContactCard";

export default function AdminDashboard() {
  const {
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
  } = useAdminDashboard();

  const parseAnswers = (answers) => {
    if (!answers) return {};
    if (typeof answers === "string") {
      try { return JSON.parse(answers); } catch (e) { return {}; }
    }
    return answers;
  };

  const filteredSurveys = filterData(stats?.surveys);
  const filteredPreorders = filterData(stats?.preorders);
  const filteredContacts = filterData(stats?.contacts);
  const filteredUsers = filterData(stats?.users);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--bg)">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-2xl font-black text-(--primary)"
        >
          Loading Dashboard...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] via-[#E9F5F6] to-[#A8DADC]/30 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <DashboardHeader onRefresh={fetchStats} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => {setActiveTab("users"); setExpandedItem(null);}}
            className={`cursor-pointer clay-card p-6 flex items-center gap-4 transition-all ${activeTab === 'users' ? 'ring-4 ring-(--primary)/40 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.9),_inset_-4px_-4px_8px_rgba(0,0,0,0.1),_0_0_15px_rgba(74,111,165,0.4)]' : ''}`}
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <Users size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-(--text-light) uppercase tracking-widest">Total Users</p>
              <h3 className="text-3xl font-black text-(--text-dark)">{stats?.totalUsers || 0}</h3>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => {setActiveTab("surveys"); setExpandedItem(null);}}
            className={`cursor-pointer clay-card p-6 flex items-center gap-4 transition-all ${activeTab === 'surveys' ? 'ring-4 ring-(--primary)/40 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.9),_inset_-4px_-4px_8px_rgba(0,0,0,0.1),_0_0_15px_rgba(74,111,165,0.4)]' : ''}`}
          >
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <ClipboardList size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-(--text-light) uppercase tracking-widest">Surveys</p>
              <h3 className="text-3xl font-black text-(--text-dark)">{stats?.surveys?.length || 0}</h3>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => {setActiveTab("preorders"); setExpandedItem(null);}}
            className={`cursor-pointer clay-card p-6 flex items-center gap-4 transition-all ${activeTab === 'preorders' ? 'ring-4 ring-(--primary)/40 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.9),_inset_-4px_-4px_8px_rgba(0,0,0,0.1),_0_0_15px_rgba(74,111,165,0.4)]' : ''}`}
          >
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-(--text-light) uppercase tracking-widest">Pre-Orders</p>
              <h3 className="text-3xl font-black text-(--text-dark)">{stats?.preorders?.length || 0}</h3>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => {setActiveTab("contacts"); setExpandedItem(null);}}
            className={`cursor-pointer clay-card p-6 flex items-center gap-4 transition-all ${activeTab === 'contacts' ? 'ring-4 ring-(--primary)/40 shadow-[inset_4px_4px_8px_rgba(255,255,255,0.9),_inset_-4px_-4px_8px_rgba(0,0,0,0.1),_0_0_15px_rgba(74,111,165,0.4)]' : ''}`}
          >
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-(--text-light) uppercase tracking-widest">Contacts</p>
              <h3 className="text-3xl font-black text-(--text-dark)">{stats?.contacts?.length || 0}</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity / Login Chart Area */}
          <div className="lg:col-span-1 clay-card p-8">
            <h3 className="text-xl font-black text-(--text-dark) mb-6 flex items-center gap-2">
              <Calendar className="text-(--primary)" />
              Growth Trends
            </h3>
            <div className="space-y-4">
              {stats?.loginStats?.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 clay-card">
                  <span className="font-bold text-(--text-dark)">
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 bg-(--primary) rounded-full transition-all" style={{ width: `${(item.count / Math.max(stats.totalUsers, 1)) * 100 + 4}px` }} />
                    <span className="font-black text-(--primary)">{item.count}</span>
                  </div>
                </div>
              ))}
              {!stats?.loginStats?.length && <p className="text-center text-(--text-light) italic">No recent signups</p>}
            </div>
          </div>

          {/* Data Feed */}
          <div className="lg:col-span-2 clay-card p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h3 className="text-2xl font-black text-(--text-dark) capitalize">{activeTab} Details</h3>
              <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 no-scrollbar">
              
              {/* USERS */}
              {activeTab === "users" && filteredUsers?.map((u) => (
                <UserCard
                  key={`user-${u.id}`}
                  user={u}
                  expandedItem={expandedItem}
                  setExpandedItem={setExpandedItem}
                />
              ))}

              {/* SURVEYS */}
              {activeTab === "surveys" && filteredSurveys?.map((survey) => (
                <SurveyCard
                  key={`survey-${survey.id}`}
                  survey={survey}
                  expandedItem={expandedItem}
                  setExpandedItem={setExpandedItem}
                  parseAnswers={parseAnswers}
                />
              ))}

              {/* PREORDERS */}
              {activeTab === "preorders" && filteredPreorders?.map((order) => (
                <PreorderCard
                  key={`preorder-${order.id}`}
                  order={order}
                  expandedItem={expandedItem}
                  setExpandedItem={setExpandedItem}
                />
              ))}

              {/* CONTACTS */}
              {activeTab === "contacts" && filteredContacts?.map((contact) => (
                <ContactCard
                  key={`contact-${contact.id}`}
                  contact={contact}
                  expandedItem={expandedItem}
                  setExpandedItem={setExpandedItem}
                />
              ))}

              {/* EMPTY STATES */}
              {activeTab === "users" && filteredUsers?.length === 0 && (
                <div className="text-center py-20 bg-white/20 rounded-[2rem] border-2 border-dashed border-white/60">
                  <Users className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-(--text-light) font-bold">No users found matching your search.</p>
                </div>
              )}
              {activeTab === "surveys" && filteredSurveys?.length === 0 && (
                <div className="text-center py-20 bg-white/20 rounded-[2rem] border-2 border-dashed border-white/60">
                  <ClipboardList className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-(--text-light) font-bold">No survey results found matching your search.</p>
                </div>
              )}
              {activeTab === "preorders" && filteredPreorders?.length === 0 && (
                <div className="text-center py-20 bg-white/20 rounded-[2rem] border-2 border-dashed border-white/60">
                  <TrendingUp className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-(--text-light) font-bold">No pre-orders found matching your search.</p>
                </div>
              )}
              {activeTab === "contacts" && filteredContacts?.length === 0 && (
                <div className="text-center py-20 bg-white/20 rounded-[2rem] border-2 border-dashed border-white/60">
                  <Mail className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-(--text-light) font-bold">No contact requests found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
