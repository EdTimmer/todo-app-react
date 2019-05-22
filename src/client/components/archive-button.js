import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  status: PropTypes.string,
  archive: PropTypes.bool,
  onClickArchive: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  status: 'active',
  archive: false,
  onClickArchive: noop,
};

/**
 * Archive button component
 */
const ArchiveButton = ({ status, archive, onClickArchive }) => {
  return (
    <span>
      {
        status === 'complete' && !archive ? <Button text="Archive" onClick={onClickArchive} /> : null
      }
    </span>
  );
};

ArchiveButton.propTypes = propTypes;
ArchiveButton.defaultProps = defaultProps;

export default ArchiveButton;
