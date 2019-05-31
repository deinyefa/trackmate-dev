import React, { Component } from "react";
import { Row, Card, CardBody, CardFooter, CardHeader, Col } from "reactstrap";
import moment from "moment";
import Chart from "react-apexcharts";
import { MdPoll } from "react-icons/md";

class Charts extends Component {
	componentDidUpdate = () => {
		this.constructChartData();
	};

	getOrderStatusHandler = (initialArr = [], monthsArr = [], status = "") =>
		monthsArr.map(
			month =>
				initialArr.filter(
					el => el.orderStatus === status && el.updatedOn === month
				).length
		);

	constructChartData = () => {
		const { merchantCustomers } = this.props;

		let updatedMerchantCustomers = merchantCustomers.map(customer => {
			return { ...customer.data };
		});

		for (let c in updatedMerchantCustomers) {
			updatedMerchantCustomers[c].updatedOn = moment(
				updatedMerchantCustomers[c].updatedOn.toDate()
			).format("MMM YYYY");
		}

		let months = [];
		for (let i = 0; i <= 12; i++) {
			months.push(
				moment()
					.subtract(i, "month")
					.format("MMM YYYY")
			);
		}

		let lineOptions = {
			chart: {
				id: "status-lines",
				animations: {
					enabled: true,
					easing: "bounce", // linear, easeout, easein, easeinout, swing, bounce, elastic
					speed: 800,
					animateGradually: {
						delay: 150,
						enabled: true,
					},
				},
				// fillSeriesColor: true,
				fontFamily: "Open Sans, Arial, sans-serif",
				// stroke: {
				// 	show: true,
				// 	curve: "smooth", // "smooth" / "straight" / "stepline"
				// 	lineCap: "round", // round, butt , square
				// 	width: 1,
				// 	dashArray: 0, // single value or array of values
				// },
			},
			xaxis: {
				categories: months,
			},
		};

		let donutSeries = [
			this.getOrderStatusHandler(
				updatedMerchantCustomers,
				months,
				"recieved"
			).reduce((sum, el) => {
				return sum + el;
			}, 0),
			this.getOrderStatusHandler(
				updatedMerchantCustomers,
				months,
				"processed"
			).reduce((sum, el) => {
				return sum + el;
			}, 0),
			this.getOrderStatusHandler(
				updatedMerchantCustomers,
				months,
				"production"
			).reduce((sum, el) => {
				return sum + el;
			}, 0),
			this.getOrderStatusHandler(
				updatedMerchantCustomers,
				months,
				"shipping"
			).reduce((sum, el) => {
				return sum + el;
			}, 0),
			this.getOrderStatusHandler(
				updatedMerchantCustomers,
				months,
				"outForDelivery"
			).reduce((sum, el) => {
				return sum + el;
			}, 0),
			this.getOrderStatusHandler(
				updatedMerchantCustomers,
				months,
				"delivered"
			).reduce((sum, el) => {
				return sum + el;
			}, 0),
		];

		let lineSeries = [
			{
				name: "Recieved",
				data: this.getOrderStatusHandler(
					updatedMerchantCustomers,
					months,
					"recieved"
				),
			},
			{
				name: "Processed",
				data: this.getOrderStatusHandler(
					updatedMerchantCustomers,
					months,
					"processed"
				),
			},
			{
				name: "Production",
				data: this.getOrderStatusHandler(
					updatedMerchantCustomers,
					months,
					"production"
				),
			},
			{
				name: "Shipping",
				data: this.getOrderStatusHandler(
					updatedMerchantCustomers,
					months,
					"shipping"
				),
			},
			{
				name: "Out For Delivery",
				data: this.getOrderStatusHandler(
					updatedMerchantCustomers,
					months,
					"outForDelivery"
				),
			},
			{
				name: "Delivered",
				data: this.getOrderStatusHandler(
					updatedMerchantCustomers,
					months,
					"delivered"
				),
			},
		];

		let donutLabels = [
			"Recieved",
			"Processed",
			"Production",
			"Shipping",
			"Out For Delivery",
			"Delivered",
		];

		let donutOptions = {
			labels: donutLabels,
			chart: {
				animations: {
					enabled: true,
					easing: "bounce", // linear, easeout, easein, easeinout, swing, bounce, elastic
					speed: 800,
					animateGradually: {
						delay: 150,
						enabled: true,
					},
				},
			},
			plotOptions: {
				pie: {
					donut: {
						size: "60%",
						labels: {
							show: true,
						},
						total: {
							show: true,
						},
					},
				},
			},
			height: 200,
		};
		return [lineOptions, lineSeries, donutSeries, donutOptions];
	};

	render() {
    let chartData = this.constructChartData();
    
    let lineSeries = "Order trends will show up here as time goes on.";
    if (chartData[1].length >= 100) {
      lineSeries = <Chart
      options={chartData[0]}
      series={chartData[1]}
      type="line"
      // width="500"
    />
    }

		return (
			<Row>
				<Col md="12" lg="12">
					<Card>
						<CardHeader
							className="card-chart chart line-graph"
							data-background-color="green">
							<h3 className="title">Order Trends</h3>
							<p className="category">
								All your orders in the last year
							</p>
						</CardHeader>
						<CardBody className="card-content">
							{lineSeries}
						</CardBody>
						<CardFooter>
							<div className="stats">
								<i className="material-icons">
									<MdPoll />
								</i>
								updated just now
							</div>
						</CardFooter>
					</Card>
				</Col>
				<Col md="12" lg="6">
					<Card>
						<CardHeader
							className="card-chart chart line-graph"
							data-background-color="green">
							<h3 className="title">Order Status</h3>
							<p className="category">
								All your orders current orders
							</p>
						</CardHeader>
						<CardBody className="card-content">
							<Chart
								options={chartData[3]}
								series={chartData[2]}
								type="donut"
							/>
						</CardBody>
						<CardFooter>
							<div className="stats">
								<i className="material-icons">
									<MdPoll />
								</i>
								updated just now
							</div>
						</CardFooter>
					</Card>
				</Col>
			</Row>
		);
	}
}

export default Charts;
