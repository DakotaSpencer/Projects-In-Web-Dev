import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import PokemonCard from "../components/PokemonCard";

const Profile = () => {
	const [pokemon, setPokemon] = useState([]);
	const [editInfo, setEditInfo] = useState(false);
	const [user, setUser] = useState(null);
	const [loggedInEmail, setLoggedInEmail] = useState();
	const [isLoading, setLoading] = useState(true);

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		criteriaMode: "all",
	});

	useEffect(() => {
		setLoggedInEmail(localStorage.getItem("email"));
	}, []);

	const passwordPattern =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/;
	const validatePassword = (value) => {
		if (passwordPattern.test(value)) {
			return true;
		}
		return `Password must contain: \n 1 uppercase letter \n1 lowercase letter \n 1 number \n 1 special character`;
	};

	useEffect(() => {
		if (loggedInEmail) {
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
	}, [loggedInEmail]);

	useEffect(() => {
		if (user) {
			setPokemon(user.featuredPokemon.SS);
			console.log(user);
		}
	}, [user]);

	function editProfile() {
		setEditInfo(!editInfo);
	}

	const onSubmit = (data) => {
		console.log(data);
	};

	if (isLoading && loggedInEmail) {
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

				<div className="flexItems">
					<div className="info">
						<div className="imgUsername">
							<Image
								className="profileImg"
								src={
									user.profilePicture.S
										? user.profilePicture.S
										: "../assets/defaultImg.jpg"
									// "../assets/defaultImg.jpg"
								}
								fluid
								roundedCircle
							/>

							<button className="profileImgBtn">Edit Profile Image</button>

							<button className="editProfile" onClick={editProfile}>
								Edit Profile
							</button>
						</div>
						<hr />
						<div className="form">
							{editInfo ? (
								<form onSubmit={handleSubmit(onSubmit)}>
									<label htmlFor="email">Email</label>
									<br />
									<input
										name="email"
										type="email"
										placeholder="Email"
										{...register("email", {
											required: "Email is required",
											pattern: {
												value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
												message: "Email address is invalid",
											},
											minLength: {
												value: 5,
												message: "Email must be longer than 5 characters",
											},
										})}
									/>
									<ErrorMessage
										errors={errors}
										name="email"
										render={({ messages }) =>
											messages
												? Object.entries(messages).map(([type, message]) => (
														<p key={type} className="error">
															{message}
														</p>
												  ))
												: null
										}
									/>
									<label htmlFor="userName">Username</label>
									<br />
									<input
										name="userName"
										type="text"
										placeholder="Username"
										{...register("userName", {
											required: "Username is required",
											pattern: {
												value: /^[a-zA-Z0-9_-]{3,16}$/,
												message: "Invaild username",
											},
											minLength: {
												value: 3,
												message: "Username can't be shorter than 3 characters",
											},
											maxLength: {
												value: 16,
												message: "Username cannot exceed 16 characters",
											},
										})}
									/>
									<ErrorMessage
										errors={errors}
										name="userName"
										render={({ messages }) =>
											messages
												? Object.entries(messages).map(([type, message]) => (
														<p key={type} className="error">
															{message}
														</p>
												  ))
												: null
										}
									/>
									<label htmlFor="name">Name</label>
									<br />
									<input
										name="name"
										type="text"
										placeholder="Name"
										{...register("name", {
											required: "Name is required",
											pattern: {
												value: /^[A-Za-z\s]+$/,
												message: "Name can only contain letters",
											},
											minLength: {
												value: 2,
												message: "Name can't be shorter than 2 characters",
											},
											maxLength: {
												value: 100,
												message: "Name cannot exceed 100 characters",
											},
										})}
									/>
									<ErrorMessage
										errors={errors}
										name="name"
										render={({ messages }) =>
											messages
												? Object.entries(messages).map(([type, message]) => (
														<p key={type} className="error">
															{message}
														</p>
												  ))
												: null
										}
									/>
									<label htmlFor="password">Password</label>
									<br />
									<input
										name="password"
										type="password"
										placeholder="Password"
										{...register("password", {
											required: "Password is required",
											validate: validatePassword,
											minLength: {
												value: 8,
												message: "Must be longer than 8 characters",
											},
										})}
									/>
									<label htmlFor="bio">Bio</label>
									<br />
									<input
										name="bio"
										type="text"
										placeholder="Bio"
										{...register("bio", {
											required: false,
											maxLength: {
												value: 160,
												message: "Bio cannot exceed 160 characters",
											},
										})}
									/>
									<ErrorMessage
										errors={errors}
										name="bio"
										render={({ messages }) =>
											messages
												? Object.entries(messages).map(([type, message]) => (
														<p key={type} className="error">
															{message}
														</p>
												  ))
												: null
										}
									/>
									<button type="submit">Confirm</button>
								</form>
							) : (
								<div className="profileInfo">
									<h3>
										<span className="color">Username:</span> {user.userName.S}
									</h3>
									<h3>
										<span className="color">Email:</span> {user.email.S}
									</h3>
									<h3>
										<span className="color">Bio:</span> {user.bio.S}
									</h3>
								</div>
							)}
						</div>
					</div>
					<div className="party">
						<h1>Party</h1>
						<div className="allPokemonParty">
							{pokemon?.length > 0 && pokemon[0] !== "0" ? (
								pokemon?.map((item) => (
									<div className="pokemonParty">
										<PokemonCard pokemon={item} />
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
				<div className="noAccess">
					<h1>No Access to this page. Please login or signup</h1>
				</div>
			</>
		);
	}
};

export default Profile;
