import { useEffect, useState } from "react";

export function AnimatedPrice({ value, duration = 1 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof value !== "string") {
      setCount(value);
      return;
    }

    const numericString = value.replace(/,/g, "");
    const end = parseInt(numericString, 10);

    if (isNaN(end)) {
      setCount(value);
      return;
    }

    let start = 0;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * (end - start) + start);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  // Format count if it's a number, otherwise display raw value
  const displayValue = typeof count === "number" 
    ? `₹${count.toLocaleString("en-IN")}` 
    : count;

  return <span>{displayValue}</span>;
}
