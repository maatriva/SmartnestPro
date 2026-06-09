import { motion } from "framer-motion";

export default function DiseaseCard({
  name,
  icon,
  onSelect,
}) {
  return (
    <motion.div
      onClick={onSelect}
      className="clay-card p-6 cursor-pointer group"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <div
          className="
            w-10
            h-10
            clay-badge
            text-(--primary)
            flex
            items-center
            justify-center
            shrink-0
            group-hover:scale-110
            transition-transform
          "
        >
          {icon}
        </div>

        <div className="text-left">
          <h3
            className="
              font-bold
              text-(--text-dark)
              leading-tight
              group-hover:text-(--primary)
              transition-colors
              line-clamp-2
            "
          >
            {name}
          </h3>

          <p
            className="
              text-xs
              text-(--text-light)
              mt-2
              font-bold
              tracking-wide
              uppercase
            "
          >
            CLICK FOR DETAILS
          </p>
        </div>
      </div>
    </motion.div>
  );
}