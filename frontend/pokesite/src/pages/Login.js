import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	let navigate = useNavigate();
	const routeChange = () => {
		let path = `/signup`;
		navigate(path);
	};

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		criteriaMode: "all",
	});

	const onSubmit = (data) => {
		// fetch statement for the backend
		console.log(data);
	};

	return (
		<div className="login">
			<div className="borderContainer">
				<h1>Login</h1>
				<form className="form" onSubmit={handleSubmit(onSubmit)}>
					<div className="inputs">
						<label htmlFor="usernameEmail">
							Username or Email <span className="error required">*</span>
						</label>
						<input
							name="usernameEmail"
							type="text"
							placeholder="Username or Email"
							{...register("usernameEmail", {
								required: "Username or Email is required",
								validate: (value) => {
									const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
									const isUsername = /^[a-zA-Z0-9_-]{3,16}$/.test(value);

									if (!isEmail && !isUsername) {
										return "Invalid username or email";
									}
								},
							})}
						/>
						<ErrorMessage
							errors={errors}
							name="usernameEmail"
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
							Password <span className="error required">*</span>
						</label>
						<input
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
							{...register("password", {
								required: "Password is required",
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
						<p className="forgot">
							<a href="/home">Forgot Password</a>
						</p>
					</div>
					<div className="buttons">
						<button className="signup" onClick={routeChange}>
							Signup
						</button>
						<button className="loginBtn">Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
