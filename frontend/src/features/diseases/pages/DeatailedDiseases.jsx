import "../../../styles/theme.css";

import RegistryHeader from "../components/deatiledDiseases/RegistryHeaders";
import DiseaseSection from "../components/deatiledDiseases/DiseasesSection";
import DiseaseModal from "../components/deatiledDiseases/DiseasesModal";
import LoadingState from "../components/deatiledDiseases/LoadingState";
import DiseaseSideNav from "../components/deatiledDiseases/DiseaseSideNav";

import useDiseases from "../hooks/deatiledDiseases/useDiseases";
import useDiseaseFilter from "../hooks/deatiledDiseases/useDiseasesFilter";

export default function DetailedDiseases() {
  const {
    diseaseData,
    loading,
    selected,
    setSelected,
  } = useDiseases();

  const {
    searchQuery,
    setSearchQuery,
    filteredData,
  } = useDiseaseFilter(diseaseData);

  if (loading) {
    return <LoadingState />;
  }

  const categories = filteredData.map((section) => section.category);

  return (
    <main
      className="
        min-h-screen
        bg-(--bg)
        text-(--text)
        pb-20
      "
    >
      <DiseaseSideNav categories={categories} />

      <RegistryHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-6 mt-16">
        {filteredData.map((section) => (
          <DiseaseSection
            key={section.category}
            section={section}
            onSelect={setSelected}
          />
        ))}
      </div>

      <DiseaseModal
        selected={selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}