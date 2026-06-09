import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  Users,
} from "lucide-react";

export default function UserCard({
  user,
  expandedItem,
  setExpandedItem,
}) {
  const isExpanded =
    expandedItem === `user-${user.id}`;

  return (
    <div className="clay-card overflow-hidden my-3">

      <div
        onClick={() =>
          setExpandedItem(
            isExpanded
              ? null
              : `user-${user.id}`
          )
        }
        className="p-6 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div
            className="
              w-12
              h-12
              rounded-full
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              font-black
            "
          >
            {user.name?.charAt(0) || "U"}
          </div>

          <div>
            <h4 className="font-bold text-(--text-dark)">
              {user.name}
            </h4>

            <p className="text-xs text-(--text-light) font-bold uppercase tracking-wider">
              {user.email} • {new Date(user.created_at).toLocaleDateString()}
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
          <div className="p-4 clay-card space-y-3 mt-2">

            <div className="flex items-center gap-3 text-(--text-dark)">
              <Mail className="w-4 h-4 text-(--primary)" />
              <span className="font-semibold">{user.email}</span>
            </div>

            <div className="flex items-center gap-3 text-(--text-dark)">
              <Users className="w-4 h-4 text-(--primary)" />
              <span className="font-semibold">Role: {user.is_admin ? "Admin" : "User"}</span>
            </div>

          </div>
        </motion.div>
      )}
    </div>
  );
}