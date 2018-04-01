import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Label,
  FormText,
  Button
} from 'reactstrap';

// Look at reduxForm sync validation for unique order number

const AddOrderPage = props => (
  <Container fluid>
    <Row>
      <h1>Add Order</h1>
    </Row>
    <Row>
      <Form onSubmit={() => console.log('submit form')} className="m-auto py-4">
        <FormGroup>
          <Label for="orderID" className="field-label">
            Order ID
          </Label>
          <Field
            id="orderID"
            type="text"
            component="input"
            placeholder="ex. A70T4Y88"
            className="form-control"
          />
          <FormText>
            A unique 8 digit alphanumeric value given to each customer
          </FormText>
        </FormGroup>
        <Row className="mt-5">
          <legend>Customer Name</legend>
          <Col>
            <FormGroup>
              <Label for="firstName" className="field-label">
                First Name
              </Label>
              <Field
                id="firstName"
                type="text"
                component="input"
                placeholder="Ada"
                className="form-control"
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
                type="text"
                component="input"
                placeholder="Smith"
                className="form-control"
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
            name="favoriteColor"
            component="select"
            className="form-control"
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
        <Button outline color="primary">
          Create
        </Button>
      </Form>
    </Row>
  </Container>
);

export default reduxForm({ form: 'addOrder' })(AddOrderPage);
