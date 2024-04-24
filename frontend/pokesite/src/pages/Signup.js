import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	let navigate = useNavigate();
	const routeChange = () => {
		let path = `/login`;
		navigate(path);
	};
	const [passwordMatch, setPasswordMatch] = useState();

	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm({
		criteriaMode: "all",
	});

	const onSubmit = (data) => {
		// fetch statement for the backend
		console.log(data);
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
	}, [watch]);

	return (
		<div className="signup">
			<div className="borderContainer">
				<h1>Signup</h1>
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<div className="inputs">
						<label htmlFor="username">Username</label>
						<br />
						<input name="username" type="text" placeholder="Username"  {...register("username", {
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
							name="username"
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
						
						<label htmlFor="confirmPassword">Confirm Password</label>
						<br />
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
					</div>
					<div className="buttons">
						<button className="signup" onClick={routeChange}>
							Login
						</button>
						<button className="loginBtn">Signup</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
