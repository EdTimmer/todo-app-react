import React from 'react';
import Button from './button';

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

export default ReviveButton;
