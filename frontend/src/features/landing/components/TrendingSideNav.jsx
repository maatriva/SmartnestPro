import { useEffect, useMemo, useState, useRef } from "react";
import Tilt from "react-parallax-tilt";
import { useLocation } from "react-router-dom";

export default function TrendingSideNav() {
  const location = useLocation();

  const items = useMemo(
    () => [
      { id: "home", label: "Hero Sanctuary" },
      { id: "the-problem", label: "The Problem" },
      { id: "how-it-works", label: "How It Works" },
      { id: "health-focus", label: "Health Focus" },
      { id: "app", label: "Mobile App" },
      { id: "how-we-help", label: "How We Help" },
      { id: "safety-privacy", label: "Safety & Privacy" },
      { id: "achievements", label: "Achievements" },
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "Contact & Inquiries" },
    ],
    [],
  );

  const [activeSectionId, setActiveSectionId] = useState("home");
  const lastActiveRef = useRef("home");

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = "home";
          let minDistance = Infinity;

          for (let i = 0; i < items.length; i++) {
            const el = document.getElementById(items[i].id);
            if (!el) continue;

            const rect = el.getBoundingClientRect();
            const offset = Math.abs(rect.top - 120);

            if (offset < minDistance && rect.top <= window.innerHeight * 0.6) {
              minDistance = offset;
              current = items[i].id;
            }
          }

          if (current !== lastActiveRef.current) {
            lastActiveRef.current = current;
            setActiveSectionId(current);
          }
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
      block: "start",
    });
  }

  if (location.pathname !== "/") return null;

  return (
    <aside className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden md:block pointer-events-none">
      <div className="clay-card px-3 py-4 max-h-[75vh] overflow-y-auto pointer-events-auto">
        <div className="flex flex-col items-center gap-3.5">
          {items.map((item) => {
            const active = activeSectionId === item.id;

            return (
              <Tilt key={item.id} tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.1}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="focus:outline-none cursor-pointer focus:ring-2 focus:ring-(--primary-light)/80 rounded-full p-0.5"
                  title={item.label}
                  aria-label={`Scroll to section: ${item.label}`}
                  aria-current={active ? "true" : "false"}
                >
                  <span
                    className={`rounded-full block transition-all duration-300 ${
                      active
                        ? "w-4 h-4 bg-(--primary) shadow-[inset_2px_2px_4px_rgba(255,255,255,0.7),_inset_-2px_-2px_4px_rgba(100,30,10,0.3),_0_0_12px_rgba(217,130,95,0.6)]"
                        : "w-2.5 h-2.5 bg-(--text-light)/40 hover:bg-(--primary) shadow-[inset_1px_1px_2px_rgba(255,255,255,0.5)]"
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
