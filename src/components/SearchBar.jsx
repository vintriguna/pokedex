import React from "react";

function capitalizeFirstLetter(str) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export default function SearchBar({
  onSearch,
  pokemonTypes,
  selectedType,
  setSelectedType,
}) {
  return (
    <div>
      <input
        className="pokeInput"
        type="search"
        placeholder="Search for a Pokemon"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="all">All</option>
        {pokemonTypes.map((type) => {
          return (
            <option value={type} key={type}>
              {capitalizeFirstLetter(type)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
