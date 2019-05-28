import React from "react";
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from "reactstrap";
import { Link } from "react-router-dom";
import {
	MdPriorityHigh,
	MdWarning,
	MdReceipt,
	MdLocalOffer,
	MdDoneAll,
	MdQueue,
} from "react-icons/md";

import * as ROUTES from "../../constants/routes";

const Stats = props => {
	return (
		<Row className="stats">
			<Col md={4}>
				<Card className="card card-stats">
					<CardHeader
						data-background-color="orange"
						className="card-header-icon">
						<div className="card-icon">
							<i className="material-icons">
								<MdPriorityHigh />
							</i>
						</div>
					</CardHeader>
					<CardBody className="card-content">
						<p className="card-category category">Open Orders</p>
						<h3 className="title mt-3">2</h3>
					</CardBody>
					<CardFooter>
						<div className="stats">
							<i className="material-icons text-danger">
								<MdWarning />
							</i>
							<Link to={ROUTES.ORDERS}>View orders</Link>
						</div>
					</CardFooter>
				</Card>
			</Col>
			<Col md={4}>
				<Card className="card card-stats">
					<CardHeader data-background-color="purple">
						<i className="material-icons">
							<MdReceipt />
						</i>
					</CardHeader>
					<CardBody className="card-content">
						<p className="category">Total Orders</p>
						<h3 className="title">{props.totalOrders}</h3>
					</CardBody>
					<CardFooter>
						<div className="stats">
							<i className="material-icons">
								<MdLocalOffer />
							</i>
							Tracked from the cloud
						</div>
					</CardFooter>
				</Card>
			</Col>
			<Col md={4}>
				<Card className="card card-stats">
					<CardHeader data-background-color="green">
						<i className="material-icons">
							<MdDoneAll />
						</i>
					</CardHeader>
					<CardBody className="card-content">
						<p className="category">Closed Orders</p>
						<h3 className="title mt-3">7</h3>
					</CardBody>
					<CardFooter>
						<div className="stats">
							<Link to={ROUTES.ADD_ORDER}>
								<i className="material-icons">
									<MdQueue />
								</i>
								Add more
							</Link>
						</div>
					</CardFooter>
				</Card>
			</Col>
		</Row>
	);
};

export default Stats;
