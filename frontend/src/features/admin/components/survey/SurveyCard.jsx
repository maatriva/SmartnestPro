import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { questions } from "../../../survey/constants/questions";

export default function SurveyCard({
  survey,
  expandedItem,
  setExpandedItem,
  parseAnswers,
}) {
  const isExpanded = expandedItem === `survey-${survey.id}`;
  const answersObj = parseAnswers(survey.answers) || {};

  return (
    <div className="clay-card overflow-hidden my-3">
      <div
        onClick={() =>
          setExpandedItem(isExpanded ? null : `survey-${survey.id}`)
        }
        className="p-6 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-black shrink-0">
            {survey.name?.charAt(0) || "A"}
          </div>
          <div>
            <h4 className="font-bold text-(--text-dark)">{survey.name}</h4>

            <p className="text-xs text-(--text-light) font-bold uppercase tracking-wider flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="break-all">{survey.email}</span>
              {survey.phone && <span>• Phone: {survey.phone}</span>}
              {survey.gender && <span>• Gender: {survey.gender}</span>}
              <span>• {new Date(survey.created_at).toLocaleDateString()}</span>
            </p>
          </div>
        </div>

        {isExpanded ? (
          <ChevronUp className="text-gray-400" />
        ) : (
          <ChevronDown className="text-gray-400" />
        )}
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-6 pb-6 pt-2 border-t border-white/60"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {Object.entries(answersObj).map(([key, value]) => {
              const qIndex = parseInt(key);
              const isOtherKey = key.includes("_other");
              const questionObj = questions[qIndex];
              const questionLabel = isOtherKey
                ? `Q${qIndex + 1} (Specified Reason)`
                : (questionObj?.number || `Q${qIndex + 1}`);
              const questionText = questionObj?.question || "";

              return (
                <div key={key} className="p-4 clay-card">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-xs font-black text-(--primary) uppercase tracking-wider">
                      {questionLabel}
                    </p>
                    {isOtherKey && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                        Other Text
                      </span>
                    )}
                  </div>

                  {questionText && !isOtherKey && (
                    <p className="text-xs text-(--text-light) font-medium line-clamp-2 mb-2">
                      {questionText}
                    </p>
                  )}

                  <p className="text-(--text-dark) font-semibold text-sm">
                    {Array.isArray(value) ? value.join(", ") : String(value)}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}