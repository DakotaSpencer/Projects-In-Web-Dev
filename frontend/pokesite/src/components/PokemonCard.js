import React from 'react'

const PokemonCard = (props) => {   
    return (
        <div>
            {props.pokemon !==null && props.pokemon!==undefined?
                <div>
                    <a href={`/pokemon?pokemon=${props.pokemon.id}`}>
                    <p className='pokemonName'>
                        
                        {
                            "#"+props.pokemon.id + " - " + props.pokemon.name?.charAt(0).toUpperCase() + props.pokemon.name?.slice(1)
                        }
                    </p>
                    </a>
                    <section className='pokemonImage'>
                        {
                            <img src={props.pokemon.sprites?.other.showdown.front_default} alt="showdown state animation for the pokemon" height={"auto"} width={120}/>
                        }
                    </section>
                    <section className='pokemonTypes'>
                        <p>
                            {
                                props.pokemon.types?.map(type => (
                                    " " + type.type.name?.charAt(0).toUpperCase() + type.type.name?.slice(1)
                                )) + " "
                            }
                        </p>
                    </section>
                </div>
            :<div>Loading...</div>}
        </div>
    );
}

export default PokemonCard