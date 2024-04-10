import React from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import './navbar.scss';

const NavBarx = () => {
	return (
		<Navbar className="navBar">
			<Container>
				<Navbar.Brand href="/">[Name or image]</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					<Nav className="me-auto">
						<Nav.Link href="/">Home</Nav.Link>
						<Nav.Link href="">Link</Nav.Link>
						<Form className="d-flex">
							<Form.Control
								type="search"
								placeholder="Search"
								className="me-2"
								aria-label="Search"
							/>
							<Button className="button">Search</Button>
						</Form>
					</Nav>
						<Nav.Link href="/signup">Signup </Nav.Link>
						<Navbar.Text className="space">/</Navbar.Text>
						<Nav.Link href="/login" className="loginLink">Login</Nav.Link>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBarx;
