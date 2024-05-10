/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import "./pokemonPage.scss";
import PokemonAbility from "../components/PokemonAbility";
import PokemonLevelUpMove from "../components/PokemonLevelUpMove";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

const SelectedPokemon = () => {
	
	const [queryParameters] = useSearchParams();
	const [selectedPokemon, setSelectedPokemon] = useState("");
	const [pokemonData, setPokemonData] = useState();
	const [speciesData, setSpeciesData] = useState();
	const [flavorText, setFlavorText] = useState("");
	const [evolutionChain, setEvolutionChain] = useState();
	const [isLoading, setLoading] = useState(true);
	const [levelUpMoves, setLevelUpMoves] = useState([]);
	const [learnedMoves, setLearnedMoves] = useState([]);
	const [useImperialWeight, setUseImperialWeight] = useState(true);
	const [useImperialHeight, setUseImperialHeight] = useState(true);

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));
	useEffect(() => {
		setSelectedPokemon(queryParameters.get("pokemon"));

		const fetchPokemonData = async () => {
			console.log("Selected pokemon: " + selectedPokemon)
			console.log("Fetch URL: " + `https://pokeapi.co/api/v2/pokemon/${
				selectedPokemon ? selectedPokemon : queryParameters.get("pokemon")
			}`)
			await delay(1500);
			await axios
				.all([
					axios.get(
						`https://pokeapi.co/api/v2/pokemon/${
							selectedPokemon ? selectedPokemon : queryParameters.get("pokemon")
						}`
					),
					axios.get(
						`https://pokeapi.co/api/v2/pokemon-species/${
							selectedPokemon ? selectedPokemon : queryParameters.get("pokemon")
						}`
					),
				])
				.then(
					axios.spread((pokemonAxiosData, descriptionAxiosResults) => {
						setPokemonData(pokemonAxiosData.data);
						setSpeciesData(descriptionAxiosResults);
						
						//setSprite(pokemonAxiosData.data.sprites.other.obj["official-artwork"].front_default)
					})
				);
		};
		if (pokemonData === null || pokemonData === undefined) {
			fetchPokemonData();
		}
	}, []);

	useEffect(() => {
		async function fetchData() {
			await speciesData;
			if (speciesData) {
				console.log("Pokemon Data: ", pokemonData);
				document.title = pokemonData?.name?.charAt(0).toUpperCase() +
				pokemonData?.name?.slice(1) + " - PokeSite" || "Unknown - PokeSite"
				// console.log("Species Data: ", speciesData);
				//If species data exists, then we can find evolution chain. For each item in evolution chain
				// get that pokemons data and display it in the Evolution Chain section
				axios.all([axios.get(speciesData?.data?.evolution_chain?.url)]).then(
					axios.spread((evolutionChainData) => {
						console.log("Evolution Chain: ", evolutionChainData)
						setEvolutionChain(evolutionChainData);
						setLoading(false);
						//First evolution: evolutionChainData.data.chain.species.name;
						//Second Evolution: evolutionChainData.data.chain.species.evolves_to.species.name;
						//Third Evolution: evolutionChainData.data.chain.species.evolves_to.evolves_to.species.name
					})
				);
				var tempArr = [];
				speciesData?.data?.flavor_text_entries?.forEach((element) => {
					if (element?.language?.name === "en") {
						tempArr.push(element);
					}
				});
				setFlavorText(tempArr[Math.floor(Math.random() * tempArr.length)]);
			}
		}
		function getMoves() {
			let levelUpMovesArray = [];
			let nonLevelUpMovesArray = [];
			pokemonData?.moves.forEach((move) => {
				if (
					move.version_group_details[0].move_learn_method.name === "level-up"
				) {
					levelUpMovesArray.push(move);
				} else {
					nonLevelUpMovesArray.push(move);
				}
			});

			const shuffled = levelUpMovesArray.sort(() => 0.5 - Math.random());
			let selected = shuffled.slice(0, 5);

			setLevelUpMoves(selected);
			setLearnedMoves(nonLevelUpMovesArray);
			levelUpMovesArray.sort((a, b) =>
				a.version_group_details[0]?.level_learned_at >
				b.version_group_details[0]?.level_learned_at
					? 1
					: -1
			);
			nonLevelUpMovesArray.sort((a, b) => (a.move.name > b.move.name ? 1 : -1));
			learnedMoves.entries();
		}
		fetchData();
		getMoves();
	}, [speciesData]);

	// Still here due to chart
	const getTypeColor = (type) => {
		switch (type) {
			case "normal":
				return "#A8A878";
			case "fire":
				return "#F08030";
			case "water":
				return "#6890F0";
			case "electric":
				return "#F8D030";
			case "grass":
				return "#78C850";
			case "ice":
				return "#98D8D8";
			case "fighting":
				return "#C03028";
			case "poison":
				return "#A040A0";
			case "ground":
				return "#E0C068";
			case "flying":
				return "#A890F0";
			case "psychic":
				return "#F85888";
			case "bug":
				return "#A8B820";
			case "rock":
				return "#B8A038";
			case "ghost":
				return "#705898";
			case "dragon":
				return "#7038F8";
			case "dark":
				return "#705848";
			case "steel":
				return "#B8B8D0";
			case "fairy":
				return "#F0B6BC";
			case "stellar":
				return "#35ACE7";
			default:
				return "#fff";
		}
	};

	const getGeneration = (generation) => {
		const romanNumerals = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }; // Roman numeral values
		const match = generation.match(/generation-([ivxlcdm]+)/i); // Match Roman numerals
		if (!match) return null; // If input doesn't match
		return (
			"Generation: " +
			match[1]
				.toUpperCase()
				.split("")
				.reduce(
					(acc, curr, i, arr) =>
						acc +
						(romanNumerals[curr] < romanNumerals[arr[i + 1]]
							? -romanNumerals[curr]
							: romanNumerals[curr]),
					0
				)
		);
	};

	const options = {
		responsive: true,
		scales: {
			y: {
				ticks: { color: "#e5e5e5ff", beginAtZero: true },
				suggestedMin: 50,
				suggestedMax: 225,
				gridLines: {
					color: "#e5e5e5ff",
				},
			},
			x: {
				ticks: { color: "#e5e5e5ff", beginAtZero: true },
				gridLines: {
					color: "#e5e5e5ff",
				},
			},
		},
	};

	const labels = ["HP", "ATK", "DEF", "Special ATK", "Special DEF", "Speed"];

	const data = {
		labels,
		datasets: [
			{
				label: `${
					pokemonData?.name?.charAt(0).toUpperCase() +
					pokemonData?.name?.slice(1)
				}'s Stats`,
				data: [
					pokemonData?.stats[0].base_stat,
					pokemonData?.stats[1].base_stat,
					pokemonData?.stats[2].base_stat,
					pokemonData?.stats[3].base_stat,
					pokemonData?.stats[4].base_stat,
					pokemonData?.stats[5].base_stat,
				],
				backgroundColor: getTypeColor(pokemonData?.types[0].type.name),
				datalabels: {
					color: "e5e5e5ff",
					align: "start",
					anchor: "end",
				},
			},
		],
	};

	if (isLoading) {
		return (
			<div>
				<div className="loader"></div>
				<h3
					style={{
						marginTop: "10%",
						textAlign: "center",
						fontWeight: "lighter",
					}}
				>
					Fetching Pokemon, please wait...
				</h3>
			</div>
		);
	} else {
		return (
			<div className="pokemonContainer">
				{pokemonData !== null && pokemonData !== undefined ? (
					<div>
						<section className="pokeInfo">
							<div className="mainPokemonInfo">
								<div className="inline">
									<h2 className="pokemonName">
										{"#" +
											pokemonData.id.toString().padStart(4, "0") +
											" - " +
											pokemonData.name?.charAt(0).toUpperCase() +
											pokemonData.name?.slice(1).replace(/-/g, ' ')}
									</h2>
									<div className="pokemonTypes">
										{pokemonData.types?.map((type) => (
											<p
												key={type.type.name}
												className={`pokemonType ${type.type.name}`}
											>
												{" " +
													type.type.name?.charAt(0).toUpperCase() +
													type.type.name?.slice(1)}
											</p>
										))}
									</div>

									<section className="pokemonGeneration">
										<h3>{getGeneration(speciesData?.data.generation.name)}</h3>
									</section>
								</div>
								<div className="pokemonInfo">
									<section className="pokemonImage">
										{
											<img
												src={
													pokemonData?.sprites?.other["official-artwork"]
														.front_default
												}
												alt="Default front facing sprite for pokemon"
												width={360}
												height={360}
											/>
										}
									</section>
									<section className="flavorText">
										{flavorText?.flavor_text}
									</section>
								</div>
							</div>
							<section className="statisticsContainer">
								<h1>Stats</h1>
								<div className="pokemonStats">
									<div className="pokemonHW">
										<div
											onClick={() =>
												setUseImperialHeight(
													(useImperialHeight) => !useImperialHeight
												)
											}
											className="changeSystem"
										>
											{useImperialHeight ? (
												<p>
													<b>Height</b>:{" "}
													{parseInt((pokemonData.height * 10) / 30.48)} ft{" "}
													{Math.round(((pokemonData.height * 10) / 2.54) % 12)}{" "}
													in.
												</p>
											) : (
												<p>
													<b>Height</b>: {parseFloat(pokemonData.height / 10)}{" "}
													meters
												</p>
											)}
										</div>

										<div
											onClick={() =>
												setUseImperialWeight(
													(useImperialWeight) => !useImperialWeight
												)
											}
											className="changeSystem"
										>
											{useImperialWeight === true ? (
												<p>
													<b>Weight</b>:{" "}
													{parseInt((pokemonData.weight * 100) / 28.35 / 16)}{" "}
													lbs{" "}
													{Math.round(
														((pokemonData.weight * 100) / 28.35) % 16
													)}{" "}
													oz.
												</p>
											) : (
												<p>
													<b>Weight</b>: {parseInt(pokemonData.weight / 100)} kg
												</p>
											)}
										</div>
									</div>
									<Bar
										options={options}
										data={data}
										plugins={[ChartDataLabels]}
										className="pokemonChart"
									/>
								</div>
							</section>
						</section>
						<section className="evolutionChainContainer">
							{evolutionChain ? (
								<>
									<h3>Evolution Chain: </h3>
									<div className="evolutionChain">
										<PokemonCard
											pokemon={evolutionChain?.data.chain.species.name}
										/>
										{evolutionChain?.data?.chain?.evolves_to[0]?.species
											?.name ? (
											<>
												<PokemonCard
													pokemon={
														evolutionChain?.data?.chain?.evolves_to[0]?.species
															?.name
													}
												/>
											</>
										) : (
											<></>
										)}
										{evolutionChain?.data?.chain?.evolves_to[0]?.evolves_to[0]
											?.species?.name ? (
											<>
												<PokemonCard
													pokemon={
														evolutionChain?.data?.chain?.evolves_to[0]
															?.evolves_to[0]?.species?.name
													}
												/>
											</>
										) : (
											<></>
										)}
									</div>
								</>
							) : (
								<div className="evolutionChain">No Evolution Chain</div>
							)}
						</section>
						<section className="pokemonAbilities">
							{pokemonData ? (
								<>
									<h3>Abilities ({pokemonData?.abilities.length})</h3>
									<div className="abilitiesContainer">
										{pokemonData
											? pokemonData?.abilities?.map((ability) => (
													<PokemonAbility
														ability={ability.ability}
														key={ability.ability.name}
													/>
											))
											: ""}
									</div>
								</>
							) : (
								<></>
							)}
						</section>
						<section className="pokemonMoves">
							{levelUpMoves ? (
								<>
									<h3>
										Moves Learned through Level Ups ({levelUpMoves.length})
									</h3>
									<div className="movesContainer">
										{levelUpMoves
											? levelUpMoves?.map((move) => (
													<PokemonLevelUpMove
														move={move}
														key={move.move.name}
													></PokemonLevelUpMove>
											))
											: ""}
									</div>
								</>
							) : (
								<></>
							)}
						</section>
						{/* <section className="pokemonMoves">
							{learnedMoves?
								<>
									<h3>Moves Learnable Through Machines ({learnedMoves.length})</h3>
									<div className="movesContainer">
										{learnedMoves?learnedMoves?.map((move) => (
											<PokemonMachineMove move={move} key={move.move.name}></PokemonMachineMove>
										)):""}
									</div>
								</>
							:<></>}
						</section> */}
					</div>
				) : (
					<p>
						<div></div>
					</p>
				)}
			</div>
		);
	}
};

export default SelectedPokemon;
