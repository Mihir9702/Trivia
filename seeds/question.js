const axios = require('axios');
const Question = require('../models/Question');
const Trivia = require('../models/Trivia');
const router = require('../routes/trivia');
const decode = require('../utils/decode');

// ------------------//
//  Seeding Database //
// ------------------//
axios
    .get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple&encode=base64')
    .then(request => {
        request.data.results.map(allquestions => {

            const choices = allquestions.incorrect_answers.map(incorrect => {
                return decode(incorrect)
            });

            const { category, difficulty, question, correct_answer } = allquestions;

            const answer = decode(correct_answer);
            let randomindex = Math.floor(Math.random() * 3);
            choices.splice(randomindex, 0, answer);


            // Creates the 10 Questions
            Question
            .create({
                category: decode(category),
                difficulty: decode(difficulty),
                question: decode(question),
                choices: choices,
                correct: answer
            })
            .then(createdquestions =>  console.log(`Created Questions: ${createdquestions}`))
            .catch(err => console.log(`create question err: ${err}`))

        });
    })
    .catch(err => console.log(`axios err: ${err}`))

// Gets 10 most recent Questions
Question
    .find()
    .limit(10)
    .sort({ 'createdAt': -1 })
    .then(tenQuestions => {
        const questionsID = [];
        for (let question of tenQuestions) {
            questionsID.push(question._id);
        }
        // Creates Trivia w/ 10 most recent questions
        Trivia.create({
        questions: questionsID,
        difficulty: 'hard'
        })
        .then(createdTrivia => console.log(`Created Trivia: ${createdTrivia}`))
        .catch(err => console.log(`Trivia Err: ${err}`))
    })
    .catch(err => console.log(`Finding Question err: ${err}`))