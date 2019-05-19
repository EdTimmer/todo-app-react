import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
 */
const Summary = (num) => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'summary';
console.log('num is: ', num)
  return (
    <div className={baseCls}>
      <span>{num.num} task{num.num === 1 ? '' : 's'} remaining</span>
      
      {/*<Link className="header-link" to="/">MyTodos</Link>*/}
    </div>
  )
};

export default Summary;
