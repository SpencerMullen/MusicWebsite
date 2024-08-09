const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');

// Register route
router.post('/register', async (req, res) => {
  try {
    // console.log("Registering user");
    // console.log(req.body);
    // Register the user with the credentials with role 'user'
    const newUser = await User.register({ username: req.body.username, role: 'user' }, req.body.password);
    console.log("User registered");
    console.log(newUser);
    res.json(newUser);
    // Register is disabled for now
    // res.status(503).json({ error: 'Registration is disabled' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', /*{ keepSessionInfo: true },*/ (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      // console.log('Logging in');
      // console.log(req.user);
      // console.log(req.session);
      res.json(req.user);
    });
  })(req, res, next);
});


// Logout route
router.get('/logout', (req, res) => {
  req.logout(/*{ keepSessionInfo: true }*/);
  // console.log('Logging out');
  // Delete the session from the database
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  res.json({ message: 'Logged out' });
});

// User status route
router.get('/user', (req, res) => {
  try {
    // console.log("Getting user status");
    // console.log(req.user);
    // console.log(req.session);
    // Check if the user is authenticated
    const isAuthenticated = req.isAuthenticated();

    // If the user is authenticated, send user information
    if (isAuthenticated) {
      res.json({
        username: req.user.username,
        role: req.user.role,
        isAuthenticated: true
      });
    } else {
      // If the user is not authenticated
      res.json({ isAuthenticated: false });
    }
  } catch (err) {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
}
});

module.exports = router;