import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

function NurserySignUp() {
	return (
		<div>
			<Row>
				<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
					<h1 className="text-center p-3">Sign up as Nursery</h1>
					<Form>
						<Form.Group controlId="name">
							<Form.Label>Name*</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nursery Name"
								required
							/>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>Email*</Form.Label>
							<Form.Control
								type="email"
								placeholder="e.g. nursery@mail.com"
								required
							/>
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>Password*</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								required
								minLength={5}
							/>
						</Form.Group>

						<Form.Group controlId="location">
							<Form.Label>Location*</Form.Label>
							<Form.Control
								type="location"
								placeholder="Street, City, Province"
								required
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</div>
	);
}

export default NurserySignUp;
