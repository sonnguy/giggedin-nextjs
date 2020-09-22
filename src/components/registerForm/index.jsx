import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import "./style.scss";
import { setUserData } from "../../actions/userAction";
import { connect } from "react-redux";
import {
  loginApi,
  registerApi,
  loginFacebook,
  updateUserEmailApi,
} from "../../api/userApi";
import { toast } from "react-toastify";
import SpotifyLoginButton from "../button/spotifyLoginButton";
import FBLoginButton from "../button/FBLoginButton";
import { auth } from "../../api/spotifyApi";
import {
  authEndpoint,
  clientId,
  scopes,
  redirectUri,
} from "../../constants/spotifyConstants";
import OrSeparateLine from "../loginForm/orSeparateLine";
import { validateEmail } from "../../services/utilsService";

class RegisterForm extends React.Component {
  state = {
    isRegister: true,
    loginValidated: false,
    registerValidated: false,
    loading: false,
    showMoreField: false,
    showAskEmail: false,
    loginFields: {
      email: "",
      password: "",
    },
    registerFields: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      checkbox: false,
    },
  };

  goToRegister = () => {
    this.setState({ isRegister: true });
  };

  goToLogin = () => {
    this.setState({ isRegister: false });
  };

  handleInputChange = (event) => {
    const fields = this.state.isRegister
      ? this.state.registerFields
      : this.state.loginFields;
    const target = event.target;
    const value = target.name == "checkbox" ? target.checked : target.value;
    const name = target.name;
    fields[name] = value;

    if (this.state.isRegister) {
      this.setState({ registerFields: fields });
      if (
        name == "password" &&
        value.length > 3 &&
        validateEmail(this.state.registerFields.email)
      ) {
        this.setState({
          showMoreField: true,
        });
      }
    } else {
      this.setState({ loginFields: fields });
    }
  };

  loginSpotify = async () => {
    if (this.state.isRegister && !this.state.registerFields.checkbox) {
      toast.error("Please accept the Terms and Conditions", {
        containerId: "Toast",
      });
      return;
    }
    const spotifyLoginWindow = window.open(
      `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        "%20"
      )}&response_type=code&show_dialog=true`,
      "Login with Spotify",
      "width=800,height=600"
    );
    let timer = setInterval(() => {
      if (spotifyLoginWindow.closed) {
        clearInterval(timer);
        const token = localStorage.getItem("SPOTIFY_CODE");
        if (token) {
          auth(token).then((response) => {
            const { data = {} } = response;
            if (data.success) {
              const { user, jwt } = data;
              this.props.setUserData({ user, token: jwt.token });
              if (!user.email) {
                this.setState({ showAskEmail: true, isRegister: false });
              } else {
                this.props.onSuccess("spotify");
              }
            } else {
              toast.error(data.message || "Something went wrong.", {
                containerId: "Toast",
              });
            }
          });
        }
      }
    }, 1000);
  };

  updateEmail = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    this.setState({ loginValidated: true });
    if (form.checkValidity() === true) {
      updateUserEmailApi(this.state.loginFields.email).then(
        (res) => {
          const { data = {} } = res;
          if (data.success) {
            this.props.onSuccess("spotify");
          } else {
            toast.error(
              "The email address already exists for another account. Please input new email...",
              { containerId: "Toast" }
            );
          }
        },
        () => {
          toast.error(data.message || "Something went wrong.", {
            containerId: "Toast",
          });
        }
      );
    }
  };

  onLoginSubmit = async (event) => {
    const loginForm = event.currentTarget;
    event.preventDefault();
    this.setState({ loginValidated: true });
    if (loginForm.checkValidity() === true) {
      this.setState({ loading: true });
      const { email, password } = this.state.loginFields;
      loginApi(email, password)
        .then((res) => {
          this.setState({ loading: false });
          const { data = {} } = res;
          if (data.success) {
            const { user, jwt } = data;
            this.props.setUserData({ user, token: jwt.token });
            this.props.onSuccess("email");
          } else {
            toast.error(
              "The email address or password is incorrect. Please retry...",
              { containerId: "Toast" }
            );
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.error(
            "The email address or password is incorrect. Please retry...",
            { containerId: "Toast" }
          );
        });
    }
  };
  loginFacebook = () => {
    this.setState({ loading: true });
    if (this.state.isRegister && !this.state.registerFields.checkbox) {
      toast.error("Please accept the Terms and Conditions", {
        containerId: "Toast",
      });
      return;
    }
    FB.login(
      (res) => {
        const { authResponse = {} } = res;
        loginFacebook(authResponse.accessToken).then((res) => {
          this.setState({ loading: false });
          const { data = {} } = res;
          if (data.success) {
            const { user, jwt } = data;
            this.props.setUserData({ user, token: jwt.token });
            this.props.onSuccess("facebook");
          }
        });
      },
      { scope: "public_profile,email" }
    );
  };

  onRegisterSubmit = async (event) => {
    const registerForm = event.currentTarget;
    event.preventDefault();
    this.setState({ registerValidated: true });
    if (
      registerForm.checkValidity() === true &&
      this.state.registerFields.checkbox
    ) {
      this.setState({ loading: false });
      const {
        email,
        password,
        firstName,
        lastName,
      } = this.state.registerFields;
      registerApi({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      })
        .then((res) => {
          this.setState({ loading: false });
          const { data = {} } = res;
          if (data.success) {
            const { user, jwt } = data;
            this.props.setUserData({ user, token: jwt.token });
            this.props.onSuccess("email");
          } else {
            toast.error("Something went wrong please try again", {
              containerId: "Toast",
            });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
          const { email } = error.response.data.errors;
          email.forEach((item) => {
            toast.error(item, {
              containerId: "Toast",
            });
          });
        });
    }
  };

  render() {
    return (
      <div className="login-form">
        {this.state.showAskEmail && (
          <Form
            noValidate
            validated={this.state.loginValidated}
            onSubmit={this.updateEmail}
          >
            <Form.Row>
              <Col xs={12} sm={12}>
                <div
                  className={`${
                    this.props.border ? "border" : ""
                  } login-container p-4`}
                >
                  <h5 className="not-have-account-text">
                    {
                      "Your spotify account didn't have email value, please input your email to complete."
                    }
                  </h5>
                  <Form.Group controlId="formBasicEmail" className="form-item">
                    <Form.Control
                      required
                      size="lg"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={this.handleInputChange}
                      value={this.state.loginFields.email}
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
        )}
        {!this.state.isRegister && !this.state.showAskEmail && (
          <Form
            noValidate
            validated={this.state.loginValidated}
            onSubmit={this.onLoginSubmit}
          >
            <Form.Row>
              <Col xs={12} sm={12}>
                <div
                  className={`${
                    this.props.border ? "border" : ""
                  } login-container p-4`}
                >
                  <h4 className="login-container-body__title mb-4">
                    {"Login"}
                  </h4>
                  <Form.Group controlId="formBasicEmail" className="form-item">
                    <Form.Control
                      required
                      size="lg"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={this.handleInputChange}
                      value={this.state.loginFields.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {"Email not valid."}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicPassword"
                    className="form-item"
                  >
                    <Form.Control
                      required
                      size="lg"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleInputChange}
                      value={this.state.loginFields.password}
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
                    {"LOGIN"}
                  </Button>
                  <div className="text-center mt-4">
                    <h5 className="not-have-account-text">
                      {"Not registered?"}{" "}
                      <span
                        className="register-link"
                        onClick={this.goToRegister}
                      >
                        {"Create an account"}
                      </span>
                    </h5>
                  </div>
                </div>
              </Col>
            </Form.Row>
          </Form>
        )}
        {this.state.isRegister && !this.state.showAskEmail && (
          <Form
            noValidate
            validated={this.state.registerValidated}
            onSubmit={this.onRegisterSubmit}
          >
            <Form.Row>
              <Col xs={12} sm={12}>
                <div
                  className={`${
                    this.props.border ? "border" : ""
                  } register-account-container p-4`}
                >
                  <h4 className="login-container-body__title mb-4">
                    {this.props.isLoginModal
                      ? "Create an account to be reminded"
                      : "Create an account"}
                  </h4>
                  <Form.Group
                    controlId="formBasicLastName"
                    className="form-item"
                  >
                    <Form.Control
                      size="lg"
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      onChange={this.handleInputChange}
                      value={this.state.registerFields.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {"Email not valid."}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    controlId="formBasicPassword"
                    className="form-item"
                  >
                    <Form.Control
                      required
                      size="lg"
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleInputChange}
                      value={this.state.registerFields.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {"Password cannot be empty."}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {this.state.showMoreField && (
                    <Form.Group
                      controlId="formBasicEmail"
                      className="form-item"
                    >
                      <Form.Control
                        size="lg"
                        type="text"
                        required
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.handleInputChange}
                        value={this.state.registerFields.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {"First name is requeired."}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                  {this.state.showMoreField && (
                    <Form.Group
                      controlId="formBasicFirstName"
                      className="form-item"
                    >
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Last Name"
                        required
                        name="lastName"
                        onChange={this.handleInputChange}
                        value={this.state.registerFields.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {"Last name is requeired."}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}
                  <Form.Group
                    controlId="formBasicCheckbox"
                    className="form-item"
                    required
                  >
                    <Form.Check
                      type={"checkbox"}
                      id={`check-api-checkbox`}
                      className="text-center justify-content-center"
                      required
                    >
                      <Form.Check.Input
                        type={"checkbox"}
                        value={this.state.registerFields.checkbox}
                        name={"checkbox"}
                        onChange={this.handleInputChange}
                      />
                      <Form.Check.Label>
                        <div className="not-have-account-text text-center">
                          {"I agree to the"}
                          <a
                            className="register-link"
                            target="_blank"
                            href={
                              "https://experience.giggedin.com/about-us/terms-and-conditions"
                            }
                          >{` Terms and Conditions.`}</a>
                        </div>
                      </Form.Check.Label>
                      <Form.Control.Feedback type="invalid">
                        {"You must agree before submitting."}
                      </Form.Control.Feedback>
                    </Form.Check>
                  </Form.Group>
                  <Button
                    disabled={this.state.loading}
                    type="submit"
                    variant="dark"
                    className="w-100 default-btn btn-p15 mt-3"
                  >
                    {"CREATE ACCOUNT"}
                  </Button>
                  <div className="text-center mt-4">
                    <h5 className="not-have-account-text">
                      {"Already got an account?"}{" "}
                      <span className="register-link" onClick={this.goToLogin}>
                        {"Login Now"}
                      </span>
                    </h5>
                  </div>
                </div>
              </Col>
            </Form.Row>
            <OrSeparateLine />
            <SpotifyLoginButton
              onClick={this.loginSpotify}
              text="Login with Spotify"
              className="w-100"
            />
            <p className="text-center spotify-suggestion-text text-capitalize">
              Log in this way to auto-follow Jimmy on Spotify and save time
              entering the competition.
            </p>
            <FBLoginButton
              onClick={this.loginFacebook}
              text="Login with Facebook"
              className="w-100"
            />
          </Form>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  setUserData,
};

export default connect(null, mapDispatchToProps)(RegisterForm);
