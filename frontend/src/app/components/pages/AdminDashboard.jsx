import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, ClipboardList, TrendingUp, Calendar, ChevronDown, ChevronUp, Search, Download, Mail, Phone, MessageSquare } from "lucide-react";
import API from "../../utils/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("surveys"); // surveys, preorders, contacts

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const parseAnswers = (answers) => {
    if (!answers) return {};
    if (typeof answers === "string") {
      try { return JSON.parse(answers); } catch (e) { return {}; }
    }
    return answers;
  };

  const filterData = (data) => {
    if (!data) return [];
    return data.filter(item => 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredSurveys = filterData(stats?.surveys);
  const filteredPreorders = filterData(stats?.preorders);
  const filteredContacts = filterData(stats?.contacts);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-secondary)]">
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-2xl font-black text-[var(--primary)]"
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-[var(--text-dark)] bg-gradient-to-r from-[var(--text-dark)] to-[var(--primary)] bg-clip-text text-transparent">
              Admin Command Center
            </h1>
            <p className="text-[var(--text-light)] font-medium">Real-time ecosystem insights and community feedback.</p>
          </div>
          <button 
            onClick={fetchStats}
            className="px-6 py-3 bg-[var(--text-dark)] text-white rounded-2xl font-bold hover:bg-[var(--primary)] transition-all shadow-xl shadow-[var(--text-dark)]/20"
          >
            Refresh Data
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-xl flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <Users size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-light)] uppercase tracking-widest">Total Users</p>
              <h3 className="text-3xl font-black text-[var(--text-dark)]">{stats?.totalUsers || 0}</h3>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => {setActiveTab("surveys"); setExpandedItem(null);}}
            className={`cursor-pointer bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border shadow-xl flex items-center gap-4 transition-all ${activeTab === 'surveys' ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20 bg-white/90' : 'border-white'}`}
          >
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <ClipboardList size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-light)] uppercase tracking-widest">Surveys</p>
              <h3 className="text-3xl font-black text-[var(--text-dark)]">{stats?.surveys?.length || 0}</h3>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => {setActiveTab("preorders"); setExpandedItem(null);}}
            className={`cursor-pointer bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border shadow-xl flex items-center gap-4 transition-all ${activeTab === 'preorders' ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20 bg-white/90' : 'border-white'}`}
          >
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <TrendingUp size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-light)] uppercase tracking-widest">Pre-Orders</p>
              <h3 className="text-3xl font-black text-[var(--text-dark)]">{stats?.preorders?.length || 0}</h3>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => {setActiveTab("contacts"); setExpandedItem(null);}}
            className={`cursor-pointer bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] border shadow-xl flex items-center gap-4 transition-all ${activeTab === 'contacts' ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/20 bg-white/90' : 'border-white'}`}
          >
            <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              <Mail size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-light)] uppercase tracking-widest">Contacts</p>
              <h3 className="text-3xl font-black text-[var(--text-dark)]">{stats?.contacts?.length || 0}</h3>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity / Login Chart Area */}
          <div className="lg:col-span-1 bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
            <h3 className="text-xl font-black text-[var(--text-dark)] mb-6 flex items-center gap-2">
              <Calendar className="text-[var(--primary)]" />
              Growth Trends
            </h3>
            <div className="space-y-4">
              {stats?.loginStats?.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/60">
                  <span className="font-bold text-[var(--text-dark)]">
                    {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="h-2 bg-[var(--primary)] rounded-full transition-all" style={{ width: `${(item.count / Math.max(stats.totalUsers, 1)) * 100 + 4}px` }} />
                    <span className="font-black text-[var(--primary)]">{item.count}</span>
                  </div>
                </div>
              ))}
              {!stats?.loginStats?.length && <p className="text-center text-[var(--text-light)] italic">No recent signups</p>}
            </div>
          </div>

          {/* Data Feed */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <h3 className="text-2xl font-black text-[var(--text-dark)] capitalize">{activeTab} Details</h3>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by name or email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30 font-medium"
                />
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 no-scrollbar">
              
              {/* SURVEYS */}
              {activeTab === "surveys" && filteredSurveys?.map((survey) => (
                <div key={`survey-${survey.id}`} className="bg-white/40 rounded-[2rem] border border-white/60 overflow-hidden transition-all hover:bg-white/60 group">
                  <div 
                    onClick={() => setExpandedItem(expandedItem === `survey-${survey.id}` ? null : `survey-${survey.id}`)}
                    className="p-6 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-black">
                        {survey.name?.charAt(0) || "A"}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--text-dark)]">{survey.name}</h4>
                        <p className="text-xs text-[var(--text-light)] font-bold uppercase tracking-wider">
                          {survey.email} • {new Date(survey.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {expandedItem === `survey-${survey.id}` ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </div>

                  {expandedItem === `survey-${survey.id}` && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-6 pb-6 pt-2 border-t border-white/60"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {Object.entries(parseAnswers(survey.answers)).map(([key, value]) => (
                          <div key={key} className="p-4 bg-white/50 rounded-2xl border border-white/40">
                            <p className="text-xs font-bold text-[var(--text-light)] uppercase mb-1">Q{parseInt(key) + 1}</p>
                            <p className="text-[var(--text-dark)] font-semibold">
                              {Array.isArray(value) ? value.join(", ") : value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* PREORDERS */}
              {activeTab === "preorders" && filteredPreorders?.map((order) => (
                <div key={`preorder-${order.id}`} className="bg-white/40 rounded-[2rem] border border-white/60 overflow-hidden transition-all hover:bg-white/60 group">
                  <div 
                    onClick={() => setExpandedItem(expandedItem === `preorder-${order.id}` ? null : `preorder-${order.id}`)}
                    className="p-6 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-black">
                        {order.name?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--text-dark)]">{order.name}</h4>
                        <p className="text-xs text-[var(--text-light)] font-bold uppercase tracking-wider">
                          {order.email} • {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {expandedItem === `preorder-${order.id}` ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </div>

                  {expandedItem === `preorder-${order.id}` && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-6 pb-6 pt-2 border-t border-white/60"
                    >
                      <div className="p-4 bg-white/50 rounded-2xl border border-white/40 space-y-3 mt-2">
                         <div className="flex items-center gap-3 text-[var(--text-dark)]">
                            <Phone className="w-4 h-4 text-[var(--primary)]" />
                            <span className="font-semibold">{order.phone || "No phone provided"}</span>
                         </div>
                         <div className="flex items-start gap-3 text-[var(--text-dark)]">
                            <Mail className="w-4 h-4 text-[var(--primary)] mt-1" />
                            <span className="font-semibold">{order.address || "No address provided"}</span>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* CONTACTS */}
              {activeTab === "contacts" && filteredContacts?.map((contact) => (
                <div key={`contact-${contact.id}`} className="bg-white/40 rounded-[2rem] border border-white/60 overflow-hidden transition-all hover:bg-white/60 group">
                  <div 
                    onClick={() => setExpandedItem(expandedItem === `contact-${contact.id}` ? null : `contact-${contact.id}`)}
                    className="p-6 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center font-black">
                        {contact.name?.charAt(0) || "C"}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--text-dark)]">{contact.name}</h4>
                        <p className="text-xs text-[var(--text-light)] font-bold uppercase tracking-wider">
                          {contact.organization || "No Org"} • {new Date(contact.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {expandedItem === `contact-${contact.id}` ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </div>

                  {expandedItem === `contact-${contact.id}` && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="px-6 pb-6 pt-2 border-t border-white/60"
                    >
                      <div className="p-4 bg-white/50 rounded-2xl border border-white/40 space-y-3 mt-2">
                         <div className="flex items-center gap-3 text-[var(--text-dark)]">
                            <Mail className="w-4 h-4 text-[var(--primary)]" />
                            <span className="font-semibold">{contact.email}</span>
                         </div>
                         <div className="flex items-start gap-3 text-[var(--text-dark)]">
                            <MessageSquare className="w-4 h-4 text-[var(--primary)] mt-1" />
                            <p className="font-semibold leading-relaxed">{contact.message}</p>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {/* EMPTY STATES */}
              {activeTab === "surveys" && filteredSurveys?.length === 0 && (
                <div className="text-center py-20 bg-white/20 rounded-[2rem] border-2 border-dashed border-white/60">
                  <ClipboardList className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-[var(--text-light)] font-bold">No survey results found matching your search.</p>
                </div>
              )}
              {activeTab === "preorders" && filteredPreorders?.length === 0 && (
                <div className="text-center py-20 bg-white/20 rounded-[2rem] border-2 border-dashed border-white/60">
                  <TrendingUp className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-[var(--text-light)] font-bold">No pre-orders found matching your search.</p>
                </div>
              )}
              {activeTab === "contacts" && filteredContacts?.length === 0 && (
                <div className="text-center py-20 bg-white/20 rounded-[2rem] border-2 border-dashed border-white/60">
                  <Mail className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-[var(--text-light)] font-bold">No contact requests found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
