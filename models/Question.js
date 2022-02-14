const { Schema, model } = require('mongoose');

const questionSchema = new Schema({

    category: { type: String },

    question: { type: String },

    choices: { type: [String] },

    answer: { type: String }

}, { timestamps: true });

const Question = model('Question', questionSchema);

module.exports = Question;