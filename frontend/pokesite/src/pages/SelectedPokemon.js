import React, { useState, useEffect, } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import './pokemonPage.scss'

const SelectedPokemon = () => {
    const [queryParameters] = useSearchParams();
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemonData, setPokemonData] = useState();
    const [speciesData, setSpeciesData] = useState();
    const [flavorText, setFlavorText] = useState('');
    const [evolutionChain, setEvolutionChain] = useState();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setSelectedPokemon(queryParameters.get("pokemon"));
        
        const fetchPokemonData = async () => {
                axios.all([
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`), 
                    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon}`)
                    ])
                    .then(axios.spread((pokemonAxiosData, descriptionAxiosResults) => {
                        setPokemonData(pokemonAxiosData.data);
                        setSpeciesData(descriptionAxiosResults);
                        //setSprite(pokemonAxiosData.data.sprites.other.obj["official-artwork"].front_default)
                    }));
            }
        if (pokemonData === null || pokemonData === undefined) {
            fetchPokemonData();
        }
    },[queryParameters, selectedPokemon, pokemonData, speciesData])

    useEffect(() => {
        if (speciesData) {
            //If species daya exists, then we can find evolution chain. For each item in evolution chain
            // get that pokemons data and display it in the Evolution Chain section
            axios.all([
                axios.get(speciesData?.data?.evolution_chain?.url)
                ])
                .then(axios.spread((evolutionChainData) => {
                    setEvolutionChain(evolutionChainData)
                    setLoading(false);
                    //First evolution: evolutionChainData.data.chain.species.name;
                    //Second Evolution: evolutionChainData.data.chain.species.evolves_to.species.name;
                    //Third Evolution: evolutionChainData.data.chain.species.evolves_to.evolves_to.species.name
                }));
            var tempArr = [];
            speciesData?.data?.flavor_text_entries?.forEach(element => {
                if (element?.language?.name === "en"){
                    tempArr.push(element)
                }
            });
            setFlavorText(tempArr[Math.floor(Math.random()*tempArr.length)]);
            
        }
    }, [speciesData, flavorText])

    const getTypeColor = type => {
        switch (type) {
          case "normal": return '#A8A878'
          case "fire": return '#F08030'
          case "water": return '#6890F0'
          case "electric": return '#F8D030'
          case "grass": return '#78C850'
          case "ice": return '#98D8D8'
          case "fighting": return '#C03028'
          case "poison": return '#A040A0'
          case "ground": return '#E0C068'
          case "flying": return '#A890F0'
          case "psychic": return '#F85888'
          case "bug": return '#A8B820'
          case "rock": return '#B8A038'
          case "ghost": return '#705898'
          case "dragon": return '#7038F8'
          case "dark": return '#705848'
          case "steel": return '#B8B8D0'
          case "fairy": return '#F0B6BC'
          case "stellar": return '#35ACE7'
          default: return '#fff'
        }
    }
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }else{
        return (
            <div className='pokemonContainer'>
                {pokemonData !==null && pokemonData!==undefined?
                    <div>
                        <h2 className='pokemonName'>
                            {
                                "#"+pokemonData.id.toString().padStart(4, '0') + " - " + 
                                pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1)
                            }
                        </h2>
                        <section>
                            <div className='pokemonTypes'>
                                {
                                    pokemonData.types?.map(type => (
                                        <p className='pokemonType' style={{backgroundColor:getTypeColor(type.type.name)}}>{" " + type.type.name?.charAt(0).toUpperCase() + type.type.name?.slice(1)}</p>
                                    ))
                                }
                            </div>
                        </section>
                        <section className='pokemonGeneration'>
                            <h3>
                                Generation: {speciesData?.data.generation.name}
                            </h3>
                        </section>
                        
                        <section className='pokemonImage'>
                            {
                                <img src={pokemonData?.sprites?.other["official-artwork"].front_default} alt="Default front facing sprite for pokemon" width={360} height={360}/>
                            }
                        </section>
                        <section className='flavorText'>
                            {
                                flavorText?.flavor_text
                            }
                        </section>
                        <section className='evolutionChainContainer'>{
                            evolutionChain?
                            <div><h3>Evolution Chain: </h3>
                            <div className='evolutionChain'>
                                <PokemonCard pokemon={evolutionChain?.data.chain.species.name}/> 
                                {
                                    evolutionChain?.data?.chain?.evolves_to[0]?.species?.name?<><p style={{fontSize: 32, fontWeight: 'bold'}}><span>&#62;</span></p><PokemonCard pokemon={evolutionChain?.data?.chain?.evolves_to[0]?.species?.name}/></> : <></>
                                }
                                {
                                    evolutionChain?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name?
                                    <><p style={{fontSize: 32, fontWeight: 'bold'}}><span>&#62;</span></p> <PokemonCard pokemon={evolutionChain?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name}/></>:
                                    <></>
                                }
                            </div>
                            </div>:<p>Loading Evolution Chain...</p>} 
                        </section>
                        <section className='pokemonMoves'>
                            Pokemon Moves: This requires getting the type URL from speciesData. This should show the pokemons starting moves.
                        </section>
                    </div>
                :<div>Loading...</div>}
            </div>
        );
    }
}

export default SelectedPokemon