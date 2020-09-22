/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CheckOutForm from './CheckoutForm';
import LoginRegisterForm from './LoginRegisterForm';
import { getImageUrl } from '../../services/imageService';
import ReactHtmlParser from 'react-html-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Mixpanel from '../../tracking/mixpanel';
import GA from '../../tracking/ga';
import { withRouter } from 'next/router';
import DOMPurify from 'isomorphic-dompurify';
import { auth } from '../../api/spotifyApi';
import { connect } from 'react-redux';
import { setUserData } from '../../actions/userAction';
import SpotifyLoginButton from '../../components/button/spotifyLoginButton';
import {
  authEndpoint,
  clientId,
  scopes,
  redirectUri,
} from "../../constants/spotifyConstants";

class CheckOut extends React.Component {
  state = {
    step: 1,
    isLogedIn: false,
    selectedTier: [],
    isFollowingSpot: false,
  };

  checkOutOnClick = () => {
    Mixpanel.track('Click_SelectPackage');
    const { step } = this.state;
    if (step === 1) {
      this.setState({ step: step + 1 });
    } else {
      //call payment action
    }
  };
  componentDidMount() {
    // const ReactPixel = require('react-facebook-pixel').default;
    // ReactPixel.track('ViewContent', { page: 'Checkout_Page' });
    // Mixpanel.pageView('View_Exp_Packages');
    // GA.pageView();
  }

  goToLogin = () => {
    this.setState({
      step: 3,
    });
  };
  loginSpotify = async () => {
    const spotifyLoginWindow = window.open(
      `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
        '%20'
      )}&response_type=code&show_dialog=true`,
      'Login with Spotify',
      'width=800,height=600'
    );
    let timer = setInterval(() => {
      if (spotifyLoginWindow.closed) {
        clearInterval(timer);
        const token = localStorage.getItem('SPOTIFY_CODE');
        if (token) {
          auth(token).then((response) => {
            const { data = {} } = response;
            if (data.success) {
              const { user, jwt } = data;
              this.props.setUserData({ user, token: jwt.token });
              // this.getArtistFollow(jwt.token);
            } else {
              toast.error(data.message || 'Something went wrong.', {
                containerId: 'Toast',
              });
            }
          });
        }
      }
    }, 1000);
  };
  // getArtistFollow = async (token) => {
  //   const { experience } = this.props;
  //   api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   const response = await getFollowArtistApi(experience.id);
  //   const { data = {} } = response;
  //   if (data.success) {
  //     this.setState({
  //       isFollowingSpot: data.following,
  //     });
  //   } else {
  //   }
  // };

  gotoGuestPayment = () => {
    this.setState({
      step: 2,
      isLogedIn: false,
    });
  };
  goToPaymentAfterLogin = () => {
    this.setState({
      step: 2,
      isLogedIn: true,
    });
  };
  onAddItem = (item) => {
    const { selectedTier } = this.state;
    // const arrF = selectedTier.filter((it) => it.id == item.id);
    if (selectedTier.length > 0) {
      return;
    }
    this.setState({
      selectedTier: [...selectedTier, item],
    });
    //Mixpanel.track('Click_SelectPackage', { tier: item.id });
  };
  onRemoveItem = (item) => {
    const { selectedTier } = this.state;
    const arrF = selectedTier.filter((it) => it.id !== item.id);
    this.setState({
      selectedTier: [...arrF],
    });
  };

  getTotalPrice = (selectedTier) => {
    // const { isFollowingSpot = false } = this.state;
    // if (
    //   isFollowingSpot &&
    //   selectedTier.length > 0 &&
    //   !!selectedTier[0].following_checkout
    // ) {
    //   return 0;
    // }
    return selectedTier.length > 0
      ? selectedTier.map((it) => it.price).reduce((a, b) => a + b) / 100
      : 0;
  };
  renderLoginSpotify = () => {
    const { step } = this.state;
    const { user } = this.props;
    if (step == 2 && !user) {
      return (
        <div className="text-center">
          <SpotifyLoginButton onClick={this.loginSpotify} text="Login with Spotify" />
        </div>
      );
    }
  };

