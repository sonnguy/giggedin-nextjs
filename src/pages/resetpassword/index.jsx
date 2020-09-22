import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ResetPasswordForm from '../../components/resetPasswordForm';
import { withRouter } from 'next/router';
import Router from 'next/router';
import { toast } from 'react-toastify';

class ResetPassword extends React.Component {
  onSuccess = async () => {
    toast.success('Password reset successful!', {
      containerId: 'Toast',
    });
    Router.push({ pathname: '/login' });
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
            <ResetPasswordForm onSuccess={this.onSuccess} border={true} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ResetPassword);
