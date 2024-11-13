import React from "react";

const PokemonImg = (props) => {
    
    const backImage = props.sprites?.back_default ; 
    const dreamWorldImage = props.sprites?.other?.dream_world?.front_default ; 

    return ( 
      
                <img
                    src={backImage} 
                    alt={props.name}
                    className="card-img-top"
                    onMouseOver={(e) =>
                        (e.currentTarget.src = dreamWorldImage)
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.src = backImage) 
                    }
                />
         
    );
};

export default PokemonImg;




