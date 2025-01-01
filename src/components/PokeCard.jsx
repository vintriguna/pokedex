export default function PokeCard({ data }) {
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

  const typeColor = data.types[0].type.name;
  //WILL HAVE TO SUPPORT POKEMON WITH 2 TYPES.. HOW DO I SET THE BACKGROUND COLOR IN THAT CASE?

  return (
    <div
      className="cardContainer"
      style={{ backgroundColor: pokemonTypes[typeColor] }}
    >
      <p>ID:{data.id}</p>
      <img
        className="pokemonImage"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
        alt="a pokemon"
      />
      <p>{data.name}</p>
    </div>
  );
}
