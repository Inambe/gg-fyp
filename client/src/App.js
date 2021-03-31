import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MainLayout from "./components/layouts/main";
import Home from "./components/pages/home";
import About from "./components/pages/about";
import Plants from "./components/pages/plants";
import NurserySignUp from "./components/pages/nursery/sign-up";
import NurserySignIn from "./components/pages/nursery/sign-in";
import NurserySignOut from "./components/pages/nursery/signOut";
import NurseryPrivateRoute from "./auth/nurseryRoute";
import NurseryDashboard from "./components/pages/nursery/dashboard";
import NurseryCreateProduct from "./components/pages/nursery/createProduct";
import NurseryEditProduct from "./components/pages/nursery/editProduct";
import "./App.css";
import NurseryProducts from "./components/pages/nursery/products";
import UpdateProfile from "./components/pages/nursery/updateProfile";
import Product from "./components/pages/product";
import UserSignUp from "./components/pages/user/sign-up";
import UserSignIn from "./components/pages/user/sign-in";
import UserDashboard from "./components/pages/user/dashboard";
import UserPrivateRoute from "./auth/userRoute";
import UserSignOut from "./components/pages/user/signOut";
import UserChat from "./components/pages/user/chat";
import UserChats from "./components/pages/user/chats";
import NurseryChats from "./components/pages/nursery/chats";
import NurseryChat from "./components/pages/nursery/chat";

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
						<NurseryPrivateRoute
							path="/nursery/sign-out"
							exact
							component={NurserySignOut}
						/>
						<NurseryPrivateRoute
							path="/nursery/products/create"
							exact
							component={NurseryCreateProduct}
						/>
						<NurseryPrivateRoute
							path="/nursery/products/edit/:id"
							exact
							component={NurseryEditProduct}
						/>
						<NurseryPrivateRoute
							path="/nursery/products"
							exact
							component={NurseryProducts}
						/>
						<NurseryPrivateRoute
							path="/nursery/profile"
							exact
							component={UpdateProfile}
						/>
						<Route path="/nursery/sign-in" exact>
							<NurserySignIn />
						</Route>
						<Route path="/nursery/sign-up" exact>
							<NurserySignUp />
						</Route>
						{/* Nursery Routes */}
						<NurseryPrivateRoute
							path="/nursery/chat"
							exact
							component={NurseryChats}
						/>
						<NurseryPrivateRoute
							path="/nursery/chat/:userId"
							exact
							component={NurseryChat}
						/>
						{/* / */}

						{/* User Routes */}
						<UserPrivateRoute
							path="/user/dashboard"
							exact
							component={UserDashboard}
						/>
						<UserPrivateRoute
							path="/user/chat/:nurseryId"
							exact
							component={UserChat}
						/>
						<UserPrivateRoute
							path="/user/chat"
							exact
							component={UserChats}
						/>
						<UserPrivateRoute
							path="/user/sign-out"
							exact
							component={UserSignOut}
						/>
						<Route path="/user/sign-in" exact>
							<UserSignIn />
						</Route>
						<Route path="/user/sign-up" exact>
							<UserSignUp />
						</Route>
						{/* / */}

						<Route path="/products" exact>
							<Plants />
						</Route>
						<Route path="/products/:id" exact>
							<Product />
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
