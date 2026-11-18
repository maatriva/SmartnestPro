import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Wind,
  Heart,
  Thermometer,
  Activity,
  Moon,
  Volume2,
  Droplets,
  Gauge,
  ShieldAlert,
  Zap,
  Smile,
  Sparkles,
} from "lucide-react";

export default function AnimatedHealthIcon({ iconType, className = "w-7 h-7" }) {
  const shouldReduceMotion = useReducedMotion();

  switch (iconType) {
    case "breathing":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.18, 1], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Wind className={className} strokeWidth={2.2} />
        </motion.div>
      );

    case "heart":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1, 1.22, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.2, 0.4, 0.6, 1] }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Heart className={`${className} fill-(--primary)/20`} strokeWidth={2.2} />
        </motion.div>
      );

    case "temperature":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -2, 0], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Thermometer className={className} strokeWidth={2.2} />
        </motion.div>
      );

    case "oxygen":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Activity className={className} strokeWidth={2.2} />
        </motion.div>
      );

    case "moon":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, -4, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 4.0, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Moon className={`${className} fill-(--primary)/25`} strokeWidth={2.2} />
        </motion.div>
      );

    case "sound":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.12, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Volume2 className={className} strokeWidth={2.2} />
        </motion.div>
      );

    case "bleeding":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 3, 0], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Droplets className={`${className} fill-(--primary)/20`} strokeWidth={2.2} />
        </motion.div>
      );

    case "pressure":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [-10, 10, -10] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Gauge className={className} strokeWidth={2.2} />
        </motion.div>
      );

    case "infection":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.1, 1] }}
          transition={{ duration: 3.0, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <ShieldAlert className={`${className} fill-(--primary)/20`} strokeWidth={2.2} />
        </motion.div>
      );

    case "clot":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: [0, 180, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Zap className={className} strokeWidth={2.2} />
        </motion.div>
      );

    case "mind":
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.12, 1], y: [0, -2, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Smile className={`${className} fill-(--primary)/20`} strokeWidth={2.2} />
        </motion.div>
      );

    case "recovery":
    default:
      return (
        <motion.div
          animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center text-(--primary)"
        >
          <Sparkles className={className} strokeWidth={2.2} />
        </motion.div>
      );
  }
}
