import React from 'react';
import './style.scss';
import LoginForm from '../../components/loginForm';
import FaIcon from '../../components/fontAwesomeIcon';

class LoginRegisterForm extends React.Component {
  render() {
    return (
      <div className="py-3">
        <div className="d-flex align-items-center back-button-container mb-2" onClick={this.props.goBack}>
          <FaIcon name="faChevronLeft" size={'1x'} color={'#ff4a32'} />
          <span className={'back-button-span ml-1'}>{'Back'}</span>
        </div>
        <LoginForm onSuccess={this.props.goToPaymentAfterLogin} border={true} />
      </div>
    );
  }
}

export default LoginRegisterForm;
