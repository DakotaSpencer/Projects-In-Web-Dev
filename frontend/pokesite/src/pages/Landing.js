import React, { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import "./landing.scss";
import { Button } from "react-bootstrap";

const Landing = () => {
	const [pokemonData, setPokemonData] = useState();
	const [pokemonArray, setPokemonArray] = useState();
	const [limit, setLimit] = useState(20);
	let tempArray = [];
	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	useEffect(() => {
		if (pokemonData === null || pokemonData === undefined) {
			setLimit(40);
			fetchPokemonData();
		} else {
			pokemonData?.results.forEach((pokemon) => {
				if (pokemon?.url) {
					sendToArrayAndProcess(pokemon?.url);
				}
			});
		}
	}, [pokemonData]);

	const fetchPokemonData = async () => {
		axios
			.all([
				axios.get(
					`https://pokeapi.co/api/v2/pokemon?limit=${
						limit > 20 ? limit : 20
					}$offset=0`
				),
			])
			.then(
				axios.spread((pokemonAxiosData) => {
					setPokemonData(pokemonAxiosData.data);
				})
			)
			.then(
				pokemonData?.results.forEach((pokemon) => {
					if (pokemon?.url) {
						sendToArrayAndProcess(pokemon?.url);
					}
				})
			);
	};

	const sendToArrayAndProcess = async (pokemonURL) => {
		axios.all([axios.get(pokemonURL)]).then(
			axios.spread((pokemonURLData) => {
				tempArray.push(pokemonURLData);
				if (tempArray.length % 20 === 0) {
					console.log("TempArray", tempArray);
					tempArray.sort((a, b) => a.data.id - b.data.id);
					setPokemonArray(tempArray.sort((a, b) => a - b));
				}
			})
		);
		console.log(pokemonArray);
	};
	const handleLimitButtonClick = async () => {
		await delay(500);
		if (limit >= 20) {
			setLimit(limit + 20);
			await delay(500);
			console.log(limit);
			if (pokemonArray.length % 20 === 0) {
				fetchPokemonData();
			}
		}
	};
	return (
		<>
			<h1 className="welcome">Welcome to PocketDex!</h1>
			<div className="pokemonArray">
				{pokemonArray?.map((pokemon) => (
					<div style={{ margin: "5%" }} key={pokemon.data.id}>
						<PokemonCard pokemon={pokemon.data.name} />
            {console.log(pokemon.data.name)}
					</div>
				))}
			</div>
			<Button className="loadMoreButton" onClick={handleLimitButtonClick}>
				Show More
			</Button>
			{/* <div className='pokeball'>
        <div className='pokeballTop'></div>
        <div className='pokeballBottom'></div>
      </div> */}
		</>
	);
};

export default Landing;
