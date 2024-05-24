import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import PokemonSearchResultCard from '../components/PokemonSearchResultCard';
import PokemonLevelUpMove from '../components/PokemonLevelUpMove';
import MoveSearchResultsCard from '../components/MoveSearchResultsCard';
import './searchPage.scss'

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
        document.title = "Searching for: " + searchQuery + " - PocketDex"
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
            <div className='filterHeader'>
                <h2>Search For:</h2>
                <div className='moveHeader' style={{maxWidth:"20%"}}>
                    <h4 id="pokemonLabel" style={{marginLeft: "1px"}} className={isPokemonSelected ? 'glow' : ''}>Pokemon</h4>
                    <label class="switch">
                    <input type="checkbox" checked={!isPokemonSelected} onClick={swapSearch}/>
                    <span class="slider round"></span>
                    </label>
                    <h4 id="moveLabel" style={{marginLeft: "1px"}} className={!isPokemonSelected ? 'glow' : ''}>Move</h4>
                </div>
                </div>

            <h2>Search results for: {searchQuery}</h2>


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
                                    <MoveSearchResultsCard move={result}/>
                                    {/* {result?.name} */}
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
