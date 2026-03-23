import ClaySplineModel from "./ClaySplineModel";

export function LiveDemo() {
  const demoVideoUrl = import.meta.env.VITE_DEMO_VIDEO_URL || "";

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 rounded-full text-pink-700 text-sm font-medium mb-4">
            Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Watch the demo &{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              explore the 3D model
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            The 3D clay model “emerges from the side” when you scroll to it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-[3rem] p-6 bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-black/5 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-4 px-2">
              <div>
                <div className="text-sm font-semibold text-gray-900">Demo video</div>
                <div className="text-xs text-gray-500">Replace with your product video</div>
              </div>
              <div className="text-xs px-3 py-1 rounded-full bg-white/70 border border-black/5 text-gray-600">
                video embed
              </div>
            </div>

            {demoVideoUrl ? (
              <video
                src={demoVideoUrl}
                controls
                playsInline
                className="w-full aspect-video rounded-[2.25rem] border border-black/5 bg-black/5 shadow-xl"
              />
            ) : (
              <div className="aspect-video rounded-[2.25rem] border border-dashed border-black/10 bg-white/60 flex items-center justify-center text-center p-6">
                <div>
                  <div className="text-gray-900 font-semibold mb-2">
                    Add your demo video URL
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    Set `VITE_DEMO_VIDEO_URL` in your `.env`.
                  </div>
                  <div className="text-xs text-gray-500">
                    (No local mp4 found in the provided ZIPs.)
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 text-sm text-gray-600 leading-relaxed px-2">
              Tip: you can embed any mp4 from your CDN by setting `VITE_DEMO_VIDEO_URL`.
            </div>
          </div>

          <ClaySplineModel title="Smart Nest Pro (Clay 3D)" />
        </div>
      </div>
    </section>
  );
}
