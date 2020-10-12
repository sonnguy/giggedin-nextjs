import React, { useEffect } from 'react';
import './style.scss';
import { Container, Row, Col, Image } from 'react-bootstrap';
import upcomingExperienceImage from '../../../public/images/upcoming-experience.png';
import CountDownTime from '../../components/countDownTime/CountDownTime';
import supportact from '../../../public/images/support-black.png';
import arrow from '../../../public/images/home-arrow-right.png';
import horiline from '../../../public/images/hori-line.png';
import livestream from '../../../public/images/live-stream.png';
import connectfans from '../../../public/images/connect-fans.jpg';
import saleticket from '../../../public/images/sale-ticket.png';
import fanregister1 from '../../../public/images/fan-register-1.png';
import fanregister2 from '../../../public/images/fan-register-2.png';
import fullsupport from '../../../public/images/full-support.png';
import easyexport from '../../../public/images/easy-export.png';
import { fullDate, getSlugName } from '../../services/utilsService';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import bgImage from '../../../public/images/home-artist-image.jpg';
import Router from 'next/router';
import FaIcon from '../../components/fontAwesomeIcon';
import WingLine from '../../components/common/wingLine';
import { Helmet } from 'react-helmet';

const Home = ({ experience }) => {

    const goToCampaign = () => {
        // let path = `/jimmy`;
        // Router.push({ pathname: path });
        const slug = `${getSlugName(experience.name)}-${getSlugName(experience.headline)}-${experience.id}`;
        let path = `/experience/[slug]`;
        Router.push({ pathname: path }, `/experience/${slug}`);

    };

    const spots_unlimited = experience.spots_unlimited === 1;

    return (
        experience && (
            <div className="home-page">
                <Helmet>
                    <script type="text/javascript" src="https://app.fllw.co/widget.js" id="Fllwco-Widget-Script"
                        data-config="{'name': 'fllwr', 'config': {'targetElementId': 'fllw-root','type' : 'youtube','campaignId': 4}}"></script>
                </Helmet>
                <div className="h-auto background-image-responsive" style={{
                    backgroundImage: `url('${bgImage}')`
                }}>
                    <Container className="pb-5">
                        <div className="text-center py-5">
                            <LazyLoadImage
                                alt={'support-act'}
                                effect="blur"
                                src={upcomingExperienceImage}
                                placeholderSrc={upcomingExperienceImage}
                                className="coming-campaign-img"
                            />
                        </div>
                        <Row className="mb-5 pb-5">
                            <Col xs={12} md={6} className="pr-md-0 mt-5 mt-md-0">
                                {/* <LazyLoadImage
                                    alt={'support-act'}
                                    effect="blur"
                                    src={supportact}
                                    placeholderSrc={supportact}
                                    className="support-act-img"
                                /> */}
                                <div className="home-page__support-act p-3 p-sm-5">
                                    <div className="home-page__support-act__artist-name mt-4">{experience.name}</div>
                                    <div className="home-page__support-act__campaign-name mt-1">{experience.headline}</div>
                                    <div className="home-page__support-act__campaign-des mt-4">{experience.description}</div>
                                    <div className="home-page__support-act__campaign-info mt-5">
                                        {!spots_unlimited && (
                                            <div className="campaign-spots mb-2">
                                                <span className="campaign-spots__number mr-1">{experience.spots}</span>
                                                <span className="campaign-spots__text">{'Spots Left'}</span>
                                            </div>
                                        )}

                                        <div className={`${spots_unlimited && 'mt-5 pt-3'} mb-2 pt-1`}>
                                            <CountDownTime end={experience.end_time} />
                                        </div>
                                        <div className={`mb-2 pb-1`}>
                                            <div className="time-close-text">
                                                {`Sales will end on ${fullDate(experience.end_time)}`}
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-5">
                                            <div onClick={goToCampaign} className="claim-spot-now">
                                                <span>{'Claim a Spot Now'}</span>
                                                <WingLine />
                                            </div>
                                            {/* <div className="share-icon">
                                        <FaIcon name="faPaperPlane" size={'lg'} color={'#fff'} />
                                    </div> */}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} md={6} className="mt-3 mt-md-0">
                                {/* <div className="start-campaign d-flex pl-4">
                                    <div className="start-campaign__content pb-5">
                                        <Image src={horiline} className="start-campaign-hori-line" />
                                        <div className="start-campaign__content__des ml-4 pl-2">
                                            {`“Can’t wait for this super fun night and to see you all” - Jimmy Banner`}
                                        </div>
                                        <div
                                            onClick={goToCampaign}
                                            className="start-campaign__content__text mt-4 ml-4 pl-2"
                                        >
                                            {'More info'}
                                            <Image src={arrow} className="start-campaign-img ml-4" />
                                        </div>
                                    </div>
                                </div> */}
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="home-page__intro">
                    <Container className="py-5">
                        <Row>
                            <Col xs={12} sm={12} md={6} className="home-page__intro__text">
                                <div className="home-page__intro__text__title">
                                    {`Gate a live stream or any content you'd like`}
                                </div>
                                <div className="home-page__intro__text__des">
                                    {`Our team will work with you to customise the Experience Platform to best showcase the online experience you'd like to create whilst achieving any artist objective. `}
                                    <ul>
                                        <li>
                                            {'Want to run a live stream performance?'}
                                        </li>
                                        <li>
                                            {'Want to gate an unreleased music video?'}
                                        </li>
                                        <li>
                                            {`A studio walkthrough?`}
                                        </li>
                                        <li>
                                            {`A fan Q&A?`}
                                        </li>
                                    </ul>
                                    <span className="font-italic">{`Get in touch, we've got you covered.`}</span>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} className="home-page__intro__image right-side pl-sm-0">
                                <LazyLoadImage
                                    alt={'live-stream'}
                                    effect="blur"
                                    src={livestream}
                                    placeholderSrc={livestream}
                                    className="intro-img br-50"
                                />
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center my-5">
                            <div className="separate-line-width-300"></div>
                        </div>
                        <Row>
                            <Col xs={{ span: 12, order: 2 }} md={{ span: 6, order: 1 }} className="home-page__intro__image right-side pl-sm-0">
                                <LazyLoadImage
                                    alt={'sell-ticket'}
                                    effect="blur"
                                    src={saleticket}
                                    placeholderSrc={saleticket}
                                    className="intro-img"
                                />
                            </Col>
                            <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }} className="home-page__intro__text">
                                <div className="home-page__intro__text__title text-center">
                                    {'Bring fans closer to your music or sell tickets'}
                                </div>
                                <div className="home-page__intro__text__des">
                                    {'Fans can register for your experience by:'}
                                    <ul>
                                        <li>
                                            {'Following on Spotify, YouTube or Twitch or;'}
                                        </li>
                                        <li>
                                            {'Registering via email or;'}
                                        </li>
                                        <li>
                                            {`Pre-saving albums or singles via Spotify or Apple Music (other DSP's coming soon) or;`}
                                        </li>
                                        <li>
                                            {`Buying tickets`}
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center my-5">
                            <div className="separate-line-width-300"></div>
                        </div>
                        <Row>
                            <Col xs={12} sm={6} className="home-page__intro__text justify-content-start">
                                <div className="home-page__intro__text__title">
                                    {'Bundle stuff while Fans register'}
                                </div>
                                <div className="home-page__intro__text__des">
                                    {'Fans are more willing to support artists now than ever. Offer up exclusive signed vinyl, merch and other products to increase sales during your campaign execution. '}
                                </div>
                                <div className="text-center mt-md-5">
                                    <LazyLoadImage
                                        alt={'connect-fans'}
                                        effect="blur"
                                        src={fanregister1}
                                        placeholderSrc={fanregister1}
                                        className="intro-img br-50"
                                    />
                                    <LazyLoadImage
                                        alt={'connect-fans'}
                                        effect="blur"
                                        src={fanregister2}
                                        placeholderSrc={fanregister2}
                                        className="intro-img br-50"
                                    />
                                </div>
                            </Col>
                            <div className="d-flex justify-content-center my-5 d-block d-sm-none w-100">
                                <div className="separate-line-width-300"></div>
                            </div>
                            <Col xs={12} sm={6} className="home-page__intro__image pl-sm-0 text-center">
                                <div className="home-page__intro__text__title">
                                    {`You have our full support`}
                                </div>
                                <div className="home-page__intro__text__des">
                                    {`Not only will we customise the experience for you and be there 24/7, but we will support you with our marketing team and sizeable database of music fans we've grown over the last 5+ years.`}
                                </div>
                                <div className="text-center">
                                    <LazyLoadImage
                                        alt={'live-stream'}
                                        effect="blur"
                                        src={fullsupport}
                                        placeholderSrc={fullsupport}
                                        className="intro-img br-50"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center my-5">
                            <div className="separate-line-width-300"></div>
                        </div>
                        <Row>
                            <Col xs={12} sm={12} md={6} className="home-page__intro__text">
                                <div className="home-page__intro__text__title text-center">
                                    {'Easy export'}
                                </div>
                                <div className="home-page__intro__text__des">
                                    {'Export your customer lists easily and import them into your Mailchimp or any other email service providers'}
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} className="home-page__intro__image right-side pl-sm-0">
                                <a
                                    target="_blank"
                                    href="mailto:contact@giggedin.com"
                                >
                                    <LazyLoadImage
                                        alt={'sell-ticket'}
                                        effect="blur"
                                        src={easyexport}
                                        placeholderSrc={easyexport}
                                        className="intro-img"
                                    />
                                </a>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="mt-5 pt-5">
                    <Container>
                        <Row>
                            <Col xs={12} className="about-giggedin-header mb-3">
                                <h3 className="about-giggedin-header__text">At <span className="about-giggedin-header__giggedin-name">GiggedIn</span>, we</h3>
                                <h3 className="about-giggedin-header__text">{'believe in 3 things:'}</h3>
                            </Col>
                            <Col xs={12} sm={4} md={5} className="about-giggedin-body mb-3 mb-sm-0">
                                <div className="about-giggedin-body first-block-item">
                                    <FaIcon
                                        name="faArrowRight"
                                        size={'sm'}
                                        color={'#333'}
                                    />
                                    <span className="first-block-item__text">{'More shared experiences = More fulfilment in life'}</span>
                                </div>
                                <div className="about-giggedin-body first-block-item ">
                                    <FaIcon
                                        name="faArrowRight"
                                        size={'sm'}
                                        color={'#333'}
                                    />
                                    <span className="first-block-item__text">{'Supporting artists and our industry'}</span>
                                </div>
                                <div className="about-giggedin-body first-block-item">
                                    <FaIcon
                                        name="faArrowRight"
                                        size={'sm'}
                                        color={'#333'}
                                    />
                                    <span className="first-block-item__text">{'Giving back to the community'}</span>
                                </div>
                            </Col>
                            <Col xs={12} sm={4} md={4} className="about-giggedin-body mb-3 mb-sm-0">
                                <div className="border-hor d-none d-sm-block"></div>
                                <div className="about-giggedin-body next-block-item">
                                    <span className="next-block-item__text">{`Over the past few years, GiggedIn has grown to become the #1 subscription service for live music and entertainment loved by thousands of Aussies until it all came to a screeching halt in the historic events of March 2020.`}</span>
                                </div>
                            </Col>
                            <Col xs={12} sm={4} md={3} className="about-giggedin-body mb-3 mb-sm-0">
                                <div className="border-hor"></div>
                                <div className="about-giggedin-body next-block-item">
                                    <span className="next-block-item__text">{`With all that's happened, we've turned our attention to using technology to bring artists and fans closer together both at home and across borders.`}</span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    );
};

export default Home;
