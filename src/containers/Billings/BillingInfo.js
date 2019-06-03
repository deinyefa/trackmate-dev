import React, { Component, Fragment } from "react";
import {
	Row,
	Col,
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
} from "reactstrap";
import { MdCardMembership, MdWarning, MdLoop, MdPayment } from "react-icons/md";

import { withFirebase } from "../../components/Firebase";

class BillingInfo extends Component {
	render() {
		return (
			<Fragment>
				<Row>
					<Col md="7">
						<h2>Billing information</h2>
					</Col>
					<Col
						md="5"
						style={{ alignSelf: "center", textAlign: "right" }}>
						<Button color="primary" className="mx-2">
							View invoices
						</Button>
						<Button color="secondary" outline className="mx-2">
							Change plan
						</Button>
					</Col>
				</Row>
				<Row className="mt-4">
					<Col>
						<Card className="card-stats">
							<CardHeader
								data-background-color="green"
								className="card-header-icon">
								<div className="card-icon">
									<i className="material-icons">
										<MdCardMembership />
									</i>
								</div>
								Free trial
							</CardHeader>
							<CardBody className="card-content">
								<h2 className="card-title h1">
									<small>₦</small>
									<span>0</span>
									<small>/mo</small>
								</h2>
							</CardBody>
							<CardFooter>
								<div className="stats">
									<i className="material-icons text-danger">
										<MdWarning />
									</i>
									<small>Your free trial ends in 7 days</small>
								</div>
							</CardFooter>
						</Card>
					</Col>
					<Col>
						<Card className="card-stats">
							<CardHeader
								data-background-color="orange"
								className="card-header-icon">
								<div className="card-icon">
									<i className="material-icons">
										<MdLoop />
									</i>
								</div>
								Billing cycle
							</CardHeader>
							<CardBody>
								<p>
									<strong>Created on: </strong> May 30th 2018
								</p>
								<p>
									<strong>Next cycle: </strong>
									in 2 days
								</p>
							</CardBody>
						</Card>
					</Col>
					<Col>
						<Card className="card-stats">
							<CardHeader
								data-background-color="blue"
								className="card-header-icon">
								<div className="card-icon">
									<i className="material-icons">
										<MdPayment />
									</i>
								</div>
								Plan details
							</CardHeader>
							<CardBody className="card-content">
								<p className="h3">14</p>
								<span>total orders</span>
								<p>
									pie chart of used orders / total available
									orders...
								</p>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Fragment>
		);
	}
}

export default withFirebase(BillingInfo);
