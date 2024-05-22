import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pokemonCard.scss";
const PokemonCard = (props) => {
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
            <a href={`/pokemon?pokemon=${pokemonData.id}`}>
                <div className="pokemonCard" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <section className="cardNameContainer">
                        <p className="cardName">
                            {"#" +
                                pokemonData.id.toString().padStart(4, "0") +
                                " - " +
                                pokemonData.name?.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                        </p>
                    </section>

                    <section className="pokemonCardImageContainer">
                        <div className="imageContainer">
                            <img
                                className="pokemonCardImage"
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
                        <div className="pokemonCardTypes">
                            {pokemonData.types?.map((type) => (
                                <p
                                    className={`pokemonCardType ${type.type.name}`}
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
        ) : (
            <div className="loader"></div>
        )}
    </> 
	);
};

export default PokemonCard;
