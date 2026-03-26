import "../../styles/theme.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tickerData = [
  { name: "Cystic Fibrosis", short: "Thick mucus buildup in lungs" },
  { name: "Sleep Apnea", short: "Breathing pauses during sleep" },
  { name: "Tetralogy of Fallot", short: "Heart defect causing low oxygen" },
  { name: "Epilepsy", short: "Repeated seizures affecting brain" },
  { name: "Hydrocephalus", short: "Fluid buildup in brain" },
  { name: "Arrhythmias", short: "Irregular heart rhythms" }
];

const Diseases = () => {
  const headingRef = useRef(null);
  const marqueeRef = useRef(null);
  const buttonWrapRef = useRef(null);
  const chipRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const headingEl = headingRef.current;
      const marqueeEl = marqueeRef.current;
      const buttonEl = buttonWrapRef.current;
      const chips = chipRefs.current.filter(Boolean);

      if (!headingEl || !marqueeEl || !buttonEl || chips.length === 0) return;

      // Initial states (avoid flicker)
      gsap.set(headingEl, { opacity: 0, y: -10 });
      gsap.set(marqueeEl, { opacity: 0 });
      gsap.set(buttonEl, { opacity: 0, y: 20 });
      gsap.set(chips, { opacity: 0, y: 12 });

      // Heading: fade + slight upward motion (once)
      gsap.to(headingEl, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingEl,
          start: "top 85%",
          once: true,
        },
      });

      // Marquee container: fade in (no Y transform to avoid conflicts with CSS marquee)
      gsap.to(marqueeEl, {
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: marqueeEl,
          start: "top 85%",
          once: true,
        },
      });

      // Chips: staggered fade + upward motion (once)
      gsap.to(chips, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: { each: 0.03, from: "start" },
        scrollTrigger: {
          trigger: marqueeEl,
          start: "top 85%",
          once: true,
        },
      });

      // Button wrapper: fade + slight upward (once)
      gsap.to(buttonEl, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        delay: 0.08,
        scrollTrigger: {
          trigger: buttonEl,
          start: "top 85%",
          once: true,
        },
      });

      // Hover micro-interactions (premium feel)
      const button = buttonEl.querySelector("button");
      const tweenIn = (el) =>
        gsap.to(el, {
          scale: 1.04,
          duration: 0.22,
          ease: "power3.out",
          overwrite: "auto",
        });
      const tweenOut = (el) =>
        gsap.to(el, {
          scale: 1,
          duration: 0.22,
          ease: "power3.out",
          overwrite: "auto",
        });

      const chipHandlers = chips.map((chip) => {
        const onEnter = () => tweenIn(chip);
        const onLeave = () => tweenOut(chip);
        chip.addEventListener("mouseenter", onEnter);
        chip.addEventListener("mouseleave", onLeave);
        return { chip, onEnter, onLeave };
      });

      let buttonHandlers = null;
      if (button) {
        const onEnter = () => tweenIn(button);
        const onLeave = () => tweenOut(button);
        button.addEventListener("mouseenter", onEnter);
        button.addEventListener("mouseleave", onLeave);
        buttonHandlers = { button, onEnter, onLeave };
      }

      return () => {
        chipHandlers.forEach(({ chip, onEnter, onLeave }) => {
          chip.removeEventListener("mouseenter", onEnter);
          chip.removeEventListener("mouseleave", onLeave);
        });
        if (buttonHandlers) {
          buttonHandlers.button.removeEventListener(
            "mouseenter",
            buttonHandlers.onEnter
          );
          buttonHandlers.button.removeEventListener(
            "mouseleave",
            buttonHandlers.onLeave
          );
        }
      };
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="diseases"
      className="overflow-hidden 
      bg-white/50 backdrop-blur-sm  border border-white/40 shadow-[var(--shadow)]
      text-[var(--text)] 
      py-6 "
    >
      {/* Heading */}
      <h1
        ref={headingRef}
        className="text-2xl font-bold text-[var(--text-dark)] text-center p-5"
      >
        Diseases That are Monitored by us
      </h1>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap marquee hover:[animation-play-state:paused]"
      >
        {[...tickerData, ...tickerData].map((item, i) => (
          <div
            key={i}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            className="mx-8 text-sm md:text-base 
            border border-[var(--border)] 
            rounded-full px-4 py-2 
            bg-[var(--bg-secondary)] backdrop-blur"
          >
            <div className="font-semibold text-[var(--text-dark)]">
              {item.name}
            </div>
            <span className="text-[var(--text-light)]">{item.short}</span>
            <span className="mx-6 text-[var(--text-light)]">•</span>
          </div>
        ))}
      </div>

      {/* Button */}
      <div ref={buttonWrapRef} className="flex w-full justify-center mt-6">
        <button
          className="px-5 py-2.5 
          bg-[var(--primary)] text-white 
          rounded-full 
          hover:bg-[var(--primary-hover)] 
          hover:shadow-[var(--shadow-primary)] 
          transition-all font-semibold"
        >
          Know more
        </button>
      </div>
    </div>
  );
};

export default Diseases;

