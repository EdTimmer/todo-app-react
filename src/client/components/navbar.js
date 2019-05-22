import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ archiveAllCompleted }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar';

  const linkCls = `${baseCls}__item`;

  return (
    <div className={baseCls}>
      <div className="navbar-links">
        <NavLink
          to="/all"
          className={linkCls}
          activeStyle={{ fontWeight: 'bold' }}
        >
          All
        </NavLink>

        <NavLink
          to="/active"
          className={linkCls}
          activeStyle={{ fontWeight: 'bold' }}
        >
          Active
        </NavLink>

        <NavLink
          to="/completed"
          className={linkCls}
          activeStyle={{ fontWeight: 'bold' }}
        >
          Completed
        </NavLink>

        <NavLink
          to="/archived"
          className={linkCls}
          activeStyle={{ fontWeight: 'bold' }}
        >
          Archived
        </NavLink>
      </div>
      <div className="navbar-button">
        <button type="submit" onClick={archiveAllCompleted}>Archive all completed</button>
      </div>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
