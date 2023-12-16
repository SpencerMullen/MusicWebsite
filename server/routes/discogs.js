const express = require('express');
const router = express.Router();
const Discogs = require('disconnect').Client;
const db = new Discogs('MusicReviewSite/1.0', {
    consumerKey: process.env.DISCOGS_KEY,
    consumerSecret: process.env.DISCOGS_SECRET
}).database();
const { parseRelease } = require('../utils/discogsUtils');

router.route('/')
    // Get releases by the search query 
    .get(async (req, res) => {
        const { artist, title, format, page } = req.query;
        try {
            // Make a request to the Discogs API using the search parameters
            const searchResults = await db.search({
                type: 'master', 
                artist: artist, 
                release_title: title, 
                format: format,
                per_page: 15,
                page: page
            });
            // console.log(searchResults);
            const releases = searchResults.results.map(result => parseRelease(result, format));
            res.status(200).json(releases);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });


module.exports = router;