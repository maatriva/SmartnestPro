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
      className="py-24 px-6 clay-even-section text-(--text) overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <DiseasesHeader />
      </div>

      <DiseaseTicker
        diseases={DISEASES_DATA}
        activeIndex={activeIndex}
        onClick={toggleDisease}
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex w-full justify-center mt-12">
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