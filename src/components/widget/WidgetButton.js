import React from "react";
import "./widget.scss";
import FaIcon from "../fontAwesomeIcon";
import { Button } from "react-bootstrap";

const WidgetButton = (props) => {
  const { icon, text, onClick, type } = props;

  const getClassName = () => {
    switch (type) {
      case "spotify":
        return "fllwr-spotify-login-btn";
      case "submit":
        return "fllwr-submit-btn";
      case "facebook":
        return "fllwr-facebook-login-btn";
      default:
        return "fllwr-default-btn";
    }
  };

  const getIconName = () => {
    switch (type) {
      case "spotify":
        return "faSpotify";
        case "facebook":
          return "faFacebook";
      default:
        return "";
    }
  };

  return (
    <Button onClick={onClick} className={`fllwr-btn ${getClassName()}`}>
      <div className="fllwr-btn-block">
        {icon && <FaIcon size={"lg"} name={getIconName()} />}
        <span className="fllwr-btn-title">{text}</span>
      </div>
    </Button>
  );
};

export default WidgetButton;
