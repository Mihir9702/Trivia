const { Schema, model } = require('mongoose');

const questionSchema = new Schema({

    category: { type: String },
    
    difficulty: { type: String },

    question: { type: String, unique: true },

    choices: { type: [String] },

    answer: { type: String }

}, { timestamps: true });

const Question = model('Question', questionSchema);

module.exports = Question;