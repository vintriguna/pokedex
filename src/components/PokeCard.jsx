export default function PokeCard({ data }) {
  return (
    <div className="cardContainer">
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
