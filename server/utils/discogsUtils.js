const parseRelease = (result, type) => {
    // The title and artist are formatted like 'Artist - Title'
    // Split the string at the '-' and trim the whitespace
    const titleArtist = result.title.split('-');
    const title = titleArtist[1].trim();
    // Artist and remove any numbers and parentheses
    const artist = titleArtist[0].trim().replace(/\(\d+\)/, '');

    // Genre is an array of strings so join them with ', '
    // Style is more specific than genre
    let genre = '';
    if (result.style) {
        genre = result.style.join(', ');
    }

    // Year (discogs only has year)
    let year = result.year;
    // Make a date object from the year Jan 1st
    const date = new Date(year, 0, 1);

    // Cover image
    cover_url = result.cover_image;

    let release = {
        id: result.id,
        type: type,
        title: title,
        artist: artist,
        releaseDate: date,
        year: year,
        genre: genre,
        cover: {
            url: cover_url,
            filename: ''
        }
    }

    return release;
}

module.exports = {
    parseRelease
}