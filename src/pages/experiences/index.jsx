import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Campaign from '../../components/campaign/campaign';


import Router from 'next/router';
import { getSlugName } from '../../services/utilsService';

const Experiences = ({ experiences }) => {

    const goToCampaign = (campaign) => {
        const slug = `${getSlugName(campaign.name)}-${getSlugName(campaign.headline)}-${campaign.id}`;
        let path = `/experience/[slug]`;
        Router.push({ pathname: path }, `/experience/${slug}`);
    }

    useEffect(() => {
        // const ReactPixel = require('react-facebook-pixel').default;
        // ReactPixel.track('ViewContent', { page: 'Experiences_Page' });
        // Mixpanel.pageView("View_Exp_Experiences");
        // GA.pageView();
    }, [])

    return (
        <Container className="artist-list-list-content mt-4">
            <Row>
                {
                    experiences && <CampaignItems experiences={experiences} goToCampaign={goToCampaign} />
                }
            </Row>
        </Container>
    )
}

const CampaignItems = ({ experiences, goToCampaign }) => {
    return (
        experiences.map((campaign, index) => {
            return (
                <Col xs={12} sm={4} md={4} lg={3} key={index}>
                    <Campaign campaign={campaign} onPress={() => { goToCampaign(campaign) }} />
                </Col>
            )
        })
    )
}


export default Experiences