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

    const [pokemonResults, setPokemonResults] = useState([]);
    const [moveResults, setMoveResults] = useState([]);
    const [isPokemonSelected, setIsPokemonSelected] = useState(true);

    const location = useLocation();

    const fetchPokemonArray = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0');
            setPokemonArray(response.data);
        } catch (error) {
            console.error("Error fetching move data:", error);
        }
    };

    const filterPokemonArray = (query) => {
        //setSearchResults([]);
        setPokemonResults([])  // Clear previous results
        const filteredResults = pokemonArray?.results.filter(pokemon => 
            pokemon.name.toLowerCase().includes(query.toLowerCase())
        );
        setPokemonResults(filteredResults)
        //setSearchResults(filteredResults);
    };

    const fetchMovesArray = async () => {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/move?limit=2000&offset=0');
            setMovesArray(response.data);
        } catch (error) {
            console.error("Error fetching move data:", error);
        }
    };

    const filterMovesArray = (query) => {
        //setSearchResults([]);
        setMoveResults([])  // Clear previous results
        const filteredResults = movesArray?.results.filter(move => 
            move.name.toLowerCase().includes(query.toLowerCase())
        );
        setMoveResults(filteredResults)
    };


    useEffect(() => {
        const query = searchParams.get("query");
        if (query) {
            setSearchQuery(query);
            if (!pokemonArray || pokemonArray?.length<0) {
                fetchPokemonArray();
            } 
            if(!movesArray || movesArray?.length<0){
                fetchMovesArray();
            }
        }
    }, [searchParams, pokemonArray, movesArray]);

    useEffect(() => {
        if(searchQuery){
            if(isPokemonSelected && pokemonArray){
                filterPokemonArray(searchQuery)
            }else if(!isPokemonSelected &&movesArray){
                filterMovesArray(searchQuery)
            }
        }
        
    }, [searchQuery, isPokemonSelected, pokemonArray, movesArray]);

    

    const swapSearch = () => {
        console.log("Swapped")
        setIsPokemonSelected(!isPokemonSelected)
    }

    return (
        <div>
            <section>
                Search For:
                <div>
                    <input type="radio" id="pokemonbtn" name="" value="pokemon" checked={isPokemonSelected} onClick={swapSearch}/>
                    <label for="pokemonbtn">Pokemon</label><br></br>
                    <input type="radio" id="movebtn" name="" value="move" checked={isPokemonSelected===false} onClick={swapSearch}/>
                    <label for="movebtn">Move</label><br></br>
                </div>
            </section>
            <h2>Search results for: {searchQuery}</h2>
            <section>
                <div className='searchResults'>
                    {
                    isPokemonSelected?
                        (pokemonResults?.length > 0 ? (
                            pokemonResults.map(result => (
                                <div key={result?.name}>
                                    <PokemonSearchResultCard pokemon={result?.name} />
                                </div>
                            ))
                        ) : (
                            <div>
                                <h3>No Pokemon Found</h3>
                            </div>
                        ))
                        : 
                        (moveResults?.length > 0 ? (
                            moveResults.map(result => (
                                <div key={result?.name}>
                                    {result?.name}
                                </div>
                            ))
                        ) : (
                            <div>
                                <h3>No Move Found</h3>
                            </div>
                        ))
                        }
                </div>
            </section>
        </div>
    );
};

export default Search;
