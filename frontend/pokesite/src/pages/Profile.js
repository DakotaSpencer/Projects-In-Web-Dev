import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";

const Profile = () => {
	const [pokemon, setPokemon] = useState([]);
	const [editInfo, setEditInfo] = useState(false);
	const [user, setUser] = useState(null);
	const [loggedInEmail, setLoggedInEmail] = useState();
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoggedInEmail(localStorage.getItem("email"));
	}, []);

	useEffect(() => {
		getUserInfo();
	}, [loggedInEmail]);

	useEffect(() => {
		if (user) {
			setPokemon(user.featuredPokemon.SS);
			console.log(user)
		}
	}, [user]);

	function editProfile() {
		setEditInfo(!editInfo);
	}

	function getUserInfo() {
		fetch(`http://localhost:5000/user/email/get/${loggedInEmail}`, {
			method: "GET",
		})
			.then((r) => r.json())
			.then((data) => {
				setUser(data.Item);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}

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
					Fetching User, please wait...
				</h3>
			</div>
		);
	} else {
		return user && user?.password ? (
			<div className="ProfilePage">
				<h1>{user.name.S}'s Profile</h1>
				<div className="imgUsername">
					<Image
						className="profileImg"
						src={
							user.profilePicture
								? user.profilePicture.S
								: "../assets/defaultImg.jpg"
						}
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
									<h3>Email: {user.email.S}</h3>
									<h3>Bio: {user.bio.S}</h3>
									<h3>Extra Things: [extra]</h3>
								</div>
							)}
						</div>
					</div>
					<div className="party">
						<h1>Party</h1>
						<div className="allPokemonParty">
							{pokemon?.length > 0 && pokemon[0] !== "0" ? (
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
	}
};

export default Profile;
