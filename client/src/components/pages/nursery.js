import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Translate } from "react-i18nify";
import { useParams } from "react-router";
import GGClient from "../../api/GGClient";
import ChatButton from "../chatButton";
import Loading from "../loading";
import ProductCard from "../productCard";

function Nursery() {
	const [products, setProducts] = useState();
	const [nursery, setNursery] = useState();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			const result = await Promise.all([
				await GGClient.get(`/products/list/${id}`),
				await GGClient.get(`/display/nursery/${id}`),
			]);
			const _products = result[0].data.data;
			const _nursery = result[1].data.data;
			setProducts(_products);
			setNursery(_nursery);
		})();
	}, [id]);

	if (!products || !nursery) return <Loading />;

	return (
		<div>
			<div class="mb-5">
				<Row>
					<Col>
						<h1 className="display-5 mb-0">{nursery.name}</h1>
						<h4>{nursery.location}</h4>
						<ChatButton nurseryId={nursery._id} />
					</Col>
					<Col>
						<Table bordered className="mb-3 bg-light">
							<tbody>
								{nursery.email && (
									<tr>
										<th>
											<Translate value="email" />
										</th>
										<td>{nursery.email}</td>
									</tr>
								)}
								{nursery.phone && (
									<tr>
										<th>
											<Translate value="phone" />
										</th>
										<td>{nursery.phone}</td>
									</tr>
								)}
							</tbody>
						</Table>
					</Col>
				</Row>
			</div>
			<h2>
				<Translate value="products" />
			</h2>
			<Row className="mb-3">
				{products ? (
					products.length > 0 ? (
						products.map((product, i) => (
							<ProductCard key={i} product={product} noSeller />
						))
					) : (
						<Col>
							<p className="text-center">
								<Translate value="noProducts" />
							</p>
						</Col>
					)
				) : (
					<Loading />
				)}
			</Row>
		</div>
	);
}

export default Nursery;
