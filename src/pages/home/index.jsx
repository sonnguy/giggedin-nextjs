import React, { useEffect } from 'react';
import './style.scss';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import upcomingExperienceImage from '../../../public/images/upcoming-experience.png';
import CountDownTime from '../../components/countDownTime/CountDownTime';
import supportact from '../../../public/images/support-act.png';
import arrow from '../../../public/images/home-arrow-right.svg';
import horiline from '../../../public/images/hori-line.svg';
import { getCampaign } from '../../actions/campaignAction';
import { fullDate, getSlugName } from '../../services/utilsService';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Mixpanel from '../../tracking/mixpanel';
import GA from '../../tracking/ga';
import bgImage from '../../../public/images/home-artist-image.png';
import Router from 'next/router';

const Home = () => {
    const campaign = useSelector((state) => state.campaign.campaign);

    const dispatch = useDispatch();

    const getCampaignFn = (id) => dispatch(getCampaign(id));

    const goToCampaign = () => {
        const slug = getSlugName(campaign.artists[0].name);
        let path = `/experience/[slug]`;
        Router.push({ pathname: path }, `/experience/${slug}-${campaign.id}`);
    };

    const spots_unlimited = campaign.spots_unlimited === 1;

    useEffect(() => {
        Mixpanel.pageView('View_Exp_Homepage');
        GA.pageView();
        getCampaignFn(3);
    }, []);

    return (
        <>
            <style JSX>
                {`
					.home-page {
						background-image: url('` + bgImage + `')
					}
				`}
            </style>
            {
                campaign && (
                    <div className="home-page h-auto">
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
                                    <LazyLoadImage
                                        alt={'support-act'}
                                        effect="blur"
                                        src={supportact}
                                        placeholderSrc={supportact}
                                        className="support-act-img"
                                    />
                                    <div className="home-page__support-act p-3 p-sm-5">
                                        <div className="home-page__support-act__artist-name mt-4">{campaign.name}</div>
                                        <div className="home-page__support-act__campaign-name mt-1">{campaign.headline}</div>
                                        <div className="home-page__support-act__campaign-des mt-4">{campaign.description}</div>
                                        <div className="home-page__support-act__campaign-info mt-5">
                                            {!spots_unlimited && (
                                                <div className="campaign-spots mb-2">
                                                    <span className="campaign-spots__number mr-1">{campaign.spots}</span>
                                                    <span className="campaign-spots__text">{'Spots Left'}</span>
                                                </div>
                                            )}

                                            <div className={`${spots_unlimited && 'mt-5 pt-3'} mb-2 pt-1`}>
                                                <CountDownTime end={campaign.end_time} />
                                            </div>
                                            <div className={`mb-2 pb-1`}>
                                                <div className="time-close-text">
                                                    {`Sales will end on ${fullDate(campaign.end_time)}`}
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between mt-5">
                                                <div onClick={goToCampaign} className="claim-spot-now">
                                                    <span>{'Claim a Spot Now'}</span>
                                                    <div className="pngwing-line" />
                                                </div>
                                                {/* <div className="share-icon">
                                        <FaIcon name="faPaperPlane" size={'lg'} color={'#fff'} />
                                    </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs={12} md={6} className="mt-3 mt-md-0">
                                    <div className="start-campaign d-flex pl-4">
                                        <div className="start-campaign__content pb-5">
                                            <Image src={horiline} className="start-campaign-hori-line" />
                                            <div className="start-campaign__content__des ml-4 pl-2">
                                                {`“Can’t wait for this super fun night and to see you all” - Ali Barter`}
                                            </div>
                                            <div
                                                onClick={goToCampaign}
                                                className="start-campaign__content__text mt-4 ml-4 pl-2"
                                            >
                                                {'More info'}
                                                <Image src={arrow} className="start-campaign-img ml-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            }
        </>
    );
};

export default Home;
