import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ text, onClick }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'button';

  return (
    <button type="submit" className={baseCls} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
