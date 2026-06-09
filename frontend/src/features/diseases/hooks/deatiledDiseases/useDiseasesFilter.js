import { useMemo, useState } from "react";

export default function useDiseaseFilter(diseaseData) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return diseaseData;

    const query = searchQuery.toLowerCase();

    return diseaseData
      .map((section) => ({
        ...section,
        diseases: section.diseases.filter((disease) =>
          disease.name.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.diseases.length > 0);
  }, [searchQuery, diseaseData]);

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
  };
}