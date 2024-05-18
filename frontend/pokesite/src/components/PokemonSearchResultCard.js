import React, { useEffect, useState } from "react";
import axios from "axios";
import './pokemonSearchResult.scss';

const PokemonSearchResultCard = (props) => {
    const [pokemonData, setPokemonData] = useState();
    const [isHovered, setIsHovered] = useState(false);
	useEffect(() => {
		const fetchPokemonData = async () => {
			axios
				.all([axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)])
				.then(
					axios.spread((pokemonAxiosData) => {
						setPokemonData(pokemonAxiosData.data);
					})
				);
		};
		if (pokemonData === null || pokemonData === undefined) {
			fetchPokemonData();
		} else {
			//console.log(pokemonData)
		}
	}, [props.pokemon, pokemonData]);

	const getTypeColor = (type) => {
		switch (type) {
			case "normal":
				return "#A8A878";
			case "fire":
				return "#F08030";
			case "water":
				return "#6890F0";
			case "electric":
				return "#F8D030";
			case "grass":
				return "#78C850";
			case "ice":
				return "#98D8D8";
			case "fighting":
				return "#C03028";
			case "poison":
				return "#A040A0";
			case "ground":
				return "#E0C068";
			case "flying":
				return "#A890F0";
			case "psychic":
				return "#F85888";
			case "bug":
				return "#A8B820";
			case "rock":
				return "#B8A038";
			case "ghost":
				return "#705898";
			case "dragon":
				return "#7038F8";
			case "dark":
				return "#705848";
			case "steel":
				return "#B8B8D0";
			case "fairy":
				return "#F0B6BC";
			case "stellar":
				return "#35ACE7";
			default:
				return "#fff";
		}
	};
  return (
    <>
        {pokemonData !== null && pokemonData !== undefined ? (
            <div className={`type ${pokemonData?.types[0].type.name}`} style={{width:"49%"}}>
            <a href={`/pokemon?pokemon=${pokemonData.id}`}>
                <div 
                // onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                >
                    <section className="">
                        <p className="">
                            {"#" +
                                pokemonData.id.toString().padStart(4, "0") +
                                " - " +
                                pokemonData.name?.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                        </p>
                    </section>


                    {/* TODO:
                    
                        Change options so Pokemon and Moves are check boxes, toggling each. 
                            If pokemon is checked, width=100%
                            If Moves is checked, width=100%
                            if BOTH are checked, width=49%
                        
                        Make them into two seperate DIVS
                        Place those divs inside a container div and give fles properties to it
                            Should be side-by-side so flex-direction: ROW
                            Give padding of 5%
                        
                        Style Pokemon Search Results so that they look nice
                            Add flavor text entries for each pokemon as a description
                            Include TYPE and other relevant data

                        Finish styling Move Search Results
                    */}
                    <section className="">
                        <div className="">
                            <img
                                className=""
                                style={{
                                    filter: `drop-shadow(5px 5px 15px ${
                                        pokemonData
                                            ? getTypeColor(pokemonData?.types[0].type.name)
                                            : "white"
                                    })`,
                                }}
                                src={
                                    pokemonData.sprites?.other.showdown.front_default !== null
                                        ? pokemonData.sprites?.other.showdown.front_default
                                        : pokemonData.sprites?.other["official-artwork"]
                                                .front_default
                                }
                                alt="showdown state animation for the pokemon"
                                width={"100px"}
                                height={"100px"}
                            />
                            {isHovered && (
                                <div className="overlay"></div>
                            )}
                        </div>
                    </section>

                    <section className="">
                        <div className="">
                            {pokemonData.types?.map((type) => (
                                <p
                                    className={`${type.type.name}`}
                                    key={type.type.name}
                                >
                                    {" " +
                                        type.type.name?.charAt(0).toUpperCase() +
                                        type.type.name?.slice(1)}
                                </p>
                            ))}
                        </div>
                    </section>
                </div>
            </a>
            </div>
        ) : (
            <div className="loader"></div>
        )}
    </> 
  )
}

export default PokemonSearchResultCard