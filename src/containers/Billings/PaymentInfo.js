import React, { Component, Fragment } from "react";
import { Row, Col, Button, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

class PaymentInfo extends Component {
	render() {
		return (
			<Fragment>
				<Row>
					<Col md="7">
						<h2>Payment information</h2>
					</Col>
					<Col
						md="5"
						style={{ alignSelf: "center", textAlign: "right" }}>
						<Button color="primary" className="mx-2">
							Change card
						</Button>
						<Link
							to={ROUTES.SETTINGS}
							className="btn btn-outline-secondary mx-2">
							Change billing address
						</Link>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col>
						<Card>
							<CardHeader data-background-color="green">
								<h4 className="mb-0">Current credit card</h4>
							</CardHeader>
							<CardBody>No card found</CardBody>
						</Card>
					</Col>
					<Col>
						<Card>
							<CardHeader data-background-color="blue">
								<h4 className="mb-0">Billing address</h4>
							</CardHeader>
							<CardBody>
								<Link to={ROUTES.SETTINGS}>
									Click here to add
								</Link>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Fragment>
		);
	}
}

export default PaymentInfo;
