import React, { useState } from 'react';
import EntryListBar from './EntryListBar';
import EntryListContent from './EntryListContent';

const EntryList = (props) => {
  const { entries } = props;
  const [selectedSort, setSelectedSort] = useState('artist');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveChecked, setLiveChecked] = useState(true);
  const [epChecked, setEpChecked] = useState(true);
  const [onlyChecked, setOnlyChecked] = useState(false);

  // Pass state values and update functions as props to EntryListBar
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLiveCheckboxChange = (event) => {
    setLiveChecked(event.target.checked);
  };

  const handleEpCheckboxChange = (event) => {
    setEpChecked(event.target.checked);
  };

  const handleOnlyCheckboxChange = (event) => {
    setOnlyChecked(event.target.checked);
  };

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