import React from "react";

export default function AboutDescription() {
  return (
    <div className="about">
      <h4 className="aboutParagraph">
        This project is a fan-made Pokédex and is not affiliated with, endorsed,
        or sponsored by Nintendo, Game Freak, or The Pokémon Company. Pokémon
        and all associated names, logos, and assets are trademarks of their
        respective owners.
      </h4>
      <h4 className="aboutParagraph">
        Data provided via{" "}
        <a
          className="link"
          href="https://pokeapi.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          PokéAPI
        </a>
        . Cloud sprite courtesy of{" "}
        <a
          className="link"
          href="https://opengameart.org/users/rrcaseyr"
          target="_blank"
          rel="noopener noreferrer"
        >
          rrcaseyr
        </a>
        .
      </h4>
    </div>
  );
}
