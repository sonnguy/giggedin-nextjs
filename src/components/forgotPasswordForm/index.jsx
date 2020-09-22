import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import "./style.scss";
import { forgotPasswordApi } from "../../api/userApi";
import { toast } from "react-toastify";

class ForgotPasswordForm extends React.Component {
  state = {
    forgotPasswordValidated: false,
    loading: false,
    forgotPasswordFields: {
      email: "",
    },
  };

  handleInputChange = (event) => {
    const fields = this.state.forgotPasswordFields;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    fields[name] = value;
    this.setState({ forgotPasswordFields: fields });
  };

  onSubmit = async (event) => {
    const forgotPasswordForm = event.currentTarget;
    event.preventDefault();
    this.setState({ forgotPasswordValidated: true });
    if (forgotPasswordForm.checkValidity() === true) {
      this.setState({ loading: true });
      const { email } = this.state.forgotPasswordFields;
      forgotPasswordApi(email)
        .then((res) => {
          this.setState({ loading: false });
          const { data = {} } = res;
          if (data.success) {
            this.props.onSuccess();
          } else {
            toast.error(
              "The email address is incorrect. Please retry...",
              { containerId: "Toast" }
            );
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.error(
            "Something went wrong, Please retry...",
            { containerId: "Toast" }
          );
        });
    }
  };

  render() {
    return (
      <div className="forgot-password-form">
        <Form
          noValidate
          validated={this.state.forgotPasswordValidated}
          onSubmit={this.onSubmit}
        >
          <Form.Row>
            <Col xs={12} sm={12}>
              <div
                className={`${
                  this.props.border ? "border" : ""
                  } forgot-password-container p-4`}
              >
                <h4 className="forgot-password-container-body__title mb-4">
                  {"Find your password"}
                </h4>
                <Form.Group controlId="formBasicEmail" className="form-item">
                  <Form.Control
                    required
                    size="lg"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={this.handleInputChange}
                    value={this.state.forgotPasswordFields.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {"Email not valid."}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  disabled={this.state.loading}
                  type="submit"
                  variant="dark"
                  className="w-100 default-btn btn-p15 mt-3"
                >
                  {"SUBMIT"}
                </Button>
              </div>
            </Col>
          </Form.Row>
        </Form>
      </div>
    );
  }
}

export default ForgotPasswordForm;
