import React from "react";
import {
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
	Form,
	Button,
} from "react-bootstrap";

function MainMenu() {
	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Navbar.Brand href="/">Green Gate</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link href="#link">Plants</Nav.Link>
					<Nav.Link href="#home">About</Nav.Link>
					<Nav.Link href="#home">Contact</Nav.Link>
					<NavDropdown title="Nursery" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">
							Sign-up
						</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">
							Sign-in
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search"
						className="mr-sm-2"
					/>
					<Button variant="secondary">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MainMenu;
