import React, { useEffect, useState } from "react";

const sections = [
  { id: "about-us", label: "About Us" },
  { id: "contact", label: "Contact" },
];

const SideNavDots = () => {
  const [active, setActive] = useState("about-us");

  // ✅ Scroll-based active section detection (BEST METHOD)
  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0].id;

      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= window.innerHeight * 0.4) {
          current = section.id;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);

    // run once on load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Click only scrolls (no state conflict)
  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 
      bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-4 shadow-lg"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleClick(section.id)}
          className="relative group flex items-center focus:outline-none"
        >
          {/* Dot */}
          <span
            className={`w-3 h-3 rounded-full transition-all duration-300 
            ${
              active === section.id
                ? "bg-[var(--primary)] scale-125 shadow-[0_0_18px_4px_var(--primary)]"
                : "bg-white/40 hover:bg-[var(--primary)]"
            }`}
          />

          {/* Tooltip */}
          <span
            className="absolute left-6 whitespace-nowrap text-sm 
            bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 
            transition duration-200"
          >
            {section.label}
          </span>
        </button>
      ))}
    </nav>
  );
};

export default SideNavDots;