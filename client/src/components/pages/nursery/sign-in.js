import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { Translate } from "react-i18nify";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import GGClient from "../../../api/GGClient";
import { authToken } from "../../../atoms/auth";

function NurserySignIn() {
	const [feedback, setFeedback] = useState();
	const history = useHistory();
	const setAuthToken = useSetRecoilState(authToken);

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
				setAuthToken(token);
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
		[history, setAuthToken]
	);
	return (
		<div>
			<Row>
				<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
					<h1 className="text-center p-3">
						<Translate value="signInAsNursery" />
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
					<Form method="POST" onSubmit={signIn}>
						<Form.Group controlId="username">
							<Form.Label>Username*</Form.Label>
							<Form.Control
								placeholder="Phone/Email"
								required
								name="username"
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
							<Translate value="submit" />
						</Button>
					</Form>
				</Col>
			</Row>
		</div>
	);
}

export default NurserySignIn;
