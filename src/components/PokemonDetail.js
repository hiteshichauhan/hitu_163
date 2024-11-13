import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PokemonDetail = () => {
    const [pokemon, setPokemon] = useState([]); // State to store Pokémon data
    const [offset, setOffset] = useState(0); // Offset for pagination
    const [limit] = useState(3); // Limit of Pokémon to fetch per request
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error handling state
    const [toggleStates, setToggleStates] = useState({}); // State to track toggle for each Pokémon
    const navigate = useNavigate(); // Hook to navigate between routes

    const toggleImage = (pokeId) => {
        // Toggle the image visibility for a specific Pokémon
        setToggleStates((prev) => ({
            ...prev,
            [pokeId]: !prev[pokeId], // Flip the current toggle state
        }));
    };

    const fetchPokemonData = async () => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        setLoading(true); // Set loading to true before fetching data
        try {
            const response = await axios.get(url); // Fetch the list of Pokémon
            const promises = response.data.results.map((p) => axios.get(p.url)); // Fetch details for each Pokémon
            const results = await Promise.all(promises); // Wait for all requests to finish

            setPokemon((prev) => {
                const newPokemon = results.map((res) => res.data);
                const combinedPokemon = [...prev, ...newPokemon];
                return Array.from(new Set(combinedPokemon.map((poke) => poke.id))).map(
                    (id) => combinedPokemon.find((poke) => poke.id === id)
                );
            });

            setOffset((prev) => prev + limit); // Increment the offset for the next fetch
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
            setError("Failed to fetch Pokémon data."); // Handle any errors
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    const handleImageClick = (pokeId) => {
        // Navigate to the pokemoninfo route with the Pokémon ID
        navigate(`/pokemoninfo/${pokeId}`); 
    };

    return (
        <div className="container">
            <h1 className="my-4">Pokémon List</h1>
            <p
                className=""
                onClick={fetchPokemonData} // Fetch more Pokémon when clicked
                disabled={loading} // Disable button while loading
            >
                {loading ? "Loading..." : "Get More Pokémon"}{" "}
            </p>

            <div className="row" id="pokemon-container">
                {pokemon.map((poke) => (
                    <div className="col-md-4" key={poke.id}>
                        <div className="card m-2" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <img
                                    src={toggleStates[poke.id] ? poke.sprites?.other?.dream_world?.front_default : poke.sprites?.back_default} // Toggle between images
                                    alt={poke.name}
                                    style={{ width: '100%', height: 'auto', cursor: 'pointer' }} // Add cursor pointer
                                    onClick={() => handleImageClick(poke.id)} // Add click handler
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={() => toggleImage(poke.id)}
                                >
                                    Toggle image
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonDetail;


  