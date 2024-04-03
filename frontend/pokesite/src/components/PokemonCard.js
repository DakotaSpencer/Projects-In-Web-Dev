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
            console.log(pokemonData)
        }
    },[props.pokemon, pokemonData])
    

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

    return (
        <>
            {pokemonData !==null && pokemonData!==undefined?
                <div className='pokemonCard'>
                    <a href={`/pokemon?pokemon=${pokemonData.id}`}>
                        <section className='cardNameContainer'>
                            <p className='cardName'>
                                {
                                    "#"+pokemonData.id.toString().padStart(4, '0') + " - " + pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1)
                                }
                            </p>
                        </section>
                    </a>
                    
                    <section className='pokemonCardImageContainer'>
                        {
                            <img className='pokemonCardImage' style={{filter: `drop-shadow(5px 5px 15px ${pokemonData?getTypeColor(pokemonData?.types[0].type.name):"white"})`}} src={pokemonData.sprites?.other.showdown.front_default} alt="showdown state animation for the pokemon" width={"75px"} height={"75px"}/>
                        }
                    </section>
                    
                    <section className=''>
                        <p className='pokemonCardTypes'>
                            {
                                pokemonData.types?.map(type => (
                                    <p className='pokemonCardType' style={{backgroundColor:getTypeColor(type.type.name)}}>{" " + type.type.name?.charAt(0).toUpperCase() + type.type.name?.slice(1)}</p>
                                ))
                            }
                        </p>
                    </section>
                    
                </div>
            :<div>Loading...</div>}
        </>
    );
}

export default PokemonCard