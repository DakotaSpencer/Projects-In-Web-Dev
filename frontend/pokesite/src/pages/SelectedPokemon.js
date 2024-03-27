import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SelectedPokemon = () => {
    const [queryParameters] = useSearchParams()
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState()
    useEffect(() => {
        setSelectedPokemon(queryParameters.get("pokemon"));
        if (pokemonData === null || pokemonData === undefined) {
            fetchPokemonData();
        }
        else{
            console.log(pokemonData)
        }
    })
    useEffect(() => {
        console.log(pokemonData)
    }, [pokemonData])
    const fetchPokemonData = async () => {
        const results = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        setPokemonData(results.data);
    }
    return (
        <div>Selected Pokemon: {selectedPokemon.charAt(0).toUpperCase() + selectedPokemon.slice(1)} {pokemonData?<img src={pokemonData.sprites.front_default} alt="Default front facing sprite for pokemon" width={360} height={360}/>:<p>Something went wrong. Pokedex entry was not loaded properly.</p>}</div>
    )
}

export default SelectedPokemon