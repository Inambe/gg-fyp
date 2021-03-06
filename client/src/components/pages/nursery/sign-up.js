import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Translate } from "react-i18nify";
import { useHistory } from "react-router-dom";
import GGClient from "../../../api/GGClient";

function NurserySignUp() {
	const [feedback, setFeedback] = useState();
	const history = useHistory();

	const signUp = useCallback(
		async (e) => {
			e.preventDefault();
			const $form = e.target;
			let formData = {};
			new FormData($form).forEach((val, key) => (formData[key] = val));

			const { data } = await GGClient.post(
				"/nursery/auth/sign-up",
				formData
			);
			if (data.success) {
				setFeedback({
					type: "msg",
					message: data.message,
				});
				setTimeout(() => {
					history.push("/nursery/sign-in");
				}, 2000);
			} else {
				setFeedback({
					type: "err",
					message: data.message,
				});
			}
			$form.reset();
		},
		[history]
	);

	return (
		<div>
			<Row>
				<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
					<h1 className="text-center p-3">
						<Translate value="signUpAsNursery" />
					</h1>
					{feedback && (
						<Alert
							variant={
								feedback.type === "err" ? "danger" : "info"
							}
						>
							{feedback.message}
						</Alert>
					)}

					<Form action="POST" onSubmit={signUp}>
						<Form.Group controlId="name">
							<Form.Label>
								<Translate value="name" />
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nursery Name"
								required
								name="name"
							/>
						</Form.Group>

						<Form.Group controlId="email">
							<Form.Label>
								<Translate value="email" />
							</Form.Label>
							<Form.Control
								type="email"
								placeholder="e.g. nursery@mail.com"
								name="email"
							/>
						</Form.Group>

						<Form.Group controlId="phone">
							<Form.Label>
								<Translate value="phone" />
							</Form.Label>
							<Form.Control
								placeholder="e.g. +92 330 4534234"
								name="phone"
							/>
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>
								<Translate value="password" />
							</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								required
								minLength={5}
								name="password"
							/>
						</Form.Group>

						<Form.Group controlId="location">
							<Form.Label>
								<Translate value="address" />
							</Form.Label>
							<Form.Control
								type="location"
								placeholder="Street, City, Province"
								required
								name="location"
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							<Translate value="submit" />
						</Button>
					</Form>
				</Col>
			</Row>
		</div>
	);
}

export default NurserySignUp;
