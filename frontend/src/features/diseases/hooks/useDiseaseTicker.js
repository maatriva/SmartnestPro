import { useState } from "react";

export default function useDiseaseTicker() {
  const [activeIndex, setActiveIndex] =
    useState(null);

  const toggleDisease = (index) => {
    setActiveIndex((prev) =>
      prev === index ? null : index
    );
  };

  return {
    activeIndex,
    toggleDisease,
  };
}