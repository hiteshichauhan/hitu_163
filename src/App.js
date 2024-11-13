// App.js
import React from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import Pokemonidone from './components/Pokemonidone';
import PokemonDetail from './components/PokemonDetail';
import PokemonInfo from './components/PokemonInfo';
import PokemonCard from './components/PokemonCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokemonInfofirst from './components/pokemonInfofirst';
import './App.css'; 
import './index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


function App() {
    return (
        <DndProvider backend={HTML5Backend}>
        <Router>
            
            <div className="App">
                <Routes>
                    <Route path="/" element={<PokemonList />} /> {/* Route for the Pokémon list */}
                    <Route path="/pokemon/:id" element={<Pokemonidone />} /> {/* Route for a specific Pokémon */}
                   <Route path="details" element={<PokemonDetail />} />
                   <Route path="/pokemoninfo/:id" element={<PokemonInfo />} />
                   <Route path="/pokemoninfo" element={<PokemonInfofirst />} />
                   <Route path="/cards" element={<PokemonCard/>}/>
                </Routes>
            </div>
        </Router>
        </DndProvider>
    );
}

export default App;
