import React from 'react'

const PokemonLevelUpMove = ({move}) => {
  return (
    <div>
      <h5 className='move'>{
        move.move.name?.charAt(0).toUpperCase() +
        move.move.name?.slice(1)
      }</h5>
      <p>Learned at level {move.version_group_details[0]?.level_learned_at}</p>
    </div>
  )
}

export default PokemonLevelUpMove