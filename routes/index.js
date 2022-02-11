const router = require("express").Router();
const { genSaltSync, hashSync } = require('bcryptjs');
const User = require('../models/User');

// Middleware
const signupError = require('../middleware/SignupError');
const loginError = require('../middleware/LoginError');
const loggedIn = require('../middleware/LoggedIn');

/* GET home page */
router.get("/", (req, res) => {
  res.render('index');
});


// Signup
router.get('/signup', (req, res) => res.render('auth/signup'))

router.post('/signup', signupError, (req, res) => {
  const { username, password, handlename } = req.body;

  // Encrypt password
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  const hash = hashSync(password, salt);

  // Create user
  User
    .create({
      username: username,
      password: hash,
      handlename: handlename
    })
    .then(res.redirect('/login'))
    .catch(err => res.status(400).send(err))
})

// Login
router.get('/login', (req, res) => res.render('auth/login'))

router.post('/login', loginError, async (req, res) => {
  const { username } = req.body;

  // Add Session to User
  req.session.user = await User.findOne({ username: username })
  res.redirect('/profile')
})

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/');
})


// 🔒 Protected Routes
router.get('/profile', loggedIn, (req, res) => {
  res.render('private/profile', req.user)
})

module.exports = router;
