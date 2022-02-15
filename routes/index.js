const router = require("express").Router();

// Encryption
const { genSaltSync, hashSync } = require('bcryptjs');

// Models
const User = require('../models/User');
const Question = require('../models/Question');
const Trivia = require('../models/Trivia');


// Api
const axios = require('axios');

// Middleware
const signupError = require('../middleware/SignupError');
const loginError = require('../middleware/LoginError');
const loggedIn = require('../middleware/LoggedIn');
const decode = require('../utils/decode');
const bodyParser = require("body-parser");
const async = require("hbs/lib/async");

router.get('/', (req, res) => {

Question
    .find()
    .limit(10)
    .then(tenQuestions => {
        const questionsID = [];
        for (let question of tenQuestions) {
            questionsID.push(question._id);
        }
        console.log(questionsID);
    })
  res.render('index');
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
    .then(res.redirect('/login'))
    .catch(err => res.status(406).send(err))
});

// Login
router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', loginError, async (req, res) => {
  // Add Session to User
  req.session.user = await User.findOne({ username: req.body.username })
  res.redirect('/profile')
});

// Logout
router.get('/logout', (req, res) => {
  // End Session of User
  req.session.destroy();
  res.redirect('/');
});

//----------------------------\\
//----🔒 Protected Routes-----\\
//----------------------------\\

// Profile
router.get('/profile', loggedIn, (req, res) => {
  res.render('private/profile', req.user)
});

// Create a Trivia Test
router.get("/create-trivia", async (req, res) => {

  // Fetch Api
  const getAxios = await axios.get('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple&encode=base64');

  try {
    getAxios.data.results.map(obj => {
      // Return incorrect answers
      const choices = obj.incorrect_answers.map(incorrect => {
        return decode(incorrect);
      });

      const { category, question, correct_answer } = obj;

      // Choices[] contains all incorrect answers and the correct answer
      // PUSH CORRECT ANSWER AT RANDOM INDEX \\
      const answer = decode(correct_answer);
      choices.push(answer);

      // Create a single question in database
      Question
        .insertMany({ category: decode(category), question: decode(question), choices: choices, answer: answer })
        .then((questions) => {console.log(questions)})
        .catch(err => res.status(400).send(err));
    });
  } catch (err) { res.status(400).send(err) }

  // Find Most Recent 10 Questions and get their ID's
  const gettenQuestions = await Question.find().limit(10).sort({ 'createdAt': -1 });

  try {
    const questionID = gettenQuestions.map(question => {
      return question._id;
    });
    // Create a Trivia Test
    const newTrivia = await Trivia.create({ questions: questionID });

    res.redirect('/')
  } catch (err) { res.status(404).send(err) }

});


// router.get('/trivia', async (req, res) => {
//   // Render most recent Trivia created
//   const getTrivia = await Trivia.findOne().sort({ 'createdAt': -1 }).populate('questions');
//   try {
//     res.render('trivia', { getTrivia, layout: false });
//   } catch (err) { res.status(504).send(err) }
// });

// router.post('/trivia', (req, res) => {
//   res.json(req.body);

// });


module.exports = router;
