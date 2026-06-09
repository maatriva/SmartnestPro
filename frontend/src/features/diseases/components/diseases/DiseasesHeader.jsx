export default function DiseasesHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16">
      <div className="inline-block px-4 py-2 clay-badge text-sm font-bold mb-4">
        Monitoring
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-(--text-dark) mb-6">
        Diseases that are monitored by us
      </h2>

      <p className="text-xl text-(--text-light)">
        Our smart baby cradle tracks vital patterns to
        detect symptoms early.
      </p>
    </div>
  );
}