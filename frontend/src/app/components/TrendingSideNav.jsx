import { useEffect, useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import { useLocation } from "react-router-dom";

export default function TrendingSideNav() {
  const location = useLocation();

  const items = useMemo(
    () => [
      { id: "home", label: "AI Monitoring" },
      { id: "diseases", label: "Diseases" },
      { id: "features", label: "Features" },
      { id: "how-it-works", label: "How It Works" },
      // { id: "demo", label: "Demo" },
      { id: "pricing", label: "Pricing" },
      // { id: "testimonials", label: "Testimonials" },
      { id: "footer", label: "Footer" },
    ],
    []
  );

  const [activeSectionId, setActiveSectionId] = useState("home");

  // ✅ FIXED SCROLL DETECTION (NO FLICKER)
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";
      let minDistance = Infinity;

      items.forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        // 🔥 adjust for navbar height
        const offset = Math.abs(rect.top - 120);

        if (offset < minDistance && rect.top <= window.innerHeight * 0.6) {
          minDistance = offset;
          current = item.id;
        }
      });

      setActiveSectionId(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  // ✅ CLEAN SCROLL (NO STATE FORCE)
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // ❌ Don't show on other pages
  if (location.pathname !== "/") return null;

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
                        ? "w-4 h-4 bg-[var(--primary)] shadow-[0_0_0_6px_rgba(74,111,165,0.25)]"
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