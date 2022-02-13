const router = require("express").Router();

// Encryption
const { genSaltSync, hashSync } = require('bcryptjs');

// Models
const User = require('../models/User');

// Api
const axios = require('axios');

// Middleware
const signupError = require('../middleware/SignupError');
const loginError = require('../middleware/LoginError');
const loggedIn = require('../middleware/LoggedIn');

function decode(string) {
  return Buffer.from(string, 'base64').toString('utf-8')
}
/* GET home page */
router.get("/", (req, res) => {

  axios
    .get('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=base64')
    .then(test => {



      /* 
        Trivia
          .create({
            question1.category: objects[0][0]
            question1.question: objects[0][1]
            question1.choices.push(objects[0][2])
            question1.answer: objects[0][3]

            question2.category: objects[1][0]
            question2.question: objects[1][1]
            question2.choices.push(objects[1][2])
            question2.answer: objects[0][3]

            question3.category: objects[2][0]
            question3.question: objects[2][1]
            question3.choices.push(objects[2][2])
            question3.answer: objects[0][3]
          })
      */
















      const objects = test.data.results.map(obj => {
        const incorrect = obj.incorrect_answers.map(answers => {
          return decode(answers)
        });
        incorrect.push(decode(obj.correct_answer))
        return [decode(obj.category), decode(obj.question), incorrect, decode(obj.correct_answer)]

      });

      console.log(objects[0])


      res.render('index', { objects });
    })
    .catch(err => console.log(err))
});


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
    .then(res.redirect('/login'))
    .catch(err => res.status(400).send(err))
});

// Login
router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', loginError, async (req, res) => {
  const { username } = req.body;

  // Add Session to User
  req.session.user = await User.findOne({ username: username })
  res.redirect('/profile')
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});


// 🔒 Protected Routes
router.get('/profile', loggedIn, (req, res) => {
  res.render('private/profile', req.user)
});



module.exports = router;
