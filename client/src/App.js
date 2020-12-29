import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "./components/layouts/main";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Plants from "./components/pages/plants";
import NurserySignUp from "./components/pages/nursery/sign-up";
import NurserySignIn from "./components/pages/nursery/sign-in";
import NurseryPrivateRoute from "./auth/nurseryRoute";
import NurseryDashboard from "./components/pages/nursery/dashboard";
import "./App.css";

function App() {
	return (
		<div>
			<Router>
				<MainLayout>
					<Switch>
						<NurseryPrivateRoute
							path="/nursery/dashboard"
							exact
							component={NurseryDashboard}
						/>
						<Route path="/nursery/sign-in" exact>
							<NurserySignIn />
						</Route>
						<Route path="/nursery/sign-up" exact>
							<NurserySignUp />
						</Route>
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
