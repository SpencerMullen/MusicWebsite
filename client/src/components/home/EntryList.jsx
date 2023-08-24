import React from 'react';
import EntryListBar from './EntryListBar';
import EntryListContent from './EntryListContent';

const EntryList = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <EntryListBar />
      <EntryListContent style={{ flex: 1, overflowY: 'auto' }} />
    </div>
  );
};

export default EntryList;