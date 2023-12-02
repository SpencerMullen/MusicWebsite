import React, { useState, useEffect } from 'react';
import EntryListBar from './EntryListBar';
import EntryListContent from './EntryListContent';

const EntryList = (props) => {
  const { entries } = props;
  const [selectedSort, setSelectedSort] = useState(localStorage.getItem('selectedSort') || 'artist_asc');
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [liveChecked, setLiveChecked] = useState(
    localStorage.getItem('liveChecked') !== 'false'
  );
  const [epChecked, setEpChecked] = useState(
    localStorage.getItem('epChecked') !== 'false'
  );
  const [onlyChecked, setOnlyChecked] = useState(localStorage.getItem('onlyChecked') === 'true' || false);

  useEffect(() => {
    // Update localStorage when state values change
    localStorage.setItem('selectedSort', selectedSort);
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('liveChecked', liveChecked);
    localStorage.setItem('epChecked', epChecked);
    localStorage.setItem('onlyChecked', onlyChecked);
  }, [selectedSort, searchQuery, liveChecked, epChecked, onlyChecked]);

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