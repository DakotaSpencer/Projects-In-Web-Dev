import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
    const [searchTerm] = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const [pokemonArray, setPokemonArray] = useState();
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        setSearchQuery(searchTerm.get("query"))
        const fetchAllPokemon = () => {
            //fetch all pokemon
        }
    },[searchQuery, searchTerm])

    useEffect(() => {
        //filter pokemonArray based on Search term and store in searchResults array
    }, [pokemonArray])
    
    return (
        <div>
            <h2>Search results For: {searchQuery}</h2>
            <section>
                <div className='searchResults'>
                    {/*Iterate through searchResults and display each result, if available. 
                    If not, display No Reslts Found*/}
                </div>
            </section>
        
        </div>
    )
}

export default Search