import PokeCard from "./PokeCard";
import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../providers/PokemonProvider";
import LoadingScreen from "./LoadingScreen";
import cloudImage from "../assets/cloud.png";
import AboutDescription from "./AboutDescription";

export default function AppWrapper() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [pageHeight, setPageHeight] = useState(0);
  const [cloudArray, setCloudArray] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
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

  useEffect(() => {
    const contentWrapper = containerRef.current;

    if (!contentWrapper) return;

    setPageHeight(contentWrapper.clientHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        setPageHeight(height);
      }
    });

    resizeObserver.observe(contentWrapper);

    return () => resizeObserver.unobserve(contentWrapper);
  }, [filteredPokemon]);

  useEffect(() => {
    if (pageHeight > 0) {
      const cloudDensity = 0.5;
      const cloudCount = Math.max(
        5,
        Math.floor(pageHeight / 100) * cloudDensity
      );

      const clouds = Array.from({ length: cloudCount }, (_, i) => ({
        id: i,
        size: Math.random() * 100 + 100,
        top: `${Math.random() * pageHeight}px`,
        duration: `${Math.random() * 20 + 20}s`,
      }));
      setCloudArray(clouds);
    }
  }, [pageHeight]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="contentWrapper" ref={containerRef}>
      <div className="clouds">
        {cloudArray.map((cloud) => (
          <img
            key={cloud.id}
            className="cloud"
            src={cloudImage}
            alt="Cloud"
            style={{
              width: `${cloud.size}px`,
              top: cloud.top,
              animationDuration: cloud.duration,
            }}
          />
        ))}
      </div>
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
      {filteredPokemon.length == 0 && (
        <p className="noPokemonLabel">No pokémon found!</p>
      )}
      <AboutDescription />
    </div>
  );
}
