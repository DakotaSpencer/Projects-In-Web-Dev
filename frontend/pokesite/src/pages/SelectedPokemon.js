import React, { useState, useEffect, } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SelectedPokemon = () => {
    const [queryParameters] = useSearchParams();
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState();
    const [speciesData, setSpeciesData] = useState();
    const [flavorText, setFlavorText] = useState('');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setSelectedPokemon(queryParameters.get("pokemon"));
        
        const fetchPokemonData = async () => {
                axios.all([
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`), 
                    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon}`)
                    ])
                    .then(axios.spread((pokemonAxiosData, descriptionAxiosResults) => {
                    // output of req.
                    console.log('pokemonData:', pokemonAxiosData, 'descriptionResults:', descriptionAxiosResults)
                    setPokemonData(pokemonAxiosData.data);
                    setSpeciesData(descriptionAxiosResults);
                    setLoading(false);
                    }));
            }   
        if (pokemonData === null || pokemonData === undefined) {
            fetchPokemonData();
        }
        else{
            console.log(pokemonData)
        }
    },[queryParameters, selectedPokemon, pokemonData])
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }else{
        return (
            <div>
                {pokemonData !==null && pokemonData!==undefined?
                    <div>
                        <h2 className='pokemonName'>
                            {
                                pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1)
                            }
                        </h2>
                        <section className='pokemonTypes'>
                            <h3>Types:
                                {" " + 
                                    pokemonData.types?.map(type => (
                                        type.type.name?.charAt(0).toUpperCase() + type.type.name?.slice(1)
                                    ))
                                }
                            </h3>
                        </section>
                        <section className='pokemonImage'>
                            {
                                <img src={pokemonData.sprites?.front_default} alt="Default front facing sprite for pokemon" width={360} height={360}/>
                            }
                        </section>
                    </div>
                :<div>Loading...</div>}
            </div>
        );
    }
}

export default SelectedPokemon