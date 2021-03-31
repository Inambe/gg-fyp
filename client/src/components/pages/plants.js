import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import GGClient from "../../api/GGClient";
import ProductCard from "../productCard";

function Plants() {
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
		<div>
			<h1 className="display-5 mb-3">Products</h1>
			<Row>
				{products.length &&
					products.map((product) => (
						<ProductCard product={product} />
					))}
			</Row>
		</div>
	);
}

export default Plants;
