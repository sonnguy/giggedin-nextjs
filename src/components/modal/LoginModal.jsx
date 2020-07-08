import React from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from '../loginForm';

class LoginModal extends React.Component {
    render() {
        return (
            <Modal
                show={this.props.showModal}
                onHide={this.props.onClose}
                size="md"
                centered
            >
                <Modal.Body>
                    <LoginForm onSuccess={this.props.onClose} isRegister={true} isLoginModal={true}/>
                </Modal.Body>
            </Modal>
        )
    }
}

export default LoginModal;
