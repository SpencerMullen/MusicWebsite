// Helper function to build the MongoDB aggregation pipeline
const buildPipeline = (filters) => {
    const { selectedSort, searchQuery } = filters;
    let { liveChecked, epChecked, onlyChecked } = filters;
    // Since these values are from localStorage, they are strings so convert
    liveChecked = liveChecked === 'true' ? true : false;
    epChecked = epChecked === 'true' ? true : false;
    onlyChecked = onlyChecked === 'true' ? true : false;
    // console.log("filters: ", JSON.stringify(filters));

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
                    { genre: searchRegex },
                ],
            },
        });
    }

    // Add filtering logic for checkboxes
    if (onlyChecked) {
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
    if (selectedSort === 'title_asc') {
        pipeline.push({ $addFields: { titleSort: { $toLower: '$title' } } });
        pipeline.push({ $sort: { titleSort: 1 } });
        pipeline.push({ $unset: 'titleSort' });
    } else if (selectedSort === 'title_dsc') { 
        pipeline.push({ $addFields: { titleSort: { $toLower: '$title' } } });
        pipeline.push({ $sort: { titleSort: -1 } });
        pipeline.push({ $unset: 'titleSort' });
    } else if (selectedSort === 'artist_asc' || selectedSort === 'artist_dsc') {
        // If the artist starts with 'the ', remove it for sorting
        const sortDir = selectedSort === 'artist_asc' ? 1 : -1;
        // First add a lowercase version of the artist name
        pipeline.push({ $addFields: { artistLower: { $toLower: '$artist' } } });
        // Then remove 'the ' from the beginning of the artist name
        pipeline.push({
            $addFields: {
                artistSort: {
                    $cond: {
                        if: { $eq: [{ $substrCP: ['$artistLower', 0, 4] }, 'the '] },
                        then: { $substrCP: ['$artistLower', 4, { $strLenCP: '$artistLower' }] },
                        else: '$artistLower'
                    }
                }
            }
        });
        // Then sort by the artist name then by release date
        pipeline.push({ $sort: { artistSort: sortDir, releaseDate: sortDir } });
        // Then remove the temporary fields
        pipeline.push({ $unset: ['artistLower', 'artistSort'] });
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