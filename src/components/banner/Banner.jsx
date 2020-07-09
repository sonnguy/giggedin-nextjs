import React, { useState } from 'react';
import { Row, Container, Col, Button, ProgressBar } from 'react-bootstrap';
import { getImageUrl } from '../../services/imageService';
import CountDownTime from '../countDownTime/CountDownTime';
import Link from 'next/link';
import FaIcon from '../fontAwesomeIcon';
import BannerHome from './BannerHome';
import LoginModal from '../modal/LoginModal';
import { useSelector } from 'react-redux';
import { fullDate } from '../../services/utilsService';
import { toast } from 'react-toastify';
import useWebShare from 'react-use-web-share';
import { withRouter } from 'next/router';
import Router from 'next/router';

import './style.scss';

const Banner = ({ router }) => {
	const campaign = useSelector((state) => state.campaign.campaign);
	const { isSupported, share } = useWebShare();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const { pathname } = router;

	const goToCheckout = (campaign) => {
		let path = `/checkout/[id]`;
		Router.push({ pathname: path }, `/checkout/${campaign.id}`);
	};

	const getAboutTitle = () => {
		const aboutUrl = '/about-us/';
		switch (pathname) {
			case aboutUrl + 'giggedin':
				return 'ABOUT GIGGEDIN';
			case aboutUrl + 'terms-and-conditions':
				return 'TERMS AND CONDITIONS';
			case aboutUrl + 'privacy-and-policy':
				return 'PRIVACY AND POLICY';
			default:
				return 'ABOUT GIGGEDIN';
		}
	};

	const copyUrl = async () => {
		let dummy = document.createElement('input'),
			text = window.location.href;
		document.body.appendChild(dummy);
		dummy.value = text;
		dummy.select();
		document.execCommand('copy');
		document.body.removeChild(dummy);
		if (!isSupported) {
			toast.success('URL Copied', {
				containerId: 'Toast'
			});
		} else {
			share({
				title: document.title,
				text: campaign.name,
				url: text
			});
		}
	};

	if (pathname === '/') {
		return <BannerHome />;
	}

	const spots_unlimited = campaign.spots_unlimited === 1;

	return pathname !== '/artist' &&
		pathname.indexOf('/checkout') === -1 &&
		pathname.indexOf('/about-us') === -1 &&
		pathname.indexOf('/confirmation') === -1 &&
		pathname !== '/login' &&
		pathname !== '/experiences' ? (
			<div className="banner d-flex h-auto pt-4">
				{campaign && (
					<Container>
						<div className="banner-breadcumb pb-3">
							<Link href={'/'}>
								<a className="banner-breadcumb__item">
									<span className="mr-3">Home</span>
									<FaIcon name="faChevronRight" size={'sm'} color={'#ff4a32'} />
								</a>
							</Link>
							<Link href={'/experiences'}>
								<a className="banner-breadcumb__item ml-3">
									<span className="mr-3">Experiences</span>
									<FaIcon name="faChevronRight" size={'sm'} color={'#ff4a32'} />
								</a>
							</Link>
							<a className="banner-breadcumb__item active ml-3">
								{campaign.name}
							</a>
						</div>
						<div className="banner-title d-flex flex-row w-75 align-items-end mb-3">
							<h2 className="banner-title__artist-name m-0">
								{campaign.name}:
							<span className="banner-title__artist-banner-text m-0 ml-2">{campaign.headline}</span>
							</h2>
						</div>
						<div className="mt-3 banner-title__artist-des mb-4">{campaign.description}</div>
						<Row>
							<Col xs={12} sm={12} md={7} lg={8} className="pr-md-0">
								<div
									className="banner-artist-image"
									style={{
										backgroundImage: `url(${getImageUrl(campaign.banner)})`
									}}
								/>
							</Col>
							<Col xs={12} sm={12} md={5} lg={4} className="pl-md-0 mb-4 mb-md-0">
								<div className="banner-event-info px-4 py-1">
									{!spots_unlimited && (
										<div>
											<div className="event-spots mb-2">
												<span className="event-spots__number mr-1">{campaign.spots}</span>
												<span className="event-spots__text">{'Spots Left'}</span>
											</div>
											<ProgressBar className="progress-bar-cus w-100 mb-3">
												<ProgressBar variant="default" now={campaign.spots} key={1} />
											</ProgressBar>
										</div>
									)}
									<div className={`${spots_unlimited && 'mt-4 mb-3'} mb-2 pt-1`}>
										<CountDownTime end={campaign.end_time} />
									</div>
									<div className={`${spots_unlimited && 'mb-3'} text-center mb-2 pb-1`}>
										<div className="time-close-text">{'Sales will end on'}</div>
										<div className="time-close-text">{`${fullDate(campaign.end_time)}`}</div>
									</div>
									<div className="separate-line" />
									<div
										className={`${spots_unlimited &&
											'mt-3 mb-3'} banner-event-info__price-block mt-2 text-center`}
									>
										<span className="banner-event-info__price">
											{(campaign.tiers && campaign.tiers.length) > 0 &&
												`From $${campaign.tiers[0].price / 100}`}
										</span>
									</div>
									<div className="text-center mb-4 pt-2">
										<Button
											onClick={() => {
												goToCheckout(campaign);
											}}
											className="banner-event-info__claim-btn w-100 py-3"
											size="lg"
											variant="dark"
										>
											Claim your spot now
									</Button>
									</div>
									<div
										className={`${spots_unlimited &&
											'mt-5'} remind_and_share d-flex flex-row justify-content-between mb-2`}
									>
										<div className="remind-block">
											<Button
												variant="outline-primary"
												className="remind_and_share-btn w-100"
												onClick={() => {
													setShowLoginModal(true);
												}}
											>
												<div className="remind-icon">
													<FaIcon name="faBookmark" size={'lg'} />
												</div>
												{'Remind Me'}
											</Button>
										</div>
										<div className="share-block">
											<Button
												onClick={copyUrl}
												variant="outline-primary"
												className="remind_and_share-btn px-3"
											>
												<FaIcon name="faShareAlt" size={'lg'} />
											</Button>
										</div>
									</div>
								</div>
							</Col>
						</Row>
					</Container>
				)}
				<LoginModal
					showModal={showLoginModal}
					onClose={() => {
						setShowLoginModal(false);
					}}
				/>
			</div>
		) : (
			<div>
				{pathname.indexOf('/about-us') > -1 && (
					<div className="py-4 text-center">
						<div className="about-us-title">{getAboutTitle()}</div>
					</div>
				)}
			</div>
		);
};

export default withRouter(Banner);
