import React, { useEffect, useState } from "react";
import axios from "axios";
import './pokemonSearchResult.scss';

const PokemonSearchResultCard = (props) => {
    const [pokemonData, setPokemonData] = useState();
    const [isHovered, setIsHovered] = useState(false);
    const [speciesData, setSpeciesData] = useState();
    const [flavorText, setFlavorText] = useState("");

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`);
                setPokemonData(pokemonResponse.data);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };
        fetchPokemonData();
    }, [props.pokemon]);

    useEffect(() => {
        const fetchSpeciesData = async () => {
            if (pokemonData?.species?.url) {
                try {
                    const speciesResponse = await axios.get(pokemonData.species.url);
                    setSpeciesData(speciesResponse.data);
                } catch (error) {
                    console.error("Error fetching species data:", error);
                }
            }
        };
        fetchSpeciesData();
    }, [pokemonData]);

    useEffect(() => {
        const fetchData = async () => {
            if (speciesData) {
                console.log("Pokemon Data: ", pokemonData);

                const flavorTextEntries = speciesData.flavor_text_entries.filter(entry => entry.language.name === "en");
                setFlavorText(flavorTextEntries[0]);
            }
        };
        fetchData();
    }, [speciesData]);

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
            {pokemonData ? (
                <div className={`pokemon searchResult ${pokemonData.types[0].type.name}`}>
                    <a href={`/pokemon?pokemon=${pokemonData.id}`}>
                        <div className="pokemonNameandTypes">
                            <section>
                                <h4>
                                    {"#" +
                                        pokemonData.id.toString().padStart(4, "0") +
                                        " - " +
                                        pokemonData.name?.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                                </h4>
                            </section>
                            <section>
                                <div className="types">
                                    {pokemonData.types?.map((type) => (
                                        <p className={`pokemonType ${type.type.name}`} key={type.type.name}>
                                            {" " + type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                                        </p>
                                    ))}
                                </div>
                            </section>
                        </div>
                        <div className="pokemonSearchInfo">

                        
                            <section className="types">
                                <div className="pokemonIMG">
                                    <img
                                        className=""
                                        style={{
                                            filter: `drop-shadow(5px 5px 15px ${
                                                pokemonData
                                                    ? getTypeColor(pokemonData?.types[0].type.name)
                                                    : "white"
                                            })`,
                                        }}
                                        src={pokemonData.sprites?.other["official-artwork"]
                                                        .front_default
                                        }
                                        alt="showdown state animation for the pokemon"
                                        width={"200px"}
                                        height={"200px"}
                                    />
                                    {isHovered && (
                                        <div className="overlay"></div>
                                    )}
                                </div>
                            </section>
                            <section>
                                <div className="descriptionSection">
                                    <h5>{flavorText?.flavor_text}</h5>
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

export default PokemonSearchResultCard;
