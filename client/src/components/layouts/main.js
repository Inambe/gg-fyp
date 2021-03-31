import React, { Suspense } from "react";
import { Container } from "react-bootstrap";

import MainHeader from "../header";
import MainMenu from "../menu";

function MainLayout({ children }) {
	return (
		<div>
			<MainHeader>
				<MainMenu />
			</MainHeader>
			<Suspense
				fallback={<h1 className="p-5 text-center">Loading ...</h1>}
			>
				<Container className="py-4">{children}</Container>
			</Suspense>
			<footer className="text-center py-5">
				© {new Date().getFullYear()} Green Gate. All Rights Reserved.
			</footer>
		</div>
	);
}

export default MainLayout;
