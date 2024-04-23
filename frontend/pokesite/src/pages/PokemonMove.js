import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import './pokemonMovePage.scss'
import PokemonCard from "../components/PokemonCard";

const PokemonMove = () => {
	const [queryParameters] = useSearchParams();
	const [selectedMove, setSelectedMove] = useState("");
	const [pokemonMoveData, setPokemonMoveData] = useState();
	const [flavorText, setFlavorText] = useState({flavor_text:"no flavor text yet"});

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	useEffect(() => {
		setSelectedMove(queryParameters.get("move"));
		function getMoves() {
			fetch(`https://pokeapi.co/api/v2/move/${selectedMove?selectedMove:queryParameters.get("move")}`)
				.then((data) => data.json())
				.then(async (data) => {
					//console.log("fetched data",data)
					setPokemonMoveData(data)
				})
				.catch((err) => console.log(err));
		}
		getMoves()
		//fetch `https://pokeapi.co/api/v2/move/{move}`
	}, [])

	useEffect(() =>{
		console.log("Move Data:", pokemonMoveData)
		const getFlavorText = () => {
			var tempArr = [];
			pokemonMoveData?.flavor_text_entries.forEach((element) => {
				if (element?.language?.name === "en") {
					//console.log(element)
					tempArr.push(element);
				}
			});
			setFlavorText(tempArr[Math.floor(Math.random() * tempArr.length)]);
		}
		getFlavorText()
	}, [pokemonMoveData])

	return (
		<div className={`page`}>
			<h3 className={`pokemonMoveType ${pokemonMoveData?.type.name}`}>{pokemonMoveData?.name.charAt(0).toUpperCase() + pokemonMoveData?.name?.slice(1).replace(/-/g, ' ')}</h3>
			<p>Type: {pokemonMoveData?.type.name.charAt(0).toUpperCase() + pokemonMoveData?.type.name.slice(1)}</p>
			<p className="">{flavorText?.flavor_text}</p>
			<p>Category: {pokemonMoveData?.damage_class.name.charAt(0).toUpperCase() + pokemonMoveData?.damage_class.name.slice(1)}</p>
			<p>PP: {pokemonMoveData?.pp}/{pokemonMoveData?.pp}</p>
			<p>Accuracy: {pokemonMoveData?.accuracy===null? "—":pokemonMoveData?.accuracy}</p>
			<p>Power: {pokemonMoveData?.power===null? "—":pokemonMoveData?.power}</p>
			<p>Effect: {pokemonMoveData?.effect_entries[0].short_effect}</p>
			<p>Prob %: {pokemonMoveData?.effect_chance===null? "—":pokemonMoveData?.effect_chance}</p>
			<div>
				<h2>Learned by Pokemon:</h2>
				<div className="pokemonArray">{pokemonMoveData?.learned_by_pokemon.map(pokemon => (
					<div style={{margin:'7%', padding: '5%'}}>
						<PokemonCard pokemon={pokemon?.name}/>
					</div>
					))}
				</div>
			</div>
			
		</div>
		
	)
}

export default PokemonMove;