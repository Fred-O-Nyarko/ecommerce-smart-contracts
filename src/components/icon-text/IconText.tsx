import React from 'react';
import PropTypes from 'prop-types';
import  Icon  from '@ant-design/icons';
import  './icon-text.css';

interface IconProps{
  type: string;
  text: string;
  onClick: any
}
const IconText = ({ type, text, onClick, ...rest }: IconProps) => (
  <span {...rest}>
    <Icon className="icon" type={type} onClick={onClick}/>
    {text}
  </span>
);

IconText.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
};

IconText.defaultProps = {
  type: '',
  text: '',
};

export default IconText;
