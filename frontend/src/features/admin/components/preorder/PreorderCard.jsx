import React from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Send,
  Package,
  Calendar,
} from "lucide-react";

export default function PreorderCard({
  order,
  expandedItem,
  setExpandedItem,
  onSendAlert,
}) {
  const isExpanded = expandedItem === `preorder-${order.id}`;

  return (
    <div className="clay-card overflow-hidden my-3 border border-slate-100 hover:border-(--primary)/30 transition-all duration-300">
      <div
        onClick={() => setExpandedItem(isExpanded ? null : `preorder-${order.id}`)}
        className="p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
            <Package size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-(--text-dark) text-base">{order.name}</h4>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                Pre-Order #{order.id}
              </span>
            </div>

            <p className="text-xs text-(--text-light) font-semibold flex items-center gap-2 mt-1">
              <span>{order.email}</span>
              {order.phone && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone size={11} />
                    {order.phone}
                  </span>
                </>
              )}
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(order.created_at).toLocaleDateString(undefined, {
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
                  email: order.email,
                  name: order.name,
                  target: "individual",
                  subject: `Update on your Maatriva Pre-Order (#${order.id})`,
                  title: `Order Status & Fulfillment Update`,
                  message: `Hi ${order.name},\n\nWe have an update regarding your Maatriva Pre-Order (#${order.id}). Our production and clinical testing milestones are tracking smoothly.\n\nOur team will confirm shipping arrangements to your address (${order.address || "on file"}) prior to delivery.\n\nWarm regards,\nMaatriva Operations`,
                });
              }
            }}
            className="py-1.5 px-3.5 rounded-xl clay-btn clay-btn-primary text-xs font-black flex items-center gap-1.5 shadow-sm"
          >
            <Send size={12} />
            <span>Send Order Alert</span>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Mail size={14} className="text-(--primary)" />
                <span className="font-bold">Email:</span>
                <span className="font-semibold">{order.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Phone size={14} className="text-(--primary)" />
                <span className="font-bold">Phone:</span>
                <span className="font-semibold">{order.phone || "Not provided"}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
              <MapPin size={14} className="text-(--primary) mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">Delivery Address: </span>
                <span className="font-medium">{order.address || "Not provided"}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}