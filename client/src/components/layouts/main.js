import React, { Suspense } from "react";
import { Container } from "react-bootstrap";

import MainHeader from "../header";
import MainMenu from "../menu";

function MainLayout({ children }) {
	return (
		<div>
			<Suspense
				fallback={<h1 className="p-5 text-center">Loading ...</h1>}
			>
				<MainHeader>
					<MainMenu />
				</MainHeader>
				<Container className="py-4">{children}</Container>
				<footer className="text-center py-5">
					© {new Date().getFullYear()} Green Gate. All Rights
					Reserved.
				</footer>
			</Suspense>
		</div>
	);
}

export default MainLayout;
