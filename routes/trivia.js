const router = require('express').Router();

// Models
const User = require('../models/User');
const Question = require('../models/Question');
const Trivia = require('../models/Trivia');

// Difficulties [Easy, Medium, Hard]
router.get('/', (req, res) => { res.render('content/difficulty'); });

// Easy
router.get('/difficulty/easy?', async (req, res) => {
  const trivias = await Trivia.find({ difficulty: 'easy' })

  try {
    res.render('content/allTrivia', { trivias });
  } catch (err) {
    console.log(`Easy err: ${err}`);
  }

})

// Medium
router.get('/difficulty/medium?', async (req, res) => {
  const trivias = await Trivia.find({ difficulty: 'medium' })

  try {
    res.render('content/allTrivia', { trivias });
  } catch (err) {
    console.log(`Medium err: ${err}`);
  }

})

// Hard
router.get('/difficulty/hard?', async (req, res) => {
  const trivias = await Trivia.find({ difficulty: 'hard' })

  try {
    res.render('content/allTrivia', { trivias });
  } catch (err) {
    console.log(`Hard err: ${err}`);
  }
})

router.get('/difficulty/:difficulty/:id', async (req, res) => {
  const foundTrivia = await Trivia.findById(req.params.id).populate('questions')

  try {
    res.render('content/foundTrivia', foundTrivia)
  } catch (err) {
    console.log(`Found Trivia err: ${err}`)
  }
})


// Submit Trivia
router.post('/submit/:id', async (req, res) => {
  let score = 0;

  const getTrivia = await Trivia.findById(req.params.id).populate('questions');

  for await (const object of Object.entries(req.body)) {
    const question = await Question.findById(object[0])
    if (object[1] === question.answer) {
      score++;
    }
  }

  const TRIVIALENGTH = 10;
  const percentage = (score / TRIVIALENGTH) * 100;

  // If User is logged in we can save the test and score in the database
  if (req.session.user) {
    const user = req.session.user;
    const foundUser = await User.findByIdAndUpdate(user._id, { $push: { tests: { trivia: getTrivia, score: `${percentage}%` } } });
    console.log(foundUser);
    res.redirect('/');
  } else { res.redirect('/') }


});

module.exports = router;