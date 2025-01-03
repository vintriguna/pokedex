import PokeCard from "./PokeCard";
import React, { useEffect, useState } from "react";
export default function AppWrapper() {
  const [pokemonArr, setPokemonArr] = useState([]);

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
      "https://pokeapi.co/api/v2/pokemon?limit=2000"
    );
    const pokemonListData = await pokemonList.json();
    const pokemonResults = pokemonListData.results;

    let pokemonPromises = pokemonResults.map((obj) =>
      fetch(obj.url).then((res) => res.json())
    );

    // for (let i = 0; i < pokemonResults.length; i++) {
    //     const endpoint = pokemonResults[i].url;
    //     pokemonPromises.push(fetch(endpoint));
    // }

    const allPokemonData = await Promise.all(pokemonPromises);
    setPokemonArr(allPokemonData);
  }

  useEffect(() => {
    getPokemonData();
  }, []);

  if (pokemonArr.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div className="cardList">
      {pokemonArr.map((pokemon) => (
        <PokeCard data={pokemon} />
      ))}
    </div>
  );

  return <PokeCard data={pokemonArr[371]} />;
}
