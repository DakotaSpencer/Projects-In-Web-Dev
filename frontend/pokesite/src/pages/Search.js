import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import PokemonSearchResultCard from '../components/PokemonSearchResultCard';
import PokemonLevelUpMove from '../components/PokemonLevelUpMove';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [pokemonArray, setPokemonArray] = useState(null);
    const [movesArray, setMovesArray] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [pokemonSearch, setPokemonSearch] = useState(true);
    const [moveSearch, setMoveSearch] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get("query");
        
        if (query) {
            setSearchQuery(query);
            if (!pokemonArray || pokemonArray?.length<0 && !movesArray || movesArray?.length<0) {
                fetchPokemonArray();
                fetchMovesArray();
            } else {
                if(pokemonSearch===true && moveSearch===false){
                    filterPokemonArray(query);
                }
                else if (pokemonSearch===false && moveSearch===true){
                    filterMovesArray(query)
                }else{
                    filterPokemonArray(query)
                }
            }
        }
        
        
    }, [location.search, pokemonArray, movesArray, moveSearch, pokemonSearch]);

    useEffect(() => {
        if(pokemonSearch===true && moveSearch===false){
            if (pokemonArray) {
                filterPokemonArray(searchQuery);
            }
        }
        else if (pokemonSearch===false && moveSearch===true){
            if (movesArray) {
                filterMovesArray(searchQuery);
            }
        }else{
            if (pokemonArray) {
                filterPokemonArray(searchQuery);
            }
        }
        
    }, [searchQuery]);

    const fetchPokemonArray = async () => {
        console.log("Fetching pokemon...")
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0');
            setPokemonArray(response.data);
        } catch (error) {
            console.error("Error fetching move data:", error);
        }
    };

    const filterPokemonArray = (query) => {
        console.log("Filtering out Pokemon...")
        setSearchResults([]);  // Clear previous results
        const filteredResults = pokemonArray?.results.filter(pokemon => 
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const fetchMovesArray = async () => {
        console.log("Hit fetch moves:")
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/move?limit=2000&offset=0');
            setMovesArray(response.data);
        } catch (error) {
            console.error("Error fetching move data:", error);
        }
        filterMovesArray(searchQuery)
    };

    const filterMovesArray = (query) => {
        console.log("Hit moves Filter:", query)
        console.log("Moves Array:", movesArray)
        setSearchResults([]);  // Clear previous results
        console.log("Moves Array:",movesArray)
        const filteredResults = movesArray?.results.filter(move => 
            move.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
    };

    const swapSearch = () => {
        console.log("Swapped")
        setPokemonSearch(!pokemonSearch)
        setMoveSearch(!moveSearch)
        fetchMovesArray(searchQuery)
        console.log("Pokemon Search: ", pokemonSearch)
        console.log("Move Search: ", moveSearch)
    }

    return (
        <div>
            <section>
                Search For:
                <div>
                    <input type="radio" id="pokemonbtn" name="" value="pokemon" checked={pokemonSearch===true} onClick={swapSearch}/>
                    <label for="pokemonbtn">Pokemon</label><br></br>
                    <input type="radio" id="movebtn" name="" value="move" checked={moveSearch===true} onClick={swapSearch}/>
                    <label for="movebtn">Move</label><br></br>
                </div>
            </section>
            <h2>Search results for: {searchQuery}</h2>
            <section>
                <div className='searchResults'>
                    {
                    pokemonSearch===true&&moveSearch===false?
                            searchResults?.length > 0 ? (
                                searchResults.map(result => (
                                    <div key={result?.name}>
                                        <PokemonSearchResultCard pokemon={result?.name} />
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <h3>No Pokemon Found</h3>
                                </div>
                            )
                        :moveSearch===true && pokemonSearch===false ? 
                            searchResults?.length > 1 ? (
                                searchResults.map(result => (
                                    <div key={result?.name}>
                                        {result?.name}
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <h3>No Move Found</h3>
                                </div>
                            )
                        :(<div><h3>No Results</h3></div>)
                        }
                </div>
            </section>
        </div>
    );
};

export default Search;
