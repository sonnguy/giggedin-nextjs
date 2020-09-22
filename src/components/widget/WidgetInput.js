import React from "react";
import "./widget.scss";
import FaIcon from "../fontAwesomeIcon";

const WidgetInput = (props) => {
  const { name, icon, placeholder, onChange , value} = props;
  return (
    <>
      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="fllwr-input"
      />
      {icon && <FaIcon size={"lg"} name={'faEnvelope'} />}
    </>
  );
};

export default WidgetInput;
