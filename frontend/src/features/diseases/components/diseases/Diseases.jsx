import "../../../../styles/theme.css";
import { useNavigate } from "react-router-dom";

import DiseasesHeader from "./DiseasesHeader";
import DiseaseTicker from "./DiseasesTicker";

import useDiseaseTicker from "../../hooks/useDiseaseTicker";

import { DISEASES_DATA } from "../../data/diseasesData";

export default function Diseases() {
  const navigate = useNavigate();

  const {
    activeIndex,
    toggleDisease,
  } = useDiseaseTicker();

  return (
    <section
      id="diseases"
      className="clay-section clay-even-section text-(--text)"
    >
      <div className="max-w-7xl mx-auto clay-container">
        <DiseasesHeader />
      </div>

      <DiseaseTicker
        diseases={DISEASES_DATA}
        activeIndex={activeIndex}
        onClick={toggleDisease}
      />

      <div className="max-w-7xl mx-auto clay-container">
        <div className="flex w-full justify-center mt-10 sm:mt-12">
          <button
            onClick={() => navigate("/diseases")}
            className="px-6 py-3 clay-btn clay-btn-primary"
          >
            Know More
          </button>
        </div>
      </div>
    </section>
  );
}