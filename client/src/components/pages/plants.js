import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import GGClient from "../../api/GGClient";
import Loading from "../loading";
import ProductCard from "../productCard";

function Plants() {
	const [products, setProducts] = useState();

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get("/products/list");
			if (data.success) {
				setProducts(data.data);
			}
		})();
	}, []);
	return (
		<div>
			<h1 className="display-5 mb-3">Products</h1>
			<Row>
				{products ? (
					products.map((product, i) => (
						<ProductCard key={i} product={product} />
					))
				) : (
					<Loading />
				)}
			</Row>
		</div>
	);
}

export default Plants;
