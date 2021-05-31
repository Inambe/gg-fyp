import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import GGClient from "../../../api/GGClient";
import { authState } from "../../../atoms/auth";
import Loading from "../../loading";

function NurseryDashboard() {
	const { sub: nurseryId } = useRecoilValue(authState);
	const [nursery, setNursery] = useState();

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get(
				"/display/nursery/" + nurseryId
			);
			setNursery(data.data);
		})();
	}, [nurseryId]);

	if (!nursery) return <Loading />;

	return (
		<div>
			<h2 className="text-center">{nursery.name}'s Dashboard</h2>
			<ListGroup className="py-4">
				<ListGroup.Item>
					<Link to="/nursery/chat">Messages</Link>
				</ListGroup.Item>
				<ListGroup.Item>
					<Link to="/nursery/products">Manage Products</Link>
				</ListGroup.Item>
				<ListGroup.Item>
					<Link to="/nursery/profile">Update Profile</Link>
				</ListGroup.Item>
			</ListGroup>
			<div className="text-center mt-4">
				<Link to="/nursery/sign-out">Logout</Link>
			</div>
		</div>
	);
}

export default NurseryDashboard;
