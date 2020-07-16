import React from 'react';
import './style.scss';
import { getImageUrl } from '../../services/imageService';

const Campaign = (props) => {
    const { campaign, onPress } = props;

    return (
        <div onClick={onPress} className="campaign">
            <div className="campaign-image">
                <div className="campaign__image background-image-responsive" style={{
                    backgroundImage: `url(${getImageUrl(campaign.banner)})`
                }}>
                </div>
            </div>
            <div className="campaign-info py-3">
                <div className="campaign-info__name">
                    {campaign.name}
                </div>
                <div className="campaign-info__event py-2">
                    {campaign.headline}
                </div>
                <div className="campaign-info__des py-2">
                    {campaign.description}
                </div>
            </div>
        </div>
    )
}

export default Campaign;