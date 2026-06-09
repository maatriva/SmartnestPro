import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
} from "lucide-react";

export default function PreorderCard({
  order,
  expandedItem,
  setExpandedItem,
}) {
  const isExpanded =
    expandedItem ===
    `preorder-${order.id}`;

  return (
    <div className="clay-card overflow-hidden my-3">

      <div
        onClick={() =>
          setExpandedItem(
            isExpanded
              ? null
              : `preorder-${order.id}`
          )
        }
        className="p-6 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-black">
            {order.name?.charAt(0) || "U"}
          </div>
          <div>
            <h4 className="font-bold text-(--text-dark)">
              {order.name}
            </h4>

            <p className="text-xs text-(--text-light) font-bold uppercase tracking-wider">
              {order.email} • {new Date(order.created_at).toLocaleDateString()}
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
              <Phone className="w-4 h-4 text-(--primary)" />
              <span className="font-semibold">
                {order.phone || "No phone provided"}
              </span>
            </div>

            <div className="flex items-start gap-3 text-(--text-dark)">
              <Mail className="w-4 h-4 text-(--primary) mt-1" />
              <span className="font-semibold">
                {order.address || "No address provided"}
              </span>
            </div>

          </div>
        </motion.div>
      )}
    </div>
  );
}