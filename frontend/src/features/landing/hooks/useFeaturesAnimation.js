import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useFeaturesAnimation(gridRef) {
  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".grid-item");

      if (!items.length) return;

      gsap.from(items, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: {
          amount: 0.6,
          from: "center",
        },
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          once: true,
        },
        clearProps: "transform,opacity",
      });
    }, grid);

    return () => ctx.revert();
  }, [gridRef]);
}