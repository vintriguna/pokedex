import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { capitalizeFirstLetter } from "./PokeCard";
import { usePokemon } from "../providers/PokemonProvider";
import LoadingScreen from "./LoadingScreen";

export default function PokeDetails() {
  const { id } = useParams();
  const { pokemonArr, loading } = usePokemon();
  const [speciesData, setSpeciesData] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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

  function handleRedirect() {
    navigate("/");
  }

  function handleInnerClick(e) {
    e.stopPropagation();
  }

  const flavorText = speciesData
    ? speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      )?.flavor_text || "Description not available."
    : "Loading description...";

  const stats = pokemonData?.stats;
  let abilities = pokemonData?.abilities.map((obj) => obj.ability.name) || [];
  abilities = abilities.map((ability) => ability.replace("-", " "));
  const captureRate = speciesData?.capture_rate;
  const genus = speciesData?.genera.find(
    (obj) => obj.language.name == "en"
  ).genus;
  const height = Math.round(pokemonData?.height * 0.1 * 100) / 100;
  const weight = Math.round(pokemonData?.weight * 0.1 * 100) / 100;

  const pokemonTypes = {
    normal: "#C1C2C1",
    fighting: "#FFAC59",
    flying: "#ADD2F5",
    poison: "#B884DC",
    ground: "#B78E6F",
    rock: "#CBC7AD",
    bug: "#B8C26A",
    ghost: "#A284A2",
    steel: "#99C2D1",
    stellar: "#40B5A5",
    fire: "#EF7373",
    water: "#73ADF5",
    grass: "#82C274",
    electric: "#FCD659",
    psychic: "#F584A7",
    ice: "#80DFF7",
    dragon: "#8D98EC",
    dark: "#9A8A8C",
    fairy: "#F5A2F5",
  };
  let styleTheme;
  const typeColor1 = pokemonData?.types[0].type.name;
  if (pokemonData?.types.length > 1) {
    const typeColor2 = pokemonData?.types[1].type.name;
    styleTheme = {
      background: `linear-gradient(to right bottom ,${pokemonTypes[typeColor1]}, ${pokemonTypes[typeColor2]})`,
    };
  } else {
    styleTheme = {
      backgroundColor: pokemonTypes[typeColor1],
    };
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>An error occurred. Please refresh and try again.</h1>;
  }

  return (
    <div className="detailsWrapper" onClick={handleRedirect}>
      <div
        className="detailsCard"
        style={styleTheme}
        onClick={(e) => handleInnerClick(e)}
      >
        <div className="detailsHeader">
          <h1 className="detailsTitle">
            {capitalizeFirstLetter(pokemonData.name)}
          </h1>
          <p className="detailsSubtitle">
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
            {localLoading ? (
              <div className="skeleton skeletonSubtitle"></div>
            ) : (
              <p className="detailsSubtitle">{genus}</p>
            )}
          </div>
          <div className="detailsInformation">
            {localLoading ? (
              <div>
                <div className="skeleton skeletonText"></div>
                <div className="skeleton skeletonText"></div>
                <div className="skeleton skeletonText"></div>
              </div>
            ) : (
              <p className="flavorText">{flavorText}</p>
            )}
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
