import React from 'react';
import Button from './button';

const ArchiveButton = ({ status, archive, onClickArchive }) => {
  return (
    <span>
      {
        status === 'complete' && !archive ? <Button text="Archive" onClick={onClickArchive} /> : null
      }
    </span>
  );
};

export default ArchiveButton;
