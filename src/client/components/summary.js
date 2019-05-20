import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
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
      <span style={{marginLeft: '2rem', color: 'blue'}} onClick={completeAll}>Complete all</span>
    </div>
  )
};

export default Summary;
