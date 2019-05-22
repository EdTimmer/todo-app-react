import PropTypes from 'prop-types';
import React from 'react';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  status: PropTypes.string,
  archive: PropTypes.bool,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  status: 'active',
  archive: false,
};

/**
 * Archived notice component
 */

const ArchivedNotice = ({ status, archive }) => {
  return (
    <span>
      {
        status === 'complete' && archive ? <span className="archived-status">archived</span> : null
      }
    </span>
  );
};

ArchivedNotice.propTypes = propTypes;
ArchivedNotice.defaultProps = defaultProps;

export default ArchivedNotice;
