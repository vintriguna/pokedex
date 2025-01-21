import PokeCard from "./PokeCard";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../providers/PokemonProvider";
export default function AppWrapper() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { pokemonArr, pokemonTypes, loading } = usePokemon();

  function handleSearch(value) {
    setSearchValue(value.toLowerCase());
  }

  function handlePokeCardClick(pokemon) {
    navigate(`/pokemon/${pokemon.id}`);
  }

  const filteredPokemon = pokemonArr.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchValue);
    const matchesType =
      selectedType === "all" ||
      pokemon.types.some((typeObj) => typeObj.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="contentWrapper">
      <SearchBar
        onSearch={handleSearch}
        pokemonTypes={pokemonTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      <div className="cardList">
        {filteredPokemon.map((pokemon) => (
          <PokeCard
            id={pokemon.id}
            key={pokemon.id}
            onClick={() => handlePokeCardClick(pokemon)}
          />
        ))}
      </div>
    </div>
  );
}
