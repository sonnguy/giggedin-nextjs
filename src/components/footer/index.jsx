/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FaIcon from '../fontAwesomeIcon';
import footerImage from '../../../public/images/footer-image.png';
import rectangle from '../../../public/images/rectangle.png';
import './style.scss';
import Link from 'next/link';

const Footer = () => {
	return (
		<Container className="page-footer">
			<div className="py-4">
				<img className="seperate-img" src={rectangle} alt="" />
			</div>
			<Row className="d-flex align-items-center">
				<Col sm={12} lg={3} md={3} className="d-flex justify-content-center">
					<img src={footerImage} alt="" className="page-footer-img" />
				</Col>
				<Col sm={12} lg={9} md={9} className="border-bottom-cus pb-4">
					<Row>
						<Col sm={12} lg={3} md={3} className="d-flex justify-content-center justify-content-md-start">
							<div className="mb-3">
								<h6 className="page-footer__item__main-text font-weight-bold">About</h6>
								<Link href={{ pathname: '/about-us/[slug]' }} as="/about-us/giggedin">
									<a className="page-footer__item__sub-text">About Us</a>
								</Link>
								<Link href={{ pathname: '/about-us/[slug]' }} as={'/about-us/terms-and-conditions'} >
									<a className="page-footer__item__sub-text">Term of Service</a>
								</Link>
								<Link href={{ pathname: '/about-us/[slug]' }} as={'/about-us/privacy-and-policy'}  >
									<a className="page-footer__item__sub-text">Privacy Policy</a>
								</Link>
							</div>
						</Col>
						<Col
							sm={12}
							lg={3}
							md={3}
							className="d-flex justify-content-center justify-content-md-start pl-0"
						>
							<div>
								<h6 className="page-footer__item__main-text font-weight-bold">Support</h6>
								<Link href={{ pathname: '/about-us/[slug]' }} as={'/about-us/giggedin'}>
									<a className="page-footer__item__sub-text">Contact Us</a>
								</Link>
								<Link href={{ pathname: '/about-us/[slug]' }} as={'/about-us/giggedin'}>
									<a className="page-footer__item__sub-text">SMS Support</a>
								</Link>
							</div>
						</Col>
					</Row>
				</Col>
			</Row>
			<Row>
				<Col xs={6} lg={3} md={3} className="d-flex align-items-center justify-content-center">
					{/* <Link href={'/about-us/giggedin'} className="page-footer__social-icon">
                            <FaIcon name="faFacebook" size={'sm'} color={'#ff4a32'} />
                        </Link>
                        <Link href={'/about-us/giggedin'} className="page-footer__social-icon">
                            <FaIcon name="faTwitter" size={'sm'} color={'#ff4a32'} />
                        </Link>
                        <Link href={'/about-us/giggedin'} className="page-footer__social-icon">
                            <FaIcon name="faInstagram" size={'sm'} color={'#ff4a32'} />
                        </Link> */}
				</Col>
				<Col
					xs={6}
					lg={9}
					md={9}
					className="d-flex align-items-center justify-content-center justify-content-sm-start"
				>
					{/* <h6 className="page-footer__app__main-text font-weight-bold d-md-block d-none">
                            Get the app on:
					</h6>
                        <Link href={'/about-us/giggedin'} className="page-footer__app-icon text-center">
                            <FaIcon name="faApple" size={'sm'} color={'#ff4a32'} />
                            <div className="page-footer__app-icon__text">IOS</div>
                        </Link>
                        <Link href={'/about-us/giggedin'} className="page-footer__app-icon text-center">
                            <FaIcon name="faGooglePlay" size={'xs'} color={'#ff4a32'} />
                            <div className="page-footer__app-icon__text">Android</div>
                        </Link> */}
				</Col>
			</Row>
		</Container>
	);
};
export default Footer;
