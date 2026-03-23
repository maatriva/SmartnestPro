import { useEffect, useState } from "react";

/**
 * Spline embed with "celestial clay" style container.
 * The 3D scene is loaded via iframe (requires a valid Spline embed URL).
 *
 * Configure in Vite env:
 * - VITE_SPLINE_URL: the full iframe src for your Spline scene
 */
export default function ClaySplineModel({ title = "3D Model" }) {
  const [visible, setVisible] = useState(false);
  const splineUrl = import.meta.env.VITE_SPLINE_URL || "";

  useEffect(() => {
    const el = document.getElementById("clay-spline-root");
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.25, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="clay-spline-root"
      className={[
        "transition-all duration-700 will-change-transform",
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      ].join(" ")}
    >
      <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-[3rem] p-6 border border-black/5 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4 px-2">
          <div>
            <div className="text-sm font-semibold text-gray-900">{title}</div>
            <div className="text-xs text-gray-500">Celestial clay look (demo embed)</div>
          </div>
          <div className="text-xs px-3 py-1 rounded-full bg-white/70 border border-black/5 text-gray-600">
            emerge on scroll
          </div>
        </div>

        {splineUrl ? (
          <iframe
            title={title}
            src={splineUrl}
            className="w-full aspect-video rounded-[2.25rem] border border-black/5 bg-white/60 shadow-xl"
            loading="lazy"
          />
        ) : (
          <div className="aspect-video rounded-[2.25rem] border border-dashed border-black/10 bg-white/60 flex items-center justify-center text-center p-6">
            <div>
              <div className="text-gray-900 font-semibold mb-2">Add your Spline URL</div>
              <div className="text-sm text-gray-600">
                Set `VITE_SPLINE_URL` in your `.env` with the Spline iframe src.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

