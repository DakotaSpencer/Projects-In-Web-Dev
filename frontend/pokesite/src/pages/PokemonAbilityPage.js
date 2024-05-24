/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import './pokemonMovePage.scss'
import './pokemonAbilityPage.scss'

const PokemonAbilityPage = () => {
    //https://pokeapi.co/api/v2/ability/65/
    const [queryParameters] = useSearchParams();
    const [abilityData, setAbilityData] = useState();
    const [selectedAbility, setSelectedAbility] = useState("");
	const [flavorText, setFlavorText] = useState("");
	const [typeData, setTypeData] = useState();

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
	}, [])

    useEffect(() => {
        console.log(abilityData)
		document.title = abilityData?.name?.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())+ " - PocketDex" || "Unknown - PocketDex"
		const getFlavorText = () => {
			var tempArr = [];
			abilityData?.flavor_text_entries.forEach((element) => {
				if (element?.language?.name === "en") {
					//console.log(element)
					tempArr.push(element);
				}
			});
			setFlavorText(tempArr[Math.floor(Math.random() * tempArr.length)]);
			fetch(`${abilityData?.pokemon[0].pokemon.url}`)
				.then((data) => data.json())
				.then(async (data) => {
					console.log("fetched data",data)
					setTypeData(data.types[0].type.name)
				})
				.catch((err) => console.log(err))
		}
		getFlavorText()
    }, [abilityData])
    return (

			<div className={`abilityContainer`}>
				<div className="abilityInfo">
					<div className={`mainAbilityInfo`}>
						<h3 className={`pokemonMoveType ${typeData}`}>{abilityData?.name?.charAt(0).toUpperCase() +
							abilityData?.name?.slice(1).replace(/-/g, ' ')}</h3>
						<h5 style={{marginTop:"10px"}}>Effect:<p>{abilityData?.effect_entries[1].effect}</p></h5>
						<p>{flavorText?.flavor_text}</p>
					</div>
					<div className='learnedBy'>
						<h3>Can be learned by ({abilityData?.pokemon.length}) pokemon:</h3>
						<div className="pokemonAbilityArray">
							{abilityData?.pokemon?.slice(0,6).map(pokemon => (
								<div style={{margin:'5%', padding: '5%'}}>
									<PokemonCard pokemon={pokemon?.pokemon.name}/>
								</div>
							))}
						</div>
						<p style={{margin:"5%"}}>+ ({abilityData?.pokemon.length - 6}) more</p>
					</div>
				</div>
			</div>
    )
}

export default PokemonAbilityPage