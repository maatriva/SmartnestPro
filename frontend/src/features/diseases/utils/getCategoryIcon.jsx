import React from "react";
import { Heart, Wind, Brain, ShieldCheck, Activity } from "lucide-react";

const getCategoryIcon = (categoryName) => {
  if (!categoryName) return <Activity className="w-5 h-5" />;
  const name = categoryName.toLowerCase();
  if (name.includes("cardiac") || name.includes("parental")) {
    return <Heart className="w-5 h-5" />;
  }
  if (name.includes("respiratory") || name.includes("sleep")) {
    return <Wind className="w-5 h-5" />;
  }
  if (name.includes("neuro")) {
    return <Brain className="w-5 h-5" />;
  }
  if (name.includes("infection") || name.includes("sepsis")) {
    return <ShieldCheck className="w-5 h-5" />;
  }
  return <Activity className="w-5 h-5" />;
};

export default getCategoryIcon;
