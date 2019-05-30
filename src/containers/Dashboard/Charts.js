import React, { Component } from "react";
import moment from "moment";

class Charts extends Component {
	getOrderStatusHandler = (initialArr = [], monthsArr = [], status = "") =>
		monthsArr.map(
			month =>
				initialArr.filter(
					el => el.orderStatus === status && el.updatedOn === month
				).length
		);

	constructChartData() {
		const { merchantCustomers } = this.props;

		let updatedMerchantCustomers = merchantCustomers.map(customer => {
			return { ...customer.data };
		});

		for (let c in updatedMerchantCustomers) {
			updatedMerchantCustomers[c].updatedOn = moment(
				updatedMerchantCustomers[c].updatedOn.toDate()
			).format("MMM YYYY");
		}
		// console.log(updatedMerchantCustomers);

		let months = [];
		for (let i = 0; i <= 12; i++) {
			months.push(
				moment()
					.subtract(i, "month")
					.format("MMM YYYY")
			);
		}

		let recievedArr = this.getOrderStatusHandler(
			updatedMerchantCustomers,
			months,
			"recieved"
		);
		let processedArr = this.getOrderStatusHandler(
			updatedMerchantCustomers,
			months,
			"processed"
		);
		let productionArr = this.getOrderStatusHandler(
			updatedMerchantCustomers,
			months,
			"production"
		);
		let shippingArr = this.getOrderStatusHandler(
			updatedMerchantCustomers,
			months,
			"shipping"
		);
		let outForDeliveryArr = this.getOrderStatusHandler(
			updatedMerchantCustomers,
			months,
			"outForDelivery"
		);
		let deliveredArr = this.getOrderStatusHandler(
			updatedMerchantCustomers,
			months,
			"delivered"
		);
		// console.log(months);
		// console.log(recievedArr);
	}

	render() {
		this.constructChartData();
		return <h2>Charts</h2>;
	}
}

export default Charts;
