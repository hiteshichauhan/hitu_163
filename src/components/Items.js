import React from "react";

// Items component to display Pokémon types
const Items = ({ types }) => {
    // Ensure types is defined and is an array
    if (!types || !Array.isArray(types)) {
        return <div>No types available</div>; // Fallback if no types
    }

    return (
        <ul className="type-list text-orange-400 p-1">
            {types.map((typeEntry, index) => {
                // Defensive check to ensure typeEntry and typeEntry.type.name are defined
                if (!typeEntry || !typeEntry.type || !typeEntry.type.name) {
                    console.warn("Invalid type structure:", typeEntry);
                    return null; // Skip rendering this item
                }
                return (
                    <li className="type-item" key={index}>
                        {typeEntry.type.name} {/* Pokémon types */}
                    </li>
                );
            })}
        </ul>
    );
};

// Parent component that uses the Items component
const PokemonList = ({ poke }) => {

    return (
        <div className="pokemon-list">
                        
            {/* Pass the correct props to Items */}
            <Items types={poke.types} />
        </div>
    );
};
export default PokemonList;
