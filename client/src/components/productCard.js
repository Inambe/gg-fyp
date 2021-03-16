import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { uploadsUrl } from "../api/utils";

function ProductCard({ product }) {
	return (
		<Col md={4}>
			<Card>
				<Card.Img variant="top" src={uploadsUrl(product.picture)} />
				<Card.Body>
					<Card.Title>{product.name}</Card.Title>
					<Card.Text>
						<strong>Seller:</strong> {product.nursery.name}
					</Card.Text>
					<Button variant="primary">Contact</Button>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default ProductCard;
