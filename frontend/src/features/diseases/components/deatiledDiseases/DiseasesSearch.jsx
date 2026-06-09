export default function DiseaseSearch({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="SEARCH..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="
        w-full
        mt-6
        px-6
        py-4
        clay-input
        text-lg
        font-semibold
        outline-none
      "
    />
  );
}