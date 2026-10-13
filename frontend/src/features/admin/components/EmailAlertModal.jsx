import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Mail,
  Users,
  Package,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit3,
  Sparkles,
  ShieldAlert,
  Info,
} from "lucide-react";
import { sendAdminAlert } from "../services/adminServices";

const PRESETS = [
  {
    id: "inquiry_reply",
    label: "Inquiry Follow-up",
    icon: MessageSquare,
    subject: "Follow-up regarding your inquiry with Maatriva",
    title: "Thank You for Contacting Maatriva",
    priority: "normal",
    message:
      "Thank you for reaching out to Maatriva. We have reviewed your inquiry and would be delighted to assist you further.\n\nOur pediatric clinical team is available to schedule a detailed demonstration of our intelligent cradle and health analytics platform. Let us know a convenient time for a call.",
  },
  {
    id: "preorder_update",
    label: "Pre-Order Update",
    icon: Package,
    subject: "Update on your Maatriva Smart Cradle Pre-Order",
    title: "Fulfillment & Production Update",
    priority: "info",
    message:
      "We are excited to share an update on your Maatriva pre-order! Our manufacturing and sensor calibration processes are progressing on schedule.\n\nOur logistics team will contact you prior to shipment to verify your preferred delivery address and setup requirements. Thank you for being an early pioneer in next-generation infant care.",
  },
  {
    id: "announcement",
    label: "Platform Announcement",
    icon: Sparkles,
    subject: "Exciting New Features Announced at Maatriva",
    title: "New Health Monitoring Capabilities",
    priority: "info",
    message:
      "We are thrilled to announce new updates to the Maatriva healthcare ecosystem. Our clinical disease detection algorithms and sleep posture tracking have received enhanced AI models with superior accuracy.\n\nExplore our latest updates on the portal or reach out to our team with any questions.",
  },
  {
    id: "urgent_notice",
    label: "Important Notice",
    icon: ShieldAlert,
    subject: "Important Service Notification | Maatriva",
    title: "Important Account & Device Notice",
    priority: "urgent",
    message:
      "Please be advised of an important service update regarding the Maatriva portal.\n\nIf you have any active inquiries or require immediate clinical assistance, please contact our dedicated careline at support@maatriva.co.in.",
  },
];

