import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Table, Button, Input } from 'reactstrap';

import { firebase } from '../firebase';
import withAuthorization from './withAuthorization';
import { getCurrentUser } from '../actions/MerchantActions';

class DashboardPage extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <Container>
        <Row>
          <h1>Welcome, {this.props.merchantInfo.companyName}</h1>
        </Row>
        <Row>
          <ul className="orders-list">
            <li>Open Orders: 2</li>
            <li>Closed Orders: 7</li>
          </ul>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Order Status</th>
                <th>Updated on</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>
                  <Input type="select">
                    <option>Order Recieved</option>
                    <option>Order Processed</option>
                    <option>Production</option>
                    <option>Scheduled for shipping</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                  </Input>
                </td>
                <td>March 3, 2018</td>
                <td>
                  <Button color="primary">Save</Button>
                  <Button color="danger">Delete</Button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Out for delivery</td>
                <td>Febrary 21, 2018</td>
                <td>
                  <Button color="primary">Save</Button>
                  <Button color="danger">Delete</Button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>Order Recieved</td>
                <td>January 4, 2018</td>
                <td>
                  <Button color="primary">Save</Button>
                  <Button color="danger">Delete</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    merchantInfo: state.merchant.merchantInfo
  };
};

export default connect(mapStateToProps, { getCurrentUser })(DashboardPage);
