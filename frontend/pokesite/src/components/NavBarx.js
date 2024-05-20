import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import './navbar.scss';
import { useNavigate } from "react-router-dom";

const NavBarx = ({ loggedInEmail, onLogout }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();
    const searchFunc = async (e) => {
		e.preventDefault()
		navigate(`/search?query=${searchTerm}`)
    }
	const logout = () => {
		onLogout();
	};

	return (
		<Navbar className="navBar">
			<Container>
				<Navbar.Brand href="/">PocketDex</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="/relations">
							Damage Relations and Type Advantages
						</Nav.Link>
						{loggedInEmail ? (
							<>
								<Nav.Link href="/profile">Profile</Nav.Link>
							</>
						) : (
							<></>
						)}
						<Form onSubmit={searchFunc} className="d-flex">
							<Form.Control
								required
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<Button type="submit" className="button loginBtn">Search</Button>
						</Form>
						
					</Nav>
					{loggedInEmail ? (
						<>
							<Navbar.Text>Welcome {loggedInEmail}</Navbar.Text>{" "}
							<Nav.Link onClick={logout} className="loginLink">
								Logout
							</Nav.Link>
						</>
					) : (
						<>
							<Nav.Link href="/signup">Signup </Nav.Link>
							<Navbar.Text className="space">/</Navbar.Text>
							<Nav.Link href="/login" className="loginLink">
								Login
							</Nav.Link>
						</>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBarx;
