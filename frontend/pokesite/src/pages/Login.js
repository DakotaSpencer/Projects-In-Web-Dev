import React from "react";

const Login = () => {
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
						<input name="password" type="password" placeholder="Password" />
						<br />
					</div>
					<div className="buttons">
						<button className="signup">Signup</button>
						<button className="loginBtn">Login</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
