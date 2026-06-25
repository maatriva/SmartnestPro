import "../../../styles/theme.css";
import { Helmet } from "react-helmet-async";

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
        pt-32
        pb-20
      "
    >
      <Helmet>
        <title>Infant Disease Registry & Guidance | Maatriva</title>
        <meta name="description" content="Explore Maatriva's clinical registry detailing common infant wellness risks, early warning indicators, and how AI-powered cradles provide supportive care." />
        <link rel="canonical" href="https://maatriva.vercel.app/diseases" />
        <meta property="og:title" content="Infant Disease Registry & Guidance | Maatriva" />
        <meta property="og:description" content="Explore Maatriva's clinical registry detailing common infant wellness risks, early warning indicators, and how AI-powered cradles provide supportive care." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.vercel.app/diseases" />
        <meta property="og:image" content="https://maatriva.vercel.app/BasicCradle.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Infant Disease Registry & Guidance | Maatriva" />
        <meta name="twitter:description" content="Explore Maatriva's clinical registry detailing common infant wellness risks, early warning indicators, and how AI-powered cradles provide supportive care." />
        <meta name="twitter:image" content="https://maatriva.vercel.app/BasicCradle.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": "Infant Disease Registry & Guidance",
            "description": "Explore pediatric information on common infant diseases and preventive care guidance.",
            "publisher": {
              "@type": "Organization",
              "name": "Maatriva"
            }
          })}
        </script>
      </Helmet>
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