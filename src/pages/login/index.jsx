import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from '../../components/loginForm';
import Mixpanel from '../../tracking/mixpanel';
import GA from '../../tracking/ga';
import { withRouter } from 'next/router';
import Router from 'next/router';

class Login extends React.Component {
    componentDidMount() {
        Mixpanel.pageView("View_Exp_Login");
        GA.pageView();
    }

    goBack = () => {
        Router.back();
    }

    render() {
        return (
            <Container className="mt-5">
                <Row>
                    <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
                        <LoginForm onSuccess={this.goBack} border={true} />
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default withRouter(Login);