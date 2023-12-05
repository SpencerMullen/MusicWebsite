import React, { useState, useEffect } from 'react';
import EntryListBar from './EntryListBar';
import EntryListContent from './EntryListContent';

const EntryList = (props) => {
  const { entries, selectedSort, searchQuery, liveChecked, epChecked, onlyChecked, handleSortChange,
    handleSearchChange, handleLiveCheckboxChange, handleEpCheckboxChange, handleOnlyCheckboxChange } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <EntryListBar
        selectedSort={selectedSort}
        searchQuery={searchQuery}
        liveChecked={liveChecked}
        epChecked={epChecked}
        onlyChecked={onlyChecked}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
        handleLiveCheckboxChange={handleLiveCheckboxChange}
        handleEpCheckboxChange={handleEpCheckboxChange}
        handleOnlyCheckboxChange={handleOnlyCheckboxChange}
      />
      <EntryListContent
        selectedSort={selectedSort}
        searchQuery={searchQuery}
        liveChecked={liveChecked}
        epChecked={epChecked}
        onlyChecked={onlyChecked}
        entries={entries}
      />
    </div>
  );
};

export default EntryList;