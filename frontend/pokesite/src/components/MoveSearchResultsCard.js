import React, { useEffect, useState } from 'react';
import "./movessearchresult.scss";

const MoveSearchResultsCard = ({move}) => {
    const [type, setType] = useState("");
	const [moveID, setMoveID] = useState("");
    const [moveData, setMoveData] = useState();

	useEffect(() => {
        console.log("Move passed into Card:", move.url)
		function getMoveType() {
			fetch(move.url)
				.then((data) => data.json())
				.then((data) => {
					console.log("Data gotten from URL: ",data)
					setMoveID(data.id);
					setType(data.type.name);
                    setMoveData(data)
				})
				.catch((err) => console.log(err));
		}
		//console.log("Move: ",move)
		//Extend into its own page.
		getMoveType();
        console.log("MoveID: ", moveID)
        console.log("Type: ", type)
        console.log("Name: ", move.name?.charAt(0).toUpperCase() + move.name?.slice(1).replace(/-/g, ' '))
	}, [move]);


	return (
		<>
			<a href={`/move?move=${moveID}`}>
				<div className={`move searchResult ${type}`}>
                    <h2 className='name' style={{textDecoration:"underline", lineHeight: "40px"}}>{
                        move.name.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
                    }</h2>
                    <div className={`moveHeader`}>
						<h4 className='pp'>Accuracy: {moveData?.accuracy}</h4>
                        <h4 className='power'>Power: {moveData?.power}</h4>
                        <h4 className='damageClass'>DMG Class: {moveData?.damage_class?.name.charAt(0).toUpperCase() + moveData?.damage_class?.name?.slice(1).replace(/-/g, ' ')}</h4>
                        <h4 className='pp'>PP: {moveData?.pp}/{moveData?.pp}</h4>
                        
					</div>
                    <h6 className='effect'>{moveData?.effect_entries[0]?.short_effect}</h6>
				</div>
			</a>
		</>
	);
}

export default MoveSearchResultsCard