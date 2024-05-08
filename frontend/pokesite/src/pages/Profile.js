import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

const Profile = () => {
	const [pokemon, setPokemon] = useState([]);
	const [editInfo, setEditInfo] = useState(false);
	const [user, setUser] = useState(null);

	// temp info
	useEffect(() => {
		getUserInfo();
	}, []);

	useEffect(() => {
		console.log(user);
		if (user) {
			setPokemon(user.featuredPokemon.SS);
		}
	}, [user]);

	function editProfile() {
		setEditInfo(!editInfo);
	}

	function getUserInfo() {
		fetch(`http://localhost:5000/user/0495bda8-33c0-4014-af42-5c74ba38646e`, {
			method: "GET",
		})
			.then((r) => r.json())
			.then((data) => {
				// console.log(data)
				setUser(data.Item);
			})
			.catch((err) => console.log(err));
	}

	return user && user?.password ? (
		<div className="ProfilePage">
			<h1>{user.name.S}'s Profile</h1>
			<div className="imgUsername">
				<Image
					className="profileImg"
					src="../assets/defaultImg.jpg"
					fluid
					roundedCircle
				/>
				<h3 className="username">{user.userName.S}</h3>
			</div>

			<div className="flexItems">
				<div className="info">
					<button className="editProfile" onClick={editProfile}>
						Edit Profile
					</button>
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
								<h3>Bio: {user.bio.S}</h3>
								<h3>Extra Things: [extra]</h3>
							</div>
						)}
					</div>
				</div>
				<div className="party">
					<h1>Party</h1>
					<div className="allPokemonParty">
						{pokemon?.length !== 0 ? (
							pokemon?.map((item) => (
								// change later to a component?
								<div className="pokemonParty">
									<h3>{item.name}</h3>
									<p>{item.info}</p>
								</div>
							))
						) : (
							<>
								<h1>No Pokemon in your party</h1>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	) : (
		<>
			<h1>Loading...</h1>
		</>
	);
};

export default Profile;
