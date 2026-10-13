import React from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  ShieldCheck,
  Stethoscope,
  User,
  Send,
  Calendar,
} from "lucide-react";

export default function UserCard({
  user,
  expandedItem,
  setExpandedItem,
  onSendAlert,
}) {
  const isExpanded = expandedItem === `user-${user.id}`;

  return (
    <div className="clay-card overflow-hidden my-3 border border-slate-100 hover:border-(--primary)/30 transition-all duration-300">
      <div
        onClick={() => setExpandedItem(isExpanded ? null : `user-${user.id}`)}
        className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm shrink-0 text-white ${
              user.is_admin
                ? "bg-gradient-to-tr from-rose-500 to-red-600"
                : user.is_professional
                ? "bg-gradient-to-tr from-sky-500 to-indigo-600"
                : "bg-gradient-to-tr from-(--primary) to-indigo-500"
            }`}
          >
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-(--text-dark) text-base">{user.name}</h4>
              {user.is_admin ? (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                  <ShieldCheck size={11} />
                  Admin
                </span>
              ) : user.is_professional ? (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 flex items-center gap-1">
                  <Stethoscope size={11} />
                  Medical Professional
                </span>
              ) : (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                  <User size={11} />
                  Parent Member
                </span>
              )}
            </div>

            <p className="text-xs text-(--text-light) font-semibold flex items-center gap-2 mt-1">
              <span>{user.email}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                Joined {new Date(user.created_at).toLocaleDateString(undefined, {
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
                  email: user.email,
                  name: user.name,
                  target: "individual",
                  subject: `Official Communication for ${user.name} | Maatriva`,
                  title: `Account & Healthcare Portal Notice`,
                  message: `Hi ${user.name},\n\nWe are reaching out to you from the Maatriva executive administration regarding your account (${user.email}).\n\nIf you have any clinical questions or feedback regarding our platform, our team is always at your service.\n\nBest regards,\nMaatriva Administration`,
                });
              }
            }}
            className="py-1.5 px-3.5 rounded-xl clay-btn clay-btn-primary text-xs font-black flex items-center gap-1.5 shadow-sm"
          >
            <Send size={12} />
            <span>Send Alert</span>
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
          <div className="p-4 bg-white rounded-xl border border-slate-100 space-y-2.5 mt-3 shadow-xs text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Mail size={14} className="text-(--primary)" />
              <span className="font-bold">Email Address:</span>
              <span className="font-semibold">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <User size={14} className="text-(--primary)" />
              <span className="font-bold">Account Role:</span>
              <span className="font-semibold">
                {user.is_admin
                  ? "System Administrator (Full Access)"
                  : user.is_professional
                  ? "Verified Healthcare Professional"
                  : "Parent / Family Member"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar size={14} className="text-(--primary)" />
              <span className="font-bold">Registered On:</span>
              <span className="font-semibold">
                {new Date(user.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}