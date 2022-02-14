const { Schema, model } = require('mongoose');

const testSchema = new Schema({
    question1: { type: Object },
    question2: { type: Object },
    question3: { type: Object },
    question4: { type: Object },
    question5: { type: Object },
    question6: { type: Object },
    question7: { type: Object },
    question8: { type: Object },
    question9: { type: Object },
    question10: { type: Object },
})

/*
    {
        _id: "",

        question1: {
            category: "",
            question: "",
            choices: ["", "", "", ""],
            answer: ""
        },

        question2: {
            category: "",
            question: "",
            choices: ["", "", "", ""],
            answer: ""
        },

        question3: {
            category: "",
            question: "",
            choices: ["", "", "", ""],
            answer: ""
        },

        // Timestamp would be here
    }
*/

// Question
//   .find()
//   .limit(10)
//   .sort({ 'createdAt': -1 })
//   .then(tenQuestions => {

//     const questionID = tenQuestions.map(question => {
//       return question._id
//     })

//     Trivia
//       .create({ questions: questionID })
//       .then(newTrivia => console.log(newTrivia))
//       .catch(err => console.error(err))
//   })
//   .catch(err => console.log(err))

// Question
//   .find()
//   .limit(10)
//   .sort({ 'createdAt': -1 })
//   .then(tenQuestions => {

//     const questionID = tenQuestions.map(question => {
//       return question._id
//     })

//     Trivia
//       .create({ questions: questionID })
//       .then(newTrivia => console.log(newTrivia))
//       .catch(err => console.error(err))
//   })
//   .catch(err => console.log(err))

// Trivia
//     .findOne()
//     .sort({ 'createdAt': -1 })
//     .populate('questions')
//     .then(recentTest => {
//         res.render('index', { recentTest });
//     })
//     .catch(err => console.log(err))

        // Question
        //   .create({
        //     category: decode(category),
        //     question: decode(question),
        //     choices: choices,
        //     answer: answer
        //   })
        //   .then(newQuesiton => {
        //     console.log(newQuesiton);
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })

// axios
//   .get('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple&encode=base64')
//   .then(test => {

//     const objects = test.data.results.map(obj => {
//       const choices = obj.incorrect_answers.map(incorrect => {
//         return decode(incorrect)
//       });

//       const { category, question, correct_answer } = obj;

//       const answer = decode(correct_answer);
//       choices.push(answer);


//     });

    

//   })
//   .catch(err => console.log(err))

    // Question
    //   .create({
    //     category: decode(category),
    //     question: decode(question),
    //     choices: choices,
    //     answer: answer
    //   })
    //   .then(newQuesiton => {
    //     console.log(newQuesiton);
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })