import React, { useEffect, useState } from "react";
import { Button, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import GGClient from "../../api/GGClient";
import ProductCard from "../productCard";

function Home() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get("/products/list/?limit=3");
			if (data.success) {
				setProducts(data.data);
			}
		})();
	}, []);

	return (
		<>
			<Jumbotron className="rounded-0">
				<h1 className="display-3">Green Gate</h1>
				<p className="lead">
					Green Gate provides a platform for both nurseries and plant
					enthusiasts to buy, sell, and get information about
					different plants.
				</p>
				<p>
					<Button as={Link} to="/nursery/sign-up" variant="primary">
						Sign-up as Nursery
					</Button>
				</p>
			</Jumbotron>
			<section>
				<h1 className="display-4">Latest</h1>
				<Row>
					{products.length &&
						products.map((product, i) => (
							<ProductCard product={product} key={i} />
						))}
				</Row>
				<div className="d-flex justify-content-center py-3">
					<Button as={Link} to="/products" variant="primary">
						See more
					</Button>
				</div>
			</section>
		</>
	);
}

export default Home;
