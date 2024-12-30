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
      console.error("Error while fetching data", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (pokemonArr.length === 0) {
    return <div>loading...</div>;
  }

  return <PokeCard data={pokemonArr[0]} />;
}
