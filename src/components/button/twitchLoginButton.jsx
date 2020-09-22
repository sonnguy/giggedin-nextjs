import React from 'react';
import { Button } from 'react-bootstrap';
import FaIcon from '../fontAwesomeIcon';
import './styles.scss'

const TwitchLoginButton = (props) => {
    return (
        <Button
            onClick={props.onClick}
            variant="dark"
            className={`mt-3 px-4 default-btn btn-p15 twitch-login-btn ${props.className}`}
        >
            <div className="w-100 d-flex justify-content-center align-items-center">
                <FaIcon name="faTwitch" size={"2x"} color={"#fff"} />
                <span className="twitch-login-btn__title ml-3">{props.text}</span>
            </div>
        </Button>
    )
}

export default TwitchLoginButton;