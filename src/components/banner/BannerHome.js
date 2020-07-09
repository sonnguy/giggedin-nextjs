import React from 'react';
import { Container, Image } from 'react-bootstrap';
import arrow from '../../../public/images/home-arrow-down.svg';
import './style.scss';

const BannerHome = () => {
	const arrowClick = () => {
		const bannerH = document.querySelector('.banner-home').clientHeight;
		window.scrollTo({ top: bannerH + 108, behavior: 'smooth' });
	};

	return (
		<div className="banner d-flex align-items-center justify-content-between flex-column banner-home pb-0">
			<Container className="text-center d-flex align-items-center banner-home-container">
				<div className="banner-home-text-block">
					<div className="banner-home-text">
						Bringing{' '}
						<span className="banner-home-text-bolder">
							Artists <div className="pngwing-line" />
						</span>{' '}
						&{' '}
						<span className="banner-home-text-bolder">
							Fans <div className="pngwing-line" />
						</span>{' '}
						closer together
					</div>
					{/* <div className="banner-home-text">through virtual experiences</div> */}
				</div>
			</Container>
			<Image onClick={arrowClick} src={arrow} className="banner-home-arrow-img py-4 mb-2" />
		</div>
	);
};

export default BannerHome;
