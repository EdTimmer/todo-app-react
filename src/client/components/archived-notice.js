import React from 'react';

const ArchivedNotice = ({ status, archive }) => {
  return (
    <span>
      {
        status === 'complete' && archive ? <span className="archived-status">archived</span> : null
      }
    </span>
  );
};

export default ArchivedNotice;
