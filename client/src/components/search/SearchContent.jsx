import React from "react";
import ReleaseCard from "./ReleaseCard";

const SearchContent = ({ searchResults, open, openDialog, onClose, setEntry }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', padding: '16px' }}>
      {searchResults.map((release) => (
        <ReleaseCard key={release.id} release={release} open={open} openDialog={openDialog} onClose={onClose} setEntry={setEntry} />
      ))}
    </div>
  );
};

export default SearchContent;