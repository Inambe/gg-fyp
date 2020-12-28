import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "./components/layouts/main";
import "./App.css";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/" exact>
						<MainLayout>
							<h1>Hello G</h1>
						</MainLayout>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
