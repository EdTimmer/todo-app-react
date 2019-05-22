import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  archive: PropTypes.bool,
  onClickArchive: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  archive: false,
  onClickArchive: noop,
};

/**
 * Revive button component
 */
const ReviveButton = ({ archive, onClickRevive }) => {
  return (
    <span>
      {
        archive ? (
          <Button text="Revive" onClick={onClickRevive} />
          ) : null
      }
    </span>
  );
};

ReviveButton.propTypes = propTypes;
ReviveButton.defaultProps = defaultProps;

export default ReviveButton;
