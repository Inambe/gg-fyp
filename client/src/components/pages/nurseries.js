import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Translate } from "react-i18nify";
import GGClient from "../../api/GGClient";
import Loading from "../loading";
import NurseryCard from "../nurseryCard";

function Nurseries() {
	const [nurseries, setNurseries] = useState();

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get("/nursery/list");
			if (data.success) {
				setNurseries(data.data);
			}
		})();
	}, []);

	return (
		<div>
			<h1 className="display-5 mb-3">
				<Translate value="nurseries" />
			</h1>
			<Row className="mb-3">
				{nurseries ? (
					nurseries.length > 0 ? (
						nurseries.map((nursery, i) => (
							<NurseryCard key={i} nursery={nursery} />
						))
					) : (
						<Col>
							<p className="text-center">
								<Translate value="noNurseries" />
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

export default Nurseries;
