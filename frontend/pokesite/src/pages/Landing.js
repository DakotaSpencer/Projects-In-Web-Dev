import React, {useState, useEffect} from 'react'
import axios from 'axios'
import PokemonCard from '../components/PokemonCard';
import './landing.scss'

const Landing = () => {
    const [pokemonData, setPokemonData] = useState();
    const [pokemonArray, setPokemonArray] = useState();
    const [limit, setLimit] = useState(20);
    let tempArray = [];
    useEffect(() => {
      if (pokemonData === null || pokemonData === undefined) {
          setLimit(40)
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
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}$offset=0`)
        ])
        .then(axios.spread((pokemonAxiosData) => {
            setPokemonData(pokemonAxiosData.data);
        })).then(pokemonData?.results.forEach(pokemon => {
          if(pokemon?.url){
            sendToArrayAndProcess(pokemon?.url)
          }
        }));
    
  }

  const sendToArrayAndProcess = async (pokemonURL) => {
    axios.all([
      axios.get(pokemonURL)
      ])
      .then(axios.spread((pokemonURLData) => {
          tempArray.push(pokemonURLData)
          if(tempArray.length % 20 === 0){
            tempArray.sort((a, b) => a-b)
            setPokemonArray(tempArray)
          }
      }));
  }
    const handleLimitButtonClick = () => {
      if (limit===20) {
        setLimit(40)
      }else{
        setLimit(limit+20)
      }
      // setLimit(limit===20?limit==40:limit+20);
      console.log(limit)
      fetchPokemonData();
    }
  return (
    <>
      <div className='pokemonArray'>
        {
          pokemonArray?.map(pokemon => (
              <PokemonCard key={pokemon.data.id} pokemon={pokemon.data.name}/>
          ))
        }
      </div>
      <button className='loadMoreButton' onClick={handleLimitButtonClick}>Show More</button>
      {/* <div className='pokeball'>
        <div className='pokeballTop'></div>
        <div className='pokeballBottom'></div>
      </div> */}
    </>
  )
}

export default Landing