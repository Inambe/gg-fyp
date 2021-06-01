import React, { useEffect, useState } from "react";
import { Col, Image, Row, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import GGClient from "../../api/GGClient";
import { uploadsUrl } from "../../api/utils";
import ChatButton from "../chatButton";
import Loading from "../loading";

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

	if (!product) return <Loading />;

	return (
		<Row className="py-4 bg-white">
			<Col md={6}>
				<Image src={uploadsUrl(product.picture)} alt="" fluid />
			</Col>
			<Col>
				<h1 className="display-5">{product.name}</h1>
				<h3>
					{product.price} <small>PKR</small>
				</h3>
				<div>
					<div
						className="mb-3"
						dangerouslySetInnerHTML={{
							__html: product.description,
						}}
					/>
					{product.fertilizer && (
						<Table bordered className="mb-3">
							<tbody>
								<tr>
									<th>Fertilizer</th>
									<td>{product.fertilizer}</td>
								</tr>
							</tbody>
						</Table>
					)}
					<Table bordered className="mb-3">
						<tbody>
							<tr>
								<th colSpan={2} className="text-center">
									Seller
								</th>
							</tr>
							<tr>
								<th>Name</th>
								<td>
									<Link
										to={`/nurseries/${product.nursery._id}`}
									>
										{product.nursery.name}
									</Link>
								</td>
							</tr>
							<tr>
								<th>Address</th>
								<td>{product.nursery.location}</td>
							</tr>
							{product.nursery.email && (
								<tr>
									<th>Email</th>
									<td>{product.nursery.email}</td>
								</tr>
							)}
							{product.nursery.phone && (
								<tr>
									<th>Phone</th>
									<td>{product.nursery.phone}</td>
								</tr>
							)}
						</tbody>
					</Table>

					<ChatButton nurseryId={product.nursery._id} />
				</div>
			</Col>
		</Row>
	);
}

export default Product;
