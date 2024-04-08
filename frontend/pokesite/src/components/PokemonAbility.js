import React from 'react'

const PokemonAbility = (props) => {
  console.log("ABILITY: ",props.ability)
  return (
    <>
      <p className='ability'>
        {
          props.ability.name?.charAt(0).toUpperCase() +
          props.ability.name?.slice(1)
        }
      </p>
    </>
  )
}

export default PokemonAbility