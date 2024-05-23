import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

const Signup = ({ onLogin }) => {
	const [showPassword, setShowPassword] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState();
	const [emailMatch, setEmailMatch] = useState();
	let navigate = useNavigate();

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		criteriaMode: "all",
	});

	const onSubmit = (data) => {
		const requestData = { ...data };
		delete requestData.confirmEmail;
		delete requestData.confirmPassword;
		fetch(`http://localhost:5000/user/`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(requestData),
		})
			.then((r) => r.json())
			.then((returnData) => {
				if (returnData.Message === "SUCCESS") {
					const email = requestData.email;
					onLogin(email);
					navigate("/");
				}
			})
			.catch((err) => console.log(err));
	};

	const passwordPattern =
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/;
	const validatePassword = (value) => {
		if (passwordPattern.test(value)) {
			return true;
		}
		return `Password must contain: \n 1 uppercase letter \n1 lowercase letter \n 1 number \n 1 special character`;
	};

	useEffect(() => {
		setPasswordMatch(watch("password", "") === watch("confirmPassword", ""));
		setEmailMatch(watch("email", "") === watch("confirmEmail", ""));
	}, [watch]);

	return (
		<div className="signup">
			<div className="borderContainer">
				<h1>Signup</h1>
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<div className="inputs">
						<label htmlFor="email">
							Email<span className="error required">*</span>
						</label>
						<input
							id="email"
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

						<label htmlFor="confirmEmail">
							Confirm Email<span className="error required">*</span>
						</label>
						<input
							id="confirmEmail"
							name="confirmEmail"
							type="email"
							placeholder="Confirm Email"
							{...register("confirmEmail", {
								required: "Email is required",
								validate: (value) =>
									value === watch("email", "") || "Emails do not match",
							})}
						/>
						{emailMatch ? null : <p className="error">Emails do not match</p>}
						<ErrorMessage
							errors={errors}
							name="confirmEmail"
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
						<label htmlFor="userName">
							Username<span className="error required">*</span>
						</label>
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
						<label htmlFor="name">
							Name<span className="error required">*</span>
						</label>
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
						<label htmlFor="password">
							Password<span className="error required">*</span>
						</label>
						<input
							name="password"
							type={showPassword ? "text" : "password"}
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
						<i
							className={`bi bi-eye${showPassword ? "-slash-fill" : "-fill"}`}
							onClick={() => setShowPassword(!showPassword)}
						></i>
						<ErrorMessage
							errors={errors}
							name="password"
							render={({ messages }) =>
								messages
									? Object.entries(messages).map(([type, message]) => (
											<p
												key={type}
												className="error"
												style={{ whiteSpace: "pre-line" }}
											>
												{message}
											</p>
									  ))
									: null
							}
						/>

						<label htmlFor="confirmPassword">
							Confirm Password<span className="error required">*</span>
						</label>
						<input
							name="confirmPassword"
							type={showPassword ? "text" : "password"}
							placeholder="Confirm Password"
							{...register("confirmPassword", {
								required: "Confirm Password is required",
								validate: (value) =>
									value === watch("password", "") || "Passwords do not match",
							})}
						/>
						<i
							className={`bi bi-eye${showPassword ? "-slash-fill" : "-fill"}`}
							onClick={() => setShowPassword(!showPassword)}
						></i>
						{passwordMatch ? null : (
							<p className="error">Passwords do not match</p>
						)}
						<ErrorMessage
							errors={errors}
							name="confirmPassword"
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
						<label htmlFor="bio">
							Bio
						</label>
						<input
							name="bio"
							type="text"
							placeholder="Bio"
							{...register("bio", {
								required: false,
								maxLength: {
									value: 160 ,
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
						<label htmlFor="profilePicture">
							Profile Picture
						</label>
						<input
							name="profilePicture"
							type="url"
							placeholder="Profile Picture (url)"
							{...register("profilePicture", {
								required: false,
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="profilePicture"
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
					</div>
					<div className="buttons">
						
						<button className="loginBtn">Signup</button>
						<a className="signup" href="/login">
							Already have an account? Login instead!
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
