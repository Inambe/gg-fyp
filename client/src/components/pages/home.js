import React, { useEffect, useState } from "react";
import { Button, Jumbotron, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import GGClient from "../../api/GGClient";
import { settingsState } from "../../atoms/settings";
import ProductCard from "../productCard";

function Home() {
	const [products, setProducts] = useState([]);
	const settings = useRecoilValue(settingsState);

	useEffect(() => {
		(async () => {
			const productsRes = await GGClient.get("/products/list/?limit=3");
			if (productsRes.data.success) {
				setProducts(productsRes.data.data);
			}
		})();
	}, []);

	return (
		<>
			<Jumbotron className="rounded-0">
				<h1 className="display-3">{settings.title}</h1>
				<p className="lead">{settings.description}</p>
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
