import React from "react";
import PropTypes from "prop-types";

/**
 * @name Button
 * @param {object} props - object containing values for the button attribute
 * @returns Returns a button element
 */
const Button = props => {
  const { name, className, value, type, disabled, onClick } = props;
  return (
    <button
      name={name}
      className={className}
      value={value}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

/**
 * @name defaultProps
 * @property {Bool} disabled - disable the button
 * @property {String} type -button type
 */
Button.defaultProps = {
  type: "button",
  disabled: false
};

/**
 * @name propTypes
 * @property {String} name - The name of the Button
 * @property {string} type the type of button
 * @property {String} className - The ClassName of the button for styling
 * @property {String} value - The initial value of the button / child element of the button
 * @property {Bool} disabled - disable the button
 * @property {Func} onClick -  the event handler to be called when the user clicks the button
 */
Button.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

export default Button;
