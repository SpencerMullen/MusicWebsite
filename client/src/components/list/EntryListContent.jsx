import React from 'react';
import EntryCard from './EntryCard';


const EntryListContent = (props) => {
  const { entries } = props;

  // Filtering and sorting logic moved to backend

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', padding: '16px' }}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryListContent;