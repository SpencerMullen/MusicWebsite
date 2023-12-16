import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import SearchContent from '../components/search/SearchContent';
import AddDialog from '../components/search/AddEntry';
import { getReleases } from '../utils/requestUtils';

export default function SearchPage(props) {
    const navigate = useNavigate();
    const { userStatus } = props;

    // Add dialog
    const [addOpen, setAddOpen] = useState(false);
    const [entry, setEntry] = useState({});
    const handleAddOpen = () => {
        setAddOpen(true);
    }
    const handleAddClose = () => {
        setAddOpen(false);
    }

    // Search query
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [format, setFormat] = useState('album');
    // Search results
    const [searchResults, setSearchResults] = useState([]);

    const handleArtistChange = (event) => {
        setArtist(event.target.value);
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }
    const handleFormatChange = (event) => {
        setFormat(event.target.value);
    }

    const handleSearchSubmit = async () => {
        try {
            const data = await getReleases(artist, title, format, 1);
            setSearchResults(data);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    }

    // If user is not authenticated, redirect to home
    useEffect(() => {
        if (!userStatus.isAuthenticated) {
            navigate('/login');
        }
    }, []);

    return (
        <div>
            <Box
                sx={{
                    padding: '1rem',
                    backgroundColor: '#EFEFEF',
                    borderBottom: '1px solid #DDD',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    verticalAlign: 'middle',
                }}
            >
                <TextField
                    id="artist"
                    label="Search by artist..."
                    variant="outlined"
                    size="small"
                    sx={{ width: '35%', marginRight: '1rem' }}
                    value={artist}
                    onChange={handleArtistChange}
                    onKeyDown={handleKeyDown}
                />
                <TextField
                    id="title"
                    label="Search by title..."
                    variant="outlined"
                    size="small"
                    sx={{ width: '35%', marginRight: '1rem' }}
                    value={title}
                    onChange={handleTitleChange}
                    onKeyDown={handleKeyDown}
                />
                <RadioGroup
                    aria-label="format"
                    name="format"
                    value={format}
                    onChange={handleFormatChange}
                    sx={{ display: 'flex', flexDirection: 'row', marginRight: '1rem' }}
                >
                    <FormControlLabel value="album" control={<Radio />} label="Album" />
                    <FormControlLabel value="ep" control={<Radio />} label="EP" />
                </RadioGroup>

                <Button variant="contained" onClick={handleSearchSubmit}>Search</Button>
            </Box>
            <SearchContent searchResults={searchResults} open={addOpen} openDialog={handleAddOpen} onClose={handleAddClose} setEntry={setEntry} />
            <AddDialog open={addOpen} onClose={handleAddClose} entry={entry} />
        </div>
    )
}