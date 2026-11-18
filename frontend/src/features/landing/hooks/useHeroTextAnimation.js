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
      if (!text.trim()) return;

      const frag = document.createDocumentFragment();
      // Split preserving words and whitespace tokens
      const tokens = text.split(/(\s+)/);

      tokens.forEach((token) => {
        if (!token) return;

        if (/^\s+$/.test(token)) {
          // Whitespace token: keep as standard text node for natural inter-word spacing
          frag.appendChild(document.createTextNode(token));
          return;
        }

        // Word token: wrap in an unbreakable inline-block word container
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        [...token].forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.textContent = char;
          charSpan.style.display = "inline-block";

          wordSpan.appendChild(charSpan);
          spans.push(charSpan);
        });

        frag.appendChild(wordSpan);
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