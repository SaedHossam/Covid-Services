const mongoose = require('mongoose'); 
const schema = mongoose.Schema;

const quizSchema = new schema({
    name: String,
    description: String,
    subCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    questions: [
        {
            statment: String,
            type: String,
            options: [{
                type: String
            }],
            answer: String
        }
    ]
}, {timestamps:true});

module.exports = mongoose.model('Quiz', quizSchema);