import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

const Profile = () => {
	const [pokemon, setPokemon] = useState([]);
	const [editInfo, setEditInfo] = useState(false);

	// temp info
	useEffect(() => {
		setPokemon([
			{
				name: "pokemon Name 1",
				info: "Info 1",
			},
			{
				name: "pokemon Name 2",
				info: "Info 2",
			},
			{
				name: "pokemon Name 1",
				info: "Info 1",
			},
			{
				name: "pokemon Name 2",
				info: "Info 2",
			},
			{
				name: "pokemon Name 1",
				info: "Info 1",
			},
			{
				name: "pokemon Name 2",
				info: "Info 2",
			},
		]);
	}, []);

	function editProfile() {
		setEditInfo(!editInfo);
	}

	return (
		<div className="ProfilePage">
			<h1>My Profile</h1>
			<div className="imgUsername">
						<Image
							className="profileImg"
							src="../assets/defaultImg.jpg"
							fluid
							roundedCircle
						/>
						<h3 className="username">[Username]</h3>
					</div>
			
			<div className="flexItems">
				<div className="info">
				<button className="editProfile" onClick={editProfile}>Edit Profile</button>
					{/* <hr /> */}
					<div className="form">
						{editInfo ? (
							<form>
								<label>Email</label>
								<br />
								<input type="text" />
								<br />
								<label>Password</label>
								<br />
								<input type="password" />
								<br />
								<label>Extra</label>
								<br />
								<input type="text" />
								<br />
							</form>
						) : (
							<div>
								<h3>Email: [email]</h3>
								<h3>Extra Things: [extra]</h3>
							</div>
						)}
					</div>
				</div>
				<div className="party">
					<h1>Party</h1>
					<div className="allPokemonParty">
						{pokemon.map((item) => (
							// change later to a component?
							<div className="pokemonParty">
								<h3>{item.name}</h3>
								<p>{item.info}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
