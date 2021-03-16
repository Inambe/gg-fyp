import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";
import GGClient from "../../api/GGClient";
import { uploadsUrl } from "../../api/utils";

function Product() {
	const [product, setProduct] = useState();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get(`/products/${id}`);
			if (data.success) {
				setProduct(data.data);
			}
		})();
	}, [id]);

	if (!product) return <div>Loading ...</div>;

	return (
		<Row>
			<Col md={6}>
				<Image
					src={uploadsUrl(product.picture)}
					className="mx-auto d-block"
					alt=""
					fluid
				/>
			</Col>
			<Col>
				<h1 className="display-4">{product.name}</h1>
				<div className="py-3">
					<h3>Seller</h3>
					<h4>
						Name — {product.nursery.name} <br />
						Address — {product.nursery.location} <br />
						Contact — {product.nursery.email} <br />
					</h4>
				</div>
			</Col>
		</Row>
	);
}

export default Product;
