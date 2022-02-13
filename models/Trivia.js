const { Schema, model } = require('mongoose');

const questionSchema = new Schema({

    category: { type: String, required: true },

    // Array of answer choices ['option A', 'option B', 'option C', 'option D']
    choices: [{ type: String }],

    // Correct answer is stored here 
    answer: { type: String, required: true },

}, { timestamps: true });

/*

 10 Trivia Models
 The whole test - categories, choices, answer
 One test has all the questions

 Each user that goes to the site, can take the exact same test
 Logged in Users can look at previous tests and scores from other users

*/


const Question = model('Question', questionSchema);

module.exports = Question;