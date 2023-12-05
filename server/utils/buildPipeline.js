const { Entry } = require('../models/entry');

// Helper function to build the MongoDB aggregation pipeline
const buildPipeline = (filters) => {
    const { selectedSort, searchQuery, liveChecked, epChecked, onlyChecked } = filters;

    // Initial pipeline stages
    let pipeline = [];

    // Add filtering logic for search bar
    if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, 'i');
        pipeline.push({
            $match: {
                $or: [
                    { title: searchRegex },
                    { artist: searchRegex },
                ],
            },
        });
    }

    // Add filtering logic for checkboxes
    /*if (onlyChecked) {
        let checkboxFilters = [];
        if (liveChecked) checkboxFilters.push({ type: 'livealbum' });
        if (epChecked) checkboxFilters.push({ type: 'ep' });

        if (checkboxFilters.length > 0) {
            pipeline.push({
                $match: {
                    $or: checkboxFilters,
                },
            });
        } else {
            // If onlyChecked is true but neither liveChecked nor epChecked is selected, include nothing
            pipeline.push({ $match: { _id: null } });
        }
    } else {
        let typeFilters = [];
        // Include albums by default
        typeFilters.push({ type: 'album' });
        if (liveChecked) typeFilters.push({ type: 'livealbum' });
        if (epChecked) typeFilters.push({ type: 'ep' });
    
        pipeline.push({
            $match: {
                $or: typeFilters,
            },
        });
    }*/

    // Add sorting logic
    if (selectedSort === 'title_asc') pipeline.push({ $sort: { title: 1 } });
    else if (selectedSort === 'title_dsc') pipeline.push({ $sort: { title: -1 } });
    else if (selectedSort === 'artist_asc' || selectedSort === 'artist_dsc') {
        const sortDirection = selectedSort === 'artist_asc' ? 1 : -1;
        const regex = /^The\s+/i;
        const replacement = '';

        pipeline.push({
            $addFields: {
                sortArtist: {
                    $regexReplace: {
                        input: '$artist',
                        find: regex,
                        replacement: replacement,
                    },
                },
            },
        });
        pipeline.push({ $sort: { sortArtist: sortDirection, releaseDate: 1 } });
        pipeline.push({ $unset: 'sortArtist' });
    }
    else if (selectedSort === 'releaseDate_asc') pipeline.push({ $sort: { releaseDate: 1 } });
    else if (selectedSort === 'releaseDate_dsc') pipeline.push({ $sort: { releaseDate: -1 } });
    else if (selectedSort === 'rating_asc') pipeline.push({ $sort: { 'review.rating': 1 } });
    else if (selectedSort === 'rating_dsc') pipeline.push({ $sort: { 'review.rating': -1 } });
    else if (selectedSort === 'reviewDate_asc') pipeline.push({ $sort: { 'review.reviewDate': 1 } });
    else if (selectedSort === 'reviewDate_dsc') pipeline.push({ $sort: { 'review.reviewDate': -1 } });

    return pipeline;
};

module.exports = { buildPipeline };