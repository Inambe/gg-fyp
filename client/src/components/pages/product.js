import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import GGClient from "../../api/GGClient";
import { uploadsUrl } from "../../api/utils";
import { isUserAuthenticated } from "../../atoms/auth";
import Loading from "../loading";

function Product() {
	const [product, setProduct] = useState();
	const _isUserAuthenticated = useRecoilValue(isUserAuthenticated);
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
								<td>{product.nursery.name}</td>
							</tr>
							<tr>
								<th>Address</th>
								<td>{product.nursery.location}</td>
							</tr>
							<tr>
								<th>Contact</th>
								<td>{product.nursery.email}</td>
							</tr>
						</tbody>
					</Table>

					{_isUserAuthenticated ? (
						<Button
							as={Link}
							to={`/user/chat/${product.nursery._id}/`}
						>
							Chat with Nursery
						</Button>
					) : (
						<Button as={Link} to="/user/sign-in">
							Sign in to Chat
						</Button>
					)}
				</div>
			</Col>
		</Row>
	);
}

export default Product;
