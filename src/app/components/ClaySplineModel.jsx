import { useEffect, useState } from "react";

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
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10",
      ].join(" ")}
    >
      <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-[3rem] p-6 border border-black/5 shadow-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4 px-2">
          <div>
            <div className="text-sm font-semibold text-gray-900">{title}</div>
            <div className="text-xs text-gray-500">
              Celestial clay look (Spline / Dora AI embed)
            </div>
          </div>
          <div className="text-xs px-3 py-1 rounded-full bg-white/70 border border-black/5 text-gray-600">
            emerge on scroll
          </div>
        </div>

        {/* Model */}
        {splineUrl ? (
          <div className="w-full aspect-video overflow-hidden rounded-[2.25rem] border border-black/5 bg-white/60 shadow-xl">
            <iframe
              title={title}
              src={splineUrl}
              className="w-full h-full scale-[1.4] md:scale-[1.6] lg:scale-[1.8]"
              style={{ transformOrigin: "center" }}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-video rounded-[2.25rem] border border-dashed border-black/10 bg-white/60 flex items-center justify-center text-center p-6">
            <div>
              <div className="text-gray-900 font-semibold mb-2">
                Add your Spline URL
              </div>
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