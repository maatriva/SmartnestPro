import React, { useEffect, useState, useMemo } from "react";
import Tilt from "react-parallax-tilt";

export default function DiseaseSideNav({ categories }) {
  const [activeSectionId, setActiveSectionId] = useState("");

  const items = useMemo(() => {
    return categories.map(cat => ({
      id: cat.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      label: cat
    }));
  }, [categories]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = "";
          let minDistance = Infinity;

          items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (!el) return;

            const rect = el.getBoundingClientRect();
            
            // If the top of the section is within the top portion of the viewport
            if (rect.top <= 200 && rect.bottom >= 200) {
              current = item.id;
            }
          });

          if (current) setActiveSectionId(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  return (
    <aside className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="rounded-2xl bg-[var(--bg-glass)] backdrop-blur border border-[var(--border)] shadow-[var(--shadow)] px-3 py-4 max-h-[70vh] overflow-y-auto">
        <div className="flex flex-col items-center gap-4">
          {items.map((item) => {
            const active = activeSectionId === item.id;

            return (
              <Tilt key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="focus:outline-none"
                  title={item.label}
                >
                  <span
                    className={`rounded-full block transition-all duration-300 ${
                      active
                        ? "w-4 h-4 bg-[var(--primary)] shadow-[0_0_0_6px_rgba(74,111,165,0.15)]"
                        : "w-2.5 h-2.5 bg-[var(--text-light)] hover:bg-[var(--primary)]"
                    }`}
                  />
                </button>
              </Tilt>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
