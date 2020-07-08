import React from 'react';
import './style.scss';
import { getImageUrl } from '../../services/imageService';
import FaIcon from '../fontAwesomeIcon';
import { useHistory } from 'react-router-dom';

const Artist = (props) => {
    const history = useHistory();
    const { artist } = props;

    const goToArtist = () => {
        let path = `/artist/${artist.slug}`;
        history.push(path);
    }
    return (
        <div onClick={goToArtist} className="artist">
            <div className="artist-image">
                <div className="artist__image" style={{
                    backgroundImage: `url(${getImageUrl(artist.slug)})`
                }}>
                    <div className="artist__social">
                        <a onClick={(e) => { e.stopPropagation() }} href={artist.facebookLink} target="_blank" className="social-item" rel="noopener noreferrer">
                            <FaIcon name="faFacebook" size={'lg'} color={'#fff'} />
                        </a>
                        <a onClick={(e) => { e.stopPropagation() }} href={artist.twitterLink} target="_blank" className="social-item" rel="noopener noreferrer">
                            <FaIcon name="faTwitter" size={'lg'} color={'#fff'} />
                        </a>
                        <a onClick={(e) => { e.stopPropagation() }} href={artist.instagramLink} target="_blank" className="social-item" rel="noopener noreferrer">
                            <FaIcon name="faInstagram" size={'lg'} color={'#fff'} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="artist-info py-3">
                <div className="artist-info__name">
                    {artist.artistName}
                </div>
                <div className="artist-info__event py-2">
                    {artist.bannerSecondText}
                </div>
                <div className="artist-info__des py-2">
                    {artist.bannerFourText}
                </div>
            </div>
        </div>
    )
}

export default Artist;