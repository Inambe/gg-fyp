import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Translate } from "react-i18nify";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { uploadsUrl } from "../api/utils";

function ProductCard({ product, noSeller }) {
	return (
		<Col md={4} className="mb-3">
			<Card>
				<Card.Img variant="top" src={uploadsUrl(product.picture)} />
				<Card.Body>
					<Card.Title>{product.name}</Card.Title>
					{!noSeller && (
						<Card.Text>
							<small>
								<Link to={`/nurseries/${product.nursery._id}`}>
									<FaUserCircle /> {product.nursery.name}
								</Link>
							</small>
						</Card.Text>
					)}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<span className="font-weight-bold">
							{product.price} <small>PKR</small>
						</span>
						<span>
							<Button
								as={Link}
								to={`/products/${product._id}`}
								variant="primary"
							>
								<Translate value="readMore" />
							</Button>
						</span>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default ProductCard;