  render() {
    const { step, isLogedIn, selectedTier } = this.state;
    const { experience } = this.props;
    const tiers = experience.tiers
      ? experience.tiers.sort((a, b) => a.price - b.price)
      : [];
    return (
      <Container>
        <Row className="mt-5 pt-3">
          <Col
            xs={12}
            sm={12}
            md={8}
            className="checkout-reward-container pr-md-4"
          >
            <div className="checkout-header">
              <h2 className="checkout-header__artist-name m-0">
                {`${experience.name}: `}
                <span className="checkout-header__artist-banner-text m-0 ml-2">
                  {experience.headline}
                </span>
              </h2>
            </div>
            {step === 1 && (
              <div className="checkout-body my-4">
                {selectedTier.length > 0 ? (
                  <h4 className="checkout-body__title mb-4">
                    {'Selected Package'}
                  </h4>
                ) : null}
                {selectedTier.map((item, index) => (
                  <RewardItem
                    key={index}
                    selected={true}
                    experience={item}
                    onRemoveItem={this.onRemoveItem}
                  />
                ))}
                <div className="separate-line my-4 py-1"></div>
                {tiers && selectedTier.length === 0 && (
                  <h4 className="checkout-body__title mb-4">
                    {'Select a Package'}
                  </h4>
                )}
                {tiers &&
                  selectedTier.length === 0 &&
                  tiers.map((item, index) => (
                    <RewardItem
                      key={index}
                      experience={item}
                      onAddItem={this.onAddItem}
                    />
                  ))}
              </div>
            )}

            <div className="mt-3">
              {/* {this.renderLoginSpotify()} */}
              {step === 2 && (
                <CheckOutForm
                  experience={experience}
                  history={this.props.history}
                  goToLogin={this.goToLogin}
                  selectedTier={selectedTier}
                  isLogedIn={isLogedIn}
                />
              )}
              {step === 3 && (
                <LoginRegisterForm
                  goToPaymentAfterLogin={this.goToPaymentAfterLogin}
                  goBack={this.gotoGuestPayment}
                />
              )}
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} className="checkout-summary pl-md-4">
            <div className="checkout-summary__container">
              <h4 className="checkout-body__title mb-4">{'Summary'}</h4>
              <div className="separate-line"></div>
              {selectedTier.map((item) => {
                return (
                  <div key={item.id}>
                    <div className="checkout-summary__item py-3">
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="summary-item-text">{item.name}</div>
                        <div className="summary-item-price">
                          {`$${item.price / 100}`}
                        </div>
                      </div>
                    </div>
                    <div className="separate-line"></div>{' '}
                  </div>
                );
              })}
              <div className="checkout-summary__item py-3">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="summary-item-text">{'Subtotal'}</div>
                  <div className="summary-item-price">{`$${this.getTotalPrice(
                    selectedTier
                  )}`}</div>
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 mt-3">
                  <div className="summary-item-text">{'Shipping'}</div>
                  <div className="summary-item-price">{'-'}</div>
                </div>
              </div>
              <div className="separate-line"></div>
              <div className="checkout-summary__item py-3">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div className="summary-item-text total-text">{'TOTAL'}</div>
                  <div className="summary-item-price total-price">{`$${this.getTotalPrice(
                    selectedTier
                  )}`}</div>
                </div>
              </div>
              {step === 1 && (
                <Button
                  onClick={this.checkOutOnClick}
                  disabled={selectedTier.length === 0}
                  className="checkout-summary__item__check-out-btn w-100 mt-2 default-btn btn-p15"
                  size="lg"
                  variant="dark"
                >
                  {'CHECK OUT'}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const RewardItem = ({ selected, experience, onAddItem, onRemoveItem }) => {
  return (
    <Col className={`checkout-body__reward-item ${selected && 'selected'}`}>
      <Row>
        <Col xs={12} sm={4} md={4} className="px-0">
          <div className="checkout-body__reward-item__image">
            <LazyLoadImage
              alt={'support-act'}
              effect="blur"
              src={getImageUrl(experience.tier_image)}
              placeholderSrc={getImageUrl(experience.tier_image)}
              className="p-4"
            />
          </div>
        </Col>
        <Col
          xs={12}
          sm={8}
          md={8}
          className="checkout-body__reward-item__info p-4"
        >
          {!selected && (
            <div className={'price_item summary-item-price total-price p-4'}>
              {`$${experience.price / 100}`}
            </div>
          )}

          <div className="reward-item-main-info w-75">
            <div className="reward-name mb-2">{experience.name}</div>
            <div className="reward-des">{experience.description}</div>
            {selected && (
              <div className="reward-actions p-4">
                {/* <FaIcon name="faCheckCircle" size={'lg'} color={'#fff'} /> */}
                <Button
                  variant="outline-primary"
                  size={'sm'}
                  className="reward-actions__btn px-4"
                  onClick={() => onRemoveItem(experience)}
                >
                  {'REMOVE'}
                </Button>
              </div>
            )}
          </div>
          <div className="separate-line my-4 py-1"></div>
          <div className="reward-item-includes-info">
            <div className="reward-includes-title mb-2">{'Includes:'}</div>
            <div className="reward-includes-items w-75">
              <Row>
                <Col xs={12}>
                  <div className="reward-includes-sub-text">
                    <div>
                      {ReactHtmlParser(
                        DOMPurify.sanitize(experience.tier_includes)
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
              {/* <div className="reward-includes-spot-left py-2 px-4 p-md-4">
                <FaIcon name="faFireAlt" size={'1x'} color={'#ff4a32'} /> Only
                10 spots left
              </div> */}
            </div>
          </div>
        </Col>
      </Row>
      <div className="checkout-body__reward-item__hover-actions">
        <Button
          variant="outline-primary"
          className="checkout-body__reward-item__hover-actions__btn px-4"
          onClick={() => onAddItem(experience)}
        >
          {'Select this Package'}
        </Button>
      </div>
    </Col>
  );
};
const mapStateToProps = (state) => ({
  token: state.user.token,
  user: state.user.user,
});

const mapDispatchToProps = {
  setUserData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CheckOut));
