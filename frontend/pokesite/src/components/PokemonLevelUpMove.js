import React, { useEffect, useState } from "react";
import "./PokemonLevelUpMove.scss";

const PokemonLevelUpMove = ({ move }) => {
	const [type, setType] = useState("");
	const [moveID, setMoveID] = useState("");

	useEffect(() => {
		function getMoveType() {
			fetch(move.move.url)
				.then((data) => data.json())
				.then((data) => {
					//console.log(data)
					setMoveID(data.id);
					setType(data.type.name);
				})
				.catch((err) => console.log(err));
		}
		//console.log("Move: ",move)
		//Extend into its own page.
		getMoveType();
	}, [move]);


	return (
		<>
			<a href={`/move?move=${moveID}`}>
				<div className={`move ${type}`}>
					<h5>
						{move.move.name?.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
					</h5>
					<p>Learned at level {move.version_group_details[0]?.level_learned_at}</p>
				</div>
			</a>
		</>
	);
};

export default PokemonLevelUpMove;
