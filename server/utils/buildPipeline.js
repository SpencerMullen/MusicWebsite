const { Entry } = require('../models/entry');

// Helper function to build the MongoDB aggregation pipeline
const buildPipeline = (filters) => {
    const { selectedSort, searchQuery, liveChecked, epChecked, onlyChecked } = filters;
    console.log("filters: ", JSON.stringify(filters));

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
    if (onlyChecked === true) {
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
    }

    // Add sorting logic
    if (selectedSort === 'title_asc') pipeline.push({ $sort: { title: 1 } });
    else if (selectedSort === 'title_dsc') pipeline.push({ $sort: { title: -1 } });
    // If sorting by artist, use the artist name without the leading "The " or "the "
    else if (selectedSort === 'artist_asc' || selectedSort === 'artist_dsc') {
        const sortDir = selectedSort === 'artist_asc' ? 1 : -1;
        pipeline.push({ $addFields: { artistSort: { $cond: { if: { $regexMatch: { input: '$artist', regex: /^the /i } }, then: { $substr: ['$artist', 4, -1] }, else: '$artist' } } } });
        pipeline.push({ $sort: { artistSort: sortDir } });
        pipeline.push({ $unset: 'artistSort' });
    }
    else if (selectedSort === 'releaseDate_asc') pipeline.push({ $sort: { releaseDate: 1 } });
    else if (selectedSort === 'releaseDate_dsc') pipeline.push({ $sort: { releaseDate: -1 } });
    else if (selectedSort === 'rating_asc') {
        // If the reviewed field is false, use a temporary rating of 11
        pipeline.push({ $addFields: { ratingSort: { $cond: { if: '$reviewed', then: '$review.rating', else: 11 } } } });
        pipeline.push({ $sort: { ratingSort: 1 } });
        pipeline.push({ $unset: 'ratingSort' });
    } else if (selectedSort === 'rating_dsc') {
        // If the reviewed field is false, use a temporary rating of -1
        pipeline.push({ $addFields: { ratingSort: { $cond: { if: '$reviewed', then: '$review.rating', else: -1 } } } });
        pipeline.push({ $sort: { ratingSort: -1 } });
        pipeline.push({ $unset: 'ratingSort' });
    } else if (selectedSort === 'reviewDate_asc') {
        // If the reviewed field is false, use a temporary reviewDate of 1/1/3000
        pipeline.push({ $addFields: { reviewDateSort: { $cond: { if: '$reviewed', then: '$review.reviewDate', else: new Date('3000-01-01') } } } });
        pipeline.push({ $sort: { reviewDateSort: 1 } });
        pipeline.push({ $unset: 'reviewDateSort' });
    } else if (selectedSort === 'reviewDate_dsc') {
        // If the reviewed field is false, use a temporary reviewDate of 1/1/1000
        pipeline.push({ $addFields: { reviewDateSort: { $cond: { if: '$reviewed', then: '$review.reviewDate', else: new Date('1000-01-01') } } } });
        pipeline.push({ $sort: { reviewDateSort: -1 } });
        pipeline.push({ $unset: 'reviewDateSort' });
    }

    return pipeline;
};

module.exports = { buildPipeline };