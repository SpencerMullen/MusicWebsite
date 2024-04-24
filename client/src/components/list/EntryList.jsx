import React, { useState, useEffect } from 'react';
import EntryListBar from './EntryListBar';
import EntryListContent from './EntryListContent';

const EntryList = (props) => {
  const { entries, selectedSort, searchQuery, liveChecked, epChecked, onlyChecked, reviewedChecked, handleSortChange, 
    handleSearchChange, handleLiveCheckboxChange, handleEpCheckboxChange, handleOnlyCheckboxChange, handleReviewedCheckboxChange,
     scrollPosition, loaded } = props;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <EntryListBar
        selectedSort={selectedSort}
        searchQuery={searchQuery}
        liveChecked={liveChecked}
        epChecked={epChecked}
        onlyChecked={onlyChecked}
        reviewedChecked={reviewedChecked}
        handleSortChange={handleSortChange}
        handleSearchChange={handleSearchChange}
        handleLiveCheckboxChange={handleLiveCheckboxChange}
        handleEpCheckboxChange={handleEpCheckboxChange}
        handleOnlyCheckboxChange={handleOnlyCheckboxChange}
        handleReviewedCheckboxChange={handleReviewedCheckboxChange}
      />
      <EntryListContent
        entries={entries}
        scrollPosition={scrollPosition}
        loaded={loaded}
      />
    </div>
  );
};

export default EntryList;