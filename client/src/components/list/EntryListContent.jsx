import React from 'react';
import EntryCard from './EntryCard';

// Sample data for testing
const sampleData = [
  {
    id: 1,
    type: 'album',
    title: 'The Idler Wheel Is Wiser Than the Driver of the Screw and Whipping Cords Will Serve You More Than Ropes Will Ever Do WOOOOOOOOOOW',
    artist: 'Fiona MFING APPLE SHE MAKES THE NAMES TOO DAMN LONG WTF',
    releaseDate: '2022-01-15',
    genre: 'Folk',
    cover: {
      url: 'pizzapie.com',
      fileName: "EITHEROR"
    }
  },
];

for(let i = 0; i < 100; i++) {
  sampleData.push({
    id: i + 2,
    type: 'album',
    title: 'Sample Entry ' + (i + 2),
    artist: 'Sample Artist ' + (i + 2),
    releaseDate: '2022-01-15',
    cover: {
      url: 'facbook.com',
      fileName: "VBIRD"
    }
  });
}

const EntryListContent = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', padding: '16px' }}>
      {sampleData.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryListContent;