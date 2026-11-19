import { motion } from "framer-motion";

export default function DiseaseCard({
  name,
  icon,
  onSelect,
}) {
  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="clay-card-light bg-(--surface) p-5 sm:p-6 rounded-2xl border border-(--border-card) shadow-sm hover:shadow-md transition-[transform,box-shadow] duration-200 cursor-pointer group"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3.5">
        <div
          className="
            w-10
            h-10
            rounded-xl
            bg-(--bg-canvas)
            border
            border-(--border-card)
            text-(--brand-accent)
            flex
            items-center
            justify-center
            shrink-0
          "
        >
          {icon}
        </div>

        <div className="text-left">
          <h3
            className="
              font-bold
              text-(--text-primary)
              leading-snug
              group-hover:text-(--brand-accent)
              transition-colors
              line-clamp-2
              font-display
            "
          >
            {name}
          </h3>

          <p
            className="
              text-xs
              text-(--brand-accent)
              mt-1.5
              font-semibold
            "
          >
            View clinical details →
          </p>
        </div>
      </div>
    </motion.div>
  );
}