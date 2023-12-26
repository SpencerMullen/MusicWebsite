import React, { useEffect, useRef } from 'react';
import EntryCard from './EntryCard';

const EntryListContent = (props) => {
  const { entries } = props;

  // Create a ref for the scrolling container
  const scrollRef = useRef(null);

  // Restore scroll position on mount
  useEffect(() => {
    const savedScrollPosition = localStorage.getItem('entryListScrollPosition');
    if (scrollRef.current && savedScrollPosition) {
      scrollRef.current.scrollTop = savedScrollPosition;
    }
  }, []);

  // Save scroll position when unmounting
  useEffect(() => {
    return () => {
      localStorage.setItem('entryListScrollPosition', scrollRef.current.scrollTop);
    };
  }, []);

  return (
    <div ref={scrollRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', padding: '16px', overflowY: 'auto' }}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryListContent;