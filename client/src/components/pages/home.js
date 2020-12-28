import React from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
	return (
		<Jumbotron className="rounded-0">
			<h1>Green Gate</h1>
			<p className="lead">
				Green Gate provides a platform for both nurseries and plant
				enthusiasts to buy, sell, and get information about different
				plants.
			</p>
			<p>
				<Link to="/nursery/sign-up">
					<Button variant="primary">Sign-up as Nursery</Button>
				</Link>
			</p>
		</Jumbotron>
	);
}

export default Home;
