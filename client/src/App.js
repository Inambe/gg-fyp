import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "./components/layouts/main";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Plants from "./components/pages/plants";
import "./App.css";

function App() {
	return (
		<div>
			<Router>
				<MainLayout>
					<Switch>
						<Route path="/plants" exact>
							<Plants />
						</Route>
						<Route path="/about" exact>
							<About />
						</Route>
						<Route path="/" exact>
							<Home />
						</Route>
					</Switch>
				</MainLayout>
			</Router>
		</div>
	);
}

export default App;
