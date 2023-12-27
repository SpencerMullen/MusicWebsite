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
  const [liveChecked, setLiveChecked] = useState(localStorage.getItem('liveChecked') === 'true' || true);
  const [epChecked, setEpChecked] = useState(localStorage.getItem('epChecked') === 'true' || true);
  const [onlyChecked, setOnlyChecked] = useState(localStorage.getItem('onlyChecked') === 'true' || false);
  // Save scroll position in localStorage
  const [scrollPosition, setScrollPosition] = useState(parseInt(localStorage.getItem('scrollPosition')) || 0);

  useEffect(() => {
    // Update localStorage when state values change
    localStorage.setItem('selectedSort', selectedSort);
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('liveChecked', liveChecked.toString());
    localStorage.setItem('epChecked', epChecked.toString());
    localStorage.setItem('onlyChecked', onlyChecked.toString());
    localStorage.setItem('scrollPosition', scrollPosition.toString());
    fetchData();
  }, [selectedSort, searchQuery, liveChecked, epChecked, onlyChecked, scrollPosition]);

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
  // Debounce scroll event handler
  let scrollTimeout;
  const handleScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setScrollPosition(window.scrollY);
    }, 200); // 200ms debounce
  };

  const fetchData = async () => {
    const filters = {
      selectedSort,
      searchQuery,
      liveChecked,
      epChecked,
      onlyChecked,
    };

    //const newEntries = await getEntries(filters);
    const newEntries = [];
    for (let i = 0; i < 100; i++) {
      newEntries.push({
        id: i,
        reviewed: false,
        type: 'album',
        artist: 'Artist ' + i,
        title: 'Title ' + i,
        releaseDate: '2021-10-01',
        genre: 'Genre ' + i,
        cover: {
          url: 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/7f/77/df/7f77df1e-c1ca-5adc-fd31-bdcf9e71f7c8/3663729027610_cover.jpg/600x600bb.jpg',
          filename: '',
        },
        review: {
          rating: 0,
          reviewDate: null,
          reviewText: ""
        }
      });
    }

    setEntries(newEntries);
  };

  useEffect(() => {
    fetchData();

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
          scrollPosition={scrollPosition}
        />
      </Grid>
    </Grid>
  );
}

export default ListPage;