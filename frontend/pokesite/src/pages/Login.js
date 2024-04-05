import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	let navigate = useNavigate();
	const routeChange = () => {
		let path = `/signup`;
		navigate(path);
	};

	return (
		<div className="login">
			<div className="borderContainer">
				<h1>Login</h1>
				<div className="form">
					<div className="inputs">
						<label htmlFor="email">Username / Email</label>
						<br />
						<input name="email" type="text" placeholder="Username / Email" />
						<br />
						<label htmlFor="password">Password</label>
						<br />
						<input
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Password"
						/>
						<i
							className={`bi bi-eye${showPassword ? "-slash-fill" : "-fill"}`}
							onClick={() => setShowPassword(!showPassword)}
						></i>
						<br />
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
				</div>
			</div>
		</div>
	);
};

export default Login;
