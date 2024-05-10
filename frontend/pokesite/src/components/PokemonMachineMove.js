import React from 'react'

const PokemonMachineMove = ({move}) => {
  return (
    <div>
      <h5 className='move'>{
        move.move.name?.charAt(0).toUpperCase() +
        move.move.name?.slice(1)
      }</h5>
      <p>Learned From: </p>
    </div>
  )
}

export default PokemonMachineMove