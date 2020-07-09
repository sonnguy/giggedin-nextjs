/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CheckOutForm from './CheckoutForm';
import LoginRegisterForm from './LoginRegisterForm';
import { getCampaignCheckout } from '../../api/checkoutApi';
import { getImageUrl } from '../../services/imageService';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Mixpanel from '../../tracking/mixpanel';
import GA from '../../tracking/ga';
import { withRouter } from 'next/router';

class CheckOut extends React.Component {
  state = {
    step: 1,
    isLogedIn: false,
    data: {},
    selectedTier: [],
  };

  checkOutOnClick = () => {
    Mixpanel.track("Click_SelectPackage");
    const { step } = this.state;
    if (step === 1) {
      this.setState({ step: step + 1 });
    } else {
      //call payment action
    }
  };
  getCampaignCheckout = async (id) => {
    try {
      const res = await getCampaignCheckout(id);
      const { data = {} } = res;
      if (data.success) {
        this.setState({
          data: data.campaign,
        });
      }
    } catch (error) { }
  };
  componentDidMount() {
    Mixpanel.pageView("View_Exp_Packages");
    GA.pageView();
    const id = this.props.router.query.id;
    this.getCampaignCheckout(id);
  }

  goToLogin = () => {
    this.setState({
      step: 3,
    });
  };

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
    Mixpanel.track("Click_SelectPackage", { tier: item.id });
  };
  onRemoveItem = (item) => {
    const { selectedTier } = this.state;
    const arrF = selectedTier.filter((it) => it.id !== item.id);
    this.setState({
      selectedTier: [...arrF],
    });
  };

  getTotalPrice = (selectedTier) => {
    return selectedTier.length > 0
      ? selectedTier.map((it) => it.price).reduce((a, b) => a + b) / 100
      : 0;
  };

  render() {
    const { step, isLogedIn, data, selectedTier } = this.state;
    const id = this.props.router.query.id;
    const tiers = data.tiers ? data.tiers.sort((a, b) => a.price - b.price) : [];
    return (
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          {data.name ? <title>{`${data.name}: ${data.headline}`}</title> : null}
        </Helmet>
        <Row className="mt-5 pt-3">
          <Col
            xs={12}
            sm={12}
            md={8}
            className="checkout-reward-container pr-md-4"
          >
            <div className="checkout-header">
              <h2 className="checkout-header__artist-name m-0">
                {`${data.name}: `}
                <span className="checkout-header__artist-banner-text m-0 ml-2">
                  {data.headline}
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
                    data={item}
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
                      data={item}
                      onAddItem={this.onAddItem}
                    />
                  ))}
              </div>
            )}

            <div className="mt-3">
              {step === 2 && (
                <CheckOutForm
                  campaignId={id}
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
                  <>
                    <div className="checkout-summary__item py-3">
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="summary-item-text">{item.name}</div>
                        <div className="summary-item-price">{`$${
                          item.price / 100
                          }`}</div>
                      </div>
                    </div>
                    <div className="separate-line"></div>{' '}
                  </>
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

const RewardItem = ({ selected, data, onAddItem, onRemoveItem }) => {
  return (
    <Col className={`checkout-body__reward-item ${selected && 'selected'}`}>
      <Row>
        <Col xs={12} sm={4} md={4} className="px-0">
          <div className="checkout-body__reward-item__image">
            <LazyLoadImage
              alt={'support-act'}
              effect="blur"
              src={getImageUrl(data.tier_image)}
              placeholderSrc={getImageUrl(data.tier_image)}
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
            <div
              className={'price_item summary-item-price total-price p-4'}
            >{`$${data.price / 100}`}</div>
          )}

          <div className="reward-item-main-info w-75">
            <div className="reward-name mb-2">{data.name}</div>
            <div className="reward-des">{data.description}</div>
            {selected && (
              <div className="reward-actions p-4">
                {/* <FaIcon name="faCheckCircle" size={'lg'} color={'#fff'} /> */}
                <Button
                  variant="outline-primary"
                  size={'sm'}
                  className="reward-actions__btn px-4"
                  onClick={() => onRemoveItem(data)}
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
                    <div>{ReactHtmlParser(data.tier_includes)}</div>
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
          onClick={() => onAddItem(data)}
        >
          {'Select this Package'}
        </Button>
      </div>
    </Col>
  );
};

export default withRouter(CheckOut);
