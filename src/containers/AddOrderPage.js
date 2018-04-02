import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  FormFeedback,
  Label,
  FormText,
  Button,
  Alert
} from 'reactstrap';
import { firebase } from '../firebase';
import moment from 'moment';

import { inputAnOrder, addAnOrder } from '../actions';

// Look at reduxForm sync validation for unique order number

class AddOrderPage extends Component {
  onSubmit = event => {
    const {
      addAnOrder,
      orderID,
      firstName,
      lastName,
      orderStatus
    } = this.props;
    addAnOrder(orderID, lastName, firstName, orderStatus);
    event.preventDefault();
  };

  render() {
    const {
      inputAnOrder,
      lastName,
      firstName,
      orderID,
      orderStatus,
      orderAdded,
      orderError
    } = this.props;

    const isInvalid =
      orderID === '' ||
      orderID.length < 8 ||
      lastName === '' ||
      firstName === '' ||
      orderStatus === '';

    return (
      <Container fluid>
        <Row>
          <h1>Add Order</h1>
          {orderError ? <Alert color="danger">{orderError}</Alert> : ''}
          {orderAdded ? <Alert color="success">{orderAdded}</Alert> : ''}
        </Row>
        <Row>
          <Form onSubmit={this.onSubmit} className="m-auto py-4">
            <FormGroup>
              <Label for="orderID" className="field-label">
                Order ID
              </Label>
              <Field
                id="orderID"
                type="text"
                name="orderID"
                component="input"
                placeholder="ex. A70T4Y88"
                className={
                  orderError ? 'form-control is-invalid' : 'form-control'
                }
                onChange={event =>
                  inputAnOrder({ prop: 'orderID', value: event.target.value })
                }
                value={orderID}
              />
              {orderError ? (
                <FormFeedback>
                  Whoops! That Order ID is already in use.
                </FormFeedback>
              ) : (
                ''
              )}
              <FormText>
                A unique alphanumeric value given to each customer. At least 8
                characters long.
              </FormText>
            </FormGroup>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="firstName" className="field-label">
                    First Name
                  </Label>
                  <Field
                    id="firstName"
                    name="firstName"
                    type="text"
                    component="input"
                    placeholder="Ada"
                    className="form-control"
                    onChange={event =>
                      inputAnOrder({
                        prop: 'firstName',
                        value: event.target.value
                      })
                    }
                    value={firstName}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="lastName" className="field-label">
                    Last Name
                  </Label>
                  <Field
                    id="lastName"
                    name="lastName"
                    type="text"
                    component="input"
                    placeholder="Smith"
                    className="form-control"
                    onChange={event =>
                      inputAnOrder({
                        prop: 'lastName',
                        value: event.target.value
                      })
                    }
                    value={lastName}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="orderStatus" className="field-label">
                Production Status
              </Label>
              <Field
                id="orderStatus"
                name="orderStatus"
                component="select"
                className="form-control"
                onChange={event =>
                  inputAnOrder({
                    prop: 'orderStatus',
                    value: event.target.value
                  })
                }
                value={orderStatus}
              >
                <option value="">-- Select --</option>
                <option value="recieved">Order Recieved</option>
                <option value="processed">Order Processed</option>
                <option value="production">Production</option>
                <option value="shipping">Scheduled for Shipping</option>
                <option value="outForDelivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
              </Field>
            </FormGroup>
            <Button outline color="primary" disabled={isInvalid} type="submit">
              Create
            </Button>
          </Form>
        </Row>
        <Row>
          <Col>
            <p>Trackmate Notification URL</p>

            {lastName === undefined ? (
              <p>http://trackmate.com/</p>
            ) : (
              <p>
                http://trackmate.com/{lastName}/{orderID}
              </p>
            )}
          </Col>
        </Row>

        <Row>
          <Button
            onClick={() =>
              firebase.db
                .collection('customers')
                .add({ companyName: 'Sample Company' })
                .then(() =>
                  console.log(`updated on ${moment().format('MMM D, YYYY')}`)
                )
                .catch(error => console.log('Error add document: ', error))
            }
          >
            Add Sample Company
          </Button>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const {
    orderID,
    lastName,
    firstName,
    orderStatus,
    orderError,
    orderAdded
  } = state.merchant;
  return {
    orderID,
    lastName,
    firstName,
    orderStatus,
    orderError,
    orderAdded
  };
};

AddOrderPage = connect(mapStateToProps, { inputAnOrder, addAnOrder })(
  AddOrderPage
);
export default reduxForm({ form: 'addOrder' })(AddOrderPage);
