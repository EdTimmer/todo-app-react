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
const Navbar = ({ filterBy, onClickFilter }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar';

  let allLinkCls = `${baseCls}__item`;
  // allLinkCls += filterBy === false ? ` ${baseCls}__item--active` : '';

  let activeLinkCls = `${baseCls}__item`;
  // activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  // completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let archivedLinkCls = `${baseCls}__item`;
  // archivedLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <NavLink
        to="/all"
        className={allLinkCls}
        activeStyle={{ fontWeight: 'bold' }}

        // activeClassName={`${baseCls}__item--active`}
        // className={`${baseCls}__item`}
        
        // style={{textDecoration: "none", marginRight: "3rem"}}
        // onClick={() => onClickFilter('')}

      >
        All
      </NavLink>

      <NavLink
        to="/active"
        className={activeLinkCls}
        activeStyle={{ fontWeight: 'bold' }}
      >
        Active
      </NavLink>  

      <NavLink
        to="/completed"
        className={completedLinkCls}
        activeStyle={{ fontWeight: 'bold' }}
      >
        Completed
      </NavLink> 

      <NavLink
        to="/archived"
        className={archivedLinkCls}
        activeStyle={{ fontWeight: 'bold' }}
      >
        Archived
      </NavLink> 


      {/*<span
        className={activeLinkCls}
        onClick={() => onClickFilter('active')}
      >
        Active
      </span>
      <span
        className={completedLinkCls}
        onClick={() => onClickFilter('completed')}
      >
        Completed
      </span>
      <span
        className={archivedLinkCls}
        onClick={() => onClickFilter('archived')}
      >
        Archived
      </span>*/}
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
