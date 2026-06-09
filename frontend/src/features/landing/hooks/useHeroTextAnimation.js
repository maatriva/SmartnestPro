import { useEffect } from "react";
import gsap from "gsap";

export default function useHeroTextAnimation(ref) {
  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const original = el.innerHTML;

    const spans = [];

    const walker = document.createTreeWalker(
      el,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach((textNode) => {
      const text = textNode.nodeValue || "";

      const frag = document.createDocumentFragment();

      [...text].forEach((char) => {
        if (char === " ") {
          frag.appendChild(document.createTextNode(" "));
          return;
        }

        const span = document.createElement("span");

        span.textContent = char;
        span.style.display = "inline-block";

        frag.appendChild(span);

        spans.push(span);
      });

      textNode.parentNode.replaceChild(frag, textNode);
    });

    gsap.from(spans, {
      scale: 0,
      y: 50,
      rotation: () => gsap.utils.random(-20, 20),
      stagger: {
        each: 0.03,
        from: "random",
      },
      duration: 0.5,
      ease: "back.out(2)",
    });

    return () => {
      el.innerHTML = original;
    };
  }, [ref]);
}