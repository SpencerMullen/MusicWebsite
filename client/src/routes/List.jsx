import React from 'react';
import Grid from '@mui/material/Grid';
import TopBanner from '../components/list/TopBanner.jsx';
import EntryList from '../components/list/EntryList.jsx';
import { useState, useEffect } from 'react';
import { getEntries } from '../utils/requestUtils';

function ListPage({ userStatus }) {
  const [entries, setEntries] = useState([]);

  const [selectedSort, setSelectedSort] = useState(localStorage.getItem('selectedSort') || 'artist_asc');
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [liveChecked, setLiveChecked] = useState(
    localStorage.getItem('liveChecked') !== 'false'
  );
  const [epChecked, setEpChecked] = useState(
    localStorage.getItem('epChecked') !== 'false'
  );
  const [onlyChecked, setOnlyChecked] = useState(localStorage.getItem('onlyChecked') === 'true' || false);

  useEffect(() => {
    // Update localStorage when state values change
    localStorage.setItem('selectedSort', selectedSort);
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('liveChecked', liveChecked);
    localStorage.setItem('epChecked', epChecked);
    localStorage.setItem('onlyChecked', onlyChecked);
  }, [selectedSort, searchQuery, liveChecked, epChecked, onlyChecked]);

  // Pass state values and update functions as props to EntryList
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleLiveCheckboxChange = (event) => {
    setLiveChecked(event.target.checked);
  };
  const handleEpCheckboxChange = (event) => {
    setEpChecked(event.target.checked);
  };
  const handleOnlyCheckboxChange = (event) => {
    setOnlyChecked(event.target.checked);
  };

  const fetchData = async () => {
    const filters = {
      selectedSort,
      searchQuery,
      liveChecked,
      epChecked,
      onlyChecked,
    };

    const newEntries = await getEntries(filters);
    setEntries(newEntries);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render the top banner for creating new entries if the user is an admin
  const topBannerRender = () => {
    if (!userStatus.isAuthenticated) return null;
    const isAdmin = userStatus.role === 'admin';
    if (isAdmin) {
      return <TopBanner onCreateEntry={fetchData} />
    } else {
      return null;
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {topBannerRender()}
      </Grid>
      <Grid item xs={12}>
        <EntryList entries={entries}
          selectedSort={selectedSort}
          searchQuery={searchQuery}
          liveChecked={liveChecked}
          epChecked={epChecked}
          onlyChecked={onlyChecked}
          handleSortChange={handleSortChange}
          handleSearchChange={handleSearchChange}
          handleLiveCheckboxChange={handleLiveCheckboxChange}
          handleEpCheckboxChange={handleEpCheckboxChange}
          handleOnlyCheckboxChange={handleOnlyCheckboxChange}
        />
      </Grid>
    </Grid>
  );
}

export default ListPage;