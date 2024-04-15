import React, { useEffect, useState } from "react";
import "./PokemonLevelUpMove.scss";

const PokemonLevelUpMove = ({ move }) => {
	const [type, setType] = useState("");

	useEffect(() => {
		function getMoveType() {
			fetch(move.move.url)
				.then((data) => data.json())
				.then((data) => {
					setType(data.type.name);
				})
				.catch((err) => console.log(err));
		}

		getMoveType();
	}, [move]);


	return (
		<div className={`move ${type}`}>
			<h5>
				{move.move.name?.charAt(0).toUpperCase() + move.move.name?.slice(1)}
			</h5>
			<p>Learned at level {move.version_group_details[0]?.level_learned_at}</p>
		</div>
	);
};

export default PokemonLevelUpMove;
