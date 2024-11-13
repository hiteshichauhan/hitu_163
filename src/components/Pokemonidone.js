
import React, { useState } from 'react';
import axios from 'axios';

const PokemonIdForm = () => {
    const [inputValue, setInputValue] = useState(''); // State to store input value
    const [pokemonData, setPokemonData] = useState(null); // State to store fetched Pokémon data
    const [error, setError] = useState(null); // State to store error messages
    const [loading, setLoading] = useState(false); // State to manage loading state

    // Handle input change
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // Update input value on change
    };
    
    

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading to true
        setError(null); // Reset error state

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputValue}`); // Fetch Pokémon data
            setPokemonData(response.data); // Set the fetched Pokémon data
        } catch (err) {
            console.error("Error fetching Pokémon data:", err);
            setError("Failed to fetch Pokémon data. Please check the ID."); // Handle errors
            setPokemonData(null); // Reset Pokémon data on error
        } finally {
            setLoading(false); // Set loading to false
        }
        setInputValue(''); // Clear the input field after submission
    };

    return (
        <div className="container mt-4">
            <h2>Enter Pokémon ID</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputField" className="form-label">Pokémon ID:</label>
                    <input
                        type="number" 
                        id="inputField"
                        className="form-control"
                        value={inputValue}
                        onChange={handleInputChange} // Update the state on input change
                        placeholder="Type Pokémon ID..."
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {loading && <p>Loading...</p>} {/* Show loading message */}
            {error && <p className="text-danger">{error}</p>} {/* Show error message */}
            {pokemonData && ( // Display fetched Pokémon data
                <div className="mt-4">
                    <h4>Pokémon Data:</h4>
                    <h5>Name: {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h5>
                    <p>ID: {pokemonData.id}</p>

                    {/* Display list of types */}
                    <h5>Types:</h5>
                    {pokemonData.types.length > 0 ? (
                        <ul>
                            {pokemonData.types.map((type) => (
                                <li key={type.type.name}>
                                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No types available.</p>
                    )}

                    {/* Display the Pokémon sprite */}
                    <img src={pokemonData.sprites?.front_default} alt={pokemonData.name} style={{ width: '200px' }} />
                </div>
            )}
        </div>
    );
};

export default PokemonIdForm;


