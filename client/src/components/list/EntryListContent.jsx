import React from 'react';
import EntryCard from './EntryCard';


const EntryListContent = (props) => {
  const { entries } = props;

  // Filter entries based on search query and checkboxes
  /*const filteredEntries = entries.filter((entry) => {
    const { title, artist, type } = entry;
    const isLiveAlbum = type === 'livealbum';
    const isEP = type === 'ep';

    // Filter by search query (case insensitive)
    if (searchQuery) {
      const searchTerm = searchQuery.toLowerCase();
      if (!title.toLowerCase().includes(searchTerm) && !artist.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }

    // Filter by checkboxes
    if (onlyChecked) {
      if (!liveChecked && !epChecked) {
        return false;
      }
      if (liveChecked && !isLiveAlbum && !isEP) {
        return false; // Show only live albums when "Only?" checkbox is selected and "Live" checkbox is checked
      }
      if (epChecked && !isEP && !isLiveAlbum) {
        return false; // Show only EPs when "Only?" checkbox is selected and "EP" checkbox is checked
      }
    } else {
      // Show entries based on individual checkbox selections
      if (!liveChecked && isLiveAlbum) {
        return false; // Exclude live albums when "Live" checkbox is not checked
      }
      if (!epChecked && isEP) {
        return false; // Exclude EPs when "EP" checkbox is not checked
      }
    }

    return true;
  });

  // Sort filtered entries based on selected sort
  filteredEntries.sort((a, b) => {
    const { title: titleA, artist: artistA } = a;
    const { title: titleB, artist: artistB } = b;

    const removeThePrefix = (str) => str.replace(/^The\s+/i, '');

    if (selectedSort === 'title_asc') {
      return removeThePrefix(titleA).localeCompare(removeThePrefix(titleB));
    }
    if (selectedSort === 'title_dsc') {
      return removeThePrefix(titleB).localeCompare(removeThePrefix(titleA));
    }
    if (selectedSort === 'artist_asc') {
      const artistComparison = removeThePrefix(artistA).localeCompare(removeThePrefix(artistB));
      return artistComparison !== 0 ? artistComparison : new Date(a.releaseDate) - new Date(b.releaseDate);
    }
    if (selectedSort === 'artist_dsc') {
      const artistComparison = removeThePrefix(artistB).localeCompare(removeThePrefix(artistA));
      return artistComparison !== 0 ? artistComparison : new Date(a.releaseDate) - new Date(b.releaseDate);
    }
    if (selectedSort === 'releaseDate_asc') {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    }
    if (selectedSort === 'releaseDate_dsc') {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    }
    if (selectedSort === 'rating_asc') {
      const ratingA = a.reviewed ? a.review.rating : 11;
      const ratingB = b.reviewed ? b.review.rating : 11;
      return ratingA - ratingB;
    }
    if (selectedSort === 'rating_dsc') {
      const ratingA = a.reviewed ? a.review.rating : -1;
      const ratingB = b.reviewed ? b.review.rating : -1;
      return ratingB - ratingA;
    }
    if (selectedSort === 'reviewDate_asc') {
      const reviewDateA = a.reviewed ? a.review.reviewDate : '9999-12-31';
      const reviewDateB = b.reviewed ? b.review.reviewDate : '9999-12-31';
      return new Date(reviewDateA) - new Date(reviewDateB);
    }
    if (selectedSort === 'reviewDate_dsc') {
      const reviewDateA = a.reviewed ? a.review.reviewDate : '0001-01-01';
      const reviewDateB = b.reviewed ? b.review.reviewDate : '0001-01-01';
      return new Date(reviewDateB) - new Date(reviewDateA);
    }

    return 0;
  });*/

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', padding: '16px' }}>
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryListContent;