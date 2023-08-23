const express = require('express');
const port = 8080;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/musicdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const server = require('http').createServer(app);

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

