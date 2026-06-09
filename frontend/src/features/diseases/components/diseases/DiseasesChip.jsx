export default function DiseaseChip({
  disease,
  index,
  activeIndex,
  onClick,
}) {
  return (
    <div
      onClick={() => onClick(index)}
      className={`
        mx-8
        cursor-pointer
        text-sm
        md:text-base
        px-5
        py-2.5
        transition-all
        duration-300
        rounded-full

        ${
          activeIndex === index
            ? "clay-card text-(--text-dark) scale-110"
            : "clay-badge text-(--text-light)"
        }
      `}
    >
      <div className="font-bold inline-block mr-2">
        {disease.name}:
      </div>

      <span className="font-semibold text-xs md:text-sm">
        {activeIndex === index
          ? disease.full
          : disease.short}
      </span>

      <span className="mx-6 text-(--primary-light)">
        •
      </span>
    </div>
  );
}