import React from "react";
import {
  RefreshCw,
  Send,
  Download,
  Sparkles,
  Activity,
  Layers,
} from "lucide-react";

export default function DashboardHeader({
  onRefresh,
  isRefreshing = false,
  onOpenEmailModal,
  onExportData,
}) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="clay-card p-6 md:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border border-white/60 shadow-lg">
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-(--primary) to-indigo-600 text-white shadow-md">
            <Sparkles size={20} />
          </div>
          <span className="text-xs font-black tracking-widest text-(--primary) uppercase bg-(--primary)/10 px-3 py-1 rounded-full border border-(--primary)/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Maatriva Command Center
          </span>
          <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
            <Activity size={13} className="text-emerald-500" />
            Live Sync • {currentDate}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-(--text-dark) tracking-tight">
          Executive Healthcare Dashboard
        </h1>

        <p className="text-sm font-semibold text-(--text-light) max-w-2xl">
          Real-time monitoring of clinical inquiries, pre-order reservations, patient surveys, and
          automated transactional email alerts powered by Resend.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        {/* Send Email Alert Button */}
        <button
          type="button"
          onClick={onOpenEmailModal}
          className="flex-1 sm:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-(--primary) to-indigo-600 hover:from-indigo-600 hover:to-(--primary) text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-(--primary)/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Send size={15} />
          <span>Send Email Alert</span>
        </button>

        {/* Export Data Button */}
        {onExportData && (
          <button
            type="button"
            onClick={onExportData}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl clay-card border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-all cursor-pointer"
            title="Download CSV export"
          >
            <Download size={15} className="text-(--primary)" />
            <span>Export CSV</span>
          </button>
        )}

        {/* Refresh Feed */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="p-3 rounded-2xl clay-card border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-(--primary) transition-all cursor-pointer flex items-center justify-center"
          title="Refresh Data"
        >
          <RefreshCw
            size={16}
            className={`${isRefreshing ? "animate-spin text-(--primary)" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}