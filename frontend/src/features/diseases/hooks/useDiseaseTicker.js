import { useState, useCallback } from "react";

export default function useDiseaseTicker() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDisease = useCallback((index) => {
    setActiveIndex((prev) =>
      prev === index ? null : index
    );
  }, []);

  return {
    activeIndex,
    toggleDisease,
  };
}