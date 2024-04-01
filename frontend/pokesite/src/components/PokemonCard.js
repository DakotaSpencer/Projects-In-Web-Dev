import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './pokemonCard.scss'

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
        <div className='pokemonCardContainer'>
            {pokemonData !==null && pokemonData!==undefined?
                <div className='pokemonCard'>
                    <a href={`/pokemon?pokemon=${pokemonData.id}`}>
                    <p className='pokemonCardName'>
                        {
                            "#"+pokemonData.id.toString().padStart(4, '0') + " - " + pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1)
                        }
                    </p>
                    </a>
                    <section className='pokemonCardImageContainer'>
                        {
                            <img className='pokemonCardImage' src={pokemonData.sprites?.other.showdown.front_default} alt="showdown state animation for the pokemon"/>
                        }
                    </section>
                    <section className='pokemonCardTypes'>
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