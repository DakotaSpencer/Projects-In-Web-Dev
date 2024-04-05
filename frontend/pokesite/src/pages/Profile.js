import React, { useState, useEffect } from "react";

const Profile = () => {
	const [pokemon, setPokemon] = useState([]);

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

	return (
		<div className="ProfilePage">
			<h1>My Profile</h1>

			<div className="flexItems">
				<div className="info">
					<div>
						<div>{/* image */}</div>
						<div>[Username]</div>
					</div>
					<div>
						<form>
							<button>Edit Profile</button> <br />
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
					</div>
				</div>
				<div className="party">
					<h1>Party</h1>
					<div>
						{pokemon.map((item) => (
							// change later to a component?
							<div className="">
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
