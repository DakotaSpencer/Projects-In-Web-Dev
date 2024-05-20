import React, { useEffect, useState } from "react";
import "./PokemonAbility.scss";

const PokemonAbility = (props) => {
	console.log("ABILITY: ", props.ability);
	const [abilityID, setAbilityID] = useState("");

	useEffect(() => {
		function getMoveType() {
			fetch(props.ability.url)
				.then((data) => data.json())
				.then((data) => {
					console.log(data);
					setAbilityID(data.id);
				})
				.catch((err) => console.log(err));
		}
		//console.log("Move: ",move)
		//Extend into its own page.
		getMoveType();
	}, [props.ability]);
	return (
		<>
			<a className="ability" href={`/ability?ability=${abilityID}`}>
				<div >
					{props.ability.name?.charAt(0).toUpperCase() +
						props.ability.name?.slice(1).replace(/-/g, " ")}
				</div>
			</a>
		</>
	);
};

export default PokemonAbility;
