import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

function capitalizeFirstLetter(str) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export default function PokeDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [pokemonData, setPokemonData] = useState(location.state?.pokemon);
  const [loading, setLoading] = useState(!location.state?.pokemon);

  async function getPokemonData() {
    try {
      const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const dataJson = await data.json();
      setPokemonData(dataJson);
    } catch (error) {
      console.error("Failed to fetch Pokemon data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!pokemonData) {
      getPokemonData();
    }
  }, [pokemonData]);

  if (loading) {
    return <p>Pokemon data loading...</p>;
  }

  if (!pokemonData) {
    return <p>Unable to load Pokemon data. Please try again later.</p>;
  }

  return (
    <div>
      <h1>{capitalizeFirstLetter(pokemonData.name)}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonData.id}.svg`}
        alt={pokemonData.name}
      />
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <p>Type: {pokemonData.types.map((type) => type.type.name).join(", ")}</p>
    </div>
  );
}
