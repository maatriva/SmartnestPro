import React from "react";
import { Clock, Sparkles } from "lucide-react";

export default function RealLifeMomentVignette({ moment }) {
  if (!moment) return null;

  return (
    <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/75 border border-white shadow-xs flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
      {/* Time & Clock Icon Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-(--primary)/15 text-(--primary) text-xs font-black shrink-0 border border-(--primary)/20">
        <Clock size={14} />
        <span>{moment.time}</span>
      </div>

      {/* Vignette Illustration / Descriptive Narrative */}
      <div className="flex-1">
        <h4 className="text-sm sm:text-base font-bold text-(--text-dark) leading-snug">
          “{moment.vignette}”
        </h4>
        <p className="text-xs sm:text-sm text-(--text-light) font-medium mt-0.5">
          {moment.caption}
        </p>
      </div>

      <div className="hidden lg:flex items-center gap-1.5 text-xs font-extrabold text-(--accent) shrink-0 bg-(--accent)/10 px-3 py-1 rounded-full">
        <Sparkles size={13} />
        <span>Real Moment</span>
      </div>
    </div>
  );
}
