import React, {useEffect, useState} from 'react'
import axios from 'axios'

const PokemonCard = (props) => {  
    const [pokemonData, setPokemonData] = useState();
    useEffect(() => {
        const fetchPokemonData = async () => {
                axios.all([
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)
                    ])
                    .then(axios.spread((pokemonAxiosData) => {
                        setPokemonData(pokemonAxiosData.data);
                    }));
            }
        if (pokemonData === null || pokemonData === undefined) {
            fetchPokemonData();
        }
        else{
            //console.log(pokemonData)
        }
    },[props.pokemon, pokemonData])
    
    return (
        <div>
            {pokemonData !==null && pokemonData!==undefined?
                <div>
                    <a href={`/pokemon?pokemon=${pokemonData.id}`}>
                    <p className='pokemonName'>
                        {
                            "#"+pokemonData.id + " - " + pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1)
                        }
                    </p>
                    </a>
                    <section className='pokemonImage'>
                        {
                            <img src={pokemonData.sprites?.other.showdown.front_default} alt="showdown state animation for the pokemon" height={"auto"} width={120}/>
                        }
                    </section>
                    <section className='pokemonTypes'>
                        <p>
                            {
                                pokemonData.types?.map(type => (
                                    " " + type.type.name?.charAt(0).toUpperCase() + type.type.name?.slice(1)
                                )) + " "
                            }
                        </p>
                    </section>
                </div>
            :<div>Loading...</div>}
        </div>
    );
}

export default PokemonCard