import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ForgotPasswordForm from '../../components/forgotPasswordForm';
import { withRouter } from 'next/router';
import Router from 'next/router';
import { toast } from 'react-toastify';

class ForgotPassword extends React.Component {

  onSuccess = async () => {
    toast.success('Please check your email to reset the password.', {
      containerId: 'Toast',
    });
    Router.back();
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
            <ForgotPasswordForm onSuccess={this.onSuccess} border={true} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ForgotPassword);
