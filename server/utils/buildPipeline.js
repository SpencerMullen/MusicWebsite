const { Entry } = require('../models/entry');

// Helper function to build the MongoDB aggregation pipeline
const buildPipeline = (filters) => {
    const { selectedSort, searchQuery, liveChecked, epChecked, onlyChecked } = filters;

    // Initial pipeline stages
    let pipeline = [];

    // Add matching stage for searchQuery
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