import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
 */
const Summary = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'summary';

  return (
    <div className={baseCls}>
    SUMMARY
      {/*<Link className="header-link" to="/">MyTodos</Link>*/}
    </div>
  )
};

export default Summary;
