import DiseaseCard from "./DiseasesCard";
import getCategoryIcon from "../../utils/getCategoryIcon";

export default function DiseaseSection({
  section,
  onSelect,
}) {
  const sectionId = section.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
  return (
    <section id={sectionId} className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="clay-badge p-3">
          {getCategoryIcon(section.category)}
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-black text-(--text-dark)">
            {section.category}
          </h2>

          <p className="text-(--text-light)">
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
    </section>
  );
}