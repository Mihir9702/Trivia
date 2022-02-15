const { Schema, model, Types } = require('mongoose');

const triviaSchema = new Schema({

    questions: { type: [Types.ObjectId], ref: 'Question' },

}, { timestamps: true });


const Trivia = model('Trivia', triviaSchema);

module.exports = Trivia;