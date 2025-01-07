import PokeCard from "./PokeCard";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
export default function AppWrapper() {
  const [pokemonArr, setPokemonArr] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

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

  async function getPokemonTypes() {
    try {
      const typeData = await fetch("https://pokeapi.co/api/v2/type/?limit=25");
      const typeJson = await typeData.json();
      setPokemonTypes(typeJson.results.map((type) => type.name));
    } catch (error) {
      console.error("Error fetching Pokémon types: ", error);
    }
  }

  function handleSearch(value) {
    setSearchValue(value.toLowerCase());
  }

  async function start() {
    await Promise.all([getPokemonData(), getPokemonTypes()]);
    setLoading(false);
  }

  useEffect(() => {
    start();
  }, []);

  // const filteredPokemon = pokemonArr.filter((pokemon) =>
  //   pokemon.name.startsWith(searchValue)
  // );

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
          <PokeCard data={pokemon} key={pokemon.id} />
        ))}
      </div>
    </div>
  );
}
