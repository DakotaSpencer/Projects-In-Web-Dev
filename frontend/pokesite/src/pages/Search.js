import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import PokemonSearchResultCard from '../components/PokemonSearchResultCard';

const Search = () => {
    const [searchTerm] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [pokemonArray, setPokemonArray] = useState();
    const [searchResults, setSearchResults] = useState([]);
    
    
    useEffect(() => {
        setSearchQuery(searchTerm.get("query"));
        if (pokemonArray === null || pokemonArray === undefined) {
            fetchpokemonArray();
        }
        console.log(pokemonArray)
    },[pokemonArray])


    useEffect(() => {
        let tempPokemonArray = []
        pokemonArray?.results?.forEach(pokemon => {
            //console.log(element.name)
            //console.log("Search Query: ",searchQuery)
            let tempName = pokemon.name.toLowerCase()
            console.log("TempName Type: ", typeof tempName)
            if(tempName.includes(searchQuery)){
                
                tempPokemonArray.push(pokemon)
                //console.log("Pokemon: " + pokemon.name + " matches search term:" + searchQuery)
            }else{
                console.log("pokemon does not match")
            }
            setSearchResults(tempPokemonArray)
        });
        
        
    }, [pokemonArray])

    const fetchpokemonArray = async () => {
        axios.all([
                axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2000$offset=0`)
            ])
            .then(axios.spread((pokemonAxiosData) => {
                setPokemonArray(pokemonAxiosData.data);
            }));
    }

    useEffect(() => {
        console.log("Search Results:" + searchResults)
    }, searchResults)
    
    return (
        <div>
            <h2>Search results For: {searchQuery}</h2>
            <section>
                <div className='searchResults'>
                    {
                        searchResults.length >=1 ? searchResults?.map(result => (
                            <div>
                                <PokemonSearchResultCard pokemon={result.name}/>
                            </div>
                        )): <div><h3>No Pokemon Found</h3></div>
                    }
                </div>
            </section>
        
        </div>
    )
}

export default Search