import React from 'react';
import EntryCard from './EntryCard';
import axios from 'axios';
import { useState, useEffect } from 'react';


const EntryListContent = (props) => {
  const { selectedSort, searchQuery, liveChecked, epChecked, onlyChecked, entries } = props;

  // Filter entries based on search query and checkboxes
  const filteredEntries = entries.filter((entry) => {
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

    if (selectedSort === 'title') {
      return titleA.localeCompare(titleB);
    }
    if (selectedSort === 'artist') {
      return artistA.localeCompare(artistB);
    }
    if (selectedSort === 'releaseDate') {
      return new Date(a.releaseDate) - new Date(b.releaseDate);
    }
    if (selectedSort === 'rating') {
      const ratingA = a.review?.rating || 11;
      const ratingB = b.review?.rating || 11;
      return ratingA - ratingB;
    }
    if (selectedSort === 'reviewDate') {
      const reviewDateA = a.review?.reviewDate || '9999-99-99';
      const reviewDateB = b.review?.reviewDate || '9999-99-99';
      return new Date(reviewDateB) - new Date(reviewDateA);
    }

    return 0;
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', padding: '16px' }}>
      {filteredEntries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryListContent;