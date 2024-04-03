import React from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";

const NavBarx = () => {
	return (
		<Navbar className="navBar">
			<Container>
				<Navbar.Brand href="#home">[Name or image]</Navbar.Brand>
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
							<Button variant="outline-success">Search</Button>
						</Form>
					</Nav>
					<Navbar.Text>
						<Nav.Link href="/login">Signup / Login</Nav.Link>
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default NavBarx;
