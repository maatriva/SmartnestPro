import React from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Building,
  Send,
  Calendar,
} from "lucide-react";

export default function ContactCard({
  contact,
  expandedItem,
  setExpandedItem,
  onSendAlert,
}) {
  const isExpanded = expandedItem === `contact-${contact.id}`;

  return (
    <div className="clay-card overflow-hidden my-3 border border-slate-100 hover:border-(--primary)/30 transition-all duration-300">
      <div
        onClick={() => setExpandedItem(isExpanded ? null : `contact-${contact.id}`)}
        className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-(--primary) to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
            {contact.name?.charAt(0)?.toUpperCase() || "C"}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-(--text-dark) text-base">{contact.name}</h4>
              {contact.organization ? (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1">
                  <Building size={11} />
                  {contact.organization}
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Individual
                </span>
              )}
            </div>

            <p className="text-xs text-(--text-light) font-semibold flex items-center gap-2 mt-1">
              <span>{contact.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(contact.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onSendAlert) {
                onSendAlert({
                  email: contact.email,
                  name: contact.name,
                  target: "individual",
                  subject: `Regarding your inquiry with Maatriva`,
                  title: `Response to Your Inquiry`,
                  message: `Hi ${contact.name},\n\nThank you for reaching out regarding "${contact.message}". We would be happy to share more details about our solutions with ${contact.organization || "you"}.\n\nBest regards,\nMaatriva Team`,
                });
              }
            }}
            className="py-1.5 px-3.5 rounded-xl clay-btn clay-btn-primary text-xs font-black flex items-center gap-1.5 shadow-sm"
          >
            <Send size={12} />
            <span>Send Alert / Reply</span>
          </button>

          <div className="p-1 rounded-full text-slate-400 hover:text-slate-600">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-6 pb-6 pt-1 border-t border-slate-100 bg-slate-50/50"
        >
          <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-3 mt-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
              <Mail size={14} className="text-(--primary)" />
              <span>Full Message:</span>
            </div>

            <p className="text-sm text-slate-800 font-medium leading-relaxed whitespace-pre-wrap pl-5 border-l-2 border-(--primary)/40">
              {contact.message}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}