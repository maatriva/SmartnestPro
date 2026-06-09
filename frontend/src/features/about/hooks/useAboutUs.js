import { useState } from "react";

export default function useAboutUs() {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (name) => {
    setExpandedCards((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return {
    expandedCards,
    toggleCard,
  };
}
