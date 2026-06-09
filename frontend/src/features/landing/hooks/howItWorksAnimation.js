import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useHowItWorksAnimation(gridRef) {
  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".hiw-card");

      if (!cards.length) return;

      const first = cards[0];
      if (!first) return;

      const firstRect = first.getBoundingClientRect();

      const overlapStates = cards.map((card, i) => {
        const r = card.getBoundingClientRect();

        return {
          x: firstRect.left - r.left,
          y: firstRect.top - r.top,
          rotation: (i - 2) * 8,
          scale: i === 0 ? 1 : 0.98,
          opacity: i === 0 ? 1 : 0,
        };
      });

      gsap.set(cards, {
        transformOrigin: "center",
        transformPerspective: 600,
        willChange: "transform,opacity",
      });

      cards.forEach((card, i) => {
        gsap.set(card, overlapStates[i]);
      });

      let expanded = false;

      const expandToNormal = () => {
        if (expanded) return;

        expanded = true;

        gsap.to(cards, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: {
            each: 0.06,
            from: "start",
          },
          overwrite: "auto",
          clearProps: "transform,opacity,willChange",
        });
      };

      ScrollTrigger.create({
        trigger: grid,
        start: "top 80%",
        once: true,
        onEnter: expandToNormal,
      });

      const onHover = () => expandToNormal();

      first.addEventListener("mouseenter", onHover);

      return () => {
        first.removeEventListener("mouseenter", onHover);
      };
    }, grid);

    return () => ctx.revert();
  }, [gridRef]);
}