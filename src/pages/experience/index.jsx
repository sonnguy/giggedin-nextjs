/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import './style.scss';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getImageUrl } from '../../services/imageService';
import { useEffect } from 'react';
import FaIcon from '../../components/fontAwesomeIcon';
import { getCampain } from '../../actions/campaignAction';
import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Sticky from 'react-stickynode';
import supportact from '../../../public/images/supportact.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Mixpanel from '../../tracking/mixpanel';
import GA from '../../tracking/ga';
import { withRouter } from 'next/router';
import Router from 'next/router';

const CampaignDetail = ({ router }) => {
  const campaign = useSelector((state) => state.campaign.campaign);
  const dispatch = useDispatch();
  const [menuActive, setNenuActive] = useState('');

  const getCampaignFn = (id) => dispatch(getCampain(id));

  const goToCheckout = () => {
    Mixpanel.track("Click_ClaimSpot", { campaign: campaign.id });
    let path = `/checkout/[id]`;
    Router.push({ pathname: path }, `/checkout/${campaign.id}`);
  };

  useEffect(() => {
    Mixpanel.pageView("View_Exp_Page");
    GA.pageView();
    console.log(router);
    const { slug } = router.query;
    const id = slug.split('-').pop();
    getCampaignFn(id);
  }, []);

  useEffect(() => {
    if (campaign.id) {
      const { tabs } = campaign;
      if (tabs.length > 0) {
        setNenuActive(tabs[0].title.toLowerCase());
      }
    }
  }, [campaign]);

  const artist = (campaign.artists && campaign.artists[0]) || {};
  const music_enabled = campaign.music_enabled === 1;
  const concert_enabled = campaign.concert_enabled === 1;
  const spots_unlimited = campaign.spots_unlimited === 1;

  const { tabs } = campaign;

  return (
    <>
      <Sticky top={0} innerZ={999}>
        <div className="sticky-cta-bar">
          <Container className="position-relative py-2">
            <Row>
              <Col xs={12} sm={12} md={8} className="d-flex mb-2 mb-md-0">
                <div className="sticky-cta-bar__artist-image" style={{
                  backgroundImage: `url(${getImageUrl(artist.profile_pic)})`,
                }}>
                </div>
                <div className="sticky-cta-bar__artist-info pl-3 d-flex flex-column justify-content-center">
                  <div className="sticky-cta-bar__artist-info__title">{`${campaign.name}: ${campaign.headline}`}</div>
                  {
                    !spots_unlimited &&
                    <div className="sticky-cta-bar__artist-info__spot-left">
                      <FaIcon name="faFireAlt" size={'1x'} color={'#fff'} />
                      {' Only 10 spots left'}
                    </div>
                  }

                </div>
              </Col>
              <Col xs={12} sm={12} md={4} className="sticky-cta-bar__action d-flex align-items-center px-4">
                <Button
                  onClick={goToCheckout}
                  className="px-4 py-3 sticky-cta-bar__action__claim-btn w-100"
                  size="lg"
                  variant="dark"
                >
                  {'Claim your spot now'}
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Sticky>
      <Container>
        <Row className="mt-4">
          <Col xs={12} sm={12} md={8} className="pr-4">
            <div className="hdiw-block p-4 mt-2">
              <h4 className="text-uppercase mb-4 mt-2 hdiw-block-title font-weight-bolder">
                How Does This Work?
            </h4>
              <div className="hdiw-text">{ReactHtmlParser(campaign.how_does_it_work)}</div>
            </div>
            <div className="campaign-detail mt-4">
              <Row>
                <Col xs={12} sm={3} md={3} lg={2} className="pr-0">
                  <div
                    id="campaign-detail-menu"
                    className="campaign-detail__menu d-flex justify-content-center flex-sm-column flex-row mt-2"
                  >
                    {
                      tabs &&
                      tabs.map(item => (
                        <a
                          key={item.id}
                          href={`#${item.title.toLowerCase()}`}
                          className={`campaign-detail__menu__item pr-2 pr-sm-0 ${
                            menuActive === item.title.toLowerCase() && 'active'
                            }`}
                          onClick={() => {
                            setNenuActive(item.title.toLowerCase());
                          }}
                        >
                          <FaIcon
                            name="faLongArrowAltRight"
                            size={'lg'}
                            color={'#333'}
                          />{item.title}
                        </a>
                      ))
                    }
                    <a
                      href="#charity"
                      className={`campaign-detail__menu__item pr-2 pr-sm-0 ${
                        menuActive === 'charity' && 'active'
                        }`}
                      onClick={() => {
                        setNenuActive('charity');
                      }}
                    >
                      <FaIcon
                        name="faLongArrowAltRight"
                        size={'lg'}
                        color={'#333'}
                      />{'  The Charity'}
                    </a>
                    {music_enabled && (
                      <a
                        href="#music"
                        className={`campaign-detail__menu__item pr-2 pr-sm-0 ${
                          menuActive === 'music' && 'active'
                          }`}
                        onClick={() => {
                          setNenuActive('music');
                        }}
                      >
                        <FaIcon
                          name="faLongArrowAltRight"
                          size={'lg'}
                          color={'#333'}
                        />{' '}
                      Music
                      </a>
                    )}
                    {concert_enabled && (
                      <a
                        href="#concerts"
                        className={`campaign-detail__menu__item pr-2 pr-sm-0 ${
                          menuActive === 'concerts' && 'active'
                          }`}
                        onClick={() => {
                          setNenuActive('concerts');
                        }}
                      >
                        <FaIcon
                          name="faLongArrowAltRight"
                          size={'lg'}
                          color={'#333'}
                        />{' '}
                      Upcoming Shows
                      </a>
                    )}
                  </div>
                </Col>
                <Col xs={12} sm={9} md={9} lg={10}>
                  <div
                    className="campaign-detail__content"
                    data-spy="scroll"
                    data-target="#campaign-detail-menu"
                    data-offset="0"
                  >
                    {
                      tabs &&
                      tabs.map((item, index) => (
                        <div key={item.id} className="campaign-detail__content__story" id={item.title.toLowerCase()}>
                          <h4 className="content-title mb-3 font-weight-bolder">
                            {item.title.toUpperCase()}
                          </h4>
                          <div>{ReactHtmlParser(item.content)}</div>
                          {
                            index !== tabs.length - 1
                            &&
                            <div className="separate-line my-4"></div>
                          }
                        </div>
                      ))
                    }
                    <div className="text-center mb-4 pt-2">
                      <Button
                        onClick={goToCheckout}
                        className="px-5 py-3 campaign-detail__content__claim-btn"
                        size="lg"
                        variant="dark"
                      >
                        Claim your spot now
                      </Button>
                    </div>
                    <div className="separate-line my-4"></div>
                    <div
                      className="campaign-detail__content__support-art"
                      id="charity"
                    >
                      <h4 className="content-title mb-3 font-weight-bolder">
                        {'THE CHARITY'}
                      </h4>
                      <div>
                        <div className="charity-block pb-4">
                          <div className="charity-text">
                            <span className="artist-name">
                              {campaign.name}
                            </span>
                            {' has chosen to donate a portion of all proceeds from this campaign to:'}
                          </div>
                        </div>
                        <div className="support-block p-3">
                          <Row>
                            <Col xs={12} sm={12} md={5} className="d-flex align-items-center justify-content-center justify-content-md-start">
                              <LazyLoadImage
                                alt={'support-act'}
                                effect="blur"
                                src={supportact}
                                placeholderSrc={supportact}
                                className="support-act-image px-md-2 mb-2 mb-md-0"
                              />
                            </Col>
                            <Col xs={12} sm={12} md={7} className="d-flex align-items-center justify-content-center justify-content-md-start">
                              <div className="support-small-text">
                                {'Supporting music workers impacted by COVID-19.'}
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                    <div className="separate-line my-4"></div>
                    {concert_enabled && (
                      <>
                        <div
                          className="campaign-detail__content__concerts"
                          id="concerts"
                        >
                          <h4 className="content-title mb-4 font-weight-bolder">
                            UPCOMING CONCERTS
                        </h4>
                          <div className="concerts-container px-4 pb-4 pt-2">
                            <div className="concerts-item">
                              <div className="concerts-item__date">
                                <div className="concerts-item__date__text">
                                  JUL
                              </div>
                                <div className="concerts-item__date__number">
                                  25
                              </div>
                              </div>
                              <div className="d-flex w-100 concerts-item__border-top">
                                <div className="concerts-item__info">
                                  <div className="concerts-name">
                                    Apashe with Avy and Eminem{' '}
                                  </div>
                                  <div className="concerts-location">
                                    <FaIcon
                                      name="faMapMarkerAlt"
                                      size={'lg'}
                                      color={'#333'}
                                    />{' '}
                                  7-11 Dawson Street, Brunswick VIC, Australia
                                </div>
                                </div>
                                <div className="concerts-item__schedule">
                                  <div className="schedule-text">Wed, Jul 25</div>
                                </div>
                              </div>
                            </div>
                            <div className="concerts-item">
                              <div className="concerts-item__date">
                                <div className="concerts-item__date__text">
                                  JUL
                              </div>
                                <div className="concerts-item__date__number">
                                  30
                              </div>
                              </div>
                              <div className="d-flex w-100 concerts-item__border-top">
                                <div className="concerts-item__info">
                                  <div className="concerts-name">
                                    Apashe with Avy and Eminem{' '}
                                  </div>
                                  <div className="concerts-location">
                                    <FaIcon
                                      name="faMapMarkerAlt"
                                      size={'lg'}
                                      color={'#333'}
                                    />{' '}
                                  7-11 Dawson Street, Brunswick VIC, Australia
                                </div>
                                </div>
                                <div className="concerts-item__schedule">
                                  <div className="schedule-text">Fri, Jul 30</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="separate-line mt-4 mb-2"></div>
                      </>
                    )}

                    <div>
                      <span className="support-art-question">
                        Got any questions?{' '}
                      </span>
                      <a href="mailto:contact@giggedin.com" className="support-art-email-us">
                        {'Email us here'}
                      </a>
                    </div>
                    <div className="mb-5 mb-md-0 pb-3 pb-md-0"></div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} className="px-sm-0">
            <div className="support-container">
              <div className="artist-info-block p-4">
                <div className="artist-info__header d-flex">
                  <div
                    className="artist-info__header__artist-image"
                    style={{
                      backgroundImage: `url(${getImageUrl(artist.profile_pic)})`,
                    }}
                  ></div>
                  <div className="artist-info__header__artist-info pl-3 d-flex flex-column justify-content-around py-2">
                    <div className="artist-info__header__artist-socials">
                      {artist.facebook ? (
                        <a
                          href={artist.facebook}
                          target="_blank"
                          className="pr-2"
                          rel="noopener noreferrer"
                        >
                          <FaIcon
                            name="faFacebook"
                            size={'1x'}
                            color={'#333'}
                          />
                        </a>
                      ) : null}
                      {artist.twitter ? (
                        <a
                          href={artist.twitter}
                          target="_blank"
                          className="px-2"
                          rel="noopener noreferrer"
                        >
                          <FaIcon name="faTwitter" size={'1x'} color={'#333'} />
                        </a>
                      ) : null}
                      {artist.instagram ? (
                        <a
                          href={artist.instagram}
                          target="_blank"
                          className="px-2"
                          rel="noopener noreferrer"
                        >
                          <FaIcon
                            name="faInstagram"
                            size={'1x'}
                            color={'#333'}
                          />
                        </a>
                      ) : null}
                    </div>
                    <div className="artist-info__header__artist-name">
                      {artist.name}
                    </div>
                  </div>
                </div>
                <div className="artist-info__body">
                  <div className="artist-info__body__text py-3">
                    {artist.description}
                  </div>
                  {/* <div className="artist-info__body__read-more">
                                    Read more..
                                    </div> */}
                </div>
                <div className="separate-line my-3"></div>
                <div className="artist-info__footer" id="music">
                  <div className="artist-info__footer__text mb-2">
                    Listen to {artist.name}’s music on:
                  </div>
                  <div className="artist-info__footer__artist-music">
                    {artist.apple ? (
                      <a
                        href={artist.apple}
                        target="_blank"
                        className="pr-2"
                        rel="noopener noreferrer"
                      >
                        <FaIcon name="faApple" size={'lg'} color={'#ff4a32'} />
                      </a>
                    ) : null}
                    {artist.spotify ? (
                      <a
                        href={artist.spotify}
                        target="_blank"
                        className="px-2"
                        rel="noopener noreferrer"
                      >
                        <FaIcon
                          name="faSpotify"
                          size={'lg'}
                          color={'#ff4a32'}
                        />
                      </a>
                    ) : null}
                    {artist.sound_cloud ? (
                      <a
                        href={artist.sound_cloud}
                        target="_blank"
                        className="px-2"
                        rel="noopener noreferrer"
                      >
                        <FaIcon
                          name="faSoundcloud"
                          size={'lg'}
                          color={'#ff4a32'}
                        />
                      </a>
                    ) : null}

                    {artist.youtube ? (
                      <a
                        href={artist.youtube}
                        target="_blank"
                        className="px-2"
                        rel="noopener noreferrer"
                      >
                        <FaIcon
                          name="faYoutube"
                          size={'lg'}
                          color={'#ff4a32'}
                        />
                      </a>
                    ) : null}
                  </div>
                  <div className="spotify-block mt-3">
                    <iframe
                      src={artist.spotify_playlist}
                      width="100%"
                      height="400"
                      frameBorder="0"
                      allowransparency="true"
                      allow="encrypted-media"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default withRouter(CampaignDetail);
