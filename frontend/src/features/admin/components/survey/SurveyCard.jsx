import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function SurveyCard({
  survey,
  expandedItem,
  setExpandedItem,
  parseAnswers,
}) {
  const isExpanded =
    expandedItem ===
    `survey-${survey.id}`;

  return (
    <div className="clay-card overflow-hidden my-3">

      <div
        onClick={() =>
          setExpandedItem(
            isExpanded
              ? null
              : `survey-${survey.id}`
          )
        }
        className="p-6 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-black">
            {survey.name?.charAt(0) || "A"}
          </div>
          <div>
            <h4 className="font-bold text-(--text-dark)">
              {survey.name}
            </h4>

            <p className="text-xs text-(--text-light) font-bold uppercase tracking-wider">
              {survey.email}
              {survey.phone ? ` • Phone: ${survey.phone}` : ""}
              {survey.gender ? ` • Gender: ${survey.gender}` : ""}
              {` • ${new Date(survey.created_at).toLocaleDateString()}`}
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
          initial={{
            opacity: 0,
            height: 0,
          }}
          animate={{
            opacity: 1,
            height: "auto",
          }}
          className="px-6 pb-6 pt-2 border-t border-white/60"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">

            {Object.entries(
              parseAnswers(
                survey.answers
              )
            ).map(
              ([key, value]) => (
                <div
                  key={key}
                  className="p-4 clay-card"
                >
                  <p className="text-xs font-bold text-(--text-light) uppercase mb-1">
                    Q
                    {parseInt(key) +
                      1}
                  </p>

                  <p className="text-(--text-dark) font-semibold">
                    {Array.isArray(
                      value
                    )
                      ? value.join(
                          ", "
                        )
                      : value}
                  </p>
                </div>
              )
            )}

          </div>
        </motion.div>
      )}
    </div>
  );
}