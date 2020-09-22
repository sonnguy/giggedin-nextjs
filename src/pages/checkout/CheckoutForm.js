import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';
import './style.scss';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import { PaymentInputsContainer } from 'react-payment-inputs';
import api from '../../api';
import { connect } from 'react-redux';
import { countries } from '../../data/countries';
import { clapUser, clapGuest } from '../../api/checkoutApi';
import { toast } from 'react-toastify';

import Router from 'next/router';
import { validateEmail } from '../../services/utilsService';
import { userCheck } from '../../api/userApi';

class CheckOutForm extends React.Component {
  state = {
    validated: false,
    shouldLogin: this.props.user ? 3 : 2,
    fields: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      postalcode: '',
      city: '',
      phoneNumber: '',
      cvc: '',
      expiryDate: '',
      focus: '',
      name: '',
      number: '',
      country: 'AU',
      state: '',
    },
  };

  componentDidMount() {
    // Mixpanel.pageView('View_Exp_CheckoutForm');
    // GA.pageView();
  }

  onStartPayment = async () => {
    const { fields } = this.state;
    const {
      firstName,
      lastName,
      email,
      address,
      company,
      postalcode,
      city,
      phoneNumber,
      cvc,
      expiryDate,
      country,
      focus,
      number,
      name,
      state,
    } = fields;
    const tierId = this.props.selectedTier[0].id;
    const exprixy = expiryDate.replace(/\s/g, '');
    const exprixyArr = exprixy.split('/');
    const params = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      address: address,
      company: company,
      postal_code: postalcode,
      city: city,
      phone: phoneNumber,
      name: name,
      exp_month: exprixyArr[0],
      exp_year: exprixyArr[1],
      cvc: cvc,
      number: number,
      tier: tierId,
      country: country,
      state: state,
    };
    const id = this.props.experience.id;
    if (this.props.user) {
      // api.defaults.headers.common[
      //   'Authorization'
      // ] = `Bearer ${this.props.token}`;
      const { email, first_name, last_name } = this.props.user;
      params.email = email;
      params.first_name = first_name;
      params.last_name = last_name;
    }

    try {
      const res = this.props.user
        ? await clapUser(id, params)
        : await clapGuest(id, params);
      const { data = {} } = res;
      if (data.success) {
        const path = `/confirmation/[id]`;
        Router.push({ pathname: path }, `/confirmation/${id}`);
      } else {
        toast.error(data.message, {
          containerId: 'Toast',
        });
      }
    } catch (error) {
      toast.error('Something went wrong please try again', {
        containerId: 'Toast',
      });
    }
  };
  componentWillReceiveProps(newProps) {
    if (newProps.user) {
      this.setState({
        shouldLogin: 3,
      });
    } else {
      this.setState({
        shouldLogin: 2,
      });
    }
  }

  handleInputFocus = (e) => {
    this.setState({ fields: { ...this.state.fields, focus: e.target.name } });
  };

  handleInputChange = (event) => {
    const fields = this.state.fields;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    fields[name] = value;
    this.setState({ fields });
    if (name == 'email' && validateEmail(value) && !this.props.user) {
      this.checkExistingEmail(value);
    }
  };
  checkExistingEmail = async (email) => {
    const res = await userCheck(email);
    const { data } = res;
    if (data.success) {
      this.setState({
        shouldLogin: data.existed ? 1 : 3,
      });
    }
  };

  handleSubmit = (event) => {
    //Mixpanel.track('Click_PaymentButton');
    const form = event.currentTarget;
    event.preventDefault();
    this.setState({ validated: true });
    if (form.checkValidity() === true) {
      this.onStartPayment();
    }
  };

  render() {
    const { user, selectedTier = [] } = this.props;
    const { shouldLogin } = this.state;
    const tier = selectedTier.length > 0 ? selectedTier[0] : {};
    return (
      <div className="mt-4 checkout-form">
        {shouldLogin == 1 && (
          <div className="flex justify-content-center align-items-center text-center">
            <p>{`Your email ${this.state.fields.email} is existing account.`}</p>
            <Button
              className="checkout-summary__item__check-out-btn my-2 default-btn btn-p15"
              size="md"
              variant="dark"
              onClick={this.props.goToLogin}
            >
              Login now
            </Button>
          </div>
        )}
        {shouldLogin >= 2 && (
          <Form
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
          >
            <Form.Row>
              <Col xs={12}>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="checkout-body__title mb-4">
                    {'Contact infomation'}
                  </h4>
                  {!user && (
                    <h5 className="already-have-account-text">
                      {'Already have an account?'}{' '}
                      <span
                        className="login-link"
                        onClick={this.props.goToLogin}
                      >
                        Log in
                      </span>
                    </h5>
                  )}
                </div>
                {user && user.credits > 0 && (
                  <div>
                    <span className="support-art-question">
                      {`You have ${user.credits} credits on `}
                      <a
                        target="_blank"
                        href={'https://www.giggedin.com/'}
                        className="support-art-email-us"
                      >
                        GiggedIn.com.{' '}
                      </a>
                      {' If you’d like to use them for this Experience, '}
                    </span>
                    <a
                      target="_blank"
                      href="mailto:contact@giggedin.com"
                      className="support-art-email-us"
                    >
                      {'email us here.'}
                    </a>
                  </div>
                )}
                {(!user || !user.email) && (
                  <Form.Group>
                    <Form.Control
                      size="lg"
                      name="Email"
                      value={this.state.fields.email}
                      onChange={this.handleInputChange}
                      required
                      name="email"
                      type="text"
                      placeholder="Email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {'Valid email is required.'}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
              </Col>
            </Form.Row>
            {shouldLogin == 3 && (
              <div>
                {!!tier.required_shipping
                  ? this.renderAddressSections(user)
                  : this.renderInfoSection(user)}
                <Form.Row className="mt-3">
                  <Col xs={12}>
                    <h4 className="checkout-body__title mb-4">{'Payment'}</h4>
                  </Col>
                  <Col xs={12}>
                    <Cards
                      cvc={this.state.fields.cvc}
                      expiry={this.state.fields.expiry}
                      focused={this.state.fields.focus}
                      name={this.state.fields.name}
                      number={this.state.fields.number}
                    />
                    <PaymentInputsContainer>
                      {({
                        meta,
                        getCardNumberProps,
                        getExpiryDateProps,
                        getCVCProps,
                      }) => (
                          <div className="mt-3">
                            <Form.Row>
                              <Form.Group as={Col} md="6">
                                <Form.Control
                                  size="lg"
                                  required
                                  type="text"
                                  placeholder="Name on card"
                                  name="name"
                                  onChange={this.handleInputChange}
                                  onFocus={this.handleInputFocus}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {'Name on card is required'}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group as={Col} md="6">
                                <Form.Control
                                  size="lg"
                                  min={16}
                                  max={21}
                                  {...getCardNumberProps({
                                    onChange: this.handleInputChange,
                                  })}
                                  required
                                  type="text"
                                  placeholder="0000 0000 0000 0000"
                                  name="number"
                                  onFocus={this.handleInputFocus}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {'Credit card number is required'}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Form.Row>
                            <Form.Row>
                              <Form.Group as={Col} md="3">
                                <Form.Control
                                  size="lg"
                                  required
                                  type="text"
                                  placeholder=""
                                  name="expiry"
                                  {...getExpiryDateProps({
                                    onChange: this.handleInputChange,
                                  })}
                                  onFocus={this.handleInputFocus}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {'Expiration date is required'}
                                </Form.Control.Feedback>
                              </Form.Group>
                              <Form.Group as={Col} md="3">
                                <Form.Control
                                  min={16}
                                  max={21}
                                  size="lg"
                                  required
                                  type="text"
                                  placeholder=""
                                  name="cvc"
                                  {...getCVCProps({
                                    onChange: this.handleInputChange,
                                  })}
                                  onFocus={this.handleInputFocus}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {'Security code is required'}
                                </Form.Control.Feedback>
                              </Form.Group>
                            </Form.Row>
                          </div>
                        )}
                    </PaymentInputsContainer>
                  </Col>
                  <Col xs={12} className="mb-4 mb-md-0">
                    <Button
                      type="submit"
                      className="checkout-summary__item__check-out-btn w-100 my-2 default-btn btn-p15"
                      size="lg"
                      variant="dark"
                    >
                      PAYMENT
                    </Button>
                  </Col>
                </Form.Row>
              </div>
            )}
          </Form>
        )}
      </div>
    );
  }
  renderInfoSection = (user) => {
    return (
      <Form.Row className="mt-3">
        {!user && (
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Control
                size="lg"
                name="firstName"
                value={this.state.fields.firstName}
                onChange={this.handleInputChange}
                required
                type="text"
                placeholder="First name"
              />
              <Form.Control.Feedback type="invalid">
                {'Valid first name is required.'}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        )}
        {!user && (
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Control
                size="lg"
                name="lastName"
                value={this.state.fields.lastName}
                onChange={this.handleInputChange}
                required
                type="text"
                placeholder="Last name"
              />
              <Form.Control.Feedback type="invalid">
                {'Valid last name is required.'}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        )}
        <Col xs={12} sm={6}>
          <Form.Group>
            <Form.Control
              as="select"
              placeholder="Country"
              size="lg"
              name="country"
              onChange={this.handleInputChange}
              value={this.state.country}
            >
              {countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group>
            <Form.Control
              size="lg"
              name="phoneNumber"
              value={this.state.fields.phoneNumber}
              onChange={this.handleInputChange}
              type="text"
              placeholder="Phone"
            />
          </Form.Group>
        </Col>
      </Form.Row>
    );
  };
  renderAddressSections = (user) => {
    return (
      <Form.Row className="mt-3">
        <Col xs={12}>
          <h4 className="checkout-body__title mb-4">{'Shipping Address'}</h4>
        </Col>
        {!user && (
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Control
                size="lg"
                name="firstName"
                value={this.state.fields.firstName}
                onChange={this.handleInputChange}
                required
                type="text"
                placeholder="First name"
              />
              <Form.Control.Feedback type="invalid">
                {'Valid first name is required.'}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        )}
        {!user && (
          <Col xs={12} sm={6}>
            <Form.Group>
              <Form.Control
                size="lg"
                name="lastName"
                value={this.state.fields.lastName}
                onChange={this.handleInputChange}
                required
                type="text"
                placeholder="Last name"
              />
              <Form.Control.Feedback type="invalid">
                {'Valid last name is required.'}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        )}
        <Col xs={12}>
          <Form.Group>
            <Form.Control
              size="lg"
              name="address"
              value={this.state.fields.address}
              onChange={this.handleInputChange}
              required
              type="text"
              placeholder="Address"
            />
            <Form.Control.Feedback type="invalid">
              {'Valid address is required.'}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Control
              size="lg"
              name="city"
              value={this.state.fields.city}
              onChange={this.handleInputChange}
              required
              type="text"
              placeholder="City"
            />
            <Form.Control.Feedback type="invalid">
              {'Valid city is required.'}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Control
              size="lg"
              name="state"
              value={this.state.fields.state}
              onChange={this.handleInputChange}
              required
              type="text"
              placeholder="State"
            />
            <Form.Control.Feedback type="invalid">
              {'Valid state is required.'}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group>
            <Form.Control
              as="select"
              placeholder="Country"
              size="lg"
              name="country"
              onChange={this.handleInputChange}
              value={this.state.country}
            >
              {countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={6}>
          <Form.Group>
            <Form.Control
              size="lg"
              name="postalcode"
              value={this.state.fields.postalcode}
              onChange={this.handleInputChange}
              required
              type="text"
              placeholder="Postal code"
            />
            <Form.Control.Feedback type="invalid">
              {'Valid postal code is required.'}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group>
            <Form.Control
              size="lg"
              name="phoneNumber"
              value={this.state.fields.phoneNumber}
              onChange={this.handleInputChange}
              type="text"
              placeholder="Phone"
            />
          </Form.Group>
        </Col>
      </Form.Row>
    );
  };
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutForm);
