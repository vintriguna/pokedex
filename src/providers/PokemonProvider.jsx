import React, { createContext, useState, useContext, useEffect } from "react";

export const PokemonContext = createContext();

export default function PokemonProvider({ children }) {
  const [pokemonArr, setPokemonArr] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [pokemonList, typeData] = await Promise.all([
          fetch("https://pokeapi.co/api/v2/pokemon?limit=1000"),
          fetch("https://pokeapi.co/api/v2/type/?limit=25"),
        ]);

        const pokemonListData = await pokemonList.json();
        const typeJson = await typeData.json();

        const pokemonResults = pokemonListData.results;
        const pokemonPromises = pokemonResults.map((obj) =>
          fetch(obj.url).then((res) => res.json())
        );

        const allPokemonData = await Promise.all(pokemonPromises);

        setPokemonArr(allPokemonData);
        setPokemonTypes(typeJson.results.map((type) => type.name));
        setLoading(false);
      } catch (error) {
        console.error("Error occurred while fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemonArr, pokemonTypes, loading }}>
      {children}
    </PokemonContext.Provider>
  );
}

export function usePokemon() {
  return useContext(PokemonContext);
}
