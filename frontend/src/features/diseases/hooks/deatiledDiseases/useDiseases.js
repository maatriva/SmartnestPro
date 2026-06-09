import { useEffect, useState } from "react";
import { fetchDiseases } from "../../services/diseasesService";

export default function useDiseases() {
  const [diseaseData, setDiseaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const loadDiseases = async () => {
      try {
        const data = await fetchDiseases();
        setDiseaseData(data || []);
      } catch (error) {
        console.error("Failed to fetch diseases:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDiseases();
  }, []);

  return {
    diseaseData,
    loading,
    selected,
    setSelected,
  };
}