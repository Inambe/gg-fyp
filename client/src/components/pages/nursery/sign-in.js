import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import GGClient from "../../../api/GGClient";
import authState from "../../../atoms/auth";

function NurserySignIn() {
	const [feedback, setFeedback] = useState();
	const history = useHistory();
	const setToken = useSetRecoilState(authState);

	const signIn = useCallback(
		async (e) => {
			e.preventDefault();
			const $form = e.target;
			let formData = {};
			new FormData($form).forEach((val, key) => (formData[key] = val));

			const { data } = await GGClient.post(
				"/nursery/auth/sign-in",
				formData
			);
			if (data.success) {
				const token = data.data;
				setToken(token);
				localStorage.setItem("authToken", token);
				history.push("/nursery/dashboard");
			} else {
				setFeedback({
					type: "err",
					message: data.message,
				});
			}
			$form.reset();
		},
		[history, setToken]
	);
	return (
		<div>
			<Row>
				<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
					<h1 className="text-center p-3">Sign in as Nursery</h1>
					{feedback && (
						<Alert
							variant={
								feedback.type === "err" ? "danger" : "info"
							}
						>
							{feedback.message}
						</Alert>
					)}
					<Form method="POST" onSubmit={signIn}>
						<Form.Group controlId="email">
							<Form.Label>Email*</Form.Label>
							<Form.Control
								type="email"
								placeholder="e.g. ahmed@mail.com"
								required
								name="email"
							/>
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>Password*</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								required
								minLength={5}
								name="password"
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

export default NurserySignIn;
