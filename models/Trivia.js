const { Schema, model, Types } = require('mongoose');

const triviaSchema = new Schema({

    questions: { type: [Types.ObjectId], ref: 'Question', unique: true },

    difficulty: { type: String, required: true },

    name: { type: String }

}, { timestamps: true });


const Trivia = model('Trivia', triviaSchema);

module.exports = Trivia;