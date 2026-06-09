import { motion } from "framer-motion";

export default function AuthError({
  error,
}) {
  if (!error) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="
        bg-red-50
        text-red-500
        p-3
        rounded-lg
        text-sm
        mb-6
        border
        border-red-100
      "
    >
      {error}
    </motion.div>
  );
}