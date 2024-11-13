import React from "react";

const pokemonId =(props)=>{
    return(
        <p className="card-text">#{props.id}</p>
    );
};

export default pokemonId;