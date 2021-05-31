import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import GGClient from "../../../api/GGClient";
import { authState } from "../../../atoms/auth";
import Loading from "../../loading";

function UserDashboard() {
	const { sub: userId } = useRecoilValue(authState);
	const [user, setUser] = useState();

	useEffect(() => {
		(async () => {
			const { data } = await GGClient.get("/display/user/" + userId);
			setUser(data.data);
		})();
	}, [userId]);

	if (!user) return <Loading />;

	return (
		<div>
			<h2 className="text-center">{user.name}'s Dashboard</h2>
			<ListGroup className="py-4">
				<ListGroup.Item>
					<Link to="/user/chat">Messages</Link>
				</ListGroup.Item>
			</ListGroup>
			<div className="text-center mt-4">
				<Link to="/user/sign-out">Logout</Link>
			</div>
		</div>
	);
}

export default UserDashboard;
