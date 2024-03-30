import React, { useState, useEffect, } from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

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
        else{
            //console.log(pokemonData)
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
    
    if (isLoading) {
        return <div className="App">Loading...</div>;
    }else{
        return (
            <div>
                {pokemonData !==null && pokemonData!==undefined?
                    <div>
                        <h2 className='pokemonName'>
                            {
                                "#"+pokemonData.id + " - " + 
                                pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1)
                            }
                        </h2>
                        <section className='pokemonGeneration'>
                            <h3>
                                Generation: {speciesData?.data.generation.name}
                            </h3>
                        </section>
                        <section className='pokemonTypes'>
                            <h3>Types:
                                {
                                    pokemonData.types?.map(type => (
                                        " " + type.type.name?.charAt(0).toUpperCase() + type.type.name?.slice(1)
                                    )) + " "
                                }
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
                        <section className='evolutionChain'>{
                            evolutionChain?
                            <div>Evolution Chain: <PokemonCard pokemon={evolutionChain?.data.chain.species.name}/> 
                            <PokemonCard pokemon={evolutionChain?.data?.chain?.evolves_to[0]?.species?.name}/> 
                            <PokemonCard pokemon={evolutionChain?.data?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name}/></div>:<p>Loading Evolution Chain...</p>} 
                        </section>
                        <section className='pokemonMoves'>
                            This requires getting the type URL from speciesData, if two, 
                        </section>
                    </div>
                :<div>Loading...</div>}
            </div>
        );
    }
}

export default SelectedPokemon