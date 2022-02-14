const { Schema, model, Types } = require('mongoose');

const triviaSchema = new Schema({

    questions: { type: [Types.ObjectId], ref: 'Question' },

    score: { type: [{ owner: Types.ObjectId, score: Number }], ref: 'User' }

}, { timestamps: true });


const Trivia = model('Trivia', triviaSchema);

module.exports = Trivia;