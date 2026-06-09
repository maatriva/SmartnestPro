import DiseaseChip from "./DiseasesChip";

export default function DiseaseTicker({
  diseases,
  activeIndex,
  onClick,
}) {
  return (
    <div className="w-full overflow-hidden my-8">
      <div className="flex whitespace-nowrap marquee">
        {[...diseases, ...diseases].map(
          (disease, index) => (
            <DiseaseChip
              key={index}
              disease={disease}
              index={index}
              activeIndex={activeIndex}
              onClick={onClick}
            />
          )
        )}
      </div>
    </div>
  );
}