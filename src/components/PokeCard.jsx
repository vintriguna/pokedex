import { usePokemon } from "../providers/PokemonProvider";

export function capitalizeFirstLetter(str) {
  return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}

export default function PokeCard({ id, onClick }) {
  const { pokemonArr } = usePokemon();
  const data = pokemonArr[id - 1];

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
  const typeColor1 = data.types[0].type.name;
  if (data.types.length > 1) {
    const typeColor2 = data.types[1].type.name;
    styleTheme = {
      background: `linear-gradient(to right bottom ,${pokemonTypes[typeColor1]}, ${pokemonTypes[typeColor2]})`,
    };
  } else {
    styleTheme = {
      backgroundColor: pokemonTypes[typeColor1],
    };
  }
  return (
    <div className="cardContainer" style={styleTheme} onClick={onClick}>
      <p className="pokeCardId">{data.id}</p>
      <img
        className="pokemonImage"
        //src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
        alt={data.name}
        loading="lazy"
      />
      <p className="pokeCardLabel">{capitalizeFirstLetter(data.name)}</p>
    </div>
  );
}
