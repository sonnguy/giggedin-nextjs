import React from 'react';
import Countdown from 'react-countdown';
import './style.scss'

const CountDownTime = (props) => {
    const { end } = props;
    const timeCountDown = new Date(end * 1000);
    const Completionist = () => <div className="campaign-close-text">Campaign have been closed</div>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completionist />;
        } else {
            return (
                <div className="banner-countdown-timer">
                    <div className="d-flex d-flex-row justify-content-between">
                        <div className="banner-countdown-timer__item">
                            <div className="big-number active">
                                {days}
                            </div>
                            <div className="small-text">
                                {'Days'}
                            </div>
                        </div>
                        <div className="banner-countdown-timer__item">
                            <div className="big-number">
                                {hours}
                            </div>
                            <div className="small-text">
                                {'Hours'}
                            </div>
                        </div>
                        <div className="banner-countdown-timer__item">
                            <div className="big-number">
                                {minutes}
                            </div>
                            <div className="small-text">
                                {'Mins'}
                            </div>
                        </div>
                        <div className="banner-countdown-timer__item">
                            <div className="big-number">
                                {seconds}
                            </div>
                            <div className="small-text">
                                {'Secs'}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    };

    return (
        end ?
            <Countdown
                date={timeCountDown}
                renderer={renderer}
            />
            : <></>
    )
}

export default CountDownTime;