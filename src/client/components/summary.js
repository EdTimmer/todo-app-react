import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};
/**
 * Prop Types
 * @private
 */
const propTypes = {
  num: PropTypes.number,
  completeAll: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  num: 0,
  completeAll: noop,
};


/**
 * Summary component
 */
const Summary = ({num, completeAll}) => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'summary';

  return (
    <div className={baseCls}>
      <span>{num} task{num === 1 ? '' : 's'} remaining</span>
      <span className="complete-all" onClick={completeAll}>Complete All</span>
    </div>
  );
};

Summary.propTypes = propTypes;
Summary.defaultProps = defaultProps;

export default Summary;
