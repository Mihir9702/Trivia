const router = require("express").Router();

// Encryption
const { genSaltSync, hashSync } = require('bcryptjs');

// Models
const User = require('../models/User');

// Middleware
const signupError = require('../middleware/SignupError');
const loginError = require('../middleware/LoginError');
const loggedIn = require('../middleware/LoggedIn');

router.get('/', (req, res) => {
  res.render('index', req.app.locals.globalUser);
})


// Signup
router.get('/signup', (req, res) => res.render('auth/signup'));

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
    .then(user => {
      req.session.user = user;
      req.app.locals.globalUser = user;
      res.redirect(`/profile/${user._id}`)
    })
    .catch(err => res.status(406).send(err))
});

// Login
router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', loginError, async (req, res) => {

  // Add Session to User
  const user = await User.findOne({ username: req.body.username })
  req.session.user = user;
  req.app.locals.globalUser = user;
  res.redirect(`/profile/${user._id}`)
});

// Logout - End Session
router.get('/logout', (req, res) => {
  req.app.locals.globalUser = null;
  req.session.destroy();
  res.redirect('/')
});


module.exports = router;
