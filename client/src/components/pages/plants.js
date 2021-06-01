import React, { useEffect, useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import GGClient from "../../api/GGClient";
import Loading from "../loading";
import ProductCard from "../productCard";

function Plants() {
	const [products, setProducts] = useState();
	const [paging, setPaging] = useState({});
	const location = useLocation();

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get(
				"/products/list" + location.search
			);
			if (data.success) {
				setProducts(data.data);
				setPaging({
					next: data.next,
					prev: data.prev,
				});
			}
		})();
	}, [location]);

	return (
		<div>
			<h1 className="display-5 mb-3">Products</h1>
			<Row className="mb-3">
				{products ? (
					products.length > 0 ? (
						products.map((product, i) => (
							<ProductCard key={i} product={product} />
						))
					) : (
						<Col>
							<p className="text-center">No product was found.</p>
						</Col>
					)
				) : (
					<Loading />
				)}
			</Row>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Pagination>
					<Pagination.Prev
						href={getPageHref(paging.prev)}
						disabled={!paging.prev}
					/>
					<Pagination.Next
						href={getPageHref(paging.next)}
						disabled={!paging.next}
					/>
				</Pagination>
			</div>
		</div>
	);
}

const getPageHref = (num) => {
	if (!num) return "#";

	let href = window.location.href;
	href = href.replace(/page=[0-9]/, "page=" + num);

	if (href.includes("page=")) return href;

	return href + "?page=" + num;
};

export default Plants;
