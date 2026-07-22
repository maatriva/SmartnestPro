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
        <title>Baby Disease Information | Maatriva</title>
        <meta name="description" content="Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice." />
        <meta name="keywords" content="infant disease registry, baby health indicators, pediatric symptoms, baby wellness database, Maatriva" />
        <link rel="canonical" href="https://maatriva.co.in/diseases" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Baby Disease Information | Maatriva" />
        <meta property="og:description" content="Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maatriva.co.in/diseases" />
        <meta property="og:image" content="https://maatriva.co.in/BasicCradle.jpeg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Baby Disease Information | Maatriva" />
        <meta name="twitter:description" content="Explore Maatriva's clinical registry detailing common infant wellness risks, pediatric diseases, warning indicators, and preventive baby care advice." />
        <meta name="twitter:image" content="https://maatriva.co.in/BasicCradle.jpeg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": "Baby Disease Information Registry - Maatriva",
            "description": "Explore pediatric information on common infant wellness risks and preventive care guidance.",
            "publisher": {
              "@type": "MedicalOrganization",
              "name": "Maatriva",
              "logo": "https://maatriva.co.in/android-chrome-512x512.png"
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