import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <label className="input w-full input-bordered flex items-center gap-2">
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(searchQuery);
          }
        }}
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        required
        placeholder="Search"
      />
    </label>
  );
}

export default SearchBar;
