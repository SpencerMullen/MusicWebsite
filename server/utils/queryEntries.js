const { Entry } = require('../models/entry');

// Helper function to build the MongoDB query
const buildQuery = (filters) => {
    const { selectedSort, searchQuery, liveChecked, epChecked, onlyChecked } = filters;

    // Add sorting logic
    if(selectedSort === 'title_asc') sortOption = { title: 1 }
    else if(selectedSort === 'title_dsc') sortOption = { title: -1 }
    else if(selectedSort === 'artist_asc') sortOption = { artist: 1, releaseDate: 1 }
    else if(selectedSort === 'artist_dsc') sortOption = { artist: -1, releaseDate: 1 }
    else if(selectedSort === 'releaseDate_asc') sortOption = { releaseDate: 1 }
    else if(selectedSort === 'releaseDate_dsc') sortOption = { releaseDate: -1 }
    else if(selectedSort === 'rating_asc') sortOption = { 'review.rating': 1 }
    else if(selectedSort === 'rating_dsc') sortOption = { 'review.rating': -1 }
    else if(selectedSort === 'reviewDate_asc') sortOption = { 'review.reviewDate': 1 }
    else if(selectedSort === 'reviewDate_dsc') sortOption = { 'review.reviewDate': -1 }

    // Add searching logic
    /*if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, 'i');
        query.$or = [
            { title: searchRegex },
            { artist: searchRegex },
        ];
    }*/

    // Add filtering logic
    /*if (onlyChecked) {
        const checkboxFilters = [];
        if (liveChecked) checkboxFilters.push({ type: 'livealbum' });
        if (epChecked) checkboxFilters.push({ type: 'ep' });
        if (checkboxFilters.length > 0) query.$or = checkboxFilters;
    } else {
        if (!liveChecked) query.type = { $ne: 'livealbum' };
        if (!epChecked) query.type = { $ne: 'ep' };
    }*/

    // Make the query with sorting only
    const query = {
        sortOption,
    }

    return query;
};

module.exports = { buildQuery };