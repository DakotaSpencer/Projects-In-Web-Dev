import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';

const PokemonAbilityPage = () => {
    //https://pokeapi.co/api/v2/ability/65/
    const [queryParameters] = useSearchParams();
    const [abilityData, setAbilityData] = useState();
    const [selectedAbility, setSelectedAbility] = useState("");

    useEffect(() => {
		setSelectedAbility(queryParameters.get("ability"));
		function getAbility() {
			fetch(`https://pokeapi.co/api/v2/ability/${selectedAbility?selectedAbility:queryParameters.get("ability")}`)
				.then((data) => data.json())
				.then(async (data) => {
					//console.log("fetched data",data)
					setAbilityData(data)
				})
				.catch((err) => console.log(err));
		}
		getAbility()
		//fetch `https://pokeapi.co/api/v2/move/{move}`
	}, [])

    useEffect(() => {
        console.log(abilityData)
    }, [abilityData])
    return (
        <div>PokemonAbilityPage</div>
    )
}

export default PokemonAbilityPage