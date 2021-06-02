import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Translate } from "react-i18nify";
import { GoLocation } from "react-icons/go";
import { Link } from "react-router-dom";

function NurseryCard({ nursery }) {
	return (
		<Col md={4} className="mb-3">
			<Card>
				<Card.Body>
					<Card.Title>{nursery.name}</Card.Title>
					<Card.Text>
						<small>
							<GoLocation /> {nursery.location}
						</small>
					</Card.Text>
					<div>
						<Button
							size="sm"
							as={Link}
							to={`/nurseries/${nursery._id}`}
							variant="primary"
						>
							<Translate value="readMore" />
						</Button>
					</div>
				</Card.Body>
			</Card>
		</Col>
	);
}

export default NurseryCard;
