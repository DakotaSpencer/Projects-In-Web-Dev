import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router";

const Signup = () => {
	const [showPassword, setShowPassword] = useState(false);
	let navigate = useNavigate();
	const routeChange = () => {
		let path = `/login`;
		navigate(path);
	};

	return (
		<div className="signup">
			<div className="borderContainer">
				<h1>Signup</h1>
				<div className="form">
					<div className="inputs">
						<label htmlFor="username">Username</label>
						<br />
						<input name="username" type="text" placeholder="Username" />
						<br />
						<label htmlFor="email">Email</label>
						<br />
						<input name="email" type="text" placeholder="Email" />
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
						<label htmlFor="password">Confirm Password</label>
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
					</div>
					<div className="buttons">
						<button className="signup" onClick={routeChange}>
							Login
						</button>
						<button className="loginBtn">Signup</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
