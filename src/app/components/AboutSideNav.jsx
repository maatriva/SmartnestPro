import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Tilt from "react-parallax-tilt";
export default function AboutSideNav() {
  const location = useLocation(); // not used for now but kept for consistency

  const items = useMemo(
    () => [
      { kind: "section", id: "about-us", label: "About" },
      { kind: "section", id: "contact", label: "Contact" },
    ],
    []
  );

  const sectionIds = useMemo(() => items.map((i) => i.id), [items]);

  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSectionId(id);
          }
        },
        { root: null, rootMargin: "0px", threshold: 0.6 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <aside
      className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      aria-label="About page navigation"
    >
      <div className="rounded-2xl bg-[var(--bg-glass)] backdrop-blur border border-[var(--border)] shadow-[var(--shadow)] px-3 py-4 max-h-[70vh] overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          {items.map((item) => {
            const active = activeSectionId === item.id;
            const dotClasses = active
               ? "w-3.5 h-3.5 bg-[var(--primary)] shadow-[0_0_0_6px_rgba(74,111,165,0.25)] transition-shadow duration-300"
               : "w-2.5 h-2.5 bg-[var(--text-light)] hover:bg-[var(--primary)] transition-colors duration-300";
            return (
              <Tilt options={{ max: 15, scale: 1.05, speed: 300 }}>
  <button
    key={item.id}
    type="button"
    onClick={() => scrollToSection(item.id)}
    className="focus:outline-none"
    aria-label={item.label}
    title={item.label}
  >
    <span className={dotClasses + " rounded-full block"} />
  </button>
</Tilt>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
