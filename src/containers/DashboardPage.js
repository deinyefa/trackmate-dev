import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Table } from 'reactstrap';

import { getCurrentUser, updateOrderStatus } from '../actions/MerchantActions';

class DashboardPage extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { merchantCustomers, merchantInfo, updateOrderStatus } = this.props;
    return (
      <Container fluid className="table-container">
        <Row>
          <h1>Welcome, {merchantInfo.companyName}</h1>
        </Row>
        <Row>
          <ul className="orders-list">
            <li>Open Orders: 2</li>
            <li>Closed Orders: 7</li>
          </ul>
        </Row>
        <Row>
          <Table striped>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Order Status</th>
                <th>Updated on</th>
              </tr>
            </thead>
            <tbody>
              {merchantCustomers.map(customer => (
                <tr key={customer.id}>
                  <th scope="row">{customer.id}</th>
                  <td>{customer.data.firstName}</td>
                  <td>{customer.data.lastName}</td>
                  <td>
                    <select
                      type="select"
                      className="custom-select"
                      value={customer.data.orderStatus}
                      onChange={event =>
                        updateOrderStatus(customer.id, event.target.value)
                      }
                    >
                      <option value="recieved">Order Recieved</option>
                      <option value="processed">Order Processed</option>
                      <option value="production">Production</option>
                      <option value="shipping">Scheduled for Shipping</option>
                      <option value="outForDelivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td>{customer.data.updatedOn}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    merchantInfo: state.merchant.merchantInfo,
    merchantCustomers: state.merchant.merchantCustomers
  };
};

export default connect(mapStateToProps, { getCurrentUser, updateOrderStatus })(
  DashboardPage
);
