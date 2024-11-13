import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PokemonInfo = () => {
  const { id } = useParams(); // Get the Pokémon ID from the URL parameters
  const [pokemon, setPokemon] = useState(null); // State to store Pokémon details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [items, setItems] = useState([]); // State to store Pokémon items
  const [spriteUrls, setSpriteUrls] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Fetch Pokémon details
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);

        const sprites = response.data.sprites;
        console.log("sprites", sprites);

        const urls = [];

        for (const key in sprites) {
          if (sprites[key] !== null && typeof sprites[key] === "string") {
            urls.push(sprites[key]);
          }
        }

        console.log("valid sprite URLs:", urls);
        setSpriteUrls(urls); // Update the state with the valid URLs

        // console.log(response.data.sprites)

        const itemResponse = await axios.get(
          "https://pokeapi.co/api/v2/item?limit=100"
        ); // Fetch items
        setItems(itemResponse.data.results); // Set the items data
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setError("Failed to fetch Pokémon details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>

      {/* Display the sprites using a loop */}
      {spriteUrls.length > 0 && (
        <div>
          {spriteUrls.map((url, index) =>
            url ? (
              <img key={index} 
              src={url}
              alt={`Sprite ${index + 1}`} 
               />
            ) : null
          )}
        </div>
      )}

      {pokemon.types.length > 0 ? (
        <ul>
          {pokemon.types.map((type) => (
            <li key={type.type.name}>
              {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No types available.</p>
      )}
    </div>
  );
};

export default PokemonInfo;
