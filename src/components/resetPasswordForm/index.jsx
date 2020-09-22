import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import "./style.scss";
import { resetPasswordApi } from "../../api/userApi";
import { toast } from "react-toastify";
import { withRouter } from "next/router";

class ResetPasswordForm extends React.Component {
  state = {
    resetPasswordValidated: false,
    loading: false,
    resetPasswordFields: {
      password: "",
    },
  };

  handleInputChange = (event) => {
    const fields = this.state.resetPasswordFields;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    fields[name] = value;
    this.setState({ resetPasswordFields: fields });
  };

  onSubmit = async (event) => {
    const token = this.props.router.asPath.split('=')[1];
    const resetPasswordForm = event.currentTarget;
    event.preventDefault();
    this.setState({ resetPasswordValidated: true });
    if (resetPasswordForm.checkValidity() === true) {
      this.setState({ loading: true });
      const { password } = this.state.resetPasswordFields;
      resetPasswordApi(token, password)
        .then((res) => {
          this.setState({ loading: false });
          const { data = {} } = res;
          if (data.success) {
            this.props.onSuccess();
          } else {
            toast.error(
              data.message || "Something went wrong, Please retry...",
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
      <div className="reset-password-form">
        <Form
          noValidate
          validated={this.state.resetPasswordValidated}
          onSubmit={this.onSubmit}
        >
          <Form.Row>
            <Col xs={12} sm={12}>
              <div
                className={`${
                  this.props.border ? "border" : ""
                  } reset-password-container p-4`}
              >
                <h4 className="reset-password-container-body__title mb-4">
                  {"Reset your password"}
                </h4>
                <Form.Group controlId="formBasicEmail" className="form-item">
                  <Form.Control
                    required
                    size="lg"
                    type="password"
                    name="password"
                    placeholder="Input your new password"
                    onChange={this.handleInputChange}
                    value={this.state.resetPasswordFields.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {"Password cannot be empty."}
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

export default withRouter(ResetPasswordForm);
