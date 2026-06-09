import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Linkedin } from "lucide-react";

export default function TeamMemberCard({
  member,
  index,
  isExpanded,
  onToggle,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      className="flex"
    >
      <motion.div
        layout
        className="relative flex w-full flex-col flex-1 items-center clay-card px-7 py-9 text-center text-(--text) transition-transform duration-300 hover:-translate-y-1"
      >
        {(member.isFounder || member.isCoFounder) && (
          <motion.span layout className="absolute left-5 top-5 rounded-full clay-badge px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em]">
            {member.isFounder ? "Founder" : "Co-Founder"}
          </motion.span>
        )}
        <motion.div layout className="mt-8 flex h-28 w-28 items-center justify-center rounded-full clay-badge p-1 shadow-[inset_3px_3px_6px_rgba(255,255,255,0.7),_inset_-3px_-3px_6px_rgba(0,0,0,0.15),_0_8px_16px_rgba(0,0,0,0.08)]">
          <img
            src={member.image}
            alt={member.name}
            className={`h-full w-full rounded-full object-cover ${member.objectPosition || 'object-center'}`}
          />
        </motion.div>
        <motion.div layout className="mt-8 w-full flex flex-col items-center">
          <h3 className="text-2xl font-black leading-tight text-(--text-dark)">
            {member.name}
          </h3>
          <p className="mt-3 text-[10px] font-black uppercase tracking-[0.18em] text-(--primary)">
            {member.role}
          </p>
        </motion.div>
        
        <motion.button
          layout
          onClick={onToggle}
          className={`mt-4 text-xs font-black uppercase tracking-wider text-blue-500 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer ${!isExpanded ? 'mt-auto' : ''}`}
        >
          {isExpanded ? "Show Less" : "Know More.."}
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full overflow-hidden flex flex-col items-center flex-1"
            >
              <p className="mt-6 text-left text-sm font-semibold leading-6 text-(--text)">
                {member.copy}
              </p>
              <div className="mt-auto pt-6">
                <a
                  href={member.linkedin || "https://www.linkedin.com/company/maatriva/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center clay-badge text-(--primary) hover:scale-110 cursor-pointer"
                  aria-label={`${member.name} LinkedIn profile`}
                >
                  <Linkedin size={18} strokeWidth={2} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
}
