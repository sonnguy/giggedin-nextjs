import React from 'react';
import { Button } from 'react-bootstrap';
import FaIcon from '../fontAwesomeIcon';
import './styles.scss'

const SpotifyLoginButton = (props) => {
    return (
        <Button
            onClick={props.onClick}
            variant="dark"
            className={`mt-3 px-4 default-btn btn-p15 spotify-login-btn ${props.className}`}
        >
            <div className="w-100 d-flex justify-content-center align-items-center">
                <FaIcon name="faSpotify" size={"2x"} color={"#fff"} />
                <span className="spotify-login-btn__title ml-3">{props.text}</span>
            </div>
        </Button>
    )
}

export default SpotifyLoginButton;