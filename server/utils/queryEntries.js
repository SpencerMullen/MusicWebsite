const { Entry } = require('../models/entry');

// Helper function to build the MongoDB query
const buildQuery = (filters) => {
    const { selectedSort, searchQuery, liveChecked, epChecked, onlyChecked } = filters;
    const query = {};

    // Add sorting logic
    const sortOptions = {
        title_asc: { title: 1 },
        title_dsc: { title: -1 },
        artist_asc: { artist: 1, releaseDate: 1 },
        artist_dsc: { artist: -1, releaseDate: 1 },
        releaseDate_asc: { releaseDate: 1 },
        releaseDate_dsc: { releaseDate: -1 },
        rating_asc: { 'review.rating': 1 },
        rating_dsc: { 'review.rating': -1 },
        reviewDate_asc: { 'review.reviewDate': 1 },
        reviewDate_dsc: { 'review.reviewDate': -1 },
    };

    const sortOption = sortOptions[selectedSort] || {};
    Object.assign(query, sortOption);

    // Add searching logic
    if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, 'i');
        query.$or = [
            { title: searchRegex },
            { artist: searchRegex },
        ];
    }

    // Add filtering logic
    if (onlyChecked) {
        const checkboxFilters = [];
        if (liveChecked) checkboxFilters.push({ type: 'livealbum' });
        if (epChecked) checkboxFilters.push({ type: 'ep' });
        if (checkboxFilters.length > 0) query.$or = checkboxFilters;
    } else {
        if (!liveChecked) query.type = { $ne: 'livealbum' };
        if (!epChecked) query.type = { $ne: 'ep' };
    }

    return query;
};

module.exports = { buildQuery };