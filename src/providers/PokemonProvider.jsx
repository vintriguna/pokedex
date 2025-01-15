import React, { createContext, useState, useContext, useEffect } from "react";

export const PokemonContext = createContext();

export default function PokemonProvider({ children }) {
  const [pokemonArr, setPokemonArr] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getPokemonData() {
    try {
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
    } catch (error) {
      console.log("An error occured while fetching the pokemon data: ", error);
    }
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

  async function start() {
    try {
      await Promise.all([getPokemonData(), getPokemonTypes()]);
    } catch (error) {
      console.log("An error occured while initializing: ", error);
    }
  }

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (pokemonArr.length > 0 && pokemonTypes.length > 0) {
      setLoading(false);
    }
  }, [pokemonArr, pokemonTypes]);

  return (
    <PokemonContext.Provider value={{ pokemonArr, pokemonTypes, loading }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
