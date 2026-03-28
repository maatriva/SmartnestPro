import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Tilt from "react-parallax-tilt";

export default function AboutSideNav() {
  const location = useLocation();

  const items = useMemo(
    () => [
      { kind: "section", id: "about-us", label: "About" },
      { kind: "section", id: "contact", label: "Contact" },
    ],
    []
  );

  const sectionIds = useMemo(() => items.map((i) => i.id), [items]);

  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0]);

  // ✅ SMOOTH SCROLL DETECTION (NO FLICKER)
  useEffect(() => {
    const handleScroll = () => {
      let currentSection = sectionIds[0];
      let minDistance = Infinity;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top);

        if (
          distance < minDistance &&
          rect.top <= window.innerHeight * 0.5
        ) {
          minDistance = distance;
          currentSection = id;
        }
      });

      setActiveSectionId(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on load

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  // ✅ SMOOTH SCROLL CLICK
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <aside
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block"
      aria-label="About page navigation"
    >
      <div className="rounded-2xl bg-[var(--bg-glass)] backdrop-blur border border-[var(--border)] shadow-[var(--shadow)] px-3 py-4 max-h-[70vh] overflow-y-auto">
        <div className="flex flex-col items-center gap-5">
          {items.map((item) => {
            const active = activeSectionId === item.id;

            const dotClasses = active
              ? "w-4 h-4 bg-[var(--primary)] shadow-[0_0_0_6px_rgba(74,111,165,0.25)] transition-all duration-300"
              : "w-2.5 h-2.5 bg-[var(--text-light)] hover:bg-[var(--primary)] transition-all duration-300";

            return (
              <Tilt
                key={item.id}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.1}
                transitionSpeed={300}
                gyroscope={true}
              >
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="focus:outline-none group"
                  aria-label={item.label}
                >
                  {/* Dot */}
                  <span
                    className={`${dotClasses} rounded-full block`}
                  />

                  {/* Tooltip */}
                  <span className="absolute right-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 text-xs bg-black text-white px-2 py-1 rounded">
                    {item.label}
                  </span>
                </button>
              </Tilt>
            );
          })}
        </div>
      </div>
    </aside>
  );
}