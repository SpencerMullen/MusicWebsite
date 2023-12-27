import React, { useEffect, useState } from 'react';
import EntryCard from './EntryCard';

const EntryListContent = (props) => {
  const { entries, scrollPosition } = props;

  // Used to set scroll position on initial load
  const [loaded, setLoaded] = useState(false);

  // Scroll to previous position
  useEffect(() => {
    if(loaded) {
      window.scrollTo(0, scrollPosition);
    }
  }, [loaded, scrollPosition]);

  // Set loaded to true after first render
  useEffect(() => {
    setLoaded(true);
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