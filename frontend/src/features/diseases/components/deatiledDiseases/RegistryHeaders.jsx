import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import DiseaseSearch from "./DiseasesSearch";

export default function RegistryHeader({
  searchQuery,
  setSearchQuery,
}) {
  return (
    <>
      <nav className="max-w-7xl mx-auto px-8 py-8 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 clay-btn clay-btn-secondary px-5 py-2 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />

          <span className="hidden sm:inline">
            Back to Home
          </span>
        </Link>

        <div className="flex items-center gap-2 px-4 py-2 clay-badge text-[10px] sm:text-xs font-black">
          <ShieldCheck className="w-4 h-4 text-(--primary)" />

          Clinical Protocol v2.4
        </div>
      </nav>

      <header className="registry-header max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 uppercase text-(--text-dark)">
          Monitoring Registry
        </h1>

        <DiseaseSearch
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </header>
    </>
  );
}