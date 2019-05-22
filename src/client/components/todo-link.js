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
 * Link component
 * @returns {ReactElement}
 */
const TodoLink = ({ text, onClick, status }) => {
  return (
    <div onClick={onClick}>
      <span style={{color: 'black'}}>
        {
          status === 'active' ? <span>&#9744;</span> :  <span>&#x2611;</span>
        }
      </span>
      <label style={{marginLeft: '1rem'}}>{text}</label>
    </div>
  );
};

TodoLink.propTypes = propTypes;
TodoLink.defaultProps = defaultProps;

export default TodoLink;
