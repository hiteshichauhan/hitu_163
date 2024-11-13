import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import List from "./List";
import PokemonId from "./PokemonId";
import Items from './Items';
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { Card, CardBody, CardHeader } from "react-bootstrap";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]); // State to store Pokémon data
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [limit] = useState(3); // Limit of Pokémon to fetch per request
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling state
  const [toggleStates, setToggleStates] = useState({}); // State to track toggle for each Pokémon
  const navigate = useNavigate(); // Initialize navigate function here

  const toggleImage = (pokeId) => {
    // Toggle the image visibility for a specific Pokémon
    setToggleStates((prev) => ({
      ...prev,
      [pokeId]: !prev[pokeId], // Flip the current toggle state
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPokemonData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const response = await axios.get(url);
      const promises = response.data.results.map((p) => axios.get(p.url));
      const results = await Promise.all(promises);

      // Update the state with the new Pokémon data, ensuring uniqueness
      setPokemon((prev) => {
        const newPokemon = results.map((res) => res.data);
        const combinedPokemon = [...prev, ...newPokemon];
        return Array.from(new Set(combinedPokemon.map((poke) => poke.id))).map(
          (id) => combinedPokemon.find((poke) => poke.id === id)
        );
      });

      setOffset((prev) => prev + limit);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setError("Failed to fetch Pokémon data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {


    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        fetchPokemonData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPokemonData]); 


  const handleImageClick = (pokeId) => {
    console.log(`Image clicked for Pokémon ID: ${pokeId}`); // This will log the Pokémon ID
    // Navigate to details if needed (commented out)
    navigate(`/pokemoninfo?id=${pokeId}`); // Use navigate to change route when needed
  };

  return (
    <div className="container-fluid bg-body-secondary">
      <h1 className="my-4 text-center">Pokémon List</h1>
      <div className="flex justify-center mb-4"> 
      <button 
        type="button" 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={fetchPokemonData}
        disabled={loading}
      >
        {loading ? "Loading..." : "Get More Pokémon"}
      </button>
    </div>
    
    <div className="flex flex-wrap justify-center">
      <div className="row container border-transparent p-2 bg-body-secondary m-md-auto" id="pokemon-container">
        {pokemon.map((poke) => (
          <div className="col-md-4 p-2 w-full "  key={poke.id}>
            
              < div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow-md ">
               
              <div className="card-body">
             
               <img className="bg-white  hover:scale-75"
                  src={toggleStates[poke.id] ? poke.sprites?.other?.dream_world?.front_default : poke.sprites?.back_default}
                  alt={poke.name}
                  style={{ width: '90%', height: 'auto', transition: 'transform 0.2s ease' }}
                  onMouseOut={(e) =>
                    (e.currentTarget.src = poke.sprites?.back_default)
                  }
                  onClick={() => handleImageClick(poke.id)} // Handle image click without navigation
                />
                 
                <button 
                  className="btn  mt-2 mb-2 p-0 text-lg-start"cd
                  onClick={() => toggleImage(poke.id)}
                >
                  Toggle image
                </button>
                <div className="flex-grow"> 
                <List name={poke.name} />
                <PokemonId id={poke.id} />
                <Items poke={poke} />
              </div>
              </div>
              </div>
       
            </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default PokemonList;
