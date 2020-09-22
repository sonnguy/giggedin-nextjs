import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import {
  faFilter,
  faSearch,
  faMapMarkerAlt,
  faPaperPlane,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faHeart,
  faExclamationTriangle,
  faArrowRight,
  faCamera,
  faEnvelope,
  faGlobe,
  faPhone,
  faPhoneAlt,
  faUser,
  faTicketAlt,
  faMicrophone,
  faCalendarAlt,
  faCommentAlt,
  faBookmark,
  faLongArrowAltRight,
  faFireAlt,
  faCheckCircle,
  faCopy,
  faShareAlt,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons';

import {
  faApple,
  faAndroid,
  faGooglePlay,
  faFacebookF,
  faFacebook,
  faTwitter,
  faInstagram,
  faSpotify,
  faSoundcloud,
  faYoutube,
  faTwitch
} from '@fortawesome/free-brands-svg-icons';

const icons = {
  faFilter,
  faSearch,
  faMapMarkerAlt,
  faPaperPlane,
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faHeart,
  faExclamationTriangle,
  faArrowRight,
  faApple,
  faAndroid,
  faGooglePlay,
  faFacebookF,
  faFacebook,
  faYoutube,
  faTwitter,
  faInstagram,
  faSpotify,
  faCamera,
  faEnvelope,
  faSoundcloud,
  faGlobe,
  faPhone,
  faPhoneAlt,
  faUser,
  faTicketAlt,
  faMicrophone,
  faCalendarAlt,
  faCommentAlt,
  faBookmark,
  faLongArrowAltRight,
  faFireAlt,
  faCheckCircle,
  faCopy,
  faShareAlt,
  faTwitch,
  faLongArrowAltLeft
};

class FaIcon extends React.Component {
  render() {
    const { name, size, color } = this.props;
    return <FontAwesomeIcon icon={icons[name]} size={size} color={color} />;
  }
}

export default FaIcon;
