/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'react-router-dom';
import './pokemonMovePage.scss';
import './pokemonPage.scss';
import PokemonCard from "../components/PokemonCard";

const PokemonMove = () => {
	const [queryParameters] = useSearchParams();
	const [selectedMove, setSelectedMove] = useState("");
	const [pokemonMoveData, setPokemonMoveData] = useState();
	const [flavorText, setFlavorText] = useState({flavor_text:"no flavor text yet"});
	const [damageRelations, setDamageRelations] = useState();

	//const delay = (ms) => new Promise((res) => setTimeout(res, ms));
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
		document.title = pokemonMoveData?.name?.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())+ " - PocketDex" || "Unknown - PocketDex"
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

		const getDamageRelation = () => {
			fetch(pokemonMoveData?.type.url)
				.then((data) => data.json())
				.then(async (data) => {
					//console.log("fetched data",data)
					setDamageRelations(data)
				})
				.catch((err) => console.log(err));
		}

		getFlavorText()
		getDamageRelation()
	}, [pokemonMoveData])

	return (
		<div className={`moveContainer`}>
			<div className="moveInfo">
				<div className="mainMoveInfo">
					<p style={{fontSize:"24px", fontWeight:"700"}} className={`pokemonMoveType ${pokemonMoveData?.type.name}`}>{pokemonMoveData?.name?.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
					<p className="">{flavorText?.flavor_text}</p>
					<p>Type: {pokemonMoveData?.type.name.charAt(0).toUpperCase() + pokemonMoveData?.type.name.slice(1)}</p>
					<p>Category: {pokemonMoveData?.damage_class.name.charAt(0).toUpperCase() + pokemonMoveData?.damage_class.name.slice(1)}</p>
					<p>PP: {pokemonMoveData?.pp}/{pokemonMoveData?.pp}</p>
					<p>Accuracy: {pokemonMoveData?.accuracy===null? "—":pokemonMoveData?.accuracy}%</p>
					<p>Power: {pokemonMoveData?.power===null? "—":pokemonMoveData?.power}</p>
					<p>Effect: {pokemonMoveData?.effect_entries[0].short_effect}</p>
					<p>Effect Chance: {pokemonMoveData?.effect_chance===null? "—":pokemonMoveData?.effect_chance}%</p>
				</div>
				<div className="damageRelations">
					<p style={{fontSize:"24px", fontWeight:"700"}} className={`pokemonMoveType ${pokemonMoveData?.type.name}`}>{pokemonMoveData?.type.name.charAt(0).toUpperCase() + pokemonMoveData?.type.name.slice(1)} Damage Relations</p>
					<h6>Takes Double Damage From: </h6>
					<p style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"40%", alignSelf:"center"}}>{damageRelations?.damage_relations.double_damage_from.length>0?damageRelations?.damage_relations.double_damage_from.map(type => (
						<p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
					)):"—"}</p>
					<h6>Does Double Damage To: </h6>
					<p style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"40%", alignSelf:"center"}}>{damageRelations?.damage_relations.double_damage_to.length>0?damageRelations?.damage_relations.double_damage_to.map(type => (
						<p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
					)):"—"}</p>
					<h6>Takes Half Damage From: </h6>
					<p style={{display:"flex", flexDirection:"row", justifyContent:"space-around", width:"40%", alignSelf:"center"}}>{damageRelations?.damage_relations.half_damage_from.length>0?damageRelations?.damage_relations.half_damage_from.map(type => (
						<p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
					)):"—"}</p>
					<h6>Does Half Damage to: </h6>
					<p style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"40%", alignSelf:"center"}}>{damageRelations?.damage_relations.half_damage_to.length>0?damageRelations?.damage_relations.half_damage_to.map(type => (
						<p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
					)):"—"}</p>
					<h6>Takes No Damage From: </h6>
					<p style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"40%", alignSelf:"center"}}>{damageRelations?.damage_relations.no_damage_from.length>0?damageRelations?.damage_relations.no_damage_from.map(type => (
						<p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
					)):"—"}</p>
					<h6>Does No Damage To: </h6>
					<p style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly", width:"40%", alignSelf:"center"}}>{damageRelations?.damage_relations.no_damage_to.length>0?damageRelations?.damage_relations.no_damage_to.map(type => (
						<p className={`pokemonMoveType ${type.name}`}>{type.name}</p>
					)):"—"}</p>
				</div>
			</div>
			<div className="learnedByPokemon">
				<h2>Learned by ({pokemonMoveData?.learned_by_pokemon.length}) Pokemon:</h2>
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