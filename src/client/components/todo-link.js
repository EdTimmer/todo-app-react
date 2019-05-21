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
  /**
   * Base CSS class
   */
  const baseCls = 'todo-link';

  return (
    <div className={baseCls} onClick={onClick}>
        <input
          type="checkbox"
          checked={status === 'active' ? '' : 'checked'}
          readOnly
        />
        {/*<label className="checkbox-container">
          <input
            type="checkbox"
            checked={status === 'active' ? '' : 'checked'}
            readOnly
          />
          <span className="checkmark" />
      </label>*/}
        <label style={{marginLeft: '1rem'}}>{text}</label>
    </div>
  );
};

TodoLink.propTypes = propTypes;
TodoLink.defaultProps = defaultProps;

export default TodoLink;
