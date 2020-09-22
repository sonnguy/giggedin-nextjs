import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';


import './style.scss'
import { withRouter } from 'next/router';
import Router from 'next/router';

class Custom404 extends React.Component {
    componentDidMount() {
        // Mixpanel.pageView("View_Exp_404");
        // GA.pageView();
    }

    goHome = () => {
        Router.push('/');
    }

    render() {
        return (
            <Container className="mt-5">
                <Row>
                    <Col xs={12}>
                        <div class="error-template d-flex flex-column align-items-center justify-content-center">
                            <h1>
                                {'Oops!'}
                            </h1>
                            <h2 className="not-found-number">
                                {'Error'}
                            </h2>
                            <div class="error-details">
                                {' Sorry, an error has occured, please try later!'}
                            </div>
                            <div class="error-actions pt-3">
                                <Button
                                    onClick={this.goHome}
                                    className="error-actions-btn px-5 py-3"
                                    size="lg"
                                    variant="dark"
                                >
                                    Take me home
									</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default withRouter(Custom404);