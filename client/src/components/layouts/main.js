import React, { Suspense, useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { getLocale, setLocale } from "react-i18nify";

import MainHeader from "../header";
import Loading from "../loading";
import MainMenu from "../menu";
import logo from "./../../media/green-gate-logo-with-title.png";

function MainLayout({ children }) {
	const [locale, _setLocale] = useState(getLocale());

	useEffect(() => {
		window.localStorage.setItem("locale", locale);
		setLocale(locale);
	}, [locale]);

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
				<div className="mb-3">
					<Image
						src={logo}
						fluid
						style={{
							height: 100,
						}}
					/>
				</div>
				<div className="mb-3">
					<select
						onChange={(e) => {
							const newLocale = e.target.value;
							_setLocale(newLocale);
						}}
						value={locale}
					>
						<option value="en">English</option>
						<option value="ur">Urdu</option>
					</select>
				</div>
				<div>
					© {new Date().getFullYear()} Green Gate. All Rights
					Reserved.
				</div>
			</footer>
		</div>
	);
}

export default MainLayout;
