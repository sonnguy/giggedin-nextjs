import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Campaign from '../../components/campaign/campaign';
import { useDispatch, useSelector } from 'react-redux';
import { getCampaigns } from '../../actions/campaignAction'
import Mixpanel from '../../tracking/mixpanel';
import GA from '../../tracking/ga';
import Router from 'next/router';
import { getSlugName } from '../../services/utilsService';

const Experiences = () => {
    const campaigns = useSelector((state) => state.campaign.campaigns);
    const dispatch = useDispatch();

    const getExperiencesFn = () => dispatch(getCampaigns());

    const goToCampaign = (campaign) => {
        const slug = getSlugName(campaign.name);
        let path = `/experience/[slug]`;
        Router.push({ pathname: path }, `/experience/${slug}-${campaign.id}`);
    }

    useEffect(() => {
        Mixpanel.pageView();
        GA.pageView();
        getExperiencesFn();
    }, [])

    return (
        <Container className="artist-list-list-content mt-4">
            <Row>
                {
                    campaigns && <CampaignItems campaigns={campaigns} goToCampaign={goToCampaign} />
                }
            </Row>
        </Container>
    )
}

const CampaignItems = ({ campaigns, goToCampaign }) => {
    return (
        campaigns.map((campaign, index) => {
            return (
                <Col xs={12} sm={4} md={4} lg={3} key={index}>
                    <Campaign campaign={campaign} onPress={() => { goToCampaign(campaign) }} />
                </Col>
            )
        })
    )
}


export default Experiences