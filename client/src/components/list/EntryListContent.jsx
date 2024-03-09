import React, { useEffect, useState } from 'react';
import EntryCard from './EntryCard';

const EntryListContent = (props) => {
  const { entries, scrollPosition, loaded } = props;
  
  // Scroll to previous position on first load
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [loaded]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', padding: '16px', overflowY: 'scroll' }}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default EntryListContent;