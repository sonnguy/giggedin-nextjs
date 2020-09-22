import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import RegisterForm from "../../components/registerForm";
import Mixpanel from "../../tracking/mixpanel";
import GA from "../..";
import { withRouter } from "next/router";
import Router from "next/router";
import { claimEvent } from "../../api/checkoutApi";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { appId } from "../../constants/facebookConstants";
import { spotifyFollowingApi } from "../../api/artistApi";
class Registration extends React.Component {
  componentDidMount() {
    // Mixpanel.pageView("View_Exp_Login");
    // GA.pageView();
    const scriptFacebook = document.createElement("script");
    scriptFacebook.src = `https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=${appId}`;
    scriptFacebook.async = true;
    scriptFacebook.defer = true;
    scriptFacebook.crossorigin = "anonymous";
    document.body.appendChild(scriptFacebook);
    console.log(
      'const expId = this.props.router.asPath.split("=")[1];',
      this.props.router.asPath
    );
  }

  goBack = () => {
    Router.back();
  };
  onSuccess = async (source) => {
    const params = this.props.router.asPath.split("?")[1];
    const paramsArr = params.split("&");
    const id = paramsArr[0].split("=")[1];
    const artist = paramsArr[1].split("=")[1];

    if (source == "spotify") {
      spotifyFollowingApi(artist).then((res) => { });
    }
    try {
      const res = await claimEvent(id, source);
      const { data = {} } = res;
      if (data.success) {
        this.goBack();
        // const path = `/confirmation/[id]`;
        // Router.push({ pathname: path }, `/confirmation/${id}`);
      } else {
        toast.error(data.message, {
          containerId: "Toast",
        });
      }
    } catch (error) {
      toast.error("Something went wrong please try again", {
        containerId: "Toast",
      });
    }
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
            <RegisterForm
              onSuccess={(source) => this.onSuccess(source)}
              border={true}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Registration));
