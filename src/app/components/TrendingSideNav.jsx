import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";


export default function TrendingSideNav() {
  const location = useLocation();

  
  const items = useMemo(
    () => [
      { kind: "section", id: "home", label: "AI Monitoring" },
      { kind: "section", id: "diseases", label: "Diseases" },
      { kind: "section", id: "features", label: "features" },
      { kind: "section", id: "how-it-works", label: "How It Works" },
      { kind: "section", id: "demo", label: "Demo" },
      { kind: "section", id: "pricing", label: "Pricing" },
      { kind: "section", id: "testimonials", label: "Testimonials" },
      { kind: "section", id: "footer", label: "Footer" },
      { kind: "route", to: "/survey", label: "Survey" },
      { kind: "route", to: "/about", label: "About Us" },
      { kind: "route", to: "/contact", label: "Contact Us" }
    ],
    []
  );

  const sectionIds = useMemo(
    () => items.filter((i) => i.kind === "section").map((i) => i.id),
    [items]
  );

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
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6, // 60% visible = active
      }
    );

    observer.observe(el);
    observers.push(observer);
  });

  return () => {
    observers.forEach((observer) => observer.disconnect());
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
      aria-label="Trending navigation"
    >
      <div className="rounded-2xl bg-white/60 backdrop-blur border border-black/5 shadow-sm px-3 py-4 max-h-[70vh] overflow-y-auto">
        <div className="text-[11px] font-semibold text-gray-500 tracking-wide mb-3 text-center">
          Trending
        </div>

        <div className="flex flex-col items-center gap-4">
          {items.map((item, idx) => {
            const active =
              item.kind === "section"
                ? location.pathname === "/" && activeSectionId === item.id
                : location.pathname === item.to;

            const dotClasses = active
              ? "w-3.5 h-3.5 bg-purple-600 shadow-[0_0_0_5px_rgba(124,58,237,0.18)]"
              : "w-2.5 h-2.5 bg-gray-300 hover:bg-purple-300 transition-colors";

            if (item.kind === "route") {
              return (
                <Link key={`${item.to}-${idx}`} to={item.to} aria-label={item.label}>
                  <span className={dotClasses + " rounded-full block"} title={item.label} />
                </Link>
              );
            }

            return (
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
            );
          })}
        </div>

        <div className="mt-4 h-px bg-black/5 w-full" />

        <div className="mt-3 text-[11px] text-gray-500 text-center leading-tight">
          Scroll to explore
        </div>
      </div>
    </aside>
  );
}

