import DiseaseCard from "./DiseasesCard";
import getCategoryIcon from "../../utils/getCategoryIcon";

export default function DiseaseSection({
  section,
  onSelect,
}) {
  const sectionId = section.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return (
    <section
      id={sectionId}
      className="relative overflow-hidden mb-20 p-6 sm:p-8 md:p-10 rounded-[32px] clay-hero border-2 border-white/80 shadow-[0_20px_50px_rgba(103,210,218,0.3)]"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-(--primary) opacity-10 blur-[120px] rounded-full" />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
          linear-gradient(to right, var(--primary) 1px, transparent 1px),
          linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="clay-badge p-3 bg-white/60">
            {getCategoryIcon(section.category)}
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-(--text-dark)">
              {section.category}
            </h2>

            <p className="text-(--text-light) font-bold text-sm">
              {section.diseases.length} conditions monitored
            </p>
          </div>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {section.diseases.map((disease) => (
            <DiseaseCard
              key={disease.id || disease.name}
              name={disease.name}
              icon={getCategoryIcon(section.category)}
              onSelect={() => onSelect(disease)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}