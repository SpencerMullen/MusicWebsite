import React, { useEffect, useRef } from 'react';
import EntryCard from './EntryCard';

const EntryListContent = (props) => {
  const { entries, scrollPosition } = props;

  // Scroll to previous position
  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [entries]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', padding: '16px', overflowY: 'scroll' }}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
}

export default EntryListContent;