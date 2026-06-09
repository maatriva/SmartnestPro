import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by name or email...",
}) {
  return (
    <div className="relative w-full sm:w-64">
      <Search
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
        size={18}
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          pl-12
          pr-4
          py-3
          clay-input
          font-medium
        "
      />
    </div>
  );
}