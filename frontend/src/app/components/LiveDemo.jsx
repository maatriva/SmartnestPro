import ClaySplineModel from "./ClaySplineModel";

export function LiveDemo() {
  const demoVideoUrl = import.meta.env.VITE_DEMO_VIDEO_URL || "";

  return (
    <section
      id="demo"
      className="py-24 px-6 bg-[var(--bg-secondary)] text-[var(--text)]"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">

          <div className="inline-flex items-center gap-2 px-4 py-2 
          bg-[var(--bg-glass)] rounded-full 
          text-[var(--primary)] text-sm font-medium mb-4 
          border border-[var(--border)]">
            Demo
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-dark)] mb-6">
            Watch the demo &{" "}
            <span className="text-[var(--primary)]">
              explore the 3D model
            </span>
          </h2>

          <p className="text-xl text-[var(--text-light)]">
            The 3D clay model “emerges from the side” on scroll (Spline / Dora AI style).
          </p>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Video Card */}
          <div className="rounded-[var(--radius-lg)] p-6 
          bg-[var(--white)] border border-[var(--border)] 
          shadow-[var(--shadow)]">

            <div className="flex items-center justify-between gap-4 mb-4 px-2">
              <div>
                <div className="text-sm font-semibold text-[var(--text-dark)]">
                  Demo video
                </div>
                <div className="text-xs text-[var(--text-light)]">
                  Replace with your product video
                </div>
              </div>

              <div className="text-xs px-3 py-1 rounded-full 
              bg-[var(--bg-glass)] border border-[var(--border)] 
              text-[var(--text-light)]">
                video embed
              </div>
            </div>

            {demoVideoUrl ? (
              <video
                src={demoVideoUrl}
                controls
                playsInline
                className="w-full aspect-video rounded-[var(--radius)] 
                border border-[var(--border)] 
                bg-[var(--bg)] shadow-lg"
              />
            ) : (
              <div className="aspect-video rounded-[var(--radius)] 
              border border-dashed border-[var(--border)] 
              bg-[var(--bg-glass)] flex items-center justify-center text-center p-6">
                <div>
                  <div className="text-[var(--text-dark)] font-semibold mb-2">
                    Add your demo video URL
                  </div>
                  <div className="text-sm text-[var(--text-light)] mb-4">
                    Set `VITE_DEMO_VIDEO_URL` in your `.env`.
                  </div>
                  <div className="text-xs text-[var(--text-light)]">
                    (No local mp4 found in the provided ZIPs.)
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 text-sm text-[var(--text-light)] leading-relaxed px-2">
              Tip: you can embed any mp4 from your CDN by setting `VITE_DEMO_VIDEO_URL`.
            </div>
          </div>

          {/* 3D Model */}
          <ClaySplineModel title="Smart Nest Pro (Clay 3D)" />

        </div>
      </div>
    </section>
  );
}