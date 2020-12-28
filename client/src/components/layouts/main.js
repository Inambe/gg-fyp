import React from "react";
import { Container } from "react-bootstrap";

import MainHeader from "../header";
import MainMenu from "../menu";

function MainLayout({ children }) {
	return (
		<div>
			<MainHeader>
				<MainMenu />
			</MainHeader>
			<Container className="py-5">{children}</Container>
			<footer style={{ textAlign: "center" }}>
				© {new Date().getFullYear()} Green Gate. All Rights Reserved.
			</footer>
		</div>
	);
}

export default MainLayout;
