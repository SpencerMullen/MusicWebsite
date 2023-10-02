const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/musicdb'; // Adjust the URL to match your MongoDB setup

const axios = require('axios');

mongoose.connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true });

const newEntry = {
    type: 'album',
    title: 'UPDATED',
    artist: 'Some Artist',
    releaseDate: new Date(),
    genre: 'Some Genre',
    review : {
        rating: 10,
        reviewDate: new Date(),
        reviewText: 'Some review text'
    }
};

// Create a new entry
const apiUrl = 'http://localhost:8080/entry'; // Adjust the URL to match your Express routes

// Send a POST request to create a new entry
/*axios.post(apiUrl, { entry : newEntry })
  .then(response => {
    console.log('New entry created:', response.data);
  })
  .catch(error => {
    console.error('Error creating entry:', error);
  });*/

// Send a GET request to retrieve all entries
/*axios.get(apiUrl)
  .then(response => {
    console.log('All entries:', response.data);
  })
  .catch(error => {
    console.error('Error getting entries:', error);
  });*/

// Send a GET request to retrieve a single entry
/*axios.get(apiUrl + '/78ab4075-088e-49b1-abb9-f35e42980c47')
  .then(response => {
    console.log('Single entry:', response.data);
  })
  .catch(error => {
    console.error('Error getting entry:', error);
  });*/

// Send a PUT request to update an entry
/*axios.put(apiUrl + '/78ab4075-088e-49b1-abb9-f35e42980c47', { entry : newEntry })
  .then(response => {
    console.log('Updated entry:', response.data);
  })
  .catch(error => {
    console.error('Error updating entry:', error);
  });*/

// Send a DELETE request to delete an entry
/*axios.delete(apiUrl + '/05b478ca-3e88-4416-8914-4c1f0f11dc37')
  .then(response => {
    console.log('Deleted entry:', response.data);
  })
  .catch(error => {
    console.error('Error deleting entry:', error);
  });*/