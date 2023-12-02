if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const port = 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const MongoDBStore = require('connect-mongodb-session')(session);
const ExpressError = require('./utils/ExpressError');
// const methodOverride = require('method-override');

// Routes
const entryRoutes = require('./routes/entry');
const userRoutes = require('./routes/user');

// Connect to MongoDB
// const dbURL = process.env.DB_URL || 'mongodb://localhost:27017/musicdb';
const dbURL = 'mongodb://localhost:27017/musicdb';
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create Express app
const app = express();
const server = require('http').createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
// app.use(methodOverride('_method'));

// Configure express-session with env
const sessionSecret = process.env.EXPRESS_SESSION_SECRET;
const store = new MongoDBStore({
  uri: dbURL,
  collection: 'sessions'
});
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  // store: store,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

// Middleware to log session
/*app.use((req, res, next) => {
  console.log('Session:', req.session);
  console.log('User:', req.user);
  next();
});*/

// Initialize Passport and session support
app.use(passport.initialize());
app.use(passport.session());

// Configure the LocalStrategy for Passport
passport.use(new LocalStrategy(User.authenticate()));

// Serialize and deserialize user instances to maintain user sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Use routes
app.use('/entry', entryRoutes);
app.use('/', userRoutes);

// Error-handling middleware
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Something went wrong';
  res.status(statusCode).json({ message: err.message }); // Fix: Use err.message
});

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});