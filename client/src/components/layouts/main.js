import React, { Suspense } from "react";
import { Container, Image } from "react-bootstrap";

import MainHeader from "../header";
import Loading from "../loading";
import MainMenu from "../menu";
import logo from "./../../media/green-gate-logo-with-title.png";

function MainLayout({ children }) {
	return (
		<div>
			<MainHeader>
				<MainMenu />
			</MainHeader>
			<Suspense fallback={<Loading />}>
				<Container className="py-4">{children}</Container>
			</Suspense>
			<footer
				className="text-center py-5 text-secondary"
				style={{
					backgroundColor: "#e6e6e6",
				}}
			>
				<div className="mb-4">
					<Image
						src={logo}
						fluid
						style={{
							height: 100,
						}}
					/>
				</div>
				© {new Date().getFullYear()} Green Gate. All Rights Reserved.
			</footer>
		</div>
	);
}

export default MainLayout;
