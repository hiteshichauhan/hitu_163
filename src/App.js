// App.js
import React from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import Pokemonidone from './components/Pokemonidone';
import PokemonDetail from './components/PokemonDetail';
import PokemonInfo from './components/PokemonInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonInfofirst from './components/pokemonInfofirst';
import './App.css'; 
import './index.css';



function App() {
    return (
        <Router>
            
            <div className="App">
                <Routes>
                    <Route path="/" element={<PokemonList />} /> {/* Route for the Pokémon list */}
                    <Route path="/pokemon/:id" element={<Pokemonidone />} /> {/* Route for a specific Pokémon */}
                   <Route path="details" element={<PokemonDetail />} />
                   <Route path="/pokemoninfo/:id" element={<PokemonInfo />} />
                   <Route path="/pokemoninfo" element={<PokemonInfofirst />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
