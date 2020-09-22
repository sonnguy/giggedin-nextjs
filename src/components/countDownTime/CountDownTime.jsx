import React from 'react';
import Countdown from 'react-countdown';
import './style.scss'

const CountDownTime = (props) => {
    const { end, isPaid } = props;
    const timeCountDown = new Date(end * 1000);
    const Completion = () => <div className="campaign-close-text">This Experience has passed</div>;

    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            return <Completion />;
        } else {
            return (
                <div className="banner-countdown-timer">
                    <div className={`d-flex d-flex-row ${isPaid ? "justify-content-center" : "justify-content-between"}`}>
                        <div className={`banner-countdown-timer__item ${isPaid && "is-paid"}`}>
                            <div className="big-number active">
                                {days}
                            </div>
                            <div className="small-text">
                                {'Days'}
                            </div>
                        </div>
                        <div className={`banner-countdown-timer__item ${isPaid && "is-paid"}`}>
                            <div className="big-number">
                                {hours}
                            </div>
                            <div className="small-text">
                                {'Hours'}
                            </div>
                        </div>
                        <div className={`banner-countdown-timer__item ${isPaid && "is-paid"}`}>
                            <div className="big-number">
                                {minutes}
                            </div>
                            <div className="small-text">
                                {'Mins'}
                            </div>
                        </div>
                        <div className={`banner-countdown-timer__item ${isPaid && "is-paid"}`}>
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