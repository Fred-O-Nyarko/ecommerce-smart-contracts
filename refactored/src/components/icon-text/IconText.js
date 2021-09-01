import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./icon-text.css";

const IconText = ({ type, text, ...rest }) => (
  <span {...rest}>
    <Icon className="icon" type={type} />
    {text}
  </span>
);

IconText.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
};

IconText.defaultProps = {
  type: "",
  text: "",
};

export default IconText;
