import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PokemonCard from '../components/PokemonCard';

const Landing = () => {
    const [pokemonData, setPokemonData] = useState();
    const [pokemonArray, setPokemonArray] = useState();
    const [limit, setLimit] = useState(20);
    let tempArray = [];
    useEffect(() => {
      if (pokemonData === null || pokemonData === undefined) {
          fetchPokemonData();
      }
      else{
        pokemonData?.results.forEach(pokemon => {
          if(pokemon?.url){
            sendToArrayAndProcess(pokemon?.url)
          }
        });
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[pokemonData])

  const fetchPokemonData = async () => {
    axios.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit?limit:20}$offset=0`)
        ])
        .then(axios.spread((pokemonAxiosData) => {
            setPokemonData(pokemonAxiosData.data);
        }));
  }

  const sendToArrayAndProcess = async (pokemonURL) => {
    axios.all([
      axios.get(pokemonURL)
      ])
      .then(axios.spread((pokemonURLData) => {
          tempArray.push(pokemonURLData)
          if(tempArray.length % 20 === 0){
            setPokemonArray(tempArray)
          }
      }));
  }
    const handleLimitButtonClick = () => {
      setLimit(limit + 20);
      fetchPokemonData();
      pokemonData?.results.forEach(pokemon => {
          if(pokemon?.url){
            sendToArrayAndProcess(pokemon?.url)
          }
        });
    }
  return (
    <>
      <h1>List of Pokemon:</h1>
      <div>
      {
          pokemonArray?.map(pokemon => (
              <PokemonCard pokemon={pokemon.data.name}/>
          ))
      }
      </div>
      <button onClick={handleLimitButtonClick}>Show More</button>
    </>
  )
}

export default Landing