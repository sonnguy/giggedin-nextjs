import React from 'react';
import { Container } from 'react-bootstrap';
import './style.scss';
import { withRouter } from 'next/router';

const AboutUs = ({ router }) => {
    const { slug } = router.query;
    return (
        <div className="about-us-page">
            <Container>
                <div className="py-4">
                    {
                        slug === 'giggedin' &&
                        <>

                        </>
                    }
                    {
                        slug === 'terms-and-conditions' &&
                        <>
                            <h4 className="about-us-page__title">{'TERMS AND CONDITIONS'}</h4>
                            <p className="about-us-page__des">{`Please read these terms and conditions carefully ("Terms"). These Terms govern and apply to your access and use of https://www.giggedin.com/ and services available via GiggedIn's site (collectively, the Service"). By accessing or using our Service, you agree to be bound all of the terms and conditions described in these Terms. If you do not agree to all of these terms and conditions, do not use our Service.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'USE OF THE SERVICE'}</h4>
                            <p className="about-us-page__des">{`GiggedIn allows you to discover live events around you and gets you access to events where we have arrangements, through our our site. As long as you comply with these Terms, you have the right to access and use the Service, for your own personal use. You may not: (i) copy, modify or distribute the Service for any purpose; (ii) transfer, sublicense, lease, lend, rent or otherwise distribute the Service to any third party; (iii) decompile, reverse-engineer, disassemble, or create derivative works of the Service; (iv) make the Service available to multiple users through any means; or (v) use the Service in any unlawful manner, for any unlawful purpose, or in any manner inconsistent with these Terms.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'CREATING A GIGGEDIN ACCOUNT'}</h4>
                            <p className="about-us-page__des">{`In order to access and use GiggedIn, you will need to register and create an account (your “Account”). By creating an Account, you represent that you are 18 or older, or be 13 or older and have your parent or guardian's consent to the Agreements. When creating an Account, you may be required to provide certain personal information about yourself and will establish a username and a password. You agree to provide accurate, current and complete information about your Account.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'GIGGEDIN MEMBERSHIP'}</h4>
                            <p className="about-us-page__des">{`Members receive access to credits made available by GiggedIn's promoter and venue partners. Members cannot transfer or gift credits to third parties, including other GiggedIn members. GiggedIn reserves the right to change the rules of event attendance and availability to members. GiggedIn makes no guarantee on the availability of credits for accessing events.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'GIGGEDIN MEMBERSHIP CYCLE'}</h4>
                            <p className="about-us-page__des">{`You may cancel your membership in your settings. Membership fees are non-refundable. When you cancel your membership, the upcoming event credits you have will also be cancelled.`}</p>
                        </>
                    }
                    {
                        slug === 'privacy-and-policy' &&
                        <>
                            <h4 className="about-us-page__title">{'TERMS AND CONDITIONS'}</h4>
                            <p className="about-us-page__des">{`Please read these terms and conditions carefully ("Terms"). These Terms govern and apply to your access and use of https://www.giggedin.com/ and services available via GiggedIn's site (collectively, the Service"). By accessing or using our Service, you agree to be bound all of the terms and conditions described in these Terms. If you do not agree to all of these terms and conditions, do not use our Service.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'TERMS AND CONDITIONS'}</h4>
                            <p className="about-us-page__des">{`Please read these terms and conditions carefully ("Terms"). These Terms govern and apply to your access and use of https://www.giggedin.com/ and services available via GiggedIn's site (collectively, the Service"). By accessing or using our Service, you agree to be bound all of the terms and conditions described in these Terms. If you do not agree to all of these terms and conditions, do not use our Service.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'TERMS AND CONDITIONS'}</h4>
                            <p className="about-us-page__des">{`Please read these terms and conditions carefully ("Terms"). These Terms govern and apply to your access and use of https://www.giggedin.com/ and services available via GiggedIn's site (collectively, the Service"). By accessing or using our Service, you agree to be bound all of the terms and conditions described in these Terms. If you do not agree to all of these terms and conditions, do not use our Service.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'TERMS AND CONDITIONS'}</h4>
                            <p className="about-us-page__des">{`Please read these terms and conditions carefully ("Terms"). These Terms govern and apply to your access and use of https://www.giggedin.com/ and services available via GiggedIn's site (collectively, the Service"). By accessing or using our Service, you agree to be bound all of the terms and conditions described in these Terms. If you do not agree to all of these terms and conditions, do not use our Service.`}</p>
                            <div className="separate-line my-4"></div>
                            <h4 className="about-us-page__title">{'TERMS AND CONDITIONS'}</h4>
                            <p className="about-us-page__des">{`Please read these terms and conditions carefully ("Terms"). These Terms govern and apply to your access and use of https://www.giggedin.com/ and services available via GiggedIn's site (collectively, the Service"). By accessing or using our Service, you agree to be bound all of the terms and conditions described in these Terms. If you do not agree to all of these terms and conditions, do not use our Service.`}</p>
                        </>
                    }
                </div>
            </Container>
        </div>
    )
}

export default withRouter(AboutUs);