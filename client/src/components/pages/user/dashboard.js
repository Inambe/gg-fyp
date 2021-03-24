import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function UserDashboard() {
	return (
		<div>
			<h1 className="text-center">User Dashboard.</h1>
			<ListGroup className="py-4">{/* Coming Soon */}</ListGroup>
			<div className="text-center mt-4">
				<Link to="/user/sign-out">Logout</Link>
			</div>
		</div>
	);
}

export default UserDashboard;
