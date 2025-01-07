import PokeCard from "./PokeCard";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
export default function AppWrapper() {
  const [pokemonArr, setPokemonArr] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  async function getData() {
    try {
      const urlData = await fetch("https://pokeapi.co/api/v2/pokemon/1/");
      const pokemonData = await urlData.json();
      console.log(pokemonData);
      setPokemonArr((prevArr) => [...prevArr, pokemonData]);
    } catch (error) {
      console.error("Error while fetching data: ", error);
    }
  }

  async function getPokemonData() {
    //let pokemonPromises = [];
    const pokemonList = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=1000"
    );
    const pokemonListData = await pokemonList.json();
    const pokemonResults = pokemonListData.results;

    let pokemonPromises = pokemonResults.map((obj) =>
      fetch(obj.url).then((res) => res.json())
    );

    const allPokemonData = await Promise.all(pokemonPromises);
    setPokemonArr(allPokemonData);
  }

  function handleSearch(value) {
    setSearchValue(value.toLowerCase());
  }

  useEffect(() => {
    getPokemonData();
  }, []);

  const filteredPokemon = pokemonArr.filter((pokemon) =>
    pokemon.name.startsWith(searchValue)
  );

  if (pokemonArr.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div className="contentWrapper">
      <SearchBar onSearch={handleSearch} />
      <div className="cardList">
        {filteredPokemon.map((pokemon) => (
          <PokeCard data={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
}
