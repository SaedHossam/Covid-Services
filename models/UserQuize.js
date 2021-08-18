const mongoose = require('mongoose');
const schema = mongoose.Schema;


let userQuizSchema = new schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    quiz : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    visiable:Boolean,
    solved: Boolean,
    answers: [
        {
            question:Number,
            answer:Number
        }
    ],
    degree:Number
}, {timestamps:true});

module.exports = mongoose.model('UserQuiz', userQuizSchema);