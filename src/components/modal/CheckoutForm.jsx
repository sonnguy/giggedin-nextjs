import React from 'react';
import { Col, Form, Button } from 'react-bootstrap';

class CheckOutForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validated: false,
            fields: {
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                province: '',
                district: '',
                phoneNumber: '',
                isSaveShippingAddress: false,
                isSaveUserInfo: false,
                paymentMethod: '',
                nameOncard: '',
                cardNumber: '',
                cardExpiration: '',
                cvvNumber: '',
            },
        };
    }


    handleInputChange = event => {
        const fields = this.state.fields;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        fields[name] = value;

        this.setState({ fields });
    }

    handleSubmit = event => {
        const form = event.currentTarget;
        event.preventDefault();
        this.setState({ validated: true });
    };
    render() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Row className="credits-block">
                    <Col xs={12} sm={6}>
                        <h4 class="font-weight-bold mt-3 mb-4">Select your seat</h4>
                        <Form.Group>
                            <Form.Label>Select seats</Form.Label>
                            <Form.Control as="select">
                                <option>1 seat</option>
                                <option>2 seats</option>
                                <option>3 seats</option>
                                <option>4 seats</option>
                                <option>5 seats</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                name="firstName"
                                value={this.state.fields.firstName}
                                onChange={this.handleInputChange}
                                required
                                type="text"
                                placeholder="First name"
                            />
                            <Form.Control.Feedback type="invalid">
                                Valid first name is required.
                                     </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom02">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                name="lastName"
                                value={this.state.fields.lastName}
                                onChange={this.handleInputChange}
                                required
                                type="text"
                                placeholder="Last name"
                            />
                            <Form.Control.Feedback type="invalid">
                                Valid last name is required.
                                    </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom03">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                name="email"
                                value={this.state.fields.email}
                                onChange={this.handleInputChange}
                                required
                                type="email"
                                placeholder="Email"
                            />
                            <Form.Control.Feedback type="invalid">
                                Valid email is required.
                                     </Form.Control.Feedback>
                        </Form.Group>
                        <h4 class="font-weight-bold">Payment</h4>
                        <Form.Group controlId="validationCustom08">
                            <Form.Label>Name on card <small className="text-muted">Full name as displayed on card</small></Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                            />
                            <Form.Control.Feedback type="invalid">
                                Name on card is required
                                     </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="validationCustom09">
                            <Form.Label>Credit card number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                            />
                            <Form.Control.Feedback type="invalid">
                                Credit card number is required
                                    </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom10">
                                <Form.Label>Expiration </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                />
                                <Form.Control.Feedback type="invalid">
                                    Expiration date required
                                     </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom11">
                                <Form.Label>CVV</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder=""
                                />
                                <Form.Control.Feedback type="invalid">
                                    Security code required
                                    </Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                    </Col>
                    <Col xs={12} sm={6} className="px-2 credits-summary">
                        <h4 class="font-weight-bold px-4 mt-3">Summary</h4>
                        <div
                            class="credits-summary__member-ship border-bottom-cus p-4 d-flex justify-content-between align-items-center">
                            <div class="credits-summary__info">
                                <div class="credits-summary__info__name">3 Seats</div>
                            </div>
                            <div class="text-center">
                                <div class="credits-summary__price">$44,95</div>
                            </div>
                        </div>
                        <div class="credits-summary__discount py-3">
                            <div class="px-4 d-flex justify-content-between">
                                <div class="credits-summary__info">
                                    <div class="credits-summary__info__name">Discount 30%
							</div>
                                    <div class="credits-summary__sub-text">Promocode: 30OFF</div>
                                </div>
                                <div class="text-center">
                                    <div class="credits-summary__price">- $14,95</div>
                                </div>
                            </div>
                        </div>
                        <div class="credits-summary__top-up p-4 d-flex justify-content-between align-items-center">
                            <div class="credits-summary__info">
                                <div class="credits-summary__total-text main-text-color text-uppercase">Total
						</div>
                            </div>
                            <div class="text-center">
                                <div class="credits-summary__total-price main-text-color">$30,00</div>
                            </div>
                        </div>

                    </Col>

                </Form.Row>
                <Button size="md" variant="dark" className="checkout-btn mt-3" type="submit" style={{ width: '100%' }}>PROCEED TO CHECKOUT</Button>
            </Form>
        )
    }
}


export default CheckOutForm;