export default function EmailAlertModal({
  isOpen,
  onClose,
  initialRecipient = null,
  onAlertSent,
}) {
  const [target, setTarget] = useState("individual");
  const [to, setTo] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [activeTab, setActiveTab] = useState("compose"); // "compose" | "preview"

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });

  useEffect(() => {
    if (initialRecipient) {
      setTarget(initialRecipient.target || "individual");
      setTo(initialRecipient.email || "");
      setRecipientName(initialRecipient.name || "");
      setSubject(initialRecipient.subject || "Message from Maatriva Administration");
      setTitle(initialRecipient.title || "Official Communication");
      setMessage(initialRecipient.message || "");
      setPriority(initialRecipient.priority || "normal");
    } else {
      setTarget("individual");
      setTo("");
      setRecipientName("");
      setSubject("Update from Maatriva Administration");
      setTitle("Official Communication");
      setMessage("");
      setPriority("normal");
    }
    setStatus({ type: null, message: "" });
    setActiveTab("compose");
  }, [initialRecipient, isOpen]);

  const applyPreset = (preset) => {
    setSubject(preset.subject);
    setTitle(preset.title);
    setMessage(preset.message);
    setPriority(preset.priority);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      setStatus({ type: "error", message: "Please provide both Subject and Message." });
      return;
    }

    if (target === "individual" && !to.trim()) {
      setStatus({ type: "error", message: "Please provide a valid recipient email address." });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await sendAdminAlert({
        target,
        to: target === "individual" ? to.trim() : undefined,
        recipientName: target === "individual" ? recipientName.trim() : undefined,
        subject: subject.trim(),
        title: title.trim() || subject.trim(),
        message: message.trim(),
        priority,
      });

      setStatus({
        type: "success",
        message: response.message || "Email alert dispatched successfully!",
      });

      if (onAlertSent) onAlertSent();

      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Failed to dispatch email alert. Check server logs.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Window Container: Fixed height flex column with sticky header & sticky footer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl z-10 flex flex-col max-h-[90vh] border border-slate-200 overflow-hidden"
        >
          {/* 1. STICKY HEADER */}
          <div className="px-6 py-4 border-b border-slate-100 bg-white shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-(--primary) to-indigo-600 text-white flex items-center justify-center shadow-md shrink-0">
                <Send size={18} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-(--text-dark) flex items-center gap-2">
                  Send Email Alert
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-(--primary)/15 text-(--primary) uppercase tracking-wider">
                    Resend Active
                  </span>
                </h2>
                <p className="text-xs font-semibold text-(--text-light)">
                  Dispatch branded executive notifications, replies, or broadcast updates.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* 2. SUB-HEADER: TABS */}
          <div className="px-6 pt-3 pb-2 bg-slate-50 border-b border-slate-100 shrink-0 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("compose")}
                className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "compose"
                    ? "bg-white text-(--primary) shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Edit3 size={13} />
                <span>Compose Alert</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "preview"
                    ? "bg-white text-(--primary) shadow-sm border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Eye size={13} />
                <span>Live Email Preview</span>
              </button>
            </div>

            {/* Quick target status badge */}
            <span className="hidden sm:inline-block text-[11px] font-bold text-slate-500">
              Target: <span className="text-(--primary) capitalize">{target.replace("_", " ")}</span>
            </span>
          </div>

          {/* 3. SCROLLABLE FORM BODY (Visible scrollbar, comfortable padding) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {activeTab === "compose" ? (
              <form id="email-alert-form" onSubmit={handleSubmit} className="space-y-4">
                {/* Target Audience Selector */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                    1. Select Target Audience
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "individual", label: "Single Recipient", icon: Mail },
                      { id: "all_users", label: "All Users", icon: Users },
                      { id: "all_preorders", label: "All Pre-Orders", icon: Package },
                      { id: "all_contacts", label: "All Contact Leads", icon: MessageSquare },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = target === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setTarget(item.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                            isSelected
                              ? "border-(--primary) bg-(--primary)/5 ring-2 ring-(--primary)/20"
                              : "border-slate-200 hover:border-slate-300 bg-white"
                          }`}
                        >
                          <Icon
                            size={15}
                            className={isSelected ? "text-(--primary)" : "text-slate-400"}
                          />
                          <span
                            className={`text-xs font-bold leading-tight ${
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

                {/* Direct Recipient Inputs (when target is individual) */}
                {target === "individual" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Recipient Email Address *
                      </label>
                      <input
                        type="email"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="recipient@example.com"
                        className="w-full clay-input px-3 py-2 text-sm bg-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Recipient Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="e.g. Dr. Sarah Jenkins"
                        className="w-full clay-input px-3 py-2 text-sm bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Broadcast Info Message */}
                {target !== "individual" && (
                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center gap-2.5 text-indigo-900 text-xs font-semibold">
                    <Info size={15} className="text-(--primary) shrink-0" />
                    <span>
                      Broadcast mode active: Resend will deliver this official email to all registered{" "}
                      <strong>{target.replace("_", " ")}</strong>.
                    </span>
                  </div>
                )}

                {/* Template Presets */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-slate-500">
                      2. Quick Template Presets
                    </label>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      Click to autofill
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((preset) => {
                      const Icon = preset.icon;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => applyPreset(preset)}
                          className="py-1 px-2.5 rounded-lg border border-slate-200 hover:border-(--primary) hover:bg-(--primary)/5 text-slate-700 hover:text-(--primary) text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Icon size={12} />
                          <span>{preset.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Priority & Title */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-slate-600 mb-1">
                      Priority Level
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full clay-input px-3 py-2 text-xs font-bold"
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
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Official Healthcare Update"
                      className="w-full clay-input px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Subject Line */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Email Subject Line *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject shown in the user's inbox"
                    className="w-full clay-input px-3 py-2 text-sm font-semibold"
                    required
                  />
                </div>

                {/* Message Body */}
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    Message Body *
                  </label>
                  <textarea
                    rows="4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your official alert or reply message..."
                    className="w-full clay-input p-3 text-sm leading-relaxed resize-none font-medium"
                    required
                  />
                </div>

                {/* Feedback status */}
                {status.message && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                      status.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-rose-50 text-rose-800 border border-rose-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle size={16} className="shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle size={16} className="shrink-0 text-rose-600" />
                    )}
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            ) : (
              /* PREVIEW TAB */
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 p-4 shadow-inner">
                  <div className="bg-white rounded-xl border border-slate-200 max-w-lg mx-auto overflow-hidden shadow-sm">
                    {/* Mock Email Client Subject Line */}
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs text-slate-600">
                      <div>
                        <span className="font-bold text-slate-400">Subject: </span>
                        <span className="font-bold text-slate-800">
                          {subject || "No subject set"}
                        </span>
                      </div>
                      <div className="mt-0.5">
                        <span className="font-bold text-slate-400">To: </span>
                        <span>
                          {target === "individual"
                            ? to || "recipient@example.com"
                            : `[Broadcast to ${target.replace("_", " ")}]`}
                        </span>
                      </div>
                    </div>

                    {/* Email Card Template */}
                    <div className="p-5">
                      <div className="bg-gradient-to-r from-indigo-600 to-(--primary) p-5 text-center rounded-xl text-white mb-5">
                        <h3 className="text-lg font-bold tracking-wide m-0">MAATRIVA</h3>
                        <p className="text-xs opacity-85 mt-1 m-0">Next-Gen AI Healthcare</p>
                      </div>

                      <div className="mb-3">
                        <span
                          className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            priority === "urgent"
                              ? "bg-rose-100 text-rose-700"
                              : priority === "info"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-indigo-100 text-indigo-700"
                          }`}
                        >
                          {priority === "urgent"
                            ? "URGENT ALERT"
                            : priority === "info"
                            ? "PLATFORM UPDATE"
                            : "OFFICIAL NOTICE"}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        {title || subject || "Notification Title"}
                      </h4>

                      {recipientName && (
                        <p className="text-xs font-bold text-slate-700 mb-2">
                          Hello {recipientName},
                        </p>
                      )}

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                        {message || "Your message text will appear here."}
                      </div>

                      <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
                        This communication was dispatched directly by the Maatriva Executive Administration. If you have any questions or require support, reply to this message or contact{" "}
                        <a href="mailto:support@maatriva.co.in" className="text-(--primary) font-bold">
                          support@maatriva.co.in
                        </a>.
                      </p>

                      <div className="mt-5 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400 leading-relaxed">
                        &copy; {new Date().getFullYear()} Maatriva Healthcare Inc. All rights reserved.<br />
                        <span className="text-(--primary) font-semibold">maatriva.co.in</span> &bull; support@maatriva.co.in
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. STICKY FOOTER: ALWAYS 100% VISIBLE BUTTONS */}
          <div className="px-6 py-4 border-t border-slate-200 bg-white shrink-0 flex items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              Emails dispatched through Resend transactional API.
            </span>

            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2.5 clay-btn clay-btn-primary flex items-center gap-2 text-xs font-black shadow-lg shadow-(--primary)/20 cursor-pointer"
              >
                {loading ? (
                  <span>Dispatching Alert...</span>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Dispatch Alert via Resend</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
