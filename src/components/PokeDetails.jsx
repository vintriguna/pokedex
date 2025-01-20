import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "./PokeCard";
import { usePokemon } from "../providers/PokemonProvider";

export default function PokeDetails() {
  const { id } = useParams();
  const { pokemonArr, loading } = usePokemon();
  const [speciesData, setSpeciesData] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(false);

  const pokemonData = pokemonArr.find((pokemon) => pokemon.id === parseInt(id));

  useEffect(() => {
    async function getSpeciesData() {
      try {
        setLocalLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const responseJson = await response.json();
        setSpeciesData(responseJson);
      } catch (error) {
        console.error("Error fetching species data:", error);
        setError(true);
      } finally {
        setLocalLoading(false);
      }
    }

    getSpeciesData();
  }, [id]);

  const flavorText = speciesData
    ? speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      )?.flavor_text || "Description not available."
    : "Loading description...";

  const stats = pokemonData?.stats;
  const abilities = pokemonData?.abilities.map((obj) => obj.ability.name) || [];
  const captureRate = speciesData?.capture_rate;
  const genus = speciesData?.genera.find(
    (obj) => obj.language.name == "en"
  ).genus;
  const height = Math.round(pokemonData?.height * 0.1 * 100) / 100;
  const weight = Math.round(pokemonData?.weight * 0.1 * 100) / 100;

  if (loading) {
    return <p>Loading Pokémon data...</p>;
  }

  if (error) {
    return <h1>An error occurred. Please refresh and try again.</h1>;
  }

  if (localLoading || !speciesData) {
    return <p>Loading species data...</p>;
  }

  return (
    <div className="detailsWrapper">
      <div className="detailsCard">
        <div className="detailsHeader">
          <h1 className="detailsTitle">
            {capitalizeFirstLetter(pokemonData.name)}
          </h1>
          <p className="detailsType">
            {pokemonData.types.map((type) => type.type.name).join(", ")}
          </p>
        </div>
        <div className="detailsSecond">
          <div className="detailsImageContainer">
            <img
              className="detailsImage"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
              alt={pokemonData.name}
            />
            <p>{genus}</p>
          </div>
          <div className="detailsInformation">
            <p className="flavorText">{flavorText}</p>
            <h3 className="detailsSubheader">Abilities</h3>
            <div className="abilities">
              <ul>
                {abilities.map((ability, index) => (
                  <li className="abilitiesItem" key={index}>
                    {"\u2022"} {ability} {"\t"}
                  </li>
                ))}
              </ul>
            </div>
            <h3 className="detailsSubheader">Stats</h3>
            <div className="stats">
              <div className="subStats1">
                <p className="statParagraph">
                  Special Attack:{" "}
                  {
                    stats.find((obj) => obj.stat.name == "special-attack")
                      .base_stat
                  }
                </p>
                <p className="statParagraph">
                  HP: {stats.find((obj) => obj.stat.name == "hp").base_stat}
                </p>
                <p className="statParagraph">
                  Attack:{" "}
                  {stats.find((obj) => obj.stat.name == "attack").base_stat}
                </p>
                <p className="statParagraph">Height: {height}m</p>
              </div>
              <div className="subStats2">
                <p className="statParagraph">
                  Special Defense:{" "}
                  {
                    stats.find((obj) => obj.stat.name == "special-defense")
                      .base_stat
                  }
                </p>
                <p className="statParagraph">
                  Speed:{" "}
                  {stats.find((obj) => obj.stat.name == "speed").base_stat}
                </p>
                <p className="statParagraph">
                  Defense:{" "}
                  {stats.find((obj) => obj.stat.name == "defense").base_stat}
                </p>
                <p className="statParagraph">Weight: {weight}kgs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
