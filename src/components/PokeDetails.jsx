import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "./PokeCard";
import { usePokemon } from "../providers/PokemonProvider";

export default function PokeDetails() {
  const { id } = useParams();
  const { pokemonArr, loading } = usePokemon();
  const pokemonData = pokemonArr.find((pokemon) => pokemon.id === parseInt(id));

  if (loading) {
    return <p>Pokemon data loading...</p>;
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
