import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PokemonInfofirst = () => {
  const [pokemon, setPokemon] = useState(null); // State for the selected Pokémon
  const location = useLocation();

  // URL search query string (like ?id=123)
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  console.log(userId);
  

  // Fetch the specific Pokémon when the component mounts
  useEffect(() => {
    const fetchPokemon = async () => {
        if(!userId) return;
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${userId}`); 
        setPokemon(response.data); // Set the Pokémon data
      } catch (error) {
        console.error("Error fetching Pokémon:", error.message);
      }
    };

    fetchPokemon();
  }, [userId]);

 

  return (
    <div style={{ padding: "20px" }}>
      {pokemon ? ( // If the Pokémon data is available, display its details
        <div>
          <h2>{pokemon.name}</h2>{" "}
          {/* Display the Pokémon's name */}
          <img
            src={pokemon.sprites.front_default} // Display the Pokémon's sprite
            alt={pokemon.name}
            width="200" 
          />
        </div>
      ) : (
        <p>Loading...</p> // Show loading message while fetching
      )}
    </div>
  );
};

export default PokemonInfofirst;
