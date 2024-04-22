import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import './pokemonMovePage.scss'

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
		<div className="page">
			<h3 className={`pokemonMoveType ${pokemonMoveData?.type.name}`}>{pokemonMoveData?.name.charAt(0).toUpperCase() + pokemonMoveData?.name?.slice(1)}</h3>
			<p className="">{flavorText?.flavor_text}</p>
			<p>PP: {pokemonMoveData?.pp}/{pokemonMoveData?.pp}</p>
		</div>
		
	)
}

export default PokemonMove;