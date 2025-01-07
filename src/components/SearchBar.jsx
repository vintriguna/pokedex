import React from "react";

export default function SearchBar({ onSearch }) {
  return (
    <input
      className="pokeInput"
      type="search"
      placeholder="Search for a Pokemon"
      onChange={(e) => {
        onSearch(e.target.value);
      }}
    />
  );
}
