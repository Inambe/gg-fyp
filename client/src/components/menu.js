import React from "react";
import { Link as RLink } from "react-router-dom";
import {
	FormControl,
	Nav,
	Navbar,
	NavDropdown,
	Form,
	Button,
	Container,
} from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { isNurseryAuthenticated } from "../atoms/auth";

function MainMenu() {
	const _isNurseryAuthenticated = useRecoilValue(isNurseryAuthenticated);
	return (
		<Navbar bg="primary" expand="lg" variant="dark">
			<Container>
				<RLink to="/" component={Navbar.Brand}>
					Green Gate
				</RLink>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<RLink to="/plants" component={Nav.Link}>
							Plants
						</RLink>
						<RLink to="/about" component={Nav.Link}>
							About Us
						</RLink>
						{_isNurseryAuthenticated ? (
							<RLink to="/nursery/dashboard" component={Nav.Link}>
								Dashboard
							</RLink>
						) : (
							<NavDropdown
								title="Nursery"
								id="basic-nav-dropdown"
							>
								<RLink
									to="/nursery/sign-up"
									component={NavDropdown.Item}
								>
									Sign-up
								</RLink>
								<RLink
									to="/nursery/sign-in"
									component={NavDropdown.Item}
								>
									Sign-in
								</RLink>
							</NavDropdown>
						)}
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
			</Container>
		</Navbar>
	);
}

export default MainMenu;
