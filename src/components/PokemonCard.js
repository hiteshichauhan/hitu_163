import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import axios from 'axios';

const PokemonCard = () => {
  const [pokemon, setPokemon] = useState([
    { id: 1, name: 'Bulbasaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
    { id: 2, name: 'Ivysaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png' },
    { id: 3, name: 'Venusaur', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchPokemon = async () =>{
        try{
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=8');
            const pokemonData = await Promise.all(
            response.data.results.map(async(poke)=>{
          const PokemonDetail = await axios.get(poke.url);
          return{
            id:PokemonDetail.data.id,
            name:PokemonDetail.data.name,
            image:PokemonDetail.data.sprites.back_default,
          };
            })
            );
            setPokemon(pokemonData);
            setLoading(false);
        }catch(error){
            setError('error fetch pokemondata');
            setLoading(false);
        }
    };
    fetchPokemon();
  },[]);



  const moveCard = (draggedId, targetId) => {
    const draggedIndex = pokemon.findIndex(poke => poke.id === draggedId);
    const targetIndex = pokemon.findIndex(poke => poke.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) return;

    const updatedPokemon = [...pokemon];
    const draggedCard = updatedPokemon.splice(draggedIndex, 1)[0];
    updatedPokemon.splice(targetIndex, 0, draggedCard);
    
    setPokemon(updatedPokemon);
  };

  const Card = ({ poke }) => {
    const [, drag] = useDrag(() => ({
      type: 'CARD',
      item: { id: poke.id },
    }));

    const [, drop] = useDrop(() => ({
      accept: 'CARD',
      hover: (item) => {
        if (item.id !== poke.id) {
          moveCard(item.id, poke.id); // Swap the cards on hover
        }
      },
    }));

    return (
      <div ref={(node) => drag(drop(node))} className="col-md-4">
        <div className="card m-2" style={{ width: '18rem' }}>
          <img
            src={poke.image}
            className="card-img-top"
            alt={poke.name}
            style={{ cursor: 'pointer' }}
          />
          <div className="card-body">
            <h5 className="card-title">{poke.name}</h5>
          </div>
        </div>
      </div>
    );
  };

  if(loading){
    return<div>loading pokemon......?</div>
  }

  if(error){
    return<div>{error}</div>
  }

  return (
    <div className="container">
      <h1 className="my-4">Pokémon Card Swapper</h1>
      <div className="row">
        {pokemon.map((poke) => (
          <Card key={poke.id} poke={poke} />
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;

