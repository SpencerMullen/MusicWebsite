const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Registration successful' });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Route
router.post(
  '/login',
  passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
  (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/dashboard'; // Redirect to dashboard or another route
    delete req.session.returnTo;
    res.json({ message: 'Login successful', redirectUrl });
  }
);

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged out successfully');
  res.redirect('/'); // Redirect to the home page or another route
});

module.exports = router;