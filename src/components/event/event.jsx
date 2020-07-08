import React from 'react';
import { Image } from 'react-bootstrap';
import eventImage from 'public/static/images/homepage_bg_hero.jpg';
import './style.scss';

const Event = (props) => {
	const { event } = props;
	return (
		<div className="event">
			<div className="event-image">
				<Image src={eventImage} className="event-image__img" fluid />
			</div>
			<div className="event-date pt-3 pb-2 d-flex d-flex-row align-items-center">
				<div className="event-date__day">{event.day}</div>
				<div className="event-date__time-and_month">
					<div className="event-date__time">{event.time}</div>
					<div className="event-date__month">{event.month}</div>
				</div>
			</div>
			<div className="event-info py-3">
				<div className="event-info__name">{event.eventName}</div>
				<div className="event-info__address">{event.address}</div>
			</div>
		</div>
	);
};

export default Event;